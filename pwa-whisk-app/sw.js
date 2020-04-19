const staticCacheName = "site-static-v2";

// assets to cache
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/styles.css",
  "/css/materialize.min.css",
  "/img/dish.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
];

// listen for 'install' event
self.addEventListener("install", (event) => {
  //console.log("service worker has been installed");
  // Wait until caching is done
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

// listen for 'activate' event
self.addEventListener("activate", (event) => {
  //console.log("service worker has been activated");
  // Delete old cached assets
  event.waitUntil(
    caches.keys().then((keys) => {
      //console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// listen for 'fetch' event
self.addEventListener("fetch", (event) => {
  //console.log("fetch event", event);
  //Intercept request and fetch assets from cache
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return cacheRes || fetch(event.request); //If asset is not present in cache, allow browser to continue fetching
    })
  );
});
