import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

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

function Item(props, data) {
  const { classes } = props;
  return (
    <ListItem key={data.scheduleId} alignItems="flex-start" divider>
        <ListItemText
          primary={data.name}
          secondary={
            <React.Fragment>
              <Typography component="span" className={classes.inline} color="textPrimary">
                {data.location} - &nbsp;
              </Typography>
              {data.description} - &nbsp; {dateToTime(data.date)}
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
      schedule: []
    }

    this.getSchedule = this.getSchedule.bind(this);
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
    })
  }


  render() {
    const { classes } = this.props;
    return (
      <List className={'list-class'} style={{height: '100%', overflow: 'auto'}}>
        {
          this.state.schedule.map(data => Item(this.props, data))
        }
      </List>
    )
  }
}

export default withStyles(styles)(Schedule);