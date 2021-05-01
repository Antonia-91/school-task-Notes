//https://www.youtube.com/watch?v=unrmB4H7Wmw&t=135s&ab_channel=ZinoTrustTutorials

export function saveNewDoc() {
  return fetch("http://localhost:3000/users/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("KeyDocuments", JSON.stringify(data));
      return data;
    });
}

export function createNewDoc() {
  document.querySelector(".main-content").innerHTML = "";

  let tamplate = `
  <div class="doc">
  <h2>Create new Document</h2>
  <div class="doc-input">
    <div class="doc-wrapper">
      <input
        type="text"
        id="doc-title"
        placeholder="Title of your document"
      />
      <textarea
        id="doc-content"
        placeholder="Write your content here...."
        rows="5"
      ></textarea>
      <button id="save-doc-btn" class="btn" type="button">
        <span><i class="fas fa-plus"></i></span>
        Save Document
      </button>
    </div>
  </div>
</div>
    `;

  document
    .querySelector(".main-content")
    .insertAdjacentHTML("beforeend", tamplate);
}

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
