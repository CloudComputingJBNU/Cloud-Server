"use strict";
const db = require("../config/db");
const express = require("express");
const router = express.Router();

// 카테고리 추가를 위한 POST 라우트
router.post("/", (req, res) => {
  const label = req.body.label; // 클라이언트로부터 받은 카테고리 라벨

  // label 값이 비어있지 않은지 확인합니다.
  if (!label) {
    return res.status(400).json({
      code: 400,
      message: "카테고리 라벨이 필요합니다."
    });
  }

  // SQL 쿼리 문자열을 작성합니다.
  const sql = "INSERT INTO category (label) VALUES (?);";

  // 데이터베이스 쿼리를 실행합니다.
  db.query(sql, [label], (err, results) => {
    if (err) {
      // 오류가 발생했다면, 오류 메시지와 함께 클라이언트에 응답합니다.
      console.error(err);
      res.status(500).json({
        code: 500,
        message: "카테고리 추가 중 오류가 발생했습니다."
      });
    } else {
      // 쿼리가 성공적으로 실행되었다면, 성공 메시지를 클라이언트에 응답합니다.
      res.status(200).json({
        code: 200,
        message: "카테고리가 성공적으로 추가되었습니다."
      });
    }
  });
});

module.exports = router;