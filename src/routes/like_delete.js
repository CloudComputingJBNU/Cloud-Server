"use strict";
const db = require("../config/db");

const multer = require("multer");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  let sql;

  let user_id = req.body.user_id;
  let post_id = req.body.post_id;

  let params;

  console.log(user_id, post_id);

  sql = "Delete From likes where user_id = ? AND post_id=?;";
  params = [user_id, post_id];

  db.query(sql, params, (err, rows, fields) => {
    let resultCode = 404;
    let message = "Like 테이블 삭제 실패.";
    if (err) {
      console.log(err);
    } else {
      console.log("delete success");
      resultCode = 200;
      message = "Like 테이블 삭제 성공";
    }
    console.log(resultCode, message);

    res.json({
      code: resultCode,
      message: message,
    });
  });
});
module.exports = router;
