// Prisma関係
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.static("static"));
app.use(express.json());

// データベースからPrismaで問題をとってくる
app.post("/questions", async (request, response) => {
    // questionsに問題が配列の形で入っている。
    const questions = await (await prisma.questions.findMany({
        select: {
            // id: true,
            question: true,
        },
    })).map((data) => (data.question));
    // JSON形式でscript.jsに送信
    response.json(questions);
});

app.listen(3000);
