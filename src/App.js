import React, { Component } from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import GradeIcon from '@material-ui/icons/Grade';

// Local imports
import Header from './Components/Header';
import View from './View';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#000',
      dark: '#002884',
      contrastText: '#fff',
    }
  },
});

const styles = {
  header: {
    flexGrow: 1,
    left: '0px',
    top: '0px',
    right: '0px'
  },
  bottom: {
    position: 'fixed',
    borderTop: 'thin solid grey',
    left: '0px',
    right: '0px',
    bottom: '0px'
  },
};


class App extends Component {
  state = {
    value: 'schedule',
    loading: false
  };

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 3000)
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return this.state.loading ? <div>Loading...</div> : (
        <MuiThemeProvider theme={theme}>
        <Header classForAppBar={classes.header}/>
        <View tag={this.state.value}/>
        <BottomNavigation value={value} onChange={this.handleChange} showLabels className={classes.bottom}>
          <BottomNavigationAction label="Entertainment" value='schedule' icon={<ScheduleIcon />} />
          <BottomNavigationAction label="Map" value='map' icon={<LocationOnIcon />} />
          <BottomNavigationAction label="Food" value='foodAndDrink' icon={<FastfoodIcon />} />
          <BottomNavigationAction label="Thanks" value='music' icon={<GradeIcon />} />
        </BottomNavigation>
      </MuiThemeProvider>
      );
  }
}

export default withStyles(styles)(App);
