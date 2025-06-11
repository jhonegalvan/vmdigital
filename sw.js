const CACHE_NAME = 'vm-digital-v2';
const urlsToCache = [
  '/',
  'https://jhonegalvan.github.io/vmdigital/index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js',
  'https://i0001.clarodrive.com/s/fjZLZWjMwJ6DsMo/download/style.css',
  'https://i0001.clarodrive.com/s/T4bS79aGrFR5YTN/download/lunaradio-animado.js',
  'https://i0001.clarodrive.com/s/bYCHBzdn8NDPrE8/download/adlogo.png',
  'https://i0001.clarodrive.com/s/YMZzNbEAgg5iXHE/download/fallback.php'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
