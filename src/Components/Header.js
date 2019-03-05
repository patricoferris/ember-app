import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Header extends Component {
  render() {
    return (
      <AppBar position="static" color="primary" className={this.props.classForAppBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            ember
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
export default Header;