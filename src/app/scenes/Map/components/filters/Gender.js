import React, { Component } from 'react';
import { Row, Col, FormGroup, Input, Label } from 'reactstrap';

class Gender extends Component {
  countGenderResponses = (gender) => {
    const { unfilteredData } = this.props;
    return unfilteredData.responses.filter((item) => item.sex === gender).length;
  };

  render() {
    const { toggleGender, selectedGender } = this.props;
    return (
      <Row>
        <Col xs="12" className="whiteText">
          <h5>Dzimums:</h5>
        </Col>
        <FormGroup className="d-flex flex-column align-items-start whiteText">
          <div>
            <Input
              xs="12"
              type="checkbox"
              className="mt-1 lightCheckbox"
              checked={selectedGender.female}
              onChange={() => toggleGender('female')}
            />
            <Label>{`Sieviete (${this.countGenderResponses(1)})`}</Label>
          </div>
          <div>
            <Input
              xs="12"
              type="checkbox"
              className="mt-1 lightCheckbox"
              checked={selectedGender.male}
              onChange={() => toggleGender('male')}
            />
            <Label>{`Vīrietis (${this.countGenderResponses(2)})`}</Label>
          </div>
          <div>
            <Input
              xs="12"
              type="checkbox"
              className="mt-1 lightCheckbox"
              checked={selectedGender.other}
              onChange={() => toggleGender('other')}
            />
            <Label>{`Cits (${this.countGenderResponses(3)})`}</Label>
          </div>
        </FormGroup>
      </Row>
    );
  }
}

export default Gender;
