var CACHE_NAME = 'transitApp-cache-v1';
var urlsToCache = [
    '/',
    '/index.html',
    '/app.css',
    '/app.js',
    '/data/stations.json',
    '/home/home.html',
    '/home/home.js',
    '/bower_components/angular/angular.js',
    '/bower_components/angular-route/angular-route.js'
];


var allCaches = [
    CACHE_NAME
];


self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener('activate',  function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url)
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
