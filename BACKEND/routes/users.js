var express = require("express");
var router = express.Router();
const app = require("../app");
var cors = require("cors");
router.use(cors());

const mysql = require("mysql2");
// HÄMTA

// ÄNDRA

// RADERA

/* GET users listing. */
router.get("/", function (req, res, next) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let sql = `SELECT * FROM konto `;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log("result", result);
      res.json(result);
    });
  });
});

// POST login
router.post("/login", function (req, res) {
  const { userName, password } = req.body;

  let sql = `SELECT * FROM konto WHERE userName = '${userName}' AND pass = '${password}'`;

  req.app.locals.con.connect(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.json(result);
  });
});

// // POST login
// router.post("/login", function (req, res) {
//   const { userName, password } = req.body;

//   let sql = `SELECT * FROM konto WHERE userName = '${userName}' AND pass = '${password}'`;

//   req.app.locals.con.connect(sql, function (err, result) {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);

//     let docQuery = `SELECT * FROM document WHERE doc_author = ${result[0].person_id}`;
//     req.app.locals.con.query(docQuery, function (err, docResult) {
//       if (err) {
//         console.log(err);
//       }
//       res.json(result.concat(docResult));
//     });
//   });

//   //res.send("respond with a resource");
// });

module.exports = router;