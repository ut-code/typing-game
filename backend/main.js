const express = require("express")
const cors = require("cors")
// Prisma関係
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const app = express()

app.use(cors({ origin: process.env["WEB_ORIGIN"] }))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// データベースからPrismaで問題をとってくる
app.post("/questions", async (request, response) => {
  const records = await prisma.questions.findMany({
    where: {
      qnumber: Number(request.body.qnumber),
    },
    orderBy: {
      id: "asc",
    },
  })
  // questionsに問題が配列の形で入っている
  const questions = records.map((data) => data.question)
  // JSON形式でscript.jsに送信
  response.json(questions)
})

// データベースからPrismaでランキングをとってくる
async function getRanking() {
  const records = await prisma.ranking.findMany({
    orderBy: {
      score: "desc",
    },
  })
  return records
}

async function getRankingKf73() {
  const records = await prisma.ranking_kf73.findMany({
    orderBy: {
      score: "desc",
    },
  })
  return records
}

// submit時のデータベースとのやり取り
app.post("/submitScore", async (request, response) => {
  qnumber = Number(request.body.qnumber) || -1
  username = request.body.username || "Not working"
  score = request.body.score || -1
  await prisma.ranking.create({
    data: { problem: qnumber, username: username, score: score },
  })
  response.json()
})

// /result表示用にrankingをデータベースから取ってくる
app.post("/fetchRanking", async (request, response) => {
  const records = await getRanking()
  // JSON形式でscript.jsに送信
  response.json(records)
})

app.post("/fetchRankingKf73", async (request, response) => {
  const records = await getRankingKf73()
  // JSON形式でscript.jsに送信
  response.json(records)
})

app.listen(3000)
