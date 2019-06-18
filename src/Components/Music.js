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
      ]
    }
  }

  render() {
    return (
      <List className={'list-class'} style={{height: '100%', overflow: 'auto'}}>
        {this.state.thanksList.map(person => {
        return (
          <ListItem style={{textAlign: 'center'}}>
            <ListItemText
              primary={person.name}>
            </ListItemText>
          </ListItem>)
          })
        }
      </List>
    )
  }
}
export default withStyles(styles)(Music);