const CACHE_NAME = 'natpac-kerala-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Background sync for trip data
self.addEventListener('sync', (event) => {
  if (event.tag === 'trip-sync') {
    event.waitUntil(syncTripData());
  }
});

async function syncTripData() {
  // Sync logic for offline trip data
  console.log('Syncing trip data...');
}

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    tag: 'kerala-travel-update'
  };

  event.waitUntil(
    self.registration.showNotification('NATPAC Kerala', options)
  );
});