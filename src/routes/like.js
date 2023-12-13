"use strict";
const db = require("../config/db");

const multer = require("multer");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  let sql;

  let user_id = req.body.user_id;
  let post_id = req.body.post_id;
  let flag = req.body.flag;

  let params;

  if (flag === 0) {
    // select
    sql = "SELECT * FROM likes WHERE user_id = ? AND post_id = ?;";
  } else if (flag === 1) {
    // insert
    sql = "INSERT INTO likes(user_id, post_id) VALUES(?, ?);";
  } else if (flag === 2) {
    // delete
    sql = "Delete From likes where user_id = ? AND post_id=?;";
  }
  console.log(user_id, post_id, flag);
  params = [user_id, post_id];

  db.query(sql, params, (err, rows, fields) => {
    let resultCode = 404;
    let message = "Like 테이블 컨트롤 실패";
    if (err) {
      console.log(err);
    } else {
      console.log("control success");
      resultCode = 200;
      message = "Like 테이블 컨트롤 성공";
    }
    console.log(resultCode, message);

    if (flag === 0 && rows.length > 0) {
      // 검색된 데이터가 존재한다면
      console.log("exist");
      message = "exist";
    }

    res.json({
      code: resultCode,
      message: message,
    });
  });
});
module.exports = router;
