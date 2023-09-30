import { PrismaClient } from "@prisma/client";
import seedTypingSession from "./typingSession";
import seedTypingAttempt from "./typingAttempt";

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
