import { fetchAllTypingSessionsFromDb } from "../models/typingSessionModel";
import RankingEntry from "types/src/RankingEntry";
import calculateScore from "../utils/calculateScore";

export async function generateRankingLogic(): Promise<RankingEntry[]> {
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
