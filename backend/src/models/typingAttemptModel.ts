import prisma from "../prismaClient.js";

export async function saveTypingAttemptInDb(
  inputCharacters: string,
  targetCharacters: string,
  typingSessionId: string,
) {
  return await prisma.typingAttempt.create({
    data: { inputCharacters, targetCharacters, typingSessionId },
  });
}
