import {
  saveTypingSessionInDb,
  fetchTypingSessionFromDb,
  fetchAllTypingSessionsFromDb,
} from "../models/typingSessionModel.js";
import { saveTypingAttemptInDb } from "../models/typingAttemptModel.js";
import { TypingSessionSerializer } from "@typing/api-serializers";
import { TypingSession } from "../../../packages/typing-core/dist/index.js";

export async function getTypingSessionLogic(
  typingSessionId: string,
): Promise<TypingSession> {
  const typingSession = await fetchTypingSessionFromDb(typingSessionId);
  return TypingSessionSerializer.fromObject(typingSession);
}

export async function getAllTypingSessionLogic(): Promise<TypingSession[]> {
  const typingSessions = await fetchAllTypingSessionsFromDb();
  return typingSessions.map((typingSession) =>
    TypingSessionSerializer.fromObject(typingSession),
  );
}

export async function createTypingSessionLogic(
  startTime: Date,
  endTime: Date,
  playerName: string,
  questionSetId: string,
  typingAttempts: { inputCharacters: string; targetCharacters: string }[],
): Promise<TypingSession> {
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
  return TypingSessionSerializer.fromObject(newTypingSession);
}
