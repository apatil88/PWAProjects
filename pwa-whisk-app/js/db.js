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
      removeRecipe(change.doc.id);
    }
  });
});

// add new recipe
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value,
  };

  // Add to Firestore db
  db.collection("recipes")
    .add(recipe)
    .catch((error) => {
      console.log(error);
    });

  form.title.value = "";
  form.ingredients.value = "";
});

// delete a recipe
const recipeContainer = document.querySelector(".recipes");
recipeContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "I") {
    const id = event.target.getAttribute("data-id");
    // delete document from Firebase db
    db.collection("recipes").doc(id).delete();
  }
});
