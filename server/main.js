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

// データベースからPrismaでランキングをとってくる
async function getRanking() {
  const records = await prisma.ranking.findMany();
  return records;
}

app.get("/results", async (request, response) => {
  const records = await getRanking();
  const template = fs.readFileSync("./server/results.ejs", "utf-8");
  const html = ejs.render(template, {
    listItems: records,
  });
  response.send(html);
});

let time;
app.post("/finished", (request, response) => {
  time = request.body.time;
  response.send();
});

app.get("/finished", (request, response) => {
  const template = fs.readFileSync("./server/finished.ejs", "utf-8");
  const html = ejs.render(template, {
    time: time,
  });
  response.send(html);
});

app.listen(3000);
