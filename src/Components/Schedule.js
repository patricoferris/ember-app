import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const testData = [
  {
    title: 'Super Awesome Event 1',
    location: 'Location TBD',
    description: 'Super awesome mega cool thing that\'s happening somewhere!'
  },
  {
    title: 'Super Awesome Event 2',
    location: 'Computer Lab',
    description: 'Nothing fun happening here'
  },
  {
    title: 'Super Awesome Event 3',
    location: 'The Moon',
    description: 'Once in a lifetime - no return trip'
  },
  {
    title: 'Super Awesome Event 1',
    location: 'Location TBD',
    description: 'Super awesome mega cool thing that\'s happening somewhere!'
  },
  {
    title: 'Super Awesome Event 2',
    location: 'Computer Lab',
    description: 'Nothing fun happening here'
  },
  {
    title: 'Super Awesome Event 3',
    location: 'The Moon',
    description: 'Once in a lifetime - no return trip'
  },
  {
    title: 'Super Awesome Event 1',
    location: 'Location TBD',
    description: 'Super awesome mega cool thing that\'s happening somewhere!'
  },
  {
    title: 'Super Awesome Event 2',
    location: 'Computer Lab',
    description: 'Nothing fun happening here'
  },
  {
    title: 'Super Awesome Event 3',
    location: 'The Moon',
    description: 'Once in a lifetime - no return trip'
  },
  {
    title: 'Super Awesome Event 1',
    location: 'Location TBD',
    description: 'Super awesome mega cool thing that\'s happening somewhere!'
  },
  {
    title: 'Super Awesome Event 2',
    location: 'Computer Lab',
    description: 'Nothing fun happening here'
  },
  {
    title: 'Super Awesome Event 3',
    location: 'The Moon',
    description: 'Once in a lifetime - no return trip'
  },
]

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

function Item(props, data) {
  const { classes } = props;
  return (
    <ListItem alignItems="flex-start" divider>
        <ListItemText
          primary={data.title}
          secondary={
            <React.Fragment>
              <Typography component="span" className={classes.inline} color="textPrimary">
                {data.location} - &nbsp;
              </Typography>
              {data.description}
            </React.Fragment>
          }
        />
      </ListItem>
  );
}

class Schedule extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <List style={{height: '100%', overflow: 'auto'}}>
        {
          testData.map(data => Item(this.props, data))
        }
      </List>
    )
  }
}

export default withStyles(styles)(Schedule);