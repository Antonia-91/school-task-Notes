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
  console.log(req.body);
  console.log(userName, password);

  let sql = `SELECT * FROM konto WHERE userName = '${userName}' AND pass = '${password}'`;

  req.app.locals.con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.json(result);
  });
});

/* GET ALL documents listing. */
router.get("/documents/:id", function (req, res, next) {
  const userID = req.params.id;
  console.log(userID);
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let sql = `SELECT *  FROM document WHERE doc_author = ${userID}`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log("result", result);
      res.json(result);
    });
  });
});
/*let sql = `SELECT doc_id, doc_title, timeStamp  FROM document WHERE doc_author = ${userID}`;*/

/* GET document BY ID */
router.get("/document/:id", function (req, res, next) {
  const id = req.params.id;
  console.log(id);
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let sql = `SELECT *  FROM document WHERE doc_id = ${id}`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log("result", result);
      res.json(result);
    });
  });
});

/* SAVE Doc , new or edit */
router.post("/saveDoc", function (req, res) {
  if (JSON.stringify(req.body) === "{}") {
    res
      .status(400)
      .send({ message: "Update request for updating user cannot be empty" });
    return;
  }
  const { title, content, refId, action, doc_id } = req.body;
  console.log(req.body);

  let sql = "";
  console.log(action);
  if (action == "new") {
    sql = ` INSERT INTO document (doc_content, doc_title, doc_author) VALUES ( '${content}' , '${title}', '${refId}') `;
  }
  if (action == "update") {
    sql = ` UPDATE document SET doc_content = '${content} ' , doc_title = '${title}' WHERE doc_id = '${doc_id}' AND doc_author = '${refId}'`;
  }
  console.log(sql);
  req.app.locals.con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.json(result);
  });
});

// DELETE
router.get("/deleteDoc/:id", function (req, res) {
  const id = req.params.id;

  let sql = `DELETE FROM document WHERE doc_id = '${id}' `;
  console.log(sql);

  req.app.locals.con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.json(result);
  });
});

module.exports = router;
