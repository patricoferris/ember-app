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

// An array of acceptable images to cache
const image_whitelist = [
  '/18/131158/86351.png',
  '/18/131159/86350.png',
  '/18/131159/86351.png',
  '/18/131158/86350.png',
]

self.addEventListener('activate', function (event) {
    event.waitUntil(self.clients.claim());
});

// Fetch request Caching
self.addEventListener('fetch', event => { 
  
  const cacheVersion = 'v1';
  const cacheName = `pemball-cache-${cacheVersion}`;
  
  event.respondWith(
    caches.open(cacheName).then(cache => {
      return cache.match(event.request).then(response => {
        if (response) {
          return response
        }
        console.log("Caching...", response);
        return fetch(event.request).then(networkResponse => {
          if (event.request.url.includes('.png')) {
            console.log('Maybe adding this to the cache ', event.request.url);
            if (image_whitelist.includes(event.request.url.split('org')[1])) {
              cache.put(event.request, networkResponse.clone());
            }
          } else {
            console.log(event.request.url, ' adding this to cache')
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      })
    })
  )
}) 

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
