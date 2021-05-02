export function getDoc(id) {
  return fetch(`http://localhost:3000/users/document/${id}`)
    .then((res) => res.json())
    .then((doc) => {
      console.log(doc);
      localStorage.setItem("keyDoc", JSON.stringify(doc));
      return doc;
    })
    .catch((err) => console.log(err));
}

export function docItem(doc) {
  document.querySelector(".main-content").innerHTML = "";

  let docItemTamplate = `

<div class="doc-item">
        <div>
          <h3 id="item-title">${doc[0].doc_title}</h3>
          <span>${doc[0].timeStamp}</span>
          <p id="item-content">
          
          ${doc[0].doc_content}
          </p>
        </div>
        <div>
          <button type="button" class="btn" id="delete-btn">
            <span><i class="fas fa-trash"></i></span>
            Delete this
          </button>
          <button type="button" class="btn" id="edit-btn">
            <span><i class="fas fa-trash"></i></span>
            Edit this
          </button>
        </div>
      </div>

`;

  document
    .querySelector(".main-content")
    .insertAdjacentHTML("beforeend", docItemTamplate);
}
