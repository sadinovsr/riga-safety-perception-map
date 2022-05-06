import React, { Component, Fragment } from 'react';
import data from '~/config/responses.json';
import { getColor } from '~/utils';
import { Table } from 'reactstrap';
import './dashboard.css';
import regions from '~/config/regions';

class Dashboard extends Component {
  rigaRegionConvert = (id) => data.header.whereInRigaOptions[id - 1];
  outsideRegionConvert = (id) => data.header.whereOutRigaOptions[id - 1];
  genderConvert = (id) => ['Sieviete', 'Vīrietis', 'Cits'][id - 1];
  liveInRigaConvert = (id) => ['Jā', 'Nē'][id - 1];
  generateDynamicStyle = (value) => ({ backgroundColor: getColor(value / 100, 65) });

  render() {
    const completedResponses = data.responses.filter((response) => response.status === 'Completed');
    const headerData = data.header;
    return (
      <Table bordered>
        <thead>
          <tr>
            <th rowSpan={2} title={headerData.id}>
              Response ID
            </th>
            <th rowSpan={2} title={headerData.time}>
              Time Taken
            </th>
            <th rowSpan={2} title={headerData.sex}>
              Dzimums
            </th>
            <th rowSpan={2} title={headerData.age}>
              Gadi
            </th>
            <th rowSpan={2} title={headerData.liveInRiga}>
              Dzīvo Rīgā?
            </th>
            <th rowSpan={2} title={headerData.whereInRiga}>
              Kur Rīgā?
            </th>
            <th rowSpan={2} title={headerData.whereOutRiga} style={{ borderRight: 'solid 2px black' }}>
              Kur ārpus Rīgas?
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
    );
  }
}

export default Dashboard;
