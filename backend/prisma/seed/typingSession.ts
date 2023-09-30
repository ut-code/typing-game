import { PrismaClient } from "@prisma/client";

const typingSessions = [
  {
    id: "e6a39604-4008-4460-8354-b1aab5d99c44",
    startTime: new Date("2023-08-27T01:23:45"),
    endTime: new Date("2023-08-27T01:23:46"),
    playerName: "Alice",
    questionSetId: "0b6d3308-5670-41fc-bb3e-590a4d34d754",
  },
  {
    id: "a957c21c-74a2-4052-95ce-dfd7727691f4",
    startTime: new Date("2023-08-27T01:23:47"),
    endTime: new Date("2023-08-27T01:23:49"),
    playerName: "Bob",
    questionSetId: "0b6d3308-5670-41fc-bb3e-590a4d34d754",
  },
];

export default async function seedTypingSession(prisma: PrismaClient) {
  for (const typingSession of typingSessions) {
    const createdTypingSession = await prisma.typingSession.create({
      data: typingSession,
    });
    console.log(createdTypingSession);
  }
}
