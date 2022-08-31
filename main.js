const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express")
const fs = require("fs");

const app = express();

app.use(express.static("static"))

app.listen(3000);

// データベースからPrismaで問題をとってくる
async function getQuestions() {
    // questionsに問題が配列の形で入っている。
    const questions = await (await prisma.questions.findMany({
        select: {
            // id: true,
            question: true,
        },
    })).map((data)=>(data.question));
}
// exports.questions_list = getQuestions();
getQuestions();
