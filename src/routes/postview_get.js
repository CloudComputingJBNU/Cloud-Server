"use strict";
const db = require("../config/db");

const multer = require("multer");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  let sql;
  
  let params;
  let post_id = req.body.post_id;
  
  let title, nickname, img, contents, price, location;

  console.log(post_id);
    
  sql =
  "SELECT post.id, post.title, user.nickname, post.img, post.contents, post.price, post.location FROM post JOIN user ON post.user_id = user.id where post.id = ?;";
params = [post_id];

  db.query(sql, params, (err, rows, fields) => {
    let resultCode = 404;
    title = "";
    nickname = "";
    img = "";
    contents = "";
    price = "";
    location = "";f3wvnd9e

    let message = "post.id, post.title, user.nickname, post.img, post.contents, post.price, post.location 가져오기 실패";
    
    if (err) {
      console.log(err);
    } else {
      console.log("post.id, post.title, user.nickname, post.img, post.contents, post.price, post.location 가져오기 성공");
      resultCode = 200;

      message = "post.id, post.title, user.nickname, post.img, post.contents, post.price, post.location 가져오기 성공";
      title = rows[0].title;
      nickname = rows[0].nickname;
      img = rows[0].img;
      contents = rows[0].contents;
      price = rows[0].price;
      location = rows[0].location;
    }
    console.log(resultCode, message);

    res.json({
      code: resultCode,
      message: message,
      title: title,
      nickname: nickname,
      img: img,
      contents: contents,
      price: price,
      location: location,
    });
  });
});
module.exports = router;
