var CACHE_NAME = 'transitApp-cache-v1';
var urlsToCache = [
    '/',
    '/index.html',
    '/app.css',
    '/app.js',
    '/data/test.json',
    '/home/home.html',
    '/home/home.js',
    '/bower_components/angular/angular.js',
    '/bower_components/angular-route/angular-route.js'
];


/*cache array, used for checking if cache should be removed, in case of changing cache version*/
var allCaches = [
    CACHE_NAME
];


/*install listener, initiates storing locally static cache*/
self.addEventListener('install', function(event) {
    // Perform install steps
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
  console.log('d')
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
