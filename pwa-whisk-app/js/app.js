//Check if browser supports service workers
if ("serviceWorker" in navigator) {
  //register service worker
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => {
      console.log("Service worker registered", reg);
    })
    .catch((err) => {
      console.log("Service worker not registered", err);
    });
}
