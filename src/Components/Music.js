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
        {name: 'ISABELLA CHATTERTON-DANIELS', role: 'Decor', email: 'decor@pembrokemayball.co.uk'},
        {name: '', role: '', email: ''},
      ]
    }
  }

  render() {
    return (
      <List className={'list-class'} style={{height: '100%', overflow: 'auto'}}>
        <ListItem style={{fontWeight: '700', textAlign: 'center'}}>
          <ListItemText
            primary={"This year, Pembroke May Ball raised more money for charity than ever before (over £3,000) through Fast Track tickets, name changes, and opt-out donations on all standard tickets. This money will go towards supporting the following charities:"}>
          </ListItemText>
        </ListItem>
        <ListItem style={{fontWeight: '700', textAlign: 'center'}}>
          <ListItemText
              primary={"COOL EARTH"}
              secondary={
                <React.Fragment>
                  <p style={{textAlign: 'center'}}>
                    Cool Earth is a UK based international NGO that dedicates its work
                    to protecting rainforest communities, halt deforestation and climate
                    change. Their work is endorsed by the likes of David Attenborough
                    and in 2015 they won the ‘Charity of the Year’ Award in the
                    Environment and Conservation category. Cool Earth was also the
                    chosen charity this year for Pembroke’s Junior and Graduate Parlours.
                  </p>
                </React.Fragment>
              }>
          </ListItemText>
        </ListItem>
        <ListItem style={{fontWeight: '700', textAlign: 'center'}}>
          <ListItemText
              primary={"FOOD CYCLE CAMBRIDGE"}
              secondary={
                <React.Fragment>
                  <p style={{textAlign: 'center'}}>
                    Food Cycle Cambridge is the local branch of the national charity that
                    takes expired food and turns it into communal sit-down meals for
                    those that are in need. In 2010, Food Cycle was named New Charity of
                    the Year by Charity Times Awards. The communal meals are entirely
                    run by volunteers so we urge all our guest to sign up to volunteer and
                    see the difference you can make in your local community.
                  </p>
                </React.Fragment>
              }>
          </ListItemText>
        </ListItem>
        <ListItem style={{fontWeight: '700', textAlign: 'center'}} divider>
          <ListItemText
              primary={"ANTHONY NOLAN"}
              secondary={
                <React.Fragment>
                  <p style={{textAlign: 'center'}}>
                    Anthony Nolan is a UK charity that focuses on tackling blood cancers
                    and blood disorders of all forms. It does this by actively managing
                    and recruiting to a register of over 700,000 potential donors, who
                    could all potentially be the life saving match for patient in need of
                    a stem cell transplant. We urge all our guests to join their stem cell
                    register as you could you be one they are desperately looking for.
                  </p>
                </React.Fragment>
              }>
          </ListItemText>
        </ListItem>
        <ListItem style={{fontWeight: '700', textAlign: 'center'}}>
          <ListItemText
            primary={'The Pembroke May Ball Committee would like to formally thank the following people for their support to make this year\'s May Ball possible.'}>
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