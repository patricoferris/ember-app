import React from 'react';
import ReactDOM from 'react-dom';
import css from './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const applicationServerPublicKey = 'BNe5S6jSHCP2aHh1og9OYj-i_PnLOBEAw3WLiXWx7v-sx1nR_sqTXxMYga2dzlDl8T7u5VyNLx2UyAt7VmMDGsE';

const check = () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('No Service Worker support!')
  }
  if (!('PushManager' in window)) {
    throw new Error('No Push API Support!')
  }
}

const registerServiceWorker = async () => {
  console.log("registering...")
  const swRegistration = await navigator.serviceWorker.register('sw.js')
  return swRegistration
}

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission()
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.
  if (permission !== 'granted') {
    throw new Error('Permission not granted for Notification')
  }
}
const main = async () => {
  check()
  const swRegistration = await registerServiceWorker()
  const permission = await requestNotificationPermission()
}

ReactDOM.render(<App />, document.getElementById('root'));

main();

//serviceWorker.register();


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


