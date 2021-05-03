// ---- IMPORT JS -----//
import { getUser } from "/FRONTEND/js/login.js";
import { printList, getAllDocs } from "/FRONTEND/js/all-docs.js";
import { createNewDoc, saveNewDoc } from "/FRONTEND/js/new-doc.js";
import { header } from "/FRONTEND/js/header.js";
import { docItem, getDoc } from "/FRONTEND/js/doc-item.js";
import { edit, saveDoc } from "/FRONTEND/js/edit-doc.js";
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
  header();
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
    let user = localStorage.getItem("keyUser");
    console.log(user);
    createNewDoc(user);
  }

  // save new document
  if (e.target.matches("#save-doc-btn")) {
    console.log("saveDoc");
    let user = JSON.parse(localStorage.getItem("keyUser"));
    let refId = user[0].person_id;

    console.log(user);
    let title = document.querySelector("#doc-title");
    let content = document.querySelector("#doc-content");
    let action = document.querySelector("#action");

    if (title.value.trim() != "" && content.value.trim() != "") {
      let newDocument = {
        title: title.value.trim(),
        content: content.value.trim(),
        refId: refId,
        action: action.value,
      };
      console.log(newDocument);
      saveNewDoc(newDocument);

      //redirect to all docs ?
      let user = JSON.parse(localStorage.getItem("keyUser"));
      let userId = user[0].person_id;
      getAllDocs(userId);
      let docs = JSON.parse(localStorage.getItem("keyDocs"));
      printList(docs);
    }
  }

  // show Edit Document
  if (e.target.matches("#edit-btn")) {
    let myDocument = JSON.parse(localStorage.getItem("keyDoc"));
    edit(myDocument);
    console.log("click");
  }
  // save EDIT document
  if (e.target.matches("#save-edit-btn")) {
    console.log("saveDoc");
    let user = JSON.parse(localStorage.getItem("keyUser"));
    let refId = user[0].person_id;

    console.log(user);
    let title = document.querySelector("#doc-title");
    let content = document.querySelector("#doc-content");
    let action = document.querySelector("#action");

    if (title.value.trim() != "" && content.value.trim() != "") {
      let newDocument = {
        title: title.value.trim(),
        content: content.value.trim(),
        refId: refId,
        action: action.value,
      };
      console.log(newDocument);
      saveDoc(newDocument);

      //redirect to all docs ?
      let user = JSON.parse(localStorage.getItem("keyUser"));
      let userId = user[0].person_id;
      getAllDocs(userId);
      let docs = JSON.parse(localStorage.getItem("keyDocs"));
      printList(docs);
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

  // show clicked doc-Item
  if (e.target.matches("#doc-list > li")) {
    let docId = e.target.id;
    //console.log(e.target.id);
    getDoc(docId);
    let myDocument = JSON.parse(localStorage.getItem("keyDoc"));
    docItem(myDocument);
  }

  // Delete document
  if (e.target.matches("#delete-btn")) {
    console.log("dele");
    let myDocument = JSON.parse(localStorage.getItem("keyDoc"));
    //let docId = e.target.id;
    deleteDoc(myDocument);
  }

  // logout
  if (e.target.matches("#logOut-btn")) {
    console.log("logout");
    localStorage.clear();
    userLoggedIn = null;
    updateNavBar();
    header();
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
