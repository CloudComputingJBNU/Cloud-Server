"use strict";
const db = require("../config/db");

const multer = require("multer");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  let sql;

  let user_id = req.body.user_id;
  let user_email = req.body.user_email;
  let user_pw = req.body.user_pw;
  let user_nickname = req.body.user_nickname;
  let params;

  sql = "INSERT INTO user(id, email, pw, nickname) VALUES(?, ?, ?, ?);";
  params = [user_id, user_email, user_pw, user_nickname];

  db.query(sql, params, (err, rows, fields) => {
    let resultCode = 404;
    let message = "에러가 발생했습니다.";
    if (err) {
      console.log(err);
    } else {
      console.log("insert success");
      resultCode = 200;
      message = "회원가입에 성공했습니다.";
    }
    console.log(resultCode, message);

    res.json({
      code: resultCode,
      message: message,
    });
  });
});

module.exports = router;
