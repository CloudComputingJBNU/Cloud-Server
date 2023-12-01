"use strict";
const db = require("../config/db");

const multer = require("multer");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  let sql;

  let user_id = req.body.user_id;
  let title = req.body.title;
  let contents = req.body.contents;
  let img = req.body.img;
  let category_label = req.body.category_label;
  let price = req.body.price;
  let location = req.body.location;

  let params;

  console.log(user_id, title, contents, img, category_label, price, location);

  sql =
    "INSERT INTO post(user_id, title, contents, img, category_label, price, location) VALUES(?, ?, ?, ?, ?, ?, ?);";

  params = [user_id, title, contents, img, category_label, price, location];

  db.query(sql, params, (err, rows, fields) => {
    let resultCode = 404;
    let message = "게시글 작성 에러가 발생했습니다.";
    if (err) {
      console.log(err);
    } else {
      console.log("insert success");
      resultCode = 200;
      message = "게시글 작성에 성공했습니다.";
    }
    console.log(resultCode, message);

    res.json({
      code: resultCode,
      message: message,
    });
  });
});
module.exports = router;
