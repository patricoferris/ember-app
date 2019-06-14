import React from 'react';
import { List, ListItem, ListItemText, MenuItem, InputLabel, Select } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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

function Item(props, data) {
  const { classes } = props;
  return (
    <ListItem key={data.scheduleId} alignItems="flex-start" divider >
        <ListItemText
          primary={data.name}
          secondary={
            <React.Fragment>
              From {dateToTime(data.start)} until {dateToTime(data.end)} - &nbsp;
              {data.location}
            </React.Fragment>
          }
        />
      </ListItem>
  );
}

class FoodAndDrink extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      food: [    
        {name: "Jack's Gelato", start: "2019-06-19T22:30:00Z", end: "2019-06-20T02:00:00Z", location: 'Old Court'},
        {name: "Mr Bakey's Cupcakes", start: "2019-06-19T21:00:00Z", end: "2019-06-20T06:00:00Z", location: 'Old Court'},
        {name: "Wine, Port and Cheese", start: "2019-06-19T23:00:00Z", end: "2019-06-20T05:00:00Z", location: 'Ivy Court'},
        {name: "Los Churros Amigos", start: "2019-06-19T21:00:00Z", end: "2019-06-20T00:30:00Z", location: 'Ivy Court'},
        {name: "Mr Bakey's Cupcakes", start: "2019-06-19T21:00:00Z", end: "2019-06-20T06:00:00Z", location: 'Hall'},
        {name: "Sticks 'n' Sushi", start: "2019-06-19T23:00:00Z", end: "2019-06-20T00:30:00Z", location: 'New Court'},
        {name: "Aromi Donuts", start: "2019-06-20T00:00:00Z", end: "2019-06-20T02:30:00Z", location: 'New Court'},
        {name: "Aromi Fried Pizza", start: "2019-06-19T21:45:00Z", end: "2019-06-20T00:45:00Z", location: 'New Court'},
        {name: "Anna Mae's Mac 'n' Cheese", start: "2019-06-19T21:00:00Z", end: "2019-06-19T23:00:00Z", location: 'Foundress'},
        {name: "Wildefeast Pork Burgers", start: "2019-06-19T21:00:00Z", end: "2019-06-19T23:30:00Z", location: 'Foundress'},
        {name: "Wildefeast Halloumi Burgers", start: "2019-06-19T23:30:00Z", end: "2019-06-20T02:00:00Z", location: 'Foundress'},
        {name: "Wildefeast Ostrich Kebabs", start: "2019-06-20T00:30:00Z", end: "2019-06-20T02:30:00Z", location: 'Foundress'},
        {name: "Wildefeast Bacon Sandwiches", start: "2019-06-20T03:00:00Z", end: "2019-06-20T05:30:00Z", location: 'Foundress'},
        {name: "Pick 'n' Mix", start: "2019-06-19T21:00:00Z", end: "2019-06-20T05:00:00Z", location: 'Fellow\'s Garden'},
        {name: "Beyroots Mezze", start: "2019-06-19T21:00:00Z", end: "2019-06-20T00:00:00Z", location: 'Fellow\'s Garden'},
        {name: "Mr Bakey's Cupcakes", start: "2019-06-19T21:00:00Z", end: "2019-06-20T06:00:00Z", location: 'Library Lawn'},
        {name: "Chocolate Fountain", start: "2019-06-19T23:00:00Z", end: "2019-06-20T02:30:00Z", location: 'Library Lawn'},
        {name: "Hot Desserts Bar", start: "2019-06-20T01:00:00Z", end: "2019-06-20T03:00:00Z", location: 'Library Lawn'},
        {name: "Dessert Corner", start: "2019-06-19T21:00:00Z", end: "2019-06-20T05:00:00Z", location: 'Red Buildings Lawn'},
        {name: "Crucial Cuisine Thai Curry", start: "2019-06-19T21:00:00Z", end: "2019-06-19T23:30:00Z", location: 'Red Buildings Lawn'},
        {name: "Caffe Mobile", start: "2019-06-20T01:00:00Z", end: "2019-06-20T05:00:00Z", location: 'Red Buildings Lawn'},
        {name: "Crucial Cuisine Sweet Potato Fries", start: "2019-06-20T01:30:00Z", end: "2019-06-20T06:00:00Z", location: 'Red Buildings Lawn'},
        {name: "Truly Crumptious Crumpets", start: "2019-06-20T02:30:00Z", end: "2019-06-20T04:30:00Z", location: 'Red Buildings Lawn'},
        {name: "Crucial Cuisine Breakfast Wraps", start: "2019-06-20T03:30:00Z", end: "2019-06-20T06:00:00Z", location: 'Red Buildings Lawn'},
      ], 
      drink: [
        {name: "Old Fashioned Cocktails", start: "2019-06-19T21:00:00Z", end: "2019-06-20T05:00:00Z", location: 'Old Court'},
        {name: "Champagne", start: "2019-06-19T21:00:00Z", end: "2019-06-19T22:00:00Z", location: 'Old Court'},
        {name: "Beer Tent", start: "2019-06-19T21:00:00Z", end: "2019-06-20T05:00:00Z", location: 'Ivy Court'},
        {name: "Wine Bar", start: "2019-06-19T21:00:00Z", end: "2019-06-20T05:00:00Z", location: 'Hall'},
        {name: "VK Bar", start: "2019-06-20T00:00:00Z", end: "2019-06-20T05:00:00Z", location: 'Orchard'},
        {name: "Tea and Coffee", start: "2019-06-20T00:00:00Z", end: "2019-06-20T05:00:00Z", location: 'Juniour Parlour'},
        {name: "Cocktail Box", start: "2019-06-19T21:00:00Z", end: "2019-06-20T05:00:00Z", location: 'New Court'},
        {name: "Main Bar", start: "2019-06-19T21:00:00Z", end: "2019-06-20T05:00:00Z", location: 'Bowling Green'},
        {name: "G&T Bar", start: "2019-06-19T21:00:00Z", end: "2019-06-20T05:00:00Z", location: 'Foundress'},
        {name: "Cocktail Bar", start: "2019-06-19T21:00:00Z", end: "2019-06-20T05:00:00Z", location: 'Library Lawn'},
        {name: "Tequila Shots", start: "2019-06-19T22:00:00Z", end: "2019-06-19T23:00:00Z", location: 'Library Lawn'},
        {name: "Jägerbombs", start: "2019-06-19T23:00:00Z", end: "2019-06-20T00:00:00Z", location: 'Library Lawn'},
      ],
      typeFilter: 'any',
      filtered: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
  }

  applyFilter(filter) {
    let newFiltered;
    if (filter === 'any') {
      newFiltered = this.state.food.concat(this.state.drink);
    } else if (filter === 'food') {
        newFiltered = this.state.food;
    } else {
        newFiltered = this.state.drink;
    }
    newFiltered.sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
    this.setState({
      filtered: newFiltered
    })
  }

  handleChange(event) {
    this.setState({
      typeFilter: event.target.value
    });
    console.log(event.target);
    this.applyFilter(event.target.value);
  }

  componentDidMount() {
    this.applyFilter('any');
  }

  render() {
    return (
      <List className={'list-class'} style={{height: '100%', overflow: 'auto'}}>
      <ListItem>
          <InputLabel style={{paddingRight: '10px'}} htmlFor="type-simple">Filter</InputLabel>
          <Select
            value={this.state.typeFilter}
            style={{minWidth: '100px'}}
            onChange={this.handleChange}
            inputProps={{
              name: 'type',
              id: 'type-simple',
            }}
          >
            <MenuItem value='any'><em>Both</em></MenuItem>
            <MenuItem value='food'>Food</MenuItem>
            <MenuItem value='drink'>Drink</MenuItem>
          </Select>
        </ListItem>
        {
          this.state.filtered.map(data => Item(this.props, data))
        }
      </List>
    );
  }
}

export default withStyles(styles)(FoodAndDrink);