"use strict";
const db = require("../config/db");

const multer = require("multer");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  let sql;
  let params;

  sql = "SELECT * FROM category;";
  params = [];

  console.log("category 가져오기 server 시작");

  db.query(sql, params, (err, rows, fields) => {
    let resultCode = 404;
    let message = "에러가 발생했습니다.";
    let category_label = rows.map((row) => row.label);
    console.log(category_label);

    if (err) {
      console.log(err);
      res.json({
        code: resultCode,
        message: message,
        category_label: category_label,
      });
    } else {
      console.log("category_label 가져오기 성공");
      resultCode = 200;
      message = "category_label 가져오기 성공";

      res.json({
        code: resultCode,
        message: message,
        category_label: category_label,
      });
    }
  });
});

module.exports = router;
