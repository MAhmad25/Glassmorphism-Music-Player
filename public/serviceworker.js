const CACHE_NAME = "version-1";
const urlToCache = ["index.html", "offline.html"];

// Install Service Worker
this.addEventListener("install", (event) => {
      event.waitUntil(
            caches
                  .open(CACHE_NAME)
                  .then((cache) => {
                        console.log("Cache Opened");
                        return cache.addAll(urlToCache);
                  })
                  .catch((err) => console.log(err.message))
      );
});
// Install Service Worker
this.addEventListener("fetch", (event) => {
      event.respondWith(
            caches.match(event.request).then(() => {
                  return fetch(event.request).catch(() => caches.match("offline.html"));
            })
      );
});

// Activate the Service worker

this.addEventListener("activate", (event) => {
      const cacheWhitelist = [];
      cacheWhitelist.push(CACHE_NAME);
      event.waitUntil(
            caches.keys().then((cacheNames) =>
                  Promise.all(
                        cacheNames.map((cacheName) => {
                              if (!cacheWhitelist.includes(cacheName)) {
                                    return caches.delete(cacheName);
                              }
                        })
                  )
            )
      );
});
