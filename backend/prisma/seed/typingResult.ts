import { PrismaClient } from "@prisma/client";

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

export default async function seedTypingResult(prisma: PrismaClient) {
  for (const typingResult of typingResults) {
    await prisma.ranking.create({
      data: typingResult,
    });
  }
}
