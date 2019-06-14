import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geoId: 0,
      yourLocation: {latLng: { lat: 52.202079, lng: 0.1201}, title: "You" },
      markersData: [
        { latLng: { lat: 52.202079, lng: 0.120094 }, title: "Bowling Green Drinks" , type: 'drink'},
        { latLng: { lat: 52.202150, lng: 0.120400 }, title: "Bowling Green Main Stage" , type: 'music'},
        { latLng: { lat: 52.202483, lng: 0.120301 }, title: "New Court Drink", type: 'drink'},
        { latLng: { lat: 52.202353, lng: 0.120201 }, title: "New Court Food", type: 'food'},
        { latLng: { lat: 52.201884, lng: 0.118403 }, title: "Old Library" },
        { latLng: { lat: 52.201784, lng: 0.118603 }, title: "Old Court Music" },
        { latLng: { lat: 52.201604, lng: 0.118503 }, title: "Old Court Drinks" },
        { latLng: { lat: 52.201370, lng: 0.119064 }, title: "Red Buildings Drinks" },
        { latLng: { lat: 52.201370, lng: 0.118864 }, title: "Red Buildings Food" },
        { latLng: { lat: 52.201735, lng: 0.119316 }, title: "Library Lawn" },
        { latLng: { lat: 52.201654, lng: 0.120091 }, title: "Fellows' Garden Food" },
        { latLng: { lat: 52.201634, lng: 0.120291 }, title: "Fellows' Garden Food" },
        { latLng: { lat: 52.201604, lng: 0.120791 }, title: "Fellows' Lawn Food", type: "food"},
        { latLng: { lat: 52.201604, lng: 0.120591 }, title: "Fellows' Lawn Drinks", type: "drink"},
      ]
    };
    this.location = "Hello";
    this.checkLocation = this.checkLocation.bind(this);
  }

  componentWillMount() {
    const centerControl = L.control({position: 'bottomright'});  // see http://leafletjs.com/reference.html#control-positions for other positions
    const jsx = (
      <div>
        <button>TEST</button>
      </div>
    );

    centerControl.onAdd = function (map) {
      let div = L.DomUtil.create('div', '');
      ReactDOM.render(jsx, div);
      return div;
    };

    this.leafletElement = centerControl;
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
    this.addMarker(this.state.yourLocation);
  }

  checkLocation(state) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let latLng = { lat: Math.floor(position.coords.latitude * 1000000) / 1000000, lng: Math.floor(position.coords.longitude * 1000000) / 1000000 };
        state.setState({
          yourLocation: {latLng: latLng, title: "You"}
        });
      });
    }
  }

  addMarker(marker) {
    L.marker(
      marker.latLng,
      { title: marker.title }
    ).bindPopup(marker.title).openPopup().addTo(this.layer);
  }

  async updateMarkers(markersData) {
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
    this.checkLocation(this);
    return (
      <div id='map' style={{width: '100%', height: '100%'}}>
      </div>
    )
  }
}

export default Map;