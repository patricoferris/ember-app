import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { Collapse } from '@material-ui/core';
import NotificationOn from '@material-ui/icons/NotificationsActive'
import NotificationOff from '@material-ui/icons/NotificationsOff';
import CircularProgress from '@material-ui/core/CircularProgress';
// import NotificationOff from '@material-ui/icons/Notifcations';

const SCHEDULE_ENDPOINT = 'https://3sx80dpay9.execute-api.eu-west-2.amazonaws.com/testing/getSchedule';
const SUBSCRIPTION_ENDPOINT = 'https://3sx80dpay9.execute-api.eu-west-2.amazonaws.com/testing/update-subscription';
let loading = false;

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

function saveStateToDb(id) {
  // Get old value first 
  let open = indexedDB.open('subscriptions', 1);
  open.onerror = (event) => console.log('Error on db opening...')
  open.onsuccess = (event) => {
    let db = open.result;
    console.log(db);
    let tx = db.transaction(["subs"], "readwrite")
    let store = tx.objectStore("subs");
    let get = store.get(id);
    get.onsuccess = (event) => {
      store.put({scheduleId: id, subscribed: !event.target.result.subscribed});
    }
    return tx.complete;
  }
}

function Item(props, data, func, updateSubs, selected, subscribed, loading, clicked) {
  const { classes } = props;
  console.log(loading);
  return (
    <ListItem key={data.scheduleId} alignItems="flex-start" divider >
        <ListItemText
          primary={data.name}
          onClick={() => func(data.scheduleId)}
          secondary={
            <React.Fragment>
              {data.location} - &nbsp;
              {dateToTime(data.date)}
              <Collapse in={selected === data.scheduleId}>
                {data.description}
              </Collapse>
            </React.Fragment>
          }
        />
        { "PushManager" in window ? 
              loading && data.scheduleId === clicked ? <div><CircularProgress/></div>: 
              subscribed ? <NotificationOn onClick={(event) => updateSubs(event, data.scheduleId)} style={{ marginLeft: '7px' }}/> :
              <NotificationOff onClick={(event) => updateSubs(event, data.scheduleId)} style={{ marginLeft: '7px' }}/>
              : undefined}
      </ListItem>
  );
}

class Schedule extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      schedule: [],
      filtered: [],
      subscribed: [],
      loading: false,
      clicked: 0,
      typeFilter: 'any',
      locationFilter: 'any',
      selected: 3,
    }

    this.getSchedule = this.getSchedule.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.updateSubscribedState = this.updateSubscribedState.bind(this);
    this.updateSubscriptions = this.updateSubscriptions.bind(this);
  }

  updateSubscribedState() {
    let open = indexedDB.open('subscriptions', 1);
    open.onerror = (event) => console.log('Error on db opening...')
    open.onsuccess = (event) => {
      let db = open.result;
      let tx = db.transaction(["subs"], "readwrite")
      let store = tx.objectStore("subs");
      let data = store.getAll();
      data.onsuccess = (event) => { 
        let arr = event.target.result;
        this.setState({
          subscribed: arr
        });
      }
      return tx.complete;
    }
  }


async updateSubscriptions(event, id) {
  this.setState({
    clicked: id,
    loading: true
  });
  let navigation = await navigator.serviceWorker.getRegistration();
  let subs = await navigation.pushManager.getSubscription();
  let sub = {pushUrl: subs.endpoint, scheduleId: id};
  fetch(SUBSCRIPTION_ENDPOINT, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sub),
  }).then(response => {
    if (response.status === 200) {
      console.log("Success");
      saveStateToDb(id);
      this.updateSubscribedState();
    }
    this.setState({loading: false});
    return response.json();
  })
}

  getSubscriptionFor(arr, scheduleId) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].scheduleId === scheduleId) {
        return arr[i].subscribed;
      }
    }
    return false;
  }

  componentDidMount() {
    this.updateSubscribedState();
  }

  async componentWillMount() {
    this.getSchedule();
    let dbPromise = indexedDB.open('subscriptions', 1);
    dbPromise.onerror = (event) => console.error("Error", event);
    dbPromise.onsuccess = (event) => console.log("Success", event);
    dbPromise.onupgradeneeded = function(event) {
      console.log(event, "UPDATING");
      let db = event.target.result;
      if (!db.objectStoreNames.contains('subs')) {
        let objStore = db.createObjectStore('subs', {keyPath: 'scheduleId'});
        console.log(objStore);
        objStore.createIndex("subscribed", "subscribed", { unique: false });
        for (let i = 3; i <= 27; i++) {
          objStore.put({scheduleId: i, subscribed: false});
        }
      }
    }
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
    this.updateSubscribedState();
    let newValue = value === this.state.selected ? -1 : value;
    this.setState({
      selected: newValue
    })
  }

  applyFilter(filter, typeCheck) {
    let newFiltered = this.state.schedule.filter((data) => {
      if (typeCheck) {
        return ((filter === 'any') || data.type === filter) && ((this.state.locationFilter === 'any') || data.location.includes(this.state.locationFilter));
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
            this.state.filtered.map(data => Item(this.props, data, this.changeSelected, this.updateSubscriptions, this.state.selected, this.getSubscriptionFor(this.state.subscribed, data.scheduleId), this.state.loading, this.state.clicked))
          }
        </List>
    )
  }
}

export default withStyles(styles)(Schedule);