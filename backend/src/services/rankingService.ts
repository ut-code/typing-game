import { fetchAllTypingSessionsFromDb } from "../models/typingSessionModel";
import { GetRankingResponse } from "@typing-game/api-types";
import { calculateScore } from "@typing-game/score";

export async function generateRankingLogic(): Promise<GetRankingResponse> {
  const typingSessions = await fetchAllTypingSessionsFromDb();
  const ranking = typingSessions.map((typingSession) => ({
    playerName: typingSession.playerName,
    questionSetId: typingSession.questionSetId,
    score: calculateScore(typingSession.typingAttempts),
    playedAt: typingSession.endTime,
  }));
  const sortedRanking = ranking.sort((a, b) => {
    return b.score - a.score;
  });
  return sortedRanking;
}
