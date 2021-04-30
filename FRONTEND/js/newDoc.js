//https://www.youtube.com/watch?v=unrmB4H7Wmw&t=135s&ab_channel=ZinoTrustTutorials

// let saveDoc = document.getElementById("save-doc-btn");
// let docTitle = document.getElementById("doc-title");
// let docContent = document.getElementById("doc-content");

// let notesObj = [];

// saveDoc.addEventListener("click", (e) => {
//   if (docTitle.value == "" || docContent.value == "") {
//     return alert("pleace add title and content");
//   }

//   let notes = localStorage.getItem("notes");
//   if (notes == null) {
//     notesObj = [];
//   } else {
//     notesObj = JSON.parse(notes);
//   }

//   let myObj = {
//     title: docTitle.value,
//     content: docContent.value,
//   };
//   notesObj.push(myObj);
//   localStorage.setItem("notes", JSON.stringify(notesObj));

//   docTitle.value = "";
//   docContent.value = "";
// });
