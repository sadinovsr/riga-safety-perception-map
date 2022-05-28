import React, { Component } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardScene from '~/app/scenes/Dashboard';
import NotFound from '~/app/scenes/NotFound';
import MapScene from '~/app/scenes/Map';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Routes>
          <Route exact path="/dashboard" element={<DashboardScene />} />
          <Route exact path="/map" element={<MapScene />} />
          <Route exact path="/" element={<Navigate to="/map" />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    );
  }
}

export default App;
