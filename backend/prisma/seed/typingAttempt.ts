import { PrismaClient } from "@prisma/client";

const typingAttempts = [
  {
    id: "b3d8f57d-4dee-4973-8492-b37842b5a5d4",
    inputCharacters: "Hello",
    targetCharacters: "Hello",
    typingSessionId: "e6a39604-4008-4460-8354-b1aab5d99c44",
  },
  {
    id: "9dca0d8b-cc9b-4dc4-b07c-aa2ec16690d9",
    inputCharacters: "World",
    targetCharacters: "World",
    typingSessionId: "e6a39604-4008-4460-8354-b1aab5d99c44",
  },
  {
    id: "04c9db8f-b619-4bc3-86a0-9629907f7296",
    inputCharacters: "Hello",
    targetCharacters: "Hello",
    typingSessionId: "a957c21c-74a2-4052-95ce-dfd7727691f4",
  },
  {
    id: "df673a67-51a2-49b5-92f4-da3af1a06728",
    inputCharacters: "World",
    targetCharacters: "World",
    typingSessionId: "a957c21c-74a2-4052-95ce-dfd7727691f4",
  },
];

export default async function seedTypingAttempt(prisma: PrismaClient) {
  for (const typingAttempt of typingAttempts) {
    const createdTypingAttempt = await prisma.typingAttempt.create({
      data: typingAttempt,
    });
    console.log(createdTypingAttempt);
  }
}
