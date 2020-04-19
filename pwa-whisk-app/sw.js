// listen for 'install' event
self.addEventListener("install", () => {
  console.log("service worker has been installed");
});

// listen for 'activate' event
self.addEventListener("activate", () => {
  console.log("service worker has been activated");
});

// listen for 'fetch' event
self.addEventListener("fetch", (event) => {
  console.log("fetch event", event);
});
