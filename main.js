const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express")
const fs = require("fs");

const app = express();

app.use(express.static("static"))

app.listen(3000);

// データベースからPrismaで問題をとってくる
async function getQuestions() {
    const questions = await prisma.questions.findMany({
        select: {
            // id: true,
            question: true,
        },
    });
    let l = []
    for (let i = 0; i < questions.length; i++) {
        l.push(questions[i].question)
    }
    console.log(l)
    return l
}
// exports.questions_list = getQuestions();
getQuestions();
