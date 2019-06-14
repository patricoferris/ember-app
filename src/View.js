import React, { Component } from 'react';
import styled from 'styled-components';
// Local Imports
import ScheduleView from './Components/Schedule';
import FoodAndDrinkView from './Components/FoodAndDrink';
import MusicView from './Components/Music';
import MapView from './Components/Map';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
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

  componentDidMount() {
    this.targetElement = document.getElementById('view');
    disableBodyScroll(this.targetElement);
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  render() {
    const ViewToRender = this.state[this.props.tag || 'schedule' || 'foodAndDrink'];
    return (
      <ViewDiv>
        <ViewToRender id='view'/>
      </ViewDiv>
    );
  }
}

export default View;