export function saveNewDoc(content) {
  console.log("hej");
  return fetch("http://localhost:3000/users/saveDoc", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(content),
  })
    .then((res) => res.json())
    .then((content) => {
      console.log(content);
      localStorage.setItem("keyDocs", JSON.stringify(content));
      return content;
    });
}

export function createNewDoc(user) {
  document.querySelector(".main-content").innerHTML = "";

  console.log(JSON.parse(user));
  user = JSON.parse(user);

  let tamplate = `
  <div class="doc">
  <h2>Create new Document</h2>
  <div class="doc-input">
    <div class="doc-wrapper">
    <input type="hidden" id="refId" value="${user[0].person_id}" />
    <input type="hidden" id="action" value="new" />
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

  tinymce.init({
    selector: "#doc-content",
    plugins: "code",
    toolbar:
      "undo redo | styleselect bold italic | alignleft alignright | code ",
    setup: function (editor) {
      editor.on("change", function () {
        editor.save();
      });
      console.log("run tiny function ");
    },
  });
}
