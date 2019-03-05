// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const saveSubscription = async subscription => {
  const SERVER_URL = 'http://localhost:3000/save-subscription'
  const response = await fetch(SERVER_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  })
  console.log(response.json)
  return response.json()
}

self.addEventListener('push', function(event) {
  if (event.data) {
    showLocalNotification("Pembroke May Ball 2019", event.data.text(), self.registration)
  } else {
    console.log('Push event but no data')
  }
})

const showLocalNotification = (title, body, swRegistration) => {
  const options = {
    body
    // here you can add more properties like icon, image, vibrate, etc.
  };
  swRegistration.showNotification(title, options);
};

self.addEventListener('activate', async () => {
  // This will be called only once when the service worker is activated.
  try {
    const applicationServerKey = urlB64ToUint8Array(
      'BNe5S6jSHCP2aHh1og9OYj-i_PnLOBEAw3WLiXWx7v-sx1nR_sqTXxMYga2dzlDl8T7u5VyNLx2UyAt7VmMDGsE'
    )
    const options = { applicationServerKey, userVisibleOnly: true }
    const subscription = await self.registration.pushManager.subscribe(options)
    const response = await saveSubscription(subscription);
    console.log("Sub: ", JSON.stringify(subscription))
    console.log(response);
  } catch (err) {
    console.log('Error', err)
  }
})