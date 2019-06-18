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

class Music extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      thanksList : [
        {name: "The Master, Lord Smith of Finsbury"}, 
        {name: "The Fellows of Pembroke College"},
        {name: "Dan Tucker"},
        {name: "Becky Coombs"},
        {name: "Andrew Cates"},
        {name: "James Gardom"},
        {name: "Loraine Gelsthorpe"},
        {name: "Andrew Enticknap"},
        {name: "Nick McBride"},
        {name: "Sue Squire"},
        {name: "Karen Lain"},
        {name: "Gordon Murray and the Pembroke Porters"},
        {name: "Nina Rhodes, Seb Little, Savino Cafagna and the Catering Department"},
        {name: "Robert Griggs and the Maintenance Department"},
        {name: "Nicholas Firman and the Pembroke Gardeners"},
        {name: "Kevin Arrowsmith and the Housekeeping Department"},
        {name: "Cambridge City Council"},
        {name: "Cambridge Community Scrapstore"},
        {name: "The Structural Sculptures Society"},
        {name: "Amy Teh"}
      ],
      committeeList: [
        {name: 'ARAN MACFARLANE', role: 'President', email: 'presidents@pembrokemayball.co.uk'},
        {name: 'MRINANK SHARMA', role: 'President', email: 'presidents@pembrokemayball.co.uk'},
        {name: 'MILLY PARRY', role: 'Vice President', email: 'vp@pembrokemayball.co.uk'},
        {name: 'OWEN JACK', role: 'Secretary', email: 'secretary@pembrokemayball.co.uk'},
        {name: 'CONOR DIAMOND', role: 'Treasurer', email: 'treasurer@pembrokemayball.co.uk'},
        {name: 'DANA OUTCALT', role: 'Infrastructure', email: 'infrastructure@pembrokemayball.co.uk'},
        {name: 'AARON GOLDBERG', role: 'Music', email: 'music@pembrokemayball.co.uk'},
        {name: 'LUCY D’URSO', role: 'Food', email: 'food@pembrokemayball.co.uk'},
        {name: 'JENNIFER WOOD', role: 'Drink', email: 'drink@pembrokemayball.co.uk'},
        {name: 'VERNER VIISAINEN', role: 'Sustainability', email: 'sustainability@pembrokemayball.co.uk'},
        {name: 'MARGAUX SPRIET', role: 'Staffing', email: 'staffing@pembrokemayball.co.uk'},
        {name: 'DANIEL HART', role: 'Staffing', email: 'staffing@pembrokemayball.co.uk'},
        {name: 'PATRICK FERRIS', role: 'Webmaster', email: 'tech@pembrokemayball.co.uk'},
        {name: 'MOHAMMED DAUDALI', role: 'Ticketing', email: 'ticketing@pembrokemayball.co.uk'},
        {name: 'AMANDA IGLESIAS', role: 'Design & Decor', email: 'decor@pembrokemayball.co.uk'},
        {name: 'JESSIE WELLINGTON', role: 'Decor', email: 'decor@pembrokemayball.co.uk'},
        {name: 'ISABELLA CHATTERTON-DANIELS', role: 'Decor', email: 'decor@pembrokemayball.co.uk'}
      ]
    }
  }

  render() {
    return (
      <List className={'list-class'} style={{height: '100%', overflow: 'auto'}}>
      <ListItem style={{fontWeight: '700', textAlign: 'center'}}>
          <ListItemText
            primary={'The Pembroke May Ball Committee would like to formally thank the following people for their support to make this year\'s May Ball possible'}>
          </ListItemText>
        </ListItem>
        {this.state.thanksList.map(person => {
        return (
          <ListItem style={{textAlign: 'center'}}>
            <ListItemText
              secondary={person.name}>
            </ListItemText>
          </ListItem>)
          })
        }
        <ListItem style={{fontWeight: '700', textAlign: 'center'}}>
          <ListItemText
            primary={'The Pembroke May Ball Committee 2019'}>
          </ListItemText>
        </ListItem>
        {this.state.committeeList.map(person => {
        return (
          <ListItem style={{textAlign: 'center'}}>
            <ListItemText
              secondary={
                <React.Fragment>
                  {person.name} - <em>{person.role}</em>
                </React.Fragment>
              }>
            </ListItemText>
          </ListItem>)
          })
        }
      </List>
    )
  }
}
export default withStyles(styles)(Music);