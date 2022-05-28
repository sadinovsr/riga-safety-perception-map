import React, { Component, Fragment } from 'react';
import { Table, Col, Button } from 'reactstrap';
import { Navigate } from 'react-router-dom';
import data from '~/config/responses.json';
import regions from '~/config/regions';
import { getColor } from '~/utils';
import './dashboard.css';
import { isNil } from 'lodash';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

class Dashboard extends Component {
  state = {
    toMap: false,
    currentSort: 'id',
    currentSortWay: 'asc',
  };

  changeSort = (type) => {
    const { currentSort, currentSortWay } = this.state;
    let newWay = 'asc';

    if (currentSort === type) {
      if (currentSortWay === 'asc') {
        newWay = 'desc';
      } else {
        newWay = 'asc';
      }
    }
    this.setState({
      currentSort: type,
      currentSortWay: newWay,
    });
  };

  customSort = (a, b) => {
    const { currentSort, currentSortWay } = this.state;

    if (isNil(a[currentSort]) && isNil(b[currentSort])) {
      return 0;
    } else if (isNil(a[currentSort])) {
      return 1;
    } else if (isNil(b[currentSort])) {
      return -1;
    }

    if (a[currentSort] < b[currentSort]) {
      return currentSortWay === 'asc' ? -1 : 1;
    } else if (isNil(a[currentSort]) || a[currentSort] > b[currentSort]) {
      return currentSortWay === 'asc' ? 1 : -1;
    } else {
      return 0;
    }
  };

  rigaRegionConvert = (id) => data.header.whereInRigaOptions[id - 1];
  outsideRegionConvert = (id) => data.header.whereOutRigaOptions[id - 1];
  genderConvert = (id) => ['Sieviete', 'Vīrietis', 'Cits'][id - 1];
  liveInRigaConvert = (id) => ['Jā', 'Nē'][id - 1];
  generateDynamicStyle = (value) => ({ backgroundColor: getColor(value / 100, 65) });

  renderSortIcon = (type) => {
    const { currentSort, currentSortWay } = this.state;
    return currentSort === type && (currentSortWay === 'asc' ? <FiChevronUp /> : <FiChevronDown />);
  };

  render() {
    const { toMap } = this.state;
    const completedResponses = data.responses
      .filter((response) => response.status === 'Completed')
      .sort(this.customSort);
    const headerData = data.header;
    return (
      <Fragment>
        <Col xs="12" md="6" className="my-3">
          <Button color="dark" onClick={() => this.setState({ toMap: true })}>
            Uz karti
          </Button>
          {toMap && <Navigate to="/map" />}
        </Col>
        <Table bordered>
          <thead>
            <tr>
              <th rowSpan={2} title={headerData.id} onClick={() => this.changeSort('id')}>
                Atbildes ID
                {this.renderSortIcon('id')}
              </th>
              <th rowSpan={2} title={headerData.time} onClick={() => this.changeSort('time')}>
                Izpildes laiks
                {this.renderSortIcon('time')}
              </th>
              <th rowSpan={2} title={headerData.sex} onClick={() => this.changeSort('sex')}>
                Dzimums
                {this.renderSortIcon('sex')}
              </th>
              <th rowSpan={2} title={headerData.age} onClick={() => this.changeSort('age')}>
                Gadi
                {this.renderSortIcon('age')}
              </th>
              <th rowSpan={2} title={headerData.liveInRiga} onClick={() => this.changeSort('liveInRiga')}>
                Dzīvo Rīgā?
                {this.renderSortIcon('liveInRiga')}
              </th>
              <th rowSpan={2} title={headerData.whereInRiga} onClick={() => this.changeSort('whereInRiga')}>
                Kur Rīgā?
                {this.renderSortIcon('whereInRiga')}
              </th>
              <th
                rowSpan={2}
                title={headerData.whereOutRiga}
                style={{ borderRight: 'solid 2px black' }}
                onClick={() => this.changeSort('whereOutRiga')}
              >
                Kur ārpus Rīgas?
                {this.renderSortIcon('whereOutRiga')}
              </th>
              {regions.map((region, idx) => (
                <th key={idx} colSpan={6} style={{ borderRight: 'solid 2px black' }}>
                  {region.displayName}
                </th>
              ))}
            </tr>
            <tr>
              {regions.map((region, idx) => (
                <Fragment key={idx}>
                  <th>Drošība</th>
                  <th>Noziegumi</th>
                  <th>Satiksme</th>
                  <th>Gaisma</th>
                  <th>Zaļumi</th>
                  <th style={{ borderRight: 'solid 2px black' }}>Redzamība</th>
                </Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {completedResponses.map((response, index) => (
              <tr key={index}>
                <td>{response.id}</td>
                <td>{new Date(response.time * 1000).toISOString().substr(11, 8)}</td>
                <td>{this.genderConvert(response.sex)}</td>
                <td>{response.age}</td>
                <td>{this.liveInRigaConvert(response.liveInRiga)}</td>
                <td>{this.rigaRegionConvert(response.whereInRiga) || '-'}</td>
                <td style={{ borderRight: 'solid 2px black' }}>
                  {this.outsideRegionConvert(response.whereOutRiga) || '-'}
                </td>
                {regions.map((region, idx) => (
                  <Fragment key={idx}>
                    <td style={this.generateDynamicStyle(response.data[idx]['feelSafe'])}>
                      {response.data[idx]['feelSafe']}
                    </td>
                    <td style={this.generateDynamicStyle(response.data[idx]['smallCrime'])}>
                      {response.data[idx]['smallCrime']}
                    </td>
                    <td style={this.generateDynamicStyle(response.data[idx]['roadSafety'])}>
                      {response.data[idx]['roadSafety']}
                    </td>
                    <td style={this.generateDynamicStyle(response.data[idx]['goodLighting'])}>
                      {response.data[idx]['goodLighting']}
                    </td>
                    <td style={this.generateDynamicStyle(response.data[idx]['greeneries'])}>
                      {response.data[idx]['greeneries']}
                    </td>
                    <td
                      style={{
                        ...this.generateDynamicStyle(response.data[idx]['feelSafe']),
                        borderRight: 'solid 2px black',
                      }}
                    >
                      {response.data[idx]['viewDistance']}
                    </td>
                  </Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Fragment>
    );
  }
}

export default Dashboard;
