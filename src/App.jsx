import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardScene from '~/app/scenes/Dashboard';
import NotFound from '~/app/scenes/NotFound';
import MapScene from '~/app/scenes/Map';
import Home from '~/app/scenes/Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/dashboard' element={<DashboardScene />} />
          <Route exact path='/map' element={<MapScene />} />
          <Route exact path='/' element={<Home />} />
          <Route exact path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;