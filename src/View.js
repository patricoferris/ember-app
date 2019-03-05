import React, { Component } from 'react';
import styled from 'styled-components';
// Local Imports
import ScheduleView from './Components/Schedule';
import FoodAndDrinkView from './Components/FoodAndDrink';
import MusicView from './Components/Music';
import MapView from './Components/Map';

const ViewDiv = styled.div`
  position: fixed;
  left: 0px;
  right: 0px;
  top: 56px;
  bottom: 56px;
`;

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: ScheduleView,
      foodAndDrink: FoodAndDrinkView,
      music: MusicView,
      map: MapView,
    }
  }

  render() {
    const ViewToRender = this.state[this.props.tag || 'schedule'];
    return (
      <ViewDiv>
        <ViewToRender/>
      </ViewDiv>
    );
  }
}

export default View;