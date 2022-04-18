import { Row, Col } from 'reactstrap';
import React, { Component } from 'react';
import Age from './filters/Age';
import Gender from './filters/Gender';
import Category from './filters/Category';
import Residence from './filters/Residence';

class FilterMenu extends Component {
  render() {
    const {
      toggleAge,
      toggleFilter,
      toggleGender,
      selectedAges,
      unfilteredData,
      selectedGender,
      selectedFilter,
      toggleResidence,
      selectedResidence,
    } = this.props;
    return (
      <Row>
        <Col xs="12" md="7" lg="4" className="mt-3">
          <Category
            toggleFilter={toggleFilter}
            selectedFilter={selectedFilter}
            unfilteredData={unfilteredData}
          />
        </Col>
        <Col xs="12" md="5" lg="3" className="mt-3">
          <Gender
            toggleGender={toggleGender}
            selectedGender={selectedGender}
            unfilteredData={unfilteredData}
          />
          <Age
            toggleAge={toggleAge}
            selectedAges={selectedAges}
            unfilteredData={unfilteredData}
          />
        </Col>
        <Col xs="12" md="12" lg="5" className="mt-3">
          <Residence
            unfilteredData={unfilteredData}
            toggleResidence={toggleResidence}
            selectedResidence={selectedResidence}
          />
        </Col>
      </Row>
    )
  }
}

export default FilterMenu;
