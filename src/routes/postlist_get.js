"use strict";
const db = require("../config/db");

const multer = require("multer");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  let sql;
  let params;

  let category_label = req.body.category_label;

  let posts = [];

  if (category_label === "전체 게시글") {
    // 전체 게시글 가져오기
    sql =
      "SELECT post.id, user.nickname, post.title, post.img FROM post JOIN user ON post.user_id = user.id ORDER BY post.id;";
    params = [];

    db.query(sql, params, (err, rows, fields) => {
      let resultCode = 404;
      let message = "post_id, title, img 가져오기 실패";

      if (err) {
        console.log(err);
      } else {
        console.log("post_id, title, img 가져오기 성공");
        resultCode = 200;
        message = "post_id, nickname, title, img 가져오기 성공";
        posts = rows;
      }
      res.json({
        code: resultCode,
        message: message,
        posts: posts,
      });
    });
  } else {
    sql =
      "SELECT post.id, user.nickname, post.title, post.img FROM post JOIN user ON post.user_id = user.id WHERE post.category_label = ?;";
    // post_id, nickname, title, img 가져오기
    params = [category_label];

    db.query(sql, params, (err, rows, fields) => {
      let resultCode = 404;
      let message = "post_id, title, img 가져오기 실패";
      if (err) {
        console.log(err);
      } else {
        console.log("post_id, title, img 가져오기 성공");
        resultCode = 200;
        message = "post_id, nickname, title, img 가져오기 성공";
        posts = rows;
      }
      console.log(posts);

      res.json({
        code: resultCode,
        message: message,
        posts: posts,
      });
    });
  }
});
module.exports = router;
