import React from 'react';
import ReactDOM from 'react-dom';
import css from './index.css';
import App from './App';

// DON'T REMOVE THE CSS NO MATTER WHAT VS CODE SAYS :S

const applicationServerPublicKey = 'BNe5S6jSHCP2aHh1og9OYj-i_PnLOBEAw3WLiXWx7v-sx1nR_sqTXxMYga2dzlDl8T7u5VyNLx2UyAt7VmMDGsE';
let swRegistration;
let isSubscribed;
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  console.log("Web App?");
});

function initUser() {
  if (isSubscribed) {
    console.log("Sub?");
  } else {
    subscribeUser();
  }
  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
      isSubscribed = !(subscription === null);

      // Save to the AWS database 
      saveSubscription(subscription);

      if (isSubscribed) {
        console.log('User IS subscribed.');
      } else {
        console.log('User is NOT subscribed.');
      }
  });
}

const requestNotificationPermission = async () => {
  console.log("Awaiting....");
  const permission = await window.Notification.requestPermission();
  console.log("Done...");
  if(permission !== 'granted'){
      throw new Error('Permission not granted for Notification');
  }
}

const subscribeUser = () => {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(async function(subscription) {
    console.log('User is subscribed.');
    saveSubscription(subscription);
    isSubscribed = true;
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err, err.message);
  });
}

const saveSubscription = async subscription => {
  if (subscription) {
    console.log(JSON.stringify(subscription))
    const SERVER_URL = "https://3sx80dpay9.execute-api.eu-west-2.amazonaws.com/testing"
    fetch(SERVER_URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    }).then(response => {
      console.log(response);
      return response.json();
    })
  } else {
    console.log("Not yet subscribed");
  }
}

async function main() {
  if ('serviceWorker' in navigator) {
    console.log('Service Worker and Push is supported');

    navigator.serviceWorker.register('sw.js')
    .then(async function(swReg) {
      console.log('Service Worker is registered', swReg);

      swRegistration = swReg;
      await requestNotificationPermission();
      initUser();
    })
    .catch(function(error) {
      console.error('Service Worker Error', error);
    });
  } else {
    console.warn('Push messaging is not supported');
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
main();

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


