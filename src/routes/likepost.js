"use strict";
const db = require("../config/db");

const multer = require("multer");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  let sql;

  let user_id = req.body.user_id;
  let flag = req.body.flag;
  let processData = [];

  let params;

  if (flag === "like") {
    sql =
      "SELECT post.id, user.nickname, post.title, post.img FROM post JOIN user ON post.user_id = user.id WHERE post.id IN (SELECT post_id FROM likes WHERE user_id = ?) ORDER BY post.id;";
  } else if (flag === "mypost") {
    sql =
      "SELECT post.id, user.nickname, post.title, post.img FROM post JOIN user ON post.user_id = user.id WHERE post.user_id = ? ORDER BY post.id;";
  }

  params = [user_id];

  db.query(sql, params, (err, rows, fields) => {
    let resultCode = 404;
    let message = "Like 테이블 컨트롤 실패";
    if (err) {
      console.log(err);
    } else {
      console.log("control success");
      resultCode = 200;
      message = "like post 테이블 컨트롤 성공";
      processData = rows;
    }

    res.json({
      code: resultCode,
      message: message,
      posts: processData,
    });
  });
});
module.exports = router;
