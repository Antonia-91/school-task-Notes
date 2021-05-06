// ---- IMPORT JS -----//
import { start } from "/FRONTEND/js/start.js";
import { getUser } from "/FRONTEND/js/login.js";
import { printList, getAllDocs } from "/FRONTEND/js/all-docs.js";
import { createNewDoc, saveNewDoc } from "/FRONTEND/js/new-doc.js";
import { docItem, getDoc } from "/FRONTEND/js/doc-item.js";
import { edit, saveDoc } from "/FRONTEND/js/edit-doc.js";
import { deleteDoc, sucessDeleted } from "/FRONTEND/js/delete.js";

// --- Nav bar media (max-width: 800px) ---//

const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];

toggleButton.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
});

// -----  GLOBAL VARIABLES ------ //
// userLoggedIn hämtar från LS. Om vi loggar in med en användare, kommer vi hämta den användare från LS... För att kunna ställa rätt frågr till Backend och få tillbaka rätt data..
let userLoggedIn = JSON.parse(localStorage.getItem("keyUser"));
console.log(userLoggedIn);

//-------------- EVENTLISTENERS --------------- //
window.addEventListener("load", () => {
  updateNavBar(); //Function som printar olika vievs beroende på om vi är inloggade eller inte..
  start();
});

//--------------  GLOBAL EVENTLISTENERS --------------- //
window.addEventListener("click", (e) => {
  // show header
  if (e.target.matches(".brand-title")) {
    start();
  }

  // LOGIN
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

  //  SHOW CREATE NEW DOCUMENT
  if (e.target.matches("#new-doc")) {
    //console.log("newDoc");
    // Hämta från LS för att få tillgång till User-Id i DOM-Tamplate
    let user = localStorage.getItem("keyUser");
    console.log(user);
    createNewDoc(user);
  }

  // SAVE NEW DOCUMENT
  if (e.target.matches("#save-doc-btn")) {
    //console.log("saveDoc");
    let user = JSON.parse(localStorage.getItem("keyUser"));
    let refId = user[0].person_id;

    console.log(user);
    let title = document.querySelector("#doc-title");
    let content = document.querySelector("#doc-content");
    let action = document.querySelector("#action");

    //skapa det object som jag vill skicka i min body till Backend
    if (title.value.trim() != "" && content.value.trim() != "") {
      let newDocument = {
        title: title.value.trim(),
        content: content.value.trim(),
        refId: refId,
        action: action.value, // kommer i BE kolla om action.value = new or update
      };
      console.log(newDocument);
      saveNewDoc(newDocument).then(() => {
        //redirect to all docs
        let user = JSON.parse(localStorage.getItem("keyUser"));
        let userId = user[0].person_id;
        getAllDocs(userId);
        let docs = JSON.parse(localStorage.getItem("keyDocs"));
        printList(docs);
      });
    }
  }

  //SHOW EDIT DOCUMENT
  // för att prina rätt innehåll i textArea, måste jag hämta det från LS
  // när jag sen roppar på funktion som ska prita DOM så kan jag sätta value texarea = LS object.
  if (e.target.matches("#edit-btn")) {
    let myDocument = JSON.parse(localStorage.getItem("keyDoc"));
    edit(myDocument);
    console.log("click");
  }

  // SAVE EDIT document
  // hämtar värden som jag vill skicka med i min body till BE
  if (e.target.matches("#save-edit-btn")) {
    console.log("saveDoc");
    let user = JSON.parse(localStorage.getItem("keyUser"));
    let doc_author = user[0].person_id;
    let doc = JSON.parse(localStorage.getItem("keyDoc"));
    let doc_id = doc[0].doc_id;

    console.log(user);
    let title = document.querySelector("#doc-title");
    let content = document.querySelector("#doc-content");
    let action = document.querySelector("#action");

    if (title.value.trim() != "" && content.value.trim() != "") {
      let newDocument = {
        title: title.value.trim(),
        content: content.value.trim(),
        refId: doc_author,
        action: action.value,
        doc_id: doc_id,
      };
      //console.log(newDocument);

      let current_docId = JSON.parse(localStorage.getItem("keyDoc"))[0].doc_id;

      //loopa igenom alla docs i LS. väljt ut det som matchar med "current_docId ". Det document som matchar, ta deras värden och spara i "newDocument" object.
      let allDocs = JSON.parse(localStorage.getItem("keyDocs"));
      allDocs.forEach((d) => {
        if (d.doc_id === current_docId) {
          d.doc_title = newDocument.title;
          d.doc_content = newDocument.content;
        }
        // sätt tillbaka och spara i LS igen
        localStorage.setItem("keyDoc", JSON.stringify(d));
      });
      //  sätt tillbaka och spara i LS igen
      localStorage.setItem("keyDocs", JSON.stringify(allDocs)),
        console.log(allDocs);

      // nu kan vi anropa functionen som fetchar och skicka in det nya objectet "newDocument"
      saveDoc(newDocument).then(() => {
        let docs = JSON.parse(localStorage.getItem("keyDocs"));
        printList(docs);
      });
    }
  }

  // SHOW LIST OF ALL DOCS
  // hämtar inloggad användare från LS, för att skicka med den som id till BE och få tilbaka document från just den användaren.
  if (e.target.matches("#all-doc")) {
    let user = JSON.parse(localStorage.getItem("keyUser"));
    let userId = user[0].person_id;

    // anropa funktionen som fetchar
    getAllDocs(userId).then(() => {
      // hämta docs från LS, anropa function som printar.
      let docs = JSON.parse(localStorage.getItem("keyDocs"));
      printList(docs);
    });
  }

  // SHOW CLICKED LIST-ITEM
  if (e.target.matches("#doc-list > li")) {
    let docId = e.target.id;
    //console.log(e.target.id);
    // anropa function som fetchar. Resultatet av fetchen setts i LS "keyDoc"....  Hämta sedan från LS och anvndänd objectet i nästa function som ska prina..
    getDoc(docId).then(() => {
      let myDocument = JSON.parse(localStorage.getItem("keyDoc"));
      docItem(myDocument);
    });
  }

  // DELETE DOCUMENT
  //hämta documentnet från LS, skcika med som id i min fetch.
  // när jag tar emot min fetch kör jag en ls.removeItem
  if (e.target.matches("#delete-btn")) {
    let myDocument = JSON.parse(localStorage.getItem("keyDoc"));
    //let docId = e.target.id;
    deleteDoc(myDocument).then(() => {
      sucessDeleted();
    });
  }

  // LOGOUT
  // när jag loggar ut kommer LS att tömmas och min Navbar att uppdateras.
  if (e.target.matches("#logOut-btn")) {
    console.log("logout");
    localStorage.clear();
    userLoggedIn = null;
    updateNavBar();
    start();
  }
});

// ---- DOM functions----- //
function updateNavBar() {
  let navbar = document.querySelector(".navbar-links > ul");
  let liTamplate = "";
  console.log("print login nav");

  // Om vi är inloggade/Ls inte är = null
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
