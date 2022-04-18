import { Link } from "react-router-dom";
import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <Row className="mt-3">
        <Col xs="12" md={{size: 6, offset: 3}}>
          <Link to="/map">
            <Button className="w-50" outline color="success">Iet uz karti</Button>
          </Link>
          <Link to="/dashboard">
            <Button className="w-50" outline color="info">Iet uz datu sadaļu</Button>
          </Link>
        </Col>
      </Row>
    )
  }
}

export default Home;