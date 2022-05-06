import React from 'react';
import { Row, Col, Button } from 'reactstrap';

const HeatMapToggles = ({ toggleOrSetState, showHeatMap, heatmapGreen, heatmapRegular }) => {

  return (
    <Row>
      <Col xs="12" className="whiteText">
        <h5>RPP fiksētie pārkāpumi</h5>
      </Col>
      <Button
        xs="12"
        color="light"
        className="mt-1"
        outline={!showHeatMap}
        onClick={() => toggleOrSetState('showHeatMap')}
      >
        Ieslēgt/Izslēgt
      </Button>
      <Button
        xs="12"
        color="light"
        className="mt-1"
        outline={!heatmapGreen}
        onClick={() => toggleOrSetState('heatmapGreen', !heatmapGreen)}
      >
        Satiksmes drošības
      </Button>
      <Button
        xs="12"
        color="light"
        className="mt-1"
        outline={!heatmapRegular}
        onClick={() => toggleOrSetState('heatmapRegular', !heatmapRegular)}
      >
        Drošības
      </Button>
    </Row>
  )
}

export default HeatMapToggles;