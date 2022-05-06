import React, { Component } from 'react';
import { withScriptjs, withGoogleMap } from 'react-google-maps';
import { Col, Row, Button, Offcanvas, OffcanvasHeader, OffcanvasBody } from 'reactstrap';
import MapComponent from './components/MapComponent';
import FilterMenu from './components/FilterMenu';
import { BsSliders } from 'react-icons/bs';
import data from '~/config/responses.json';
import { isEmpty, isNil } from 'lodash';
import './map.css';

const WrappedMap = withScriptjs(withGoogleMap((props) => <MapComponent {...props} />));

class Map extends Component {
  state = {
    showHeatMap: false,
    isFilterOpen: false,
    heatmapGreen: true,
    heatmapRegular: true,
    selectedFilter: 'feelSafe',
    selectedGender: {
      male: true,
      female: true,
      other: true,
    },
    selectedAges: {
      from: 0,
      to: 100,
    },
    selectedResidence: {
      inside: true,
      outside: true,
      insideRegions: [],
      outsideRegions: [],
    },
  };

  toggleOrSetState = (field, value = null) => {
    this.setState((state) => ({
      [field]: !isNil(value) ? value : !state[field],
    }));
  };

  toggleFilter = (filter) => {
    this.setState({
      selectedFilter: filter,
    });
  };

  toggleAge = (type, value) => {
    if (type === 'from' && value < 0) value = 0;
    if (type === 'to' && value > 100) value = 100;
    this.setState((state) => ({
      selectedAges: {
        ...state.selectedAges,
        [type]: value,
      },
    }));
  };

  toggleGender = (gender) => {
    this.setState((state) => ({
      selectedGender: {
        ...state.selectedGender,
        [gender]: !state.selectedGender[gender],
      },
    }));
  };

  toggleResidence = (input, type, value) => {
    let newState = {
      ...this.state.selectedResidence,
    };
    if (input === 'checkbox') {
      newState = {
        ...newState,
        [type]: value,
        [`${type}Regions`]: !value ? [] : newState[`${type}Regions`],
      };
    } else if (input === 'select') {
      newState = {
        ...newState,
        [`${type}Regions`]: value,
      };
    }
    this.setState({
      selectedResidence: newState,
    });
  };

  toggleFilterDashboard = () => {
    this.setState((state) => ({
      isFilterOpen: !state.isFilterOpen,
    }));
  };

  getSelectedGenders = () => {
    const { selectedGender } = this.state;
    const result = [];
    if (selectedGender.female) result.push(1);
    if (selectedGender.male) result.push(2);
    if (selectedGender.other) result.push(3);
    return result;
  };

  getSelectedResidencies = () => {
    const { selectedResidence } = this.state;
    const result = [];
    if (selectedResidence.inside) result.push(1);
    if (selectedResidence.outside) result.push(2);
    return result;
  };

  getSelectedResidenciesRegions = () => {
    const { selectedResidence } = this.state;
    const inside = selectedResidence.insideRegions.map((item) => item.value);
    const outside = selectedResidence.outsideRegions.map((item) => item.value);
    return {
      inside,
      outside,
    };
  };

  dataResponsesFilter = () => {
    const { selectedAges } = this.state;

    // Completed response filter
    let filteredData = data.responses.filter((response) => response.status === 'Completed');

    // Gender filter
    filteredData = filteredData.filter((response) => this.getSelectedGenders().includes(response.sex));

    // Age filter
    filteredData = filteredData.filter(
      (response) => response.age >= selectedAges.from && response.age <= selectedAges.to,
    );

    // Residency filter
    filteredData = filteredData.filter((response) => this.getSelectedResidencies().includes(response.liveInRiga));

    // Residency regions filter
    const selectedRegions = this.getSelectedResidenciesRegions();
    if (!isEmpty(selectedRegions.inside)) {
      filteredData = filteredData.filter((response) =>
        response.liveInRiga === 1 ? selectedRegions.inside.includes(response.whereInRiga) : true,
      );
    }
    if (!isEmpty(selectedRegions.outside)) {
      filteredData = filteredData.filter((response) =>
        response.liveInRiga === 2 ? selectedRegions.outside.includes(response.whereOutRiga) : true,
      );
    }

    return filteredData;
  };

  render() {
    const {
      showHeatMap,
      isFilterOpen,
      selectedAges,
      heatmapGreen,
      heatmapRegular,
      selectedGender,
      selectedFilter,
      selectedResidence,
    } = this.state;

    const filteredData = {
      ...data,
      responses: this.dataResponsesFilter() || [],
    };
    return (
      <Row className="h-100 m-0">
        <Col xs="12" style={{ padding: 0 }}>
          <WrappedMap
            googleMapURL={
              'https://maps.googleapis.com/maps/api/js?key=&v=3.exp&libraries=geometry,drawing,places,visualization'
            }
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            data={filteredData}
            showHeatMap={showHeatMap}
            heatmapGreen={heatmapGreen}
            heatmapRegular={heatmapRegular}
            selectedFilter={selectedFilter}
          />
        </Col>
        <Button className="filterButton" outline color="light" size="md" onClick={() => this.toggleFilterDashboard()}>
          <BsSliders />
        </Button>
        <Offcanvas isOpen={isFilterOpen} direction="top" backdrop={false} toggle={this.toggleFilterDashboard}>
          <OffcanvasHeader style={{ backgroundColor: '#373737', color: 'white' }} toggle={this.toggleFilterDashboard}>
            <h3>Filtri</h3>
            <h6>{`Izvēlētās izlases kopas izmērs: ${filteredData.responses.length}`}</h6>
          </OffcanvasHeader>
          <OffcanvasBody style={{ backgroundColor: '#333333' }}>
            <FilterMenu
              unfilteredData={{
                ...data,
                responses: data.responses.filter((response) => response.status === 'Completed'),
              }}
              showHeatMap={showHeatMap}
              selectedAges={selectedAges}
              heatmapGreen={heatmapGreen}
              heatmapRegular={heatmapRegular}
              selectedFilter={selectedFilter}
              selectedGender={selectedGender}
              selectedResidence={selectedResidence}
              toggleAge={this.toggleAge}
              toggleGender={this.toggleGender}
              toggleFilter={this.toggleFilter}
              toggleResidence={this.toggleResidence}
              toggleOrSetState={this.toggleOrSetState}
            />
          </OffcanvasBody>
        </Offcanvas>
      </Row>
    );
  }
}

export default Map;
