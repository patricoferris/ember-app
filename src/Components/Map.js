import React from 'react';
import L from 'leaflet';


class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      markersData: [
        { latLng: { lat: 52.202079, lng: 0.120094 }, title: "Bowling Green" },
        { latLng: { lat: 52.202483, lng: 0.120301 }, title: "New Court" },
        { latLng: { lat: 52.201784, lng: 0.118603 }, title: "Old Court" },
        { latLng: { lat: 52.201370, lng: 0.119064 }, title: "Red Buildings" },
        { latLng: { lat: 52.201735, lng: 0.119316 }, title: "Library Lawn" },
        { latLng: { lat: 52.201654, lng: 0.120091 }, title: "Fellows' Lawn" },
      ]
    };
  }

  componentDidMount() {
    // create map
    this.map = L.map('map', {
      center: [52.20202, 0.12028],
      zoom: 18,
      layers: [
        L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });

    this.layer = L.layerGroup().addTo(this.map);
    this.updateMarkers(this.state.markersData);
  }

  updateMarkers(markersData) {
    this.layer.clearLayers();
    markersData.forEach(marker => {
      L.marker(
        marker.latLng,
        { title: marker.title }
      ).bindPopup(marker.title).openPopup().addTo(this.layer);
   });
  }

  componentDidUpdate({ markersData }) {
    // check if data has changed
    if (this.state.markersData !== markersData) {
      this.updateMarkers(this.state.markersData);
    }
  }

  render() {
    return (
      <div id='map' style={{width: '100%', height: '100%'}}>
      </div>
    )
  }
}

export default Map;