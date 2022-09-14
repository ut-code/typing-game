// Prisma関係
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const ejs = require("ejs");
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("dist"));
app.use(express.json());

// データベースからPrismaで問題をとってくる
async function getQuestion() {
  const records = await prisma.questions.findMany();
  return records;
}

//
app.post("/questions", async (request, response) => {
  // questionsに問題が配列の形で入っている。
  const records = await getQuestion();
  const questions = records.map((data) => data.question);
  // JSON形式でscript.jsに送信
  response.json(questions);
});

let time;
let score;
// データベースからPrismaでランキングをとってくる
async function getRanking() {
  const records = await prisma.ranking.findMany({
    orderBy: {
      score: "desc",
    },
  });
  return records;
}

async function submitScore() {
  const submission = await prisma.ranking.create({
    data: { score: score },
  });
  return submission;
}

app.post("/finished", (request, response) => {
  time = request.body.time;
  score = request.body.score;
  response.send();
});

app.get("/finished", async (request, response) => {
  const submission = await submitScore();
  const records = await getRanking();
  const template = fs.readFileSync("./backend/finished.ejs", "utf-8");
  const html = ejs.render(template, {
    time: time,
    score: score,
    listItems: records,
  });
  response.send(html);
});

app.listen(3000);
