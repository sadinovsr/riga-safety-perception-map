import { min, max } from 'lodash';
import React, { Component } from 'react';
import { Row, Col, FormGroup, Input, Label, InputGroup, InputGroupText } from 'reactstrap';

class Age extends Component {
  minMaxAge = () => {
    const { unfilteredData } = this.props;
    const ages = unfilteredData.responses.map((item) => item.age);
    return `(${min(ages)} - ${max(ages)})`;
  }

  render() {
    const { toggleAge, selectedAges } = this.props;
    return (
      <Row>
        <Col xs="12" className="whiteText">
          <h5>{`Vecums ${this.minMaxAge()}:`}</h5>
        </Col>
        <InputGroup>
          <InputGroupText>
            no
          </InputGroupText>
          <Input type="number" min={0} max={100} value={selectedAges.from} onChange={(e) => toggleAge('from', e.target.value)} />
          <InputGroupText>
            līdz
          </InputGroupText>
          <Input type="number" min={0} max={100} value={selectedAges.to} onChange={(e) => toggleAge('to', e.target.value)} />
        </InputGroup>
      </Row>
    )
  }
}

export default Age;