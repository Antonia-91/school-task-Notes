// // Import TinyMCE
// import tinymce from "/FRONTEND/node_modules/tinymce/tinymce.js";

// // Default icons are required for TinyMCE 5.3 or above
// import "/FRONTEND/node_modules/tinymce/icons/default";

// // A theme is also required
// import "/FRONTEND/node_modules/tinymce/themes/silver";

// // Any plugins you want to use has to be imported
// import "/FRONTEND/node_modules/tinymce/plugins/paste";
// import "/FRONTEND/node_modules/tinymce/plugins/link";

// // Initialize the app
// tinymce.init({
//   selector: "#doc-content",
//   plugins: ["paste", "link"],
// });

// ---- IMPORT JS -----//
import { getUser } from "/FRONTEND/js/login.js";
import { printList, getAllDocs } from "/FRONTEND/js/all-docs.js";
import { createNewDoc, saveNewDoc } from "/FRONTEND/js/new-doc.js";
import { header } from "/FRONTEND/js/header.js";
import { docItem, getDoc } from "/FRONTEND/js/doc-item.js";
import { edit } from "/FRONTEND/js/edit-doc.js";
import { deleteDoc } from "/FRONTEND/js/delete.js";
//import { tinymce } from "/FRONTEND/js/edit-doc.js";

// --- Nav bar media (max-width: 800px) ---//

const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];

toggleButton.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
});

// -----  GLOBAL VARIABLES ------ //
let userLoggedIn = JSON.parse(localStorage.getItem("keyUser"));
console.log(userLoggedIn);

//-------------- EVENTLISTENERS --------------- //
window.addEventListener("load", () => {
  updateNavBar();
  createNewDoc();
});

//--------------  GLOBAL EVENTLISTENERS --------------- //
window.addEventListener("click", (e) => {
  // show header
  if (e.target.matches(".brand-title")) {
    console.log("header");
    header();
  }

  // login
  if (e.target.matches("#login-btn")) {
    console.log("click");
    let userName = document.querySelector("#login-input");
    let loginPassword = document.querySelector("#password-input");

    if (userName.value.trim() != "" && loginPassword.value.trim() != "") {
      let loginUser = {
        userName: userName.value.trim(),
        password: loginPassword.value.trim(),
      };
      //function that fetch user getUser(loginUser).then(user)
      getUser(loginUser).then((user) => {
        userLoggedIn = user;
        updateNavBar();
      });
    }
  }

  // Show create new Doc
  if (e.target.matches("#new-doc")) {
    console.log("newDoc");
    createNewDoc();
  }

  // save new document
  if (e.target.matches("#save-doc-btn")) {
    console.log("saveDoc");
    let title = document.querySelector("#doc-title");
    let content = document.querySelector("#doc-content");

    if (title.value.trim() != "" && content.value.trim() != "") {
      let newDocument = {
        title: title.value.trim(),
        content: content.value.trim(),
      };
      console.log(newDocument);
      saveNewDoc(newDocument);
    }
  }

  // show list of all docs
  if (e.target.matches("#all-doc")) {
    console.log("AllDoc");
    let user = JSON.parse(localStorage.getItem("keyUser"));
    let userId = user[0].person_id;

    getAllDocs(userId);
    let docs = JSON.parse(localStorage.getItem("keyDocs"));
    printList(docs);
  }

  // show doc-Item // OBS HUR FÅNGAR JAG EN LI MED ETT DYNAMISKT ID ?
  //let ulChild = document.querySelector("#all-doc > li");
  if (e.target.matches("#doc-list > li")) {
    let docId = e.target.id;
    //console.log(e.target.id);
    getDoc(docId);
    let myDocument = JSON.parse(localStorage.getItem("keyDoc"));
    docItem(myDocument);
  }

  // Edit Document
  if (e.target.matches("#edit-btn")) {
    let myDocument = JSON.parse(localStorage.getItem("keyDoc"));
    edit(myDocument);
    console.log("click");
  }

  // Delete document
  if (e.target.matches("#delete-btn")) {
    console.log("dele");
    let myDocument = JSON.parse(localStorage.getItem("keyDoc"));
    //let docId = e.target.id;
    deleteDoc(myDocument);
  }
});

// ---- DOM functions----- //
function updateNavBar() {
  let navbar = document.querySelector(".navbar-links > ul");
  let liTamplate = "";
  console.log("print login nav");

  if (userLoggedIn) {
    liTamplate = `
    <li id="logOut-btn">LogOut</li>
    <li id="all-doc">All Documents</li>
    <li id="new-doc">New Document</li>
    `;
  } else {
    console.log("not");
    liTamplate = `
    
    <li>
    <input type="text" id="login-input" placeholder="userName" />
  </li>
  <li>
    <input type="password" id="password-input" placeholder="password" />
  </li>
  <li id="login-btn">Login</li>
    `;
  }

  navbar.innerHTML = liTamplate;
}
