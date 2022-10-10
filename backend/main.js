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

let username = "Guest"; // 仮置き
let qnumber = 0; // 仮置き
// Homeでユーザーが入力した情報をcookieに保存
app.post("/cookSave", (request, response) => {
  let username = request.body.username;
  let qnumber = request.body.questionNumber;
  // response.cookie("username", username);
  // response.cookie("qnumber", qnumber);
  response.json({
    username: username,
    qnumber: qnumber,
  });
});

// データベースからPrismaで問題をとってくる
app.post("/questions", async (request, response) => {
  // questionsに問題が配列の形で入っている。
  // const qnumber = request.cookies.qnumber;
  const records = await prisma.questions.findMany({
    where: {
      qnumber: qnumber,
    },
  });
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

async function submitScore(username, score) {
  const submission = await prisma.ranking.create({
    data: { username: username, score: score },
  });
  return submission;
}

app.post("/results", async (request, response) => {
  const time = request.body.time;
  const username = "not working :<"; // 仮ユーザーネーム、本当はcookieから取得
  const score = request.body.score;
  const submission = await submitScore(username, score);
  const records = await getRanking();
  const template = fs.readFileSync("./results.ejs", "utf-8");
  const html = ejs.render(template, {
    time: time,
    score: score,
    listItems: records,
  });
  response.send(html);
});

app.post("/test", async (request, response) => {
  const records = await getRanking();
  // const scores = records.map((data) => data.score);
  // JSON形式でscript.jsに送信
  response.json(records[0]);
});

app.listen(3000);
