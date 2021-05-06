export function deleteDoc(obj) {
  console.log(obj);
  let docId = `${obj[0].doc_id}`;

  return fetch(`http://localhost:3000/users/deleteDoc/${docId}`)
    .then((res) => res.json())
    .then((doc) => {
      console.log(doc, "deleted");

      localStorage.removeItem("keyDoc");
      //return doc;
    })
    .catch((err) => console.log(err));
}

export function sucessDeleted() {
  document.querySelector(".main-content").innerHTML = "";

  let Tamplate = `

<h2>Your document has deleted...</h2>
  
  `;

  document
    .querySelector(".main-content")
    .insertAdjacentHTML("beforeend", Tamplate);
}
