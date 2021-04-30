console.log("hej");

// ---- IMPORT JS -----//
import { getUser } from "/FRONTEND/js/login.js";
import { printList } from "/FRONTEND/js/allDocs.js";
import { createNewDoc } from "/FRONTEND/js/newDoc.js";
import { header } from "/FRONTEND/js/header.js";
import { docItem } from "/FRONTEND/js/doc-item.js";

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
    let userName = document.querySelector("#userName");
    let loginPassword = document.querySelector("#loginPassword");

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
    }
  }

  // show list of all docs
  if (e.target.matches("#all-doc")) {
    console.log("AllDoc");
    printList();
  }

  // show dot-Item
  //let ulChild = document.querySelector("#all-doc > li");
  if (e.target.matches("#doc-list")) {
    console.log("li-click");
  }
});

// ---- DOM functions----- //
function updateNavBar() {
  let navbar = document.querySelector(".navbar-links > ul");

  console.log("print login nav");

  if (userLoggedIn) {
    let liTamplate = `
    <li id="logOut-btn">LogOut</li>
    <li id="all-doc">All Documents</li>
    <li id="new-doc">New Document</li>
    
    `;
  } else {
    let liTamplate = `
    <li>
    <input type="text" id="login-input" placeholder="userName" />
  </li>
  <li>
    <input type="password" id="password-input" placeholder="password" />
  </li>
  <li id="login-btn">Login</li>
    `;
  }
}
