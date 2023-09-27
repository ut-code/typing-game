import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
const app = express();

// eslint-disable-next-line
app.use(cors({ origin: process.env["WEB_ORIGIN"] }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// データベースからランキングをとってくる
async function getRanking() {
  const records = await client.ranking.findMany({
    orderBy: [{ score: "desc" }, { record_id: "desc" }],
  });
  return records;
}

// submit時のデータベースとのやり取り
app.post("/submitScore", async (request, response) => {
  const questionSetId: string = request.body.questionSetId;
  const username: string = request.body.username || "Not working";
  const score: number = request.body.score || 0;
  await client.ranking.create({
    data: { problem: questionSetId, username: username, score: score },
  });
  response.json();
});

// /result表示用にrankingをデータベースから取ってくる
app.post("/fetchRanking", async (request, response) => {
  const records = await getRanking();
  // JSON形式でscript.jsに送信
  response.json(records);
});

app.listen(3000);
