// offline data
db.enablePersistence().catch((error) => {
  if (error.code === "Failed-precondition") {
    // probably multiple tabs opened
    console.log("Persistence failed");
  } else if (error.code === "unimplemented") {
    // lack of browser support
    console.log("Persistence not available");
  }
});

// real-time listener
db.collection("recipes").onSnapshot((snapshot) => {
  //console.log(snapshot.docChanges());
  snapshot.docChanges().forEach((change) => {
    //console.log(change, change.doc.data(), change.doc.id);
    if (change.type === "added") {
      // add the document data to the webpage
      renderRecipe(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
      //remove the document data from the webpage
    }
  });
});
