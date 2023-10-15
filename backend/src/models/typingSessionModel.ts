import prisma from "../prismaClient.js";

export async function fetchTypingSessionFromDb(typingSessionId: string) {
  return await prisma.typingSession.findUnique({
    where: { id: typingSessionId },
    include: { typingAttempts: true },
  });
}

export async function fetchAllTypingSessionsFromDb() {
  return await prisma.typingSession.findMany({
    include: { typingAttempts: true },
  });
}

export async function saveTypingSessionInDb(
  startTime: Date,
  endTime: Date,
  playerName: string,
  typingQuestionSetId: string,
) {
  return await prisma.typingSession.create({
    data: {
      startTime,
      endTime,
      playerName,
      typingQuestionSetId,
    },
  });
}
