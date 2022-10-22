const express = require("express");
const ejs = require("ejs");
const fs = require("fs");
const cors = require("cors"); // https://github.com/ut-code/typescript-react-node-template/blob/master/backend/main.ts を参照
// Prisma関係
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ExpressでCookieを使用するのに必要
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Cookieの代替案としてlocalStorage(node.js版)
var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

// Homeでユーザーが入力した情報をlocalStorageに保存
app.post("/localSave", (request, response) => {
  localStorage.setItem("username", request.body.username);
  localStorage.setItem("qnumber", request.body.qnumber);
  response.json({
    // username: username,
    // qnumber: qnumber,
  });
});

// データベースからPrismaで問題をとってくる
app.post("/questions", async (request, response) => {
  // localStorageから問題番号を拾ってくる
  let qnumber = Number(localStorage.getItem("qnumber")) || 0; // parseInt(request.cookies.qnumber) || 0;
  const records = await prisma.questions.findMany({
    where: {
      qnumber: qnumber,
    },
  });
  // questionsに問題が配列の形で入っている。
  const questions = records.map((data) => data.question);
  // JSON形式でscript.jsに送信
  response.json(questions);
});

// データベースからPrismaでランキングをとってくる
async function getRanking() {
  const records = await prisma.ranking.findMany({
    orderBy: {
      score: "desc",
    },
  });
  return records;
}

// submit時のデータベースとのやり取りを関数化しただけ
async function submitScore(username, score) {
  const submission = await prisma.ranking.create({
    data: { username: username, score: score },
  });
  return submission;
}

app.post("/results", async (request, response) => {
  time = request.body.time;
  localStorage.setItem("time", time);
  let username = localStorage.getItem("username") || "Guest";
  score = request.body.score;
  localStorage.setItem("score", score);
  await submitScore(username, score);
  response.json({ time: time, score: score, username: username });
});

app.post("/fetchScore", (request, response) => {
  let username = localStorage.getItem("username") || "Guest";
  response.json({
    time: localStorage.getItem("time"),
    score: localStorage.getItem("score"),
    username: username,
  });
});

app.post("/fetchRanking", async (request, response) => {
  const records = await getRanking();
  // const scores = records.map((data) => data.score);
  // JSON形式でscript.jsに送信
  response.json(records);
});

app.listen(3000);
