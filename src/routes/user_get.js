"use strict";
const db = require("../config/db");

const multer = require("multer");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  let sql;

  let u_id = req.body.user_id;
  let params;

  let email, nickname, info;
  console.log(email, nickname);

  sql = "SELECT email, nickname, info FROM user where id = ?;";

  params = [u_id];

  db.query(sql, params, (err, rows, fields) => {
    let resultCode = 404;
    email = "";
    nickname = "";
    info = "";
    let message = "이메일, 별명, 자기소개 가져오기 실패했습니다.";
    if (err) {
      console.log(err);
    } else {
      console.log("select success  u_id :" + u_id);
      resultCode = 200;

      if (rows.length > 0) {
        message = "이메일, 별명, 자기소개 가져오기에 성공했습니다.";
        nickname = rows[0].nickname;
        email = rows[0].email;
        info = rows[0].info;
      } else {
        message = "데이터가 없습니다.";
      }
    }
    console.log(resultCode, message);

    res.json({
      code: resultCode,
      message: message,
      email: email,
      nickname: nickname,
      info: info,
    });
  });
});
module.exports = router;
