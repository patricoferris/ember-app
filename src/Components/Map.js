import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';

import drinkIcon from '../Utils/Drinks.png';
import foodIcon from '../Utils/Food.png';
import musicIcon from '../Utils/Music.png';
import casinoIcon from '../Utils/Casino.png';
import cinemaIcon from '../Utils/Cinema.png';
import cloakroomIcon from '../Utils/Cloakroom.png';
import comedyIcon from '../Utils/Comedy.png';
import dodgemIcon from '../Utils/Dodgems.png';
import facepaintIcon from '../Utils/Facepaint.png';
import ferrisIcon from '../Utils/Ferris Wheel.png';
import firstaidIcon from '../Utils/First Aid.png';
import photoIcon from '../Utils/Photography.png';
import skateIcon from '../Utils/Skating.png';
import wcIcon from '../Utils/wc.png';

var greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function getIcon(type) {
  let icon;
  let size = [27, 27];
  if (type === 'food') {
    icon = foodIcon;
  } else if (type === 'music') {
    icon = musicIcon;
  } else if (type === 'dodgems') {
    icon = dodgemIcon;
  } else if (type === 'firstAid') {
    icon = firstaidIcon;
  } else if (type === 'casino') {
    icon = casinoIcon;
  } else if (type === 'cinema') {
    icon = cinemaIcon;
  } else if (type === 'ferris') {
    size = [31, 29];
    icon = ferrisIcon;
  } else if (type === 'facepaint') {
    icon = facepaintIcon;
  } else if (type === 'skate') {
    icon = skateIcon;
  } else if (type === 'wc') {
    icon = wcIcon;
  } else if (type === 'photo') {
    icon = photoIcon;
  } else if (type === 'comedy') {
    icon = comedyIcon;
  } else if (type === 'cloakroom') {
    icon = cloakroomIcon;
    size = [31, 31];
  } else {
    icon = drinkIcon;
  }

  return L.Icon.extend({
    options: {
        iconUrl: icon,
        iconSize: size
    }
  });
}

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geoId: 0,
      yourLocation: {latLng: { lat: 52.202079, lng: 0.1201}, title: "You" },
      marker: null,
      markersData: [
        { latLng: { lat: 52.201979, lng: 0.119922 }, title: "Orchard Drinks" , type: 'drink'},
        { latLng: { lat: 52.202079, lng: 0.119830 }, title: "Silent Disco" , type: 'music'},
        { latLng: { lat: 52.202150, lng: 0.119516 }, title: "First Aid" , type: 'firstAid'},
        { latLng: { lat: 52.202100, lng: 0.119316 }, title: "Toilets" , type: 'wc'},
        { latLng: { lat: 52.202079, lng: 0.120094 }, title: "Bowling Green Drinks" , type: 'drink'},
        { latLng: { lat: 52.201944, lng: 0.118503 }, title: "Casino" , type: 'casino'},
        { latLng: { lat: 52.202250, lng: 0.120400 }, title: "Bowling Green Main Stage" , type: 'music'},
        { latLng: { lat: 52.202583, lng: 0.120301 }, title: "New Court Drink", type: 'drink'},
        { latLng: { lat: 52.202453, lng: 0.120201 }, title: "New Court Food", type: 'food'},
        { latLng: { lat: 52.202453, lng: 0.120044 }, title: "Photography", type: 'photo'},
        { latLng: { lat: 52.202353, lng: 0.119944 }, title: "Toilets", type: 'wc'},
        { latLng: { lat: 52.202353, lng: 0.120094 }, title: "Facepaint", type: 'facepaint'},
        { latLng: { lat: 52.202453, lng: 0.120551 }, title: "Skating", type: 'skate'},
        { latLng: { lat: 52.201904, lng: 0.118313 }, title: "Old Library", type: 'drink'},
        { latLng: { lat: 52.201784, lng: 0.118603 }, title: "Old Court Music", type: 'music'},
        { latLng: { lat: 52.201704, lng: 0.118503 }, title: "Old Court Drinks", type: 'drink'},
        { latLng: { lat: 52.201604, lng: 0.118503 }, title: "Toilets", type: 'wc'},
        { latLng: { lat: 52.201370, lng: 0.119064 }, title: "Red Buildings Drinks", type: 'drink'},
        { latLng: { lat: 52.201370, lng: 0.118864 }, title: "Red Buildings Food", type: 'food'},
        { latLng: { lat: 52.201965, lng: 0.119316 }, title: "Ivy Court Food", type: 'food'},
        { latLng: { lat: 52.202055, lng: 0.119216 }, title: "Ivy Court Drink", type: 'drink'},
        { latLng: { lat: 52.201925, lng: 0.119016 }, title: "Ivy Court Music", type: 'music'},
        { latLng: { lat: 52.201925, lng: 0.118786 }, title: "Hall Music", type: 'music'},
        { latLng: { lat: 52.201875, lng: 0.119316 }, title: "Toilets", type: 'wc'},
        { latLng: { lat: 52.201735, lng: 0.119116 }, title: "Library Lawn Food", type: 'food'},
        { latLng: { lat: 52.201805, lng: 0.119516 }, title: "Library Lawn Comedy", type: 'comedy'},
        { latLng: { lat: 52.201685, lng: 0.119516 }, title: "Library Lawn Music", type: 'music'},
        { latLng: { lat: 52.201635, lng: 0.119116 }, title: "Library Lawn Drinks", type: 'drink'},
        { latLng: { lat: 52.201754, lng: 0.120091 }, title: "Fellows' Garden Food", type: 'food'},
        { latLng: { lat: 52.201644, lng: 0.120291 }, title: "Fellows' Garden Food", type: 'food'},
        { latLng: { lat: 52.201564, lng: 0.120311 }, title: "Cinema", type: 'cinema'},
        { latLng: { lat: 52.201904, lng: 0.120191 }, title: "Ferris Wheel", type: "ferris"},
        { latLng: { lat: 52.201804, lng: 0.120591 }, title: "Dodgems", type: "dodgems"},
        { latLng: { lat: 52.201704, lng: 0.120991 }, title: "Cloakroom and Toilets", type: "cloakroom"},
        { latLng: { lat: 52.201604, lng: 0.120791 }, title: "Foundress Lawn Food", type: "food"},
        { latLng: { lat: 52.201604, lng: 0.120591 }, title: "Foundress Lawn Drinks", type: "drink"},
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
    this.checkLocation(this);
  }

  checkLocation(state) {
    // if ("geolocation" in navigator) {
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     let latLng = { lat: Math.floor(position.coords.latitude * 1000000) / 1000000, lng: Math.floor(position.coords.longitude * 1000000) / 1000000 };
    //     state.setState({
    //       yourLocation: {latLng: latLng, title: "You"}
    //     });
    //     //(state.state.yourLocation);
    //     state.addMarker(state.state.yourLocation, state);
    //   });
    // }
  }

  addMarker(marker, state) {

    if (state.state.marker) {
      this.map.removeLayer(state.state.marker);
    }

    let mark = L.marker(
      marker.latLng,
      { title: marker.title,
        icon: greenIcon }
    ).bindPopup(marker.title).openPopup().addTo(this.layer);

    state.setState({marker: mark});
  }

  async updateMarkers(markersData) {
    let icon;
    markersData.forEach(marker => {
      icon = getIcon(marker.type);
      L.marker(
        marker.latLng,
        { title: marker.title,
          icon: new icon }
      ).bindPopup(marker.title).openPopup().addTo(this.layer);
    });
  }

  componentDidUpdate({ markersData }) {
    // // check if data has changed
    // if (this.state.markersData !== markersData) {
    //   this.updateMarkers(this.state.markersData);
    // }
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