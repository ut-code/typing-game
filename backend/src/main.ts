import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"

const client = new PrismaClient()
const app = express()

// eslint-disable-next-line
app.use(cors({ origin: process.env["WEB_ORIGIN"] }))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// データベースから問題をとってくる
app.post("/questions", async (request, response) => {
  const records = await client.questions.findMany({
    where: {
      qnumber: request.body.qnumber,
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

// データベースからランキングをとってくる
async function getRanking() {
  const records = await client.ranking.findMany({
    orderBy: {
      score: "desc",
      record_id: "asc",
    },
  })
  return records
}

async function getRankingKf73() {
  const records = await client.ranking_kf73.findMany({
    orderBy: {
      score: "desc",
      record_id: "asc",
    },
  })
  return records
}

// submit時のデータベースとのやり取り
app.post("/submitScore", async (request, response) => {
  const qnumber: number = request.body.qnumber || 0
  const username: string = request.body.username || "Not working"
  const score: number = request.body.score || 0
  await client.ranking.create({
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
