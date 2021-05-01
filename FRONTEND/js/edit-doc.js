export function edit(obj) {
  document.querySelector(".main-content").innerHTML = "";

  let editTamplate = `

    <div class="doc">
    <h2>Create new Document</h2>
    <div class="doc-input">
      <div class="doc-wrapper">
        <input
          type="text"
          id="doc-title"
          value="${obj[0].title}"
        />
        <textarea
          id="doc-content"
          value="${obj[1].content}"
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
    .insertAdjacentHTML("beforeend", editTamplate);
}
