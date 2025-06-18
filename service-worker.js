self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('anime-todo-v1').then(cache => {
      return cache.addAll([
        '/',
        'index.html',
        'style.css',
        'app.js',
        'manifest.json',
        'icon-192.png',
        'icon-512.png',
        'bell.mp3',
        'anime-dog.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
