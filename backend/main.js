// Prisma関係
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const ejs = require("ejs");
const fs = require("fs");
const cors = require("cors"); // https://github.com/ut-code/typescript-react-node-template/blob/master/backend/main.ts を参照

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// データベースからPrismaで問題をとってくる
async function getQuestions() {
  const records = await prisma.questions.findMany();
  return records;
}

//
app.post("/questions", async (request, response) => {
  // questionsに問題が配列の形で入っている。
  const records = await getQuestions();
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

async function submitScore(score) {
  const submission = await prisma.ranking.create({
    data: { score: score },
  });
  return submission;
}

app.post("/finished", async (request, response) => {
  const time = request.body.time;
  const score = request.body.score;
  const submission = await submitScore(score);
  const records = await getRanking();
  const template = fs.readFileSync("./finished.ejs", "utf-8");
  const html = ejs.render(template, {
    time: time,
    score: score,
    listItems: records,
  });
  response.send(html);
});

app.listen(3000);
