import React, { Component } from 'react';
import { Row, Col, FormGroup, Input, Label } from 'reactstrap';
import Select from 'react-select';

class Residence extends Component {
  countByInsideOutside = (type) => {
    const { unfilteredData } = this.props;
    const compare = type === 'inside' ? 1 : 2;
    return unfilteredData.responses.filter((item) => item.liveInRiga === compare).length;
  };

  countByInsideOutsideRegion = (type, value) => {
    const { unfilteredData } = this.props;
    const key = type === 'inside' ? 'whereInRiga' : 'whereOutRiga';
    return unfilteredData.responses.filter((item) => item[key] === value).length;
  };

  render() {
    const { unfilteredData, toggleResidence, selectedResidence } = this.props;
    const insideOptions = unfilteredData.header.whereInRigaOptions.map((region, idx) => ({
      value: idx + 1,
      label: `${region} (${this.countByInsideOutsideRegion('inside', idx + 1)})`,
    }));
    const outsideOptions = unfilteredData.header.whereOutRigaOptions.map((region, idx) => ({
      value: idx + 1,
      label: `${region} (${this.countByInsideOutsideRegion('outside', idx + 1)})`,
    }));
    return (
      <Row>
        <Col xs="12" className="whiteText">
          <h5>Dzīvesvieta:</h5>
        </Col>
        <FormGroup className="d-flex flex-column align-items-start whiteText">
          <div>
            <Input
              xs="12"
              type="checkbox"
              className="mt-1 lightCheckbox"
              checked={selectedResidence.inside}
              onClick={(e) => toggleResidence('checkbox', 'inside', e.target.checked)}
            />
            <Label>{`Rīgā (${this.countByInsideOutside('inside')})`}</Label>
          </div>
          <div>
            <Input
              xs="12"
              type="checkbox"
              className="mt-1 lightCheckbox"
              checked={selectedResidence.outside}
              onClick={(e) => toggleResidence('checkbox', 'outside', e.target.checked)}
            />
            <Label>{`Ārpus Rīgas (${this.countByInsideOutside('outside')})`}</Label>
          </div>
        </FormGroup>
        <FormGroup>
          <Label className="whiteText">Rīgas reģioni</Label>
          <Select
            xs="12"
            isMulti
            options={insideOptions}
            hideSelectedOptions={false}
            isDisabled={!selectedResidence.inside}
            value={selectedResidence.insideRegions}
            placeholder={
              selectedResidence.inside
                ? 'Pašlaik tiek rādīti visi Rīgas reģioni'
                : "Izvēlieties 'Rīgā' opciju, lai iespējotu šo izvēlni"
            }
            onChange={(val) => toggleResidence('select', 'inside', val)}
          />
          <Label className="whiteText mt-1">Ārpus Rīgas reģioni</Label>
          <Select
            isMulti
            options={outsideOptions}
            hideSelectedOptions={false}
            isDisabled={!selectedResidence.outside}
            value={selectedResidence.outsideRegions}
            placeholder={
              selectedResidence.outside
                ? 'Pašlaik tiek rādīti visi ārpus Rīgas reģioni'
                : "Izvēlieties 'Ārpus Rīgas' opciju, lai iespējotu šo izvēlni"
            }
            onChange={(val) => toggleResidence('select', 'outside', val)}
          />
        </FormGroup>
      </Row>
    );
  }
}

export default Residence;
