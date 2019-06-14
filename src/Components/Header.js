import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const style = {
  background: 'rgb(26,18,14)',
  background: 'linear-gradient(319deg, rgba(26,18,14,1) 0%, rgba(193,26,14,1) 75%, rgba(127,12,0,1) 93%)',
  alignItems: 'center'
}

class Header extends Component {
  render() {
    return (
      <AppBar position="static" color="primary" className={this.props.classForAppBar} style={style}>
        <Toolbar>
          <Typography style={{fontFamily: "'Inknut Antiqua', 'serif'",}} variant="h6" color="inherit">
            ember
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
export default Header;