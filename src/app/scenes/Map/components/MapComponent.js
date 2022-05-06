import { getColor, average } from '~/utils';
import { get, isEmpty, round } from 'lodash';
import React, { Component, Fragment } from 'react';
import { GoogleMap, Polygon } from 'react-google-maps';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import heatmapData from '~/config/heatmapData.json';
import mapStyle from '~/config/mapStyle';
import regions from '~/config/regions';

class MapComponent extends Component {
  state = {
    jugla: false,
    mezaparks: false,
    purvciems: false,
    kengarags: false,
    bolderaja: false,
    agenskalns: false,
    vecpilseta: false,
    andrejosta: false,
    klusaiscentrs: false,
    centraltirgus: false,
  };

  openModal = (modal) => {
    this.setState({
      [modal]: true,
    });
  };

  closeModal = (modal) => {
    this.setState({
      [modal]: false,
    });
  };

  renderRegions = () => {
    const { data } = this.props;
    return regions.map(
      (region, idx) => {
        const avg = average(data.responses.map((item) => item.data[idx][this.props.selectedFilter]));
        return !isEmpty(region.path) && (
          <Fragment key={region.id}>
            <Polygon
              path={region.path}
              options={{
                strokeWeight: 1,
                fillColor: getColor(avg / 100, 50)
              }}
              onClick={() => this.openModal(region.id)}
              onMouseOver={() => this.openModal(region.id)}
              onMouseOut={() => this.closeModal(region.id)}
            />
            {get(this.state, region.id) && (
              <InfoBox defaultPosition={region.centerPos} options={{ closeBoxURL: '' }}>
                <div style={{ color: 'white' }}>
                  <h3>{region.displayName}</h3>
                  <div style={{fontSize: '1rem'}}>
                    {`${data.header.data[this.props.selectedFilter]}`}
                    <br />
                    {`Vidēji: ${avg === -1 ? '-' : round(avg, 2)}`}
                  </div>
                </div>
              </InfoBox>
            )}
          </Fragment>
        );
      }
    );
  };

  render() {
    const { showHeatMap, heatmapGreen, heatmapRegular } = this.props;
    const heatMapData = heatmapData.result
      .filter((item) => {
        if (heatmapGreen && heatmapRegular) return true;
        if (!heatmapGreen && heatmapRegular) return item.style === 'regular';
        if (heatmapGreen && !heatmapRegular) return item.style === 'green';
        return false;
      })
      .map((item) => new google.maps.LatLng(item.position.lat, item.position.lng))
    console.log('rerender')
    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 56.9572613, lng: 24.1157757 }}
        defaultOptions={{ styles: mapStyle }}
      >
        {this.renderRegions()}
        {showHeatMap && (
          <HeatmapLayer
            data={heatMapData}
            options={{
              radius: 0.001,
              opacity: 0.5,
              dissipating: false,
              maxIntensity: 200,
            }}
            // options={{
            //   radius: 0.001,
            //   opacity: 0.5,
            //   dissipating: false,
            //   maxIntensity: 150,
            // }}
          />
        )}
      </GoogleMap>
    );
  }
}

export default MapComponent;
