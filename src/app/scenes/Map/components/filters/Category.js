import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';

class Category extends Component {
  // Renders button for each of the categories to toggle them
  renderButton = (title, field) => {
    const { selectedFilter, toggleFilter } = this.props;
    return (
      <Button
        xs="12"
        key={field}
        color="light"
        className="mt-1"
        outline={selectedFilter !== field}
        disabled={selectedFilter === field}
        onClick={() => toggleFilter(field)}
      >
        {title}
      </Button>
    );
  };

  render() {
    const { unfilteredData } = this.props;
    const generatedButtons = Object.keys(unfilteredData.header.data).map((key, index) => {
      return index !== 0 && this.renderButton(unfilteredData.header.data[key], key);
    });

    return (
      <Row>
        <Col xs="12" className="whiteText">
          <h5>Kategorija:</h5>
        </Col>
        {generatedButtons}
      </Row>
    );
  }
}

export default Category;
