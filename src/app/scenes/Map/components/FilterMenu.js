import React, { Component, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import Age from './filters/Age';
import Gender from './filters/Gender';
import Heatmap from './filters/Heatmap';
import Category from './filters/Category';
import Residence from './filters/Residence';

class FilterMenu extends Component {
  render() {
    const {
      toggleAge,
      showHeatMap,
      toggleFilter,
      toggleGender,
      selectedAges,
      heatmapGreen,
      heatmapRegular,
      unfilteredData,
      selectedGender,
      selectedFilter,
      toggleResidence,
      toggleOrSetState,
      selectedResidence,
    } = this.props;
    return (
      <Fragment>
        <Row>
          <Col xs="12" md="7" lg="4" className="mt-3">
            <Category toggleFilter={toggleFilter} selectedFilter={selectedFilter} unfilteredData={unfilteredData} />
          </Col>
          <Col xs="12" md="5" lg="3" className="mt-3">
            <Gender toggleGender={toggleGender} selectedGender={selectedGender} unfilteredData={unfilteredData} />
            <Age toggleAge={toggleAge} selectedAges={selectedAges} unfilteredData={unfilteredData} />
          </Col>
          <Col xs="12" md="12" lg="5" className="mt-3">
            <Residence
              unfilteredData={unfilteredData}
              toggleResidence={toggleResidence}
              selectedResidence={selectedResidence}
            />
          </Col>
          <Col xs="12" md="7" lg="4" className="mt-3">
            <Heatmap
              showHeatMap={showHeatMap}
              heatmapGreen={heatmapGreen}
              heatmapRegular={heatmapRegular}
              toggleOrSetState={toggleOrSetState}
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default FilterMenu;
