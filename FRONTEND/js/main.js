console.log("hej");

// ---- IMPORT JS -----//
import { getUser } from "/FRONTEND/js/login.js";

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
