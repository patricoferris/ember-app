import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core'
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

class Waste extends React.Component {

  render() {
    return (
      <List className={'list-class'} style={{height: '100%', overflow: 'auto'}}>
      <ListItem divider>
          <ListItemText
            primary={
              <React.Fragment>
                Pembroke May Ball Waste Guide
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <p style={{textAlign: 'justify'}}>In order to minimise waste we kindly ask you to do your part by only taking what you are able to finish and not leaving any
                    unnecessary food and drink waste behind. You are always able to go back for a second serving later. </p>
                <p style={{textAlign: 'justify'}}>We also encourage you to hold onto your cup and reuse it where possible to either get served with another drink from the bar or to
                    help yourself to some drinking water from the water stations provided. </p>
                <p style={{textAlign: 'justify'}}>Please place all your waste at the ‘Sorting Table’ of the waste stations that are located in each main outdoor area of the May
                    Ball. There, your waste is correctly sorted into the appropriate colour-coordinated bins by the trained members of staff.</p>
                <p style={{textAlign: 'justify'}}>Smaller waste stations are available in the indoor areas of the Ball. In these you will find four colour-coordinated bins into
              which you are asked to sort your waste following the instructions provided:</p>
              </React.Fragment>
            }>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText
            primary={'LIQUIDS BIN - GREY'}
            secondary={
              <React.Fragment>
                <p style={{textAlign: 'justify'}}><em>All left-over liquids and contents from supplied drinks including liquids, ice and garnish</em></p>
              </React.Fragment>
            }>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText
            primary={'RECYCLING BIN - BLUE'}
            secondary={
              <React.Fragment>
                <p style={{textAlign: 'justify'}}><em>All drink related items except hot drink cups including plastic cups (all types), plastic bottles and aluminum cans</em></p>
              </React.Fragment>
            }>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText
            primary={'COMPOST BIN - GREEN'}
            secondary={
              <React.Fragment>
                <p style={{textAlign: 'justify'}}><em>All food related items except cutlery and sticks including leftover food, food containers/plates and napkins</em></p>
              </React.Fragment>
            }>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText
            primary={'GENERAL WASTE - BLACK'}
            secondary={
              <React.Fragment>
                <p style={{textAlign: 'justify'}}><em>All other waste not mentioned above including wooden cutlery, wooden sticks and hot drink cups</em></p>
              </React.Fragment>
            }>
          </ListItemText>
        </ListItem>
       </List>
    )
  }
}
export default withStyles(styles)(Waste);