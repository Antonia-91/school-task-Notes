export function docItem() {
  document.querySelector(".main-content").innerHTML = "";

  let docItemTamplate = `

<div class="doc-item">
        <div>
          <h3>Title</h3>
          <span>1/1/2021</span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            officiis ratione suscipit voluptates quidem corporis modi ad
            quisquam? Illo culpa tempora distinctio, ipsa deleniti neque
            cupiditate at doloribus dolore consequuntur numquam dolorum eius
            dicta minus, cum beatae eveniet optio ducimus.
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
