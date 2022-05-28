import { getColor, average } from '~/utils';
import { get, isEmpty, round } from 'lodash';
import React, { Component, Fragment } from 'react';
import { GoogleMap, Polygon } from 'react-google-maps';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer';
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

  // Get actual data points for each period
  countPointsInRegion = (actualDataPoints, region) => {
    // eslint-disable-next-line no-undef
    const polygon = new google.maps.Polygon({ paths: region.path });
    let count = 0;
    actualDataPoints.forEach((point) => {
      // eslint-disable-next-line no-undef
      if (google.maps.geometry.poly.containsLocation(point, polygon)) {
        count++;
      }
    });

    // eslint-disable-next-line no-undef
    const areaInSqMeters = google.maps.geometry.spherical.computeArea(polygon.getPath());
    const areaInSqKm = areaInSqMeters / 1000000;
    const pointsPerSqKm = (1 / areaInSqKm) * count;
    const pointsPerResident = count / region.population;

    return {
      count,
      pointsPerSqKm,
      pointsPerResident,
    };
  };

  // Render everything for each region in the survey
  renderRegions = (heatMapData) => {
    const { data, showHeatMap, heatmapGreen, heatmapRegular } = this.props;
    return regions.map((region, idx) => {
      const avg = average(data.responses.map((item) => item.data[idx][this.props.selectedFilter]));
      const actualDataCount =
        showHeatMap && get(this.state, region.id) && this.countPointsInRegion(heatMapData, region);
      return (
        !isEmpty(region.path) && (
          <Fragment key={region.id}>
            <Polygon
              path={region.path}
              options={{
                strokeWeight: 1,
                fillColor: getColor(avg / 100, 50),
              }}
              onClick={() => this.openModal(region.id)}
              onMouseOver={() => this.openModal(region.id)}
              onMouseOut={() => this.closeModal(region.id)}
            />
            {get(this.state, region.id) && (
              <InfoBox
                defaultPosition={region.centerPos}
                options={{
                  closeBoxURL: '',
                  boxStyle: { overflow: 'unset', width: 'auto' },
                }}
              >
                <div
                  style={{
                    color: 'white',
                    padding: '10px',
                    borderRadius: '10px',
                    border: 'solid white 1px',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                  }}
                >
                  <h3>{region.displayName}</h3>
                  <div style={{ fontSize: '1rem', overflow: 'visible' }}>
                    <div style={{ borderTop: 'solid white 1px' }}>
                      <b>Aptaujas dati</b>
                    </div>
                    <div className="mb-2">
                      <b>{`(${data.header.data[this.props.selectedFilter]})`}</b>
                    </div>
                    <div className="mb-2">{`Vidēji: ${avg === -1 ? '-' : round(avg, 2)}`}</div>
                    {showHeatMap && (heatmapGreen || heatmapRegular) && (
                      <span>
                        <div style={{ borderTop: 'solid white 1px' }}>
                          <b>RPP izsaukumu dati par 2021 gadu</b>
                        </div>
                        <div className="mb-2">
                          {heatmapGreen && heatmapRegular
                            ? '(Satiksmes un vispārējā drošība)'
                            : heatmapGreen
                            ? '(Satiksmes drošība)'
                            : '(Vispārējā drošība)'}
                        </div>
                        <div>
                          {round(actualDataCount.count)}
                          &nbsp;reģistrētie gadījumi
                        </div>
                        <div>
                          {round(actualDataCount.pointsPerSqKm)}
                          &nbsp;gadījumi/km<sup>2</sup>
                        </div>
                        <div>
                          {region.population === -1
                            ? 'Nebija iespējams noteikt iedzīvotāju skaitu'
                            : `${round(actualDataCount.pointsPerResident, 2)} gadījumi/1 reģiona iedzīvotāju`}
                        </div>
                      </span>
                    )}
                  </div>
                </div>
              </InfoBox>
            )}
          </Fragment>
        )
      );
    });
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
      // eslint-disable-next-line no-undef
      .map((item) => new google.maps.LatLng(item.position.lat, item.position.lng));

    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 56.9572613, lng: 24.1157757 }}
        defaultOptions={{ styles: mapStyle }}
      >
        {this.renderRegions(heatMapData)}
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
