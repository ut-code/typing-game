import { TypingSession } from "@prisma/client";
import { fetchTypingSessionFromDb } from "../models/typingSessionModel";
import { generateRankingLogic } from "./rankingService";
import calculateGrade from "../utils/calculateGrade";
import calculateScore from "../utils/calculateScore";
import calculateCorrectTypingCount from "../utils/calculateCorrectTypingCount";
import calculateMissTypingCount from "../utils/calculateMissTypingCount";
import calculateKeysPerSecond from "../utils/calculateKeysPerSecond";
import RankingEntry from "../types/RankingEntry";
import Score from "../types/Score";

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

export async function getScore(typingSessionId: string): Promise<Score> {
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
