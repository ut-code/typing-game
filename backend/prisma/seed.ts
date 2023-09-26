import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type QuestionSet = { questionSetNumber: number; questions: string[] };
const questionSets: QuestionSet[] = [
  { questionSetNumber: 0, questions: ["kanagawa", "kanagawa"] },
  {
    questionSetNumber: 1,
    questions: [
      "adachi",
      "arakawa",
      "chiyoda",
      "chuo",
      "edogawa",
      "katsushika",
      "kita",
      "koto",
      "minato",
      "nerima",
      "ota",
      "setagaya",
      "shinagawa",
      "sumida",
      "taito",
      "toshima",
    ],
  },
  {
    questionSetNumber: 2,
    questions: [
      "miso",
      "ramen",
      "sashimi",
      "sukiyaki",
      "sushi",
      "tempura",
      "teriyaki",
      "tofu",
      "yakitori",
    ],
  },
  {
    questionSetNumber: 3,
    questions: [
      "earth",
      "jupiter",
      "mars",
      "mercury",
      "neptune",
      "saturn",
      "uranus",
      "venus",
    ],
  },
  {
    questionSetNumber: 4,
    questions: [
      "c",
      "c#",
      "c++",
      "dart",
      "fortran",
      "go",
      "haskell",
      "java",
      "javascript",
      "kotlin",
      "matlab",
      "pascal",
      "perl",
      "php",
      "python",
      "r",
      "ruby",
      "rust",
      "sql",
      "swift",
      "visual basic",
    ],
  },
  {
    questionSetNumber: 5,
    questions: [
      "aequeosalinocalcalinoceraceoaluminosocupreovitriolic",
      "antidisestablishmentarianism",
      "floccinaucinihilipilification",
      "honorificabilitudinitatibus",
      "lopadotemachoselachogaleokranioleipsanodrimhypotrimmatosilphioparaomelitokatakechymenokichlepikossyphophattoperisteralektryonoptekephalliokigklopeleiolagoio-siraiobaphetraganopterygon",
      "pneumonoultramicroscopicsilicovolcanoconiosis",
      "pseudopseudohypoparathyroidism",
      "supercalifragilisticexpialidocious",
    ],
  },
  {
    questionSetNumber: 6,
    questions: [
      "amazon.co.jp",
      "amazon.com",
      "ameblo.jp",
      "baidu.com",
      "facebook.com",
      "fc2.com",
      "google.co.jp",
      "google.com",
      "instagram.com",
      "kakaku.com",
      "livedoor.com",
      "livedoor.jp",
      "nicovideo.jp",
      "rakuten.co.jp",
      "t.co",
      "twitter.com",
      "wikipedia.org",
      "yahoo.co.jp",
      "youtube.com",
    ],
  },
  {
    questionSetNumber: 7,
    questions: [
      "no poverty",
      "zero hunger",
      "good health and well-being",
      "quality education",
      "gender equality",
      "clean water and sanitation",
      "affordable and clean energy",
      "decent work and economic growth",
      "industry, innovation and infrastructure",
      "reduced inequalities",
      "sustainable cities and communities",
      "responsible consumption and production",
      "climate action",
      "life below water",
      "life on land",
      "peace, justice and strong institutions",
      "partnerships for the goals",
      "What are the Sustainable Development Goals?",
    ],
  },
];

type TypingResult = { questionNumber: number; userName: string; score: number };

const typingResults: TypingResult[] = [
  { questionNumber: 0, userName: "Alice", score: 200000 },
  { questionNumber: 0, userName: "Bob", score: 150000 },
  { questionNumber: 0, userName: "Developer", score: 1000000 },
  { questionNumber: 1, userName: "田沼意次", score: 150000 },
  { questionNumber: 1, userName: "松平定信", score: 150000 },
  { questionNumber: 1, userName: "水野忠邦", score: 150000 },
  { questionNumber: 2, userName: "織田信長", score: 200000 },
  { questionNumber: 2, userName: "豊臣秀吉", score: 100000 },
  { questionNumber: 2, userName: "徳川家康", score: 100000 },
  { questionNumber: 2, userName: "今川義元", score: 90000 },
  { questionNumber: 2, userName: "明智光秀", score: 50000 },
  { questionNumber: 2, userName: "伊達政宗", score: 70000 },
  { questionNumber: 2, userName: "武田信玄", score: 80000 },
  { questionNumber: 2, userName: "上杉謙信", score: 80000 },
  { questionNumber: 2, userName: "浅井長政", score: 30000 },
  { questionNumber: 2, userName: "朝倉義景", score: 30000 },
  { questionNumber: 2, userName: "毛利元就", score: 50000 },
  { questionNumber: 2, userName: "島津義久", score: 50000 },
];

async function main() {
  // Seed question sets
  for (const questionSet of questionSets) {
    for (const question of questionSet.questions) {
      const createdQuestion = await prisma.questions.create({
        data: { qnumber: questionSet.questionSetNumber, question: question },
      });
      console.log(createdQuestion);
    }
  }

  // Seed whole ranking
  for (const typingResult of typingResults) {
    const createdTypingResult = await prisma.ranking.create({
      data: {
        problem: typingResult.questionNumber,
        username: typingResult.userName,
        score: typingResult.score,
      },
    });
    console.log(createdTypingResult);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
