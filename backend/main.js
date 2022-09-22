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

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.post("/cook", (request, response) => {
  response.json({
    username: request.body.username,
    qnumber: request.body.question - number,
  });
  // response.cookie("username", username);
  // response.cookie("qnumber", qnumber);
});

// データベースからPrismaで問題をとってくる
app.post("/questions", async (request, response) => {
  // questionsに問題が配列の形で入っている。
  // const qnumber = request.cookies.qnumber;
  const records = await prisma.questions.findMany({
    where: {
      qnumber: 0,
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

app.listen(3000);
