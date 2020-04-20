const staticCacheName = "site-static-v2";
const dynamicCacheName = "site-dynamic-v1";

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
  "/pages/fallback.html",
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
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
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
    //Attempt to fetch resource from cache
    caches
      .match(event.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(event.request).then((fetchResponse) => {
            //If asset is not present in cache, allow browser to continue fetching
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(event.request.url, fetchResponse.clone());
              return fetchResponse;
            });
          })
        );
      })
      .catch(() => {
        //Return fallback page only for assets requested with .html
        if (event.request.url.indexOf(".html") > -1) {
          return caches.match("/pages/fallback.html");
        }
      })
  );
});
