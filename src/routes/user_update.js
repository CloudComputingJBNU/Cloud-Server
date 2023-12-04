"use strict";
const db = require("../config/db");

const multer = require("multer");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  let sql;

  let u_id = req.body.user_id;
  let ch_nickname = req.body.user_nickname;
  let ch_info = req.body.user_info;

  let params;

  console.log(u_id, ch_nickname, ch_info);

  sql = "UPDATE user SET nickname = ?, info = ? where id = ?;";
  
  params = [ch_nickname, ch_info, u_id];

  db.query(sql, params, (err, rows, fields) => {
    let resultCode = 404;
    let message = "별명, 자기소개 작성에 실패했습니다.";
    if (err) {
      console.log(err);
    } else {
      console.log("update success");
      resultCode = 200;
      message = "별명, 자기소개 작성에 성공했습니다.";
    }
    console.log(resultCode, message);

    res.json({
      code: resultCode,
      message: message,
      nickname: ch_nickname,
      info: ch_info,
    });
  });
});
module.exports = router;
