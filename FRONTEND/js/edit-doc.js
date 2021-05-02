export function edit(obj) {
  document.querySelector(".main-content").innerHTML = "";
  console.log(obj);
  let editTamplate = `

    <div class="doc">
    <h2>Edit Document</h2>
    <div class="doc-input">
   
      <div class="doc-wrapper">
      <form>
        <input
          type="text"
          id="doc-title"
          value="${obj[0].doc_title}"
        />
        <textarea
          id="doc-content"
         rows="5">${obj[0].doc_content}
        </textarea>
        <button id="save-doc-btn" class="btn" type="button">
          <span><i class="fas fa-plus"></i></span>
          Save Document
        </button>
        </form>
      </div>
    </div>
  </div>
    
    `;
  document
    .querySelector(".main-content")
    .insertAdjacentHTML("beforeend", editTamplate);
}
