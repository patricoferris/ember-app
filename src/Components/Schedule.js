import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Collapse } from '@material-ui/core';

const SCHEDULE_ENDPOINT = 'https://3sx80dpay9.execute-api.eu-west-2.amazonaws.com/testing/getSchedule';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
});

function dateToTime(date) {
  const regex = /T\d\d:\d\d/g;
  let arr = date.match(regex);
  return arr[0].slice(1);
}

function Item(props, data, func, selected) {
  const { classes } = props;
  return (
    <ListItem key={data.scheduleId} alignItems="flex-start" divider onClick={() => func(data.scheduleId)}>
        <ListItemText
          primary={data.name}
          secondary={
            <React.Fragment>
              <Typography component="span" className={classes.inline} color="textPrimary">
                {data.location} - &nbsp;
              </Typography>
              {dateToTime(data.date)}
              <Collapse in={selected === data.scheduleId}>
                {data.description}
              </Collapse>
            </React.Fragment>
          }
        />
      </ListItem>
  );
}

class Schedule extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      schedule: [],
      filtered: [],
      typeFilter: 'any',
      locationFilter: 'any',
      selected: 3,
    }

    this.getSchedule = this.getSchedule.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
  }

  async componentWillMount() {
    this.getSchedule();
  }

  async getSchedule() {
    fetch(SCHEDULE_ENDPOINT).then(response => {
      console.log("fetching...")
      return response.json();
    }).then(json => {
      this.setState({
        schedule: json.Items.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
      })
      this.applyFilter('any', false);
    })
  }

  changeSelected(value) {
    let newValue = value === this.state.selected ? -1 : value;
    this.setState({
      selected: newValue
    })
  }

  applyFilter(filter, typeCheck) {
    let newFiltered = this.state.schedule.filter((data) => {
      if (typeCheck) {
        return ((filter === 'any') || data.type) === filter && ((this.state.locationFilter === 'any') || data.location.includes(this.state.locationFilter));
      } else {
        return ((filter === 'any') || data.location.includes(filter)) && ((this.state.typeFilter === 'any') || data.type === this.state.typeFilter);
      }
    });

    this.setState({
      filtered: newFiltered
    })
  }

  handleChange(event) {
    if (event.target.name === 'location') {
      this.setState({
        locationFilter: event.target.value
      });
    } else {
      this.setState({
        typeFilter: event.target.value
      });
    }
    
    console.log(event.target);
    this.applyFilter(event.target.value, !(event.target.name === 'location'));
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <List className={'list-class'} style={{height: '100%', overflow: 'auto'}}>
        <ListItem>
          <InputLabel style={{paddingRight: '10px'}} htmlFor="type-simple">Types</InputLabel>
          <Select
            value={this.state.typeFilter}
            style={{minWidth: '100px'}}
            onChange={this.handleChange}
            inputProps={{
              name: 'type',
              id: 'type-simple',
            }}
          >
            <MenuItem value='any'><em>Any</em></MenuItem>
            <MenuItem value='music'>Music</MenuItem>
            <MenuItem value='comedy'>Comedy</MenuItem>
            <MenuItem value='DJ'>DJ</MenuItem>
          </Select>
          <InputLabel style={{padding: '0px 10px'}} htmlFor="location-simple">Location</InputLabel>
          <Select
            value={this.state.locationFilter}
            style={{minWidth: '100px'}}
            onChange={this.handleChange}
            inputProps={{
              name: 'location',
              id: 'location-simple',
            }}
          >
            <MenuItem value='any'><em>Any</em></MenuItem>
            <MenuItem value='Ivy Court'>Ivy Court</MenuItem>
            <MenuItem value='Bowling Green'>Bowling Green</MenuItem>
            <MenuItem value='Library Lawn'>Library Lawn</MenuItem>
            <MenuItem value='Hall'>Hall</MenuItem>
          </Select>
        </ListItem>
          {
            this.state.filtered.map(data => Item(this.props, data, this.changeSelected, this.state.selected))
          }
        </List>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Schedule);