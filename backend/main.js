const express = require("express");
const ejs = require("ejs");
const fs = require("fs");
const cors = require("cors");
// Prisma関係
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();

app.use(cors({ origin: process.env["WEB_ORIGIN"] }));
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
  let qnumber = Number(localStorage.getItem("qnumber")) || 0;
  const records = await prisma.questions.findMany({
    where: {
      qnumber: qnumber,
    },
    orderBy: {
      id: "asc",
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
  username = localStorage.getItem("username") || "Guest";
  score = request.body.score;
  localStorage.setItem("score", score);
  await submitScore(username, score);
  kpm = request.body.kpm;
  localStorage.setItem("kpm", kpm);
  correct = request.body.correct;
  localStorage.setItem("correct", correct);
  miss = request.body.miss;
  localStorage.setItem("miss", miss);
  scorerank = request.body.scorerank;
  localStorage.setItem("scorerank", scorerank);
  response.json({
    time: time,
    score: score,
    username: username,
    kpm: kpm,
    correct: correct,
    miss: miss,
    scorerank: scorerank,
  });
});

// localStorageから種々のデータを取ってくる
app.post("/fetchScore", (request, response) => {
  response.json({
    time: localStorage.getItem("time") || "-1",
    score: localStorage.getItem("score") || "-1",
    username: localStorage.getItem("username") || "Guest",
    qnumber: localStorage.getItem("qnumber") || "0",
    kpm: localStorage.getItem("kpm") || "-1",
    correct: localStorage.getItem("correct") || "-1",
    miss: localStorage.getItem("miss") || "-1",
    scorerank: localStorage.getItem("scorerank") || "-",
  });
});

// /result表示用にrankingをデータベースから取ってくる
app.post("/fetchRanking", async (request, response) => {
  const records = await getRanking();
  // JSON形式でscript.jsに送信
  response.json(records);
});

// データベースからPrismaでランキングをとってくる
async function getRankingSame() {
  qnumber = Number(localStorage.getItem("qnumber")) || 0;
  const records = await prisma.ranking.findMany({
    where: {
      problem: qnumber,
    },
    orderBy: {
      score: "desc",
    },
  });
  return records;
}
// /result表示用にrankingをデータベースから取ってくる
app.post("/fetchRankingSame", async (request, response) => {
  const records = await getRankingSame();
  // JSON形式でscript.jsに送信
  response.json(records);
});

app.listen(3000);
