export function saveDoc(content) {
  console.log("hej");
  return fetch("http://localhost:3000/users/saveDoc", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(content),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      //localStorage.setItem("keyDocs", JSON.stringify(result));
      return result;
    });
}

export function edit(obj) {
  document.querySelector(".main-content").innerHTML = "";
  console.log(obj);
  let editTamplate = `

    <div class="doc">
    <h2>Edit Document</h2>
    <div class="doc-input">
   
      <div class="doc-wrapper">
      <form>
      <input type="hidden" id="refId" value="${obj[0].doc_id}" />
      <input type="hidden" id="action" value="update" />
        <input
          type="text"
          id="doc-title"
          value="${obj[0].doc_title}"
        />
        <textarea
          id="doc-content"
         rows="5">
         ${obj[0].doc_content}
        </textarea>
        <button id="save-edit-btn" class="btn" type="button">
          <span><i class="fas fa-plus"></i></span>
          Save Edits
        </button>
        </form>
      </div>
    </div>
  </div>
    
    `;
  document
    .querySelector(".main-content")
    .insertAdjacentHTML("beforeend", editTamplate);

  tinymce.remove();

  tinymce.init({
    selector: "#doc-content",
    setup: function (editor) {
      editor.on("change", function () {
        editor.save();
      });
    },
  });
}
