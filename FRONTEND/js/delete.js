export function deleteDoc(obj) {
  let docId = `${obj[0].doc_id}`;

  return fetch(`http://localhost:3000/users/deleteDoc/${docId}`)
    .then((res) => res.json())
    .then((doc) => {
      console.log(doc, "deleted");

      localStorage.removeItem("keyDoc");
      //return doc;
    })
    .catch((err) => console.log(err));
}
