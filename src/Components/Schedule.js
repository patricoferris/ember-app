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
      backup: [
        {
           "scheduleId": 3,
           "date": "2019-06-19T21:00:00Z",
           "description": "Head on down to the Bowling Green ASAP in order to catch CUJO,\nCambridge’s number one big band, as they open our main stage. This\nawesome and incredibly talented group of musicians have worked\nwith some of the biggest global names in jazz and have toured\nthroughout Europe. You’ll be certain to want to jive along to swinging\nMingus classics or immerse yourself in the exciting jazzy sounds of\nmore modern arrangements.",
           "location": "Main Stage - Bowling Green",
           "name": "CUJO",
           "type": "music"
        },
        {
           "scheduleId": 4,
           "date": "2019-06-19T22:30:00Z",
           "description": "Good vibes galore! Hailing from East London, Barney’s combination\nof jazzy notes and 90s era boom bap hip hop provides an irresistible\ngroove-oozing sound that has been immensely highly praised and\nreviewed. Having heavily collaborated with musicians including Tom\nMisch and Loyle Carner, his deep lyrics, potent hooks and charismatic\nstage presence are certainly not to be missed!",
           "location": "Main Stage - Bowling Green",
           "name": "Barney Artist",
           "type": "music"
        },
        {
           "scheduleId": 5,
           "date": "2019-06-19T23:45:00Z",
           "description": "We hope you are all super excited to turn up for RAYE, the current\nand future star from Croydon headlining the main stage! Expect\nthe absolute best of dance-pop and R&B as she captivates with her\nvibrant vocals. You’ll need to whip out your best dance moves as she\n\nperforms her own booming and scintillating songs, as well as chart-\ntopping bangers that she has produced alongside the likes of Jax Jones\n\nand David Guetta.",
           "location": "Main Stage - Bowling Green",
           "name": "Raye",
           "type": "music"
        },
        {
           "scheduleId": 6,
           "date": "2019-06-20T01:00:00Z",
           "description": "Pembroke alumnus and indie-pop/folk sensation Kieran Daly takes\nto the main stage along with his enchanting band. Not only have we\nmissed seeing him in the library, but having released a number of new\nsingles and performed to a packed crowd in Kings Cross earlier this\nyear, we are delighted that Kieran will be entertaining us all with his\ncatchy choruses, rocking riffs and vocal harmonies.",
           "location": "Main Stage - Bowling Green",
           "name": "Kieran Daly",
           "type": "music"
        },
        {
           "scheduleId": 7,
           "date": "2019-06-20T02:30:00Z",
           "description": "Is that the real Freddie Mercury and Brian May?! Let everything go\nas you sing along at the top of your lungs to everyone’s favourite\nQueen anthems as this awesome cover band rock out on the main\nstage. They’ll certainly have you screaming “Don’t Stop Me Now” as\nyou headbang along to epic rock classics!",
           "location": "Main Stage - Bowling Green",
           "name": "Rock Q Queen Tribute",
           "type": "music"
        },
        {
           "scheduleId": 8,
           "date": "2019-06-20T03:45:00Z",
           "description": "At this rate will anyone ever want to leave the main stage?! Expect\nknees-up dancing, sexy sax solos, music ranging from Beyonce to\nNew Orleans Riot Jazz and, if you’re good, crowd surfing, as May Ball\nfavourites Colonel Spanky’s groove away.",
           "location": "Main Stage - Bowling Green",
           "name": "Colonel Spanky's Love Ensemble",
           "type": "music"
        },
        {
           "scheduleId": 9,
           "date": "2019-06-20T04:50:00Z",
           "description": "Chris is a stunningly good DJ that has performed at countless\nOxbridge balls and varsity trips, who is guaranteed to wrap up the\nmain stage with an amazing closing set. You certainly will not want to\nmiss an angelic emotional end to the ball...",
           "location": "Main Stage - Bowling Green",
           "name": "Chris Williams",
           "type": "DJ"
        },
        {
           "scheduleId": 10,
           "date": "2019-06-19T22:30:00Z",
           "description": "Be delighted and enthralled by international magician Danilo and his\ncomedic magical show.",
           "location": "Second Stage - Hall",
           "name": "Alexis Arts Comedy Magic",
           "type": "comedy"
        },
        {
           "scheduleId": 11,
           "date": "2019-06-19T23:00:00Z",
           "description": "Everybody will want to groove the entire night away as this rocking,\npunchy five-piece band kickoff music action in the hall by playing\neveryone’s favourite tunes to dance along to!",
           "location": "Second Stage - Hall",
           "name": "Big Beat Manifesto",
           "type": "music"
        },
        {
           "scheduleId": 12,
           "date": "2019-06-20T00:00:00Z",
           "description": "Get ready for powerful percussion and vibrant vocals! This touring\nAfro-Brazilian Maracatu band will transform the hall with their\ncarnival samba rhythms.",
           "location": "Second Stage - Hall",
           "name": "Estrella Do Mar",
           "type": "music"
        },
        {
           "scheduleId": 13,
           "date": "2019-06-20T01:00:00Z",
           "description": "This super funky group of grads from Darwin will not let you stop\ndancing as they cover some of the greatest pop numbers.",
           "location": "Second Stage - Hall",
           "name": "Galapagogos",
           "type": "music"
        },
        {
           "scheduleId": 14,
           "date": "2019-06-20T02:00:00Z",
           "description": "The Emma Folk Band will have everyone dancing the night away! No\nexperience is required as their caller will teach you all the moves.",
           "location": "Second Stage - Hall",
           "name": "Ceilidh",
           "type": "music"
        },
        {
           "scheduleId": 15,
           "date": "2019-06-20T04:00:00Z",
           "description": "Bold brass and super singing await! This seven-piece ensemble\nproduce uber-fun and funky covers.",
           "location": "Second Stage - Hall",
           "name": "Dysfunktional",
           "type": "music"
        },
        {
           "scheduleId": 16,
           "date": "2019-06-20T04:50:00Z",
           "description": "Rounding-off entertainment in the hall, Moonflower will certainly\nnot let the groove fade away as they entice with their chilled-out funk!",
           "location": "Second Stage - Hall",
           "name": "Moonflower",
           "type": "music"
        },
        {
           "scheduleId": 17,
           "date": "2019-06-20T01:00:00Z",
           "description": "This Corpus DJ is sure to kick off the silent disco in style!",
           "location": "Silent Disco - Orchard",
           "name": "Devan Panesar",
           "type": "DJ"
        },
        {
           "scheduleId": 18,
           "date": "2019-06-20T02:00:00Z",
           "description": "You’re guaranteed to experience some real disco treasures.",
           "location": "Silent Disco - Orchard",
           "name": "Conor Diamond",
           "type": "DJ"
        },
        {
           "scheduleId": 19,
           "date": "2019-06-20T03:00:00Z",
           "description": "Come cut some shapes to some presidential bangers.",
           "location": "Silent Disco - Orchard",
           "name": "Mrinank Sharma and Charlie Crisp",
           "type": "DJ"
        },
        {
           "scheduleId": 20,
           "date": "2019-06-20T04:00:00Z",
           "description": "Having performed at Varsity Trip's opening and final parties, King’s Bunker, Cam Fashion Show launch, Avant Gardening and Playtime, Saskia will have you dancing 'til the sun comes up!",
           "location": "Silent Disco - Orchard",
           "name": "Saskia Allan",
           "type": "DJ"
        },
        {
           "scheduleId": 21,
           "date": "2019-06-19T22:00:00Z",
           "description": "Klezmer-gypsy jazz fusion is your favourite ever genre? Thought so!\nUpon donning their hats, this charismatic trio deploy their accordion,\nguitar and violin to lively effect.",
           "location": "Jazz and Comedy - Library Lawn",
           "name": "Tophats",
           "type": "music"
        },
        {
           "scheduleId": 22,
           "date": "2019-06-19T23:00:00Z",
           "description": "This majestic jazz collective master a huge range of styles. They’ll have\nyou grooving to hard bop horn solos or swaying along to melodic\nvocal numbers.",
           "location": "Jazz and Comedy - Library Lawn",
           "name": "CJ-PSB",
           "type": "music"
        },
        {
           "scheduleId": 23,
           "date": "2019-06-20T01:00:00Z",
           "description": "A selection of comedic acts",
           "location": "Jazz and Comedy - Library Lawn",
           "name": "Comedy",
           "type": "comedy"
        },
        {
           "scheduleId": 24,
           "date": "2019-06-20T02:30:00Z",
           "description": "Fancy a break from the main stage or silent disco but don’t want to\nlose the groove? Well then come listen and chill out to the exquisite\nmusicianship and dazzling original compositions of this superb jazz\nquintet.",
           "location": "Jazz and Comedy - Library Lawn",
           "name": "Minotaur",
           "type": "music"
        },
        {
           "scheduleId": 25,
           "date": "2019-06-19T21:00:00Z",
           "description": "Portuguese singer-songwriter Jos lets both his voice & guitar sing.\nHaving performed on Cambridge FM, he will captivate all those\nexploring Ivy Court with covers and with originals straight from his\ndebut album!",
           "location": "Acoustic Tent - Ivy Court",
           "name": "Jos Eckert",
           "type": "music"
        },
        {
           "scheduleId": 26,
           "date": "2019-06-19T22:00:00Z",
           "description": "This acoustic duo will dazzle with their enchanting singing and groovy\nguitar playing as they perform original arrangements and mashups of\npopular songs.",
           "location": "Acoustic Tent - Ivy Court",
           "name": "Rebecca and Reece",
           "type": "music"
        },
        {
           "scheduleId": 27,
           "date": "2019-06-19T23:00:00Z",
           "description": "Relax and chill out for a while as you become engrossed in guitarist\nRachel’s honeyed vocals.",
           "location": "Acoustic Tent - Ivy Court",
           "name": "Rachel Hill",
           "type": "music"
        },
        {
           "scheduleId": 28,
           "date": "2019-06-20T01:00:00Z",
           "description": "Cool covers and comedy-inspired compositions await as Susie\nentertains one and all with her magnificent ukulele!",
           "location": "Acoustic Tent - Ivy Court",
           "name": "Susie Dobson",
           "type": "music"
        },
        {
           "scheduleId": 29,
           "date": "2019-06-20T01:45:00Z",
           "description": "It will feel like there’s magic in the air as this trio’s alluring harmonies\nfill Ivy Court.",
           "location": "Acoustic Tent - Ivy Court",
           "name": "Rosie, Finlay and Jono",
           "type": "music"
        }
     ],
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
  }).catch(err => {
    this.setState({loading: false})
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
    // this.setState({
    //   schedule: json.Items.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    // })
    this.applyFilter('any', false);
    // fetch(SCHEDULE_ENDPOINT).then(response => {
    //   console.log("fetching...")
    //   return response.json();
    // }).then(json => {
    //   console.log(json);
    //   this.setState({
    //     schedule: json.Items.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    //   })
    //   this.applyFilter('any', false);
    // }).catch(err => {
    //   console.log(err);
    // })
  }

  changeSelected(value) {
    this.updateSubscribedState();
    let newValue = value === this.state.selected ? -1 : value;
    this.setState({
      selected: newValue
    })
  }

  applyFilter(filter, typeCheck) {
    let newFiltered = this.state.backup.filter((data) => {
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