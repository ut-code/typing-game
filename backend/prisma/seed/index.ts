import { PrismaClient } from "@prisma/client";
import seedTypingSession from "./typingSession.js";
import seedTypingAttempt from "./typingAttempt.js";

const prisma = new PrismaClient();

async function main() {
  await seedTypingSession(prisma);
  await seedTypingAttempt(prisma);
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
