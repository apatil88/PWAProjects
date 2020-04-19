const staticCacheName = "site-static";

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
self.addEventListener("activate", () => {
  //console.log("service worker has been activated");
});

// listen for 'fetch' event
self.addEventListener("fetch", (event) => {
  //console.log("fetch event", event);
});
