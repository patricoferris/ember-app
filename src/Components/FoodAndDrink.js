import React from 'react';
import { List, ListItem, ListItemText, MenuItem, InputLabel, Select, Collapse } from '@material-ui/core';
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
  justify: {
    textAlign: 'justify'
  }
});

function dateToTime(date) {
  const regex = /T\d\d:\d\d/g;
  let arr = date.match(regex);
  return arr[0].slice(1);
}

function Item(props, data, func, selected) {
  const { classes } = props;
  return (
    <ListItem key={data.scheduleId} alignItems="flex-start" divider >
        <ListItemText
          primary={data.name}
          onClick={() => func(data.id)}
          secondary={
            <React.Fragment>
              <em>From {dateToTime(data.start)} until {dateToTime(data.end)} - {data.location} - {data.diet} &nbsp;</em>
              <Collapse in={selected === data.id}>
                <div style={{textAlign: 'justify'}}>
                  {data.description}
                </div>
              </Collapse>
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
        {id: 1, name: "Jack's Gelato", start: "2019-06-19T22:30:00Z", end: "2019-06-20T02:00:00Z", diet: 'V + VV + GF', location: 'Old Court'},
        {id: 2, name: "Mr Bakey's Cupcakes", start: "2019-06-19T21:00:00Z", end: "2019-06-20T06:00:00Z", diet: 'V + VV', location: 'Old Court, Hall, Library Lawn', 
         description: "These freshly-baked cupcakes, macarons and cake pops are the perfect sweet-treats to pick you up as the night wears on."},
        {id: 3, name: "Los Churros Amigos", start: "2019-06-19T21:00:00Z", end: "2019-06-20T00:30:00Z", diet: 'V + VV', location: 'Ivy Court', 
         description: "Los Churros Amigos have brought their signature Spanish street food treat all the way from Oxford. Complete with chocolate dipping sauce, their churros are not to be missed."},
        {id: 5, name: "Sticks 'n' Sushi", start: "2019-06-19T23:00:00Z", end: "2019-06-20T00:30:00Z", diet: 'V + VV + GF', location: 'New Court', 
         description: "Coming to Pembroke for the very first time, Sticks’n’Sushi are here to provide a range of their decadent sushi options."},
        {id: 6, name: "Aromi Donuts", start: "2019-06-20T00:00:00Z", end: "2019-06-20T02:30:00Z", diet: 'V + VV', location: 'New Court', 
         description: 'Fresh donuts dusted with sugar, served by one of Cambridge’s best-loved restaurants. What more could you ask for?'},
        {id: 7, name: "Aromi Fried Pizza", start: "2019-06-19T21:45:00Z", end: "2019-06-20T00:45:00Z", diet: 'V + VV', location: 'New Court', 
         description: "Everyone's May Ball favourite is back to offer a new take on their classic Sicilian pizzas. Try these fluffy, fried dough bases topped with fresh ingredients and you'll appreciate pizza in a whole new way. There will also be two types of Arancini Balls!"},
        {id: 8, name: "Anna Mae's Mac 'n' Cheese", start: "2019-06-19T21:00:00Z", end: "2019-06-19T23:00:00Z", diet: 'V', location: 'Foundress', 
         description: "Back by popular demand, Anna Mae’s are serving up hearty portions of their American-style mac’n’cheese. Try it before it’s all gone!"},
        {id: 9, name: "Wildefeast Pork Burgers", start: "2019-06-19T21:00:00Z", end: "2019-06-19T23:30:00Z", location: 'Foundress', 
         description: "Wildefeast's incredible Ibero Pork burgers, infused with subtle notes of apple and served in a fluffy bun, truly change the burger game."},
        {id: 10, name: "Wildefeast Halloumi Burgers", start: "2019-06-19T23:30:00Z", end: "2019-06-20T02:00:00Z", diet: 'V + GF', location: 'Foundress',
         description: "Not a fan of the pork? Wildefeast are serving up halloumi burgers with a chilli and garlic mayonnaise created especially for Pembroke May Ball."},
        {id: 11, name: "Wildefeast Ostrich Kebabs", start: "2019-06-20T00:30:00Z", end: "2019-06-20T02:30:00Z", diet: 'GF', location: 'Foundress', 
         description: "Feeling adventurous? Try one of Wildefeast’s amazing ostrich kebab skewers. This tender meat along with smoky peppers and onions will satisfy a late-night craving you never knew you had."},
        {id: 12, name: "Wildefeast Bacon Sandwiches", start: "2019-06-20T03:00:00Z", end: "2019-06-20T05:30:00Z", location: 'Foundress', 
         description: "Start your morning right with one of Wildefeast’s bacon sandwiches."},
        {id: 13, name: "Pick 'n' Mix", start: "2019-06-19T21:00:00Z", end: "2019-06-20T05:00:00Z", diet: 'V + VV', location: 'Fellow\'s Garden', 
         description: "Cola bottles, sour cherries, strawberry laces ... the choice is yours!"},
        {id: 14, name: "Beyroots Mezze", start: "2019-06-19T21:00:00Z", end: "2019-06-20T00:00:00Z", diet: 'V + VV + GF', location: 'Fellow\'s Garden', 
         description: "Grab one of these incredible pots filled with couscous, falafel, halloumi, and salad, and enjoy the refined taste of Lebanon."},
        {id: 16, name: "Chocolate Fountain", start: "2019-06-19T23:00:00Z", end: "2019-06-20T02:30:00Z", location: 'Library Lawn', 
         description: "With a wide array of dipping options from fresh fruit to chocolate brownies, you really will be spoilt for choice with this dessert."},
        {id: 17, name: "Hot Desserts Bar", start: "2019-06-20T01:00:00Z", end: "2019-06-20T03:00:00Z", diet: 'V + GF', location: 'Library Lawn', 
         description: "Think Pick’N’Mix, but for hot desserts. Try either a hot chocolate brownie, treacle sponge or panettone with sauces and toppings of your choice."},
        {id: 18, name: "Dessert Corner", start: "2019-06-19T21:00:00Z", end: "2019-06-20T05:00:00Z", location: 'Foundress', 
         description: "If you have a sweet tooth, you must try the delicious range of milkshakes from Dessert Corner; pick from Vanilla, Aero Mint, or Oreo and just ask for Baileys if you want to make it boozy."},
        {id: 19, name: "Crucial Cuisine Thai Curry", start: "2019-06-19T21:00:00Z", end: "2019-06-19T23:30:00Z", diet: 'V + VV + GF', location: 'Red Buildings Lawn', 
         description: "Start your night off with a kick with a serving of Crucial’s Thai Red Curry. Chicken and vegetable options are available, and it really will tickle every palette."},
        {id: 20, name: "Crucial Cuisine Sweet Potato Fries", start: "2019-06-20T01:30:00Z", end: "2019-06-20T06:00:00Z", diet: 'V + VV + GF', location: 'Red Buildings Lawn', 
         description: "Starting to feel tired? Pick up a helping of sweet potato fries to give you the second wind you need to make it till dawn."},
        {id: 21, name: "Truly Crumptious Crumpets", start: "2019-06-20T02:30:00Z", end: "2019-06-20T04:30:00Z", diet: 'V + VV', location: 'Red Buildings Lawn', 
         description: "As well as serving festival-goers at this year’s Glastonbury Festival, Truly Crumptious are bringing their delicious, homemade crumpets to Pembroke this year. Choose from sweet or savoury toppings."},
        {id: 22, name: "Crucial Cuisine Breakfast Wraps", start: "2019-06-20T03:30:00Z", end: "2019-06-20T06:00:00Z", diet: 'V + VV', location: 'Red Buildings Lawn', 
         description: "Head on over to the Red Buildings lawn to try this amazing early-morning combination. Sausage, egg and hash brown are all available."},
      ], 
      drink: [
        {id: 23, name: "Old Fashioned Cocktails", start: "2019-06-19T21:00:00Z", end: "2019-06-20T05:00:00Z", location: 'Old Court',
         description: "Pick up a delicious Old Fashioned as you test out your best poker face in the casino room."},
        {id: 24, name: "Champagne", start: "2019-06-19T21:00:00Z", end: "2019-06-19T22:00:00Z", location: 'Old Court', 
         description: "Come celebrate the beginning of this spectacular evening by raising a glass of bubbly or fresh juice as dusk begins to fall over Pembroke."},
        {id: 25, name: "Beer Tent", start: "2019-06-19T21:00:00Z", end: "2019-06-20T05:00:00Z", location: 'Ivy Court', 
         description: "Choose from a selection of Adnams Brewery's most popular cask ales perfect for all beer lovers."},
        {id: 26, name: "Wine Bar", start: "2019-06-19T21:00:00Z", end: "2019-06-20T05:00:00Z", location: 'Hall', 
         description: "Enjoy an extensive range of delicious wines accompanying the nightlong entertainment in our gorgeous Hall."},
        {id: 27, name: "VK Bar", start: "2019-06-20T00:00:00Z", end: "2019-06-20T05:00:00Z", location: 'Orchard', 
         description: "The silent disco is home to a favourite beverage among students ― the VK. Pick your favourite flavour and dance the night away."},
        {id: 28, name: "Tea and Coffee", start: "2019-06-20T00:00:00Z", end: "2019-06-20T05:00:00Z", location: 'Juniour Parlour', description: "Relax and recharge with a tea or coffee in the Junior Parlour."},
        {id: 29, name: "Cocktail Box", start: "2019-06-19T21:00:00Z", end: "2019-06-20T05:00:00Z", location: 'New Court', 
         description: "Cocktail Box is a Pembroke College favourite. Their team of professional mixologists are passionate about the importance of exceptionally high quality, innovative drinks. Pick from an elderflower spring collins, classic mojito, lychee martini, or espresso martini."},
        {id: 30, name: "Main Bar", start: "2019-06-19T21:00:00Z", end: "2019-06-20T05:00:00Z", location: 'Bowling Green', 
         description: "Under our large marquee, you'll find classic spirits and mixers, white wine, red wine, and non-alcoholic drinks. The nearby seating area makes this a perfect pit-stop for those in need of a breather."},
        {id: 31, name: "G&T Bar", start: "2019-06-19T21:00:00Z", end: "2019-06-20T05:00:00Z", location: 'Foundress', 
         description: "A designated bar for all G&T (and mocktail) lovers, including a range of unique and delicious tonic flavours from FeverTree."},
        {id: 32, name: "Cocktail Bar", start: "2019-06-19T21:00:00Z", end: "2019-06-20T05:00:00Z", location: 'Library Lawn', 
         description: "This cocktail bar caters to all tastes. Choose from summery Pimm's and sparkling rosé, dark and stormy cocktails, fruity Berrylicious, or a selection of mocktails."},
        {id: 33, name: "Tequila Shots", start: "2019-06-19T22:00:00Z", end: "2019-06-19T23:00:00Z", location: 'Library Lawn', 
        description: "For those who take life with a grain of salt, a slice of lime, and a shot of tequila. Served at the Cocktail Bar."},
        {id: 34, name: "Jägerbombs", start: "2019-06-19T23:00:00Z", end: "2019-06-20T00:00:00Z", location: 'Library Lawn', 
        description: "The unforgettable Jägermeister and energy drink mix is an alcoholic alternative to coffee for those struggling to make it to dawn! Served at the Cocktail Bar."},
        {id: 35, name: "Wine, Port and Cheese", start: "2019-06-19T23:00:00Z", end: "2019-06-20T05:00:00Z", diet: 'V + GF', location: 'Ivy Court', 
         description: "Pair your choice of wine or port with our delicious array of cheeses, crackers, and fresh fruits."},
        {id: 36, name: "Caffe Mobile", start: "2019-06-20T01:00:00Z", end: "2019-06-20T05:00:00Z", location: 'Red Buildings Lawn', 
        description: "Caffe Mobile is widely recognised as providing the tastiest coffee and tea in town. Look out for their quirky, tricolore ‘Piaggio Ape’ thatwill keep you going."},
      ],
      selected: 1,
      typeFilter: 'any',
      filtered: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
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

  changeSelected(value) {
    //this.updateSubscribedState();
    let newValue = value === this.state.selected ? -1 : value;
    this.setState({
      selected: newValue
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
          this.state.filtered.map(data => Item(this.props, data, this.changeSelected, this.state.selected))
        }
      </List>
    );
  }
}

export default withStyles(styles)(FoodAndDrink);