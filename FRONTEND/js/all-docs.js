export function getAllDocs(id) {
  return fetch(`http://localhost:3000/users/documents/${id}`)
    .then((res) => res.json())
    .then((docs) => {
      //console.log(docs);
      localStorage.setItem("keyDocs", JSON.stringify(docs));
      return docs;
    })
    .catch((err) => console.log(err));
}

export function printList(docs) {
  document.querySelector(".main-content").innerHTML = "";
  //console.log(docs);

  let listTamplate = `
    <div class="document-container">
    <h2>ALL DOCUMENTS</h2>
    <ul class="all-doc" id="doc-list">
    
   ${docs.map((item, index) => {
     console.log(item.timeStamp);
     return ` <li id="${item.doc_id}"> ${item.doc_title} |  ${item.timeStamp} </li>`;
   })}
   </ul>
  </div>
    `;
  //console.log(listTamplate);
  document
    .querySelector(".main-content")
    .insertAdjacentHTML("beforeend", listTamplate);
}
