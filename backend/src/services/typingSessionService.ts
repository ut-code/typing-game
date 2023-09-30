import { saveTypingSessionInDb } from "../models/typingSessionModel.js";
import { saveTypingAttemptInDb } from "../models/typingAttemptModel.js";

export async function createTypingSessionLogic(
  startTime: Date,
  endTime: Date,
  playerName: string,
  questionSetId: string,
  typingAttempts: { inputCharacters: string; targetCharacters: string }[],
) {
  const newTypingSession = await saveTypingSessionInDb(
    startTime,
    endTime,
    playerName,
    questionSetId,
  );
  await Promise.all(
    typingAttempts.map((typingAttempt) => {
      return saveTypingAttemptInDb(
        typingAttempt.inputCharacters,
        typingAttempt.targetCharacters,
        newTypingSession.id,
      );
    }),
  );
  return newTypingSession;
}
