export function getAllDocs() {
  return fetch()
    .then((res) => res.json())
    .then((docs) => {
      console.log(docs);
      return users;
    })
    .catch((err) => console.log(err));
}

export function printList() {
  document.querySelector(".main-content").innerHTML = "";

  let listTamplate = `
    <div class="document-container">
    <h2>ALL DOCUMENTS</h2>
    <ul class="all-doc" id="doc-list">
      <li>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
        velit consectetur numquam.
      </li>
      <li>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
        velit consectetur numquam.
      </li>
      <li>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
        velit consectetur numquam.
      </li>
      <li>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
        velit consectetur numquam.
      </li>
      <li>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
        velit consectetur numquam.
      </li>
    </ul>
  </div>
    `;

  document
    .querySelector(".main-content")
    .insertAdjacentHTML("beforeend", listTamplate);
}
