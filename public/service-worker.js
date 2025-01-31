self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('salario-adecco-v0').then((cache) => {
      return cache.addAll([
        '/salario-adecco',
        '/salario-adecco/index.html',
        '/salario-adecco/manifest.json',
        '/salario-adecco/adecco.png',
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).then((response) => {
          return caches.open('salario-adecco-v0').then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
