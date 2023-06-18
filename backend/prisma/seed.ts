import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type QuestionSet = { questionSetNumber: number; questions: string[] }
const questionSets: QuestionSet[] = [
  { questionSetNumber: 0, questions: ["kanagawa"] },
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
    questions: ["miso", "ramen", "sashimi", "sukiyaki", "sushi", "tempura", "teriyaki", "tofu", "yakitori"],
  },
  { questionSetNumber: 3, questions: ["earth", "jupiter", "mars", "mercury", "neptune", "saturn", "uranus", "venus"] },
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
]

async function main() {
  for (const questionSet of questionSets) {
    for (const question of questionSet.questions) {
      await prisma.questions.create({ data: { qnumber: questionSet.questionSetNumber, question: question } })
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })

  .catch(async (e) => {
    console.error(e)

    await prisma.$disconnect()

    process.exit(1)
  })