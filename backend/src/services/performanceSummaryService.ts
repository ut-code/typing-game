import { TypingSession } from "@prisma/client";
import { fetchTypingSessionFromDb } from "../models/typingSessionModel";
import { generateRankingLogic } from "./rankingService";
import { calculateGrade } from "@typing-game/score";
import { calculateScore } from "@typing-game/score";
import { calculateCorrectTypingCount } from "@typing-game/score";
import { calculateMissTypingCount } from "@typing-game/score";
import { calculateKeysPerSecond } from "@typing-game/score";
import { GetPerformanceSummaryResponse } from "@typing-game/api-types";

interface RankingEntry {
  questionSetId: string;
  playerName: string;
  score: number;
  playedAt: Date;
}

function getOverAllRank(typingSession: TypingSession, ranking: RankingEntry[]) {
  return (
    ranking.findIndex((rankingEntry) => {
      return rankingEntry.playerName === typingSession.playerName;
    }) + 1
  );
}

function getRankInQuestionSet(
  typingSession: TypingSession,
  ranking: RankingEntry[],
) {
  const filteredRanking = ranking.filter((rankingEntry) => {
    return rankingEntry.questionSetId === typingSession.questionSetId;
  });
  return (
    filteredRanking.findIndex((rankingEntry) => {
      return rankingEntry.playerName === typingSession.playerName;
    }) + 1
  );
}

export async function getPerformanceSummary(
  typingSessionId: string,
): Promise<GetPerformanceSummaryResponse> {
  const typingSession = await fetchTypingSessionFromDb(typingSessionId);
  const ranking = await generateRankingLogic();
  if (typingSession === null) {
    throw new Error("No such typing session");
  }
  return {
    playerName: typingSession.playerName,
    overAllRank: getOverAllRank(typingSession, ranking),
    rankInQuestionSet: getRankInQuestionSet(typingSession, ranking),
    score: calculateScore(typingSession.typingAttempts),
    grade: calculateGrade(calculateScore(typingSession.typingAttempts)),
    correctTypingCount: calculateCorrectTypingCount(
      typingSession.typingAttempts,
    ),
    missTypingCount: calculateMissTypingCount(typingSession.typingAttempts),
    keysPerSecond: calculateKeysPerSecond(
      typingSession.typingAttempts,
      (typingSession.endTime.getTime() - typingSession.startTime.getTime()) /
        1000,
    ),
  };
}
