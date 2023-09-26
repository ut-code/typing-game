import { PrismaClient } from "@prisma/client";
import seedTypingResult from "./seed/typingResult";
import seedQuestionSet from "./seed/questionSet";

const prisma = new PrismaClient();

async function main() {
  await seedQuestionSet(prisma);
  await seedTypingResult(prisma);
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