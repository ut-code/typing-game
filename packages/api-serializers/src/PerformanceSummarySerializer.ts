import {
  PerformanceSummary,
  Player,
  TypingScore,
  TypingGrade,
  OverAllRank,
  RankInQuestionSet,
  KeysPerSecond,
} from "@typing/core";

export default class PerformanceSummarySerializer {
  static fromObject(object: {
    playerName: string;
    overAllRank: number;
    rankInQuestionSet: number;
    typingScore: number;
    typingGrade: string;
    correctTypingCount: number;
    missTypingCount: number;
    keysPerSecond: number;
  }): PerformanceSummary {
    return new PerformanceSummary(
      new Player(object.playerName),
      new OverAllRank(object.overAllRank),
      new RankInQuestionSet(object.rankInQuestionSet),
      new TypingScore(object.typingScore),
      new TypingGrade(object.typingGrade),
      object.correctTypingCount,
      object.missTypingCount,
      new KeysPerSecond(object.keysPerSecond),
    );
  }

  static toObject(performanceSummary: PerformanceSummary): {
    playerName: string;
    overAllRank: number;
    rankInQuestionSet: number;
    typingScore: number;
    typingGrade: string;
    correctTypingCount: number;
    missTypingCount: number;
    keysPerSecond: number;
  } {
    return {
      playerName: performanceSummary.player.name,
      overAllRank: performanceSummary.overAllRank.rank,
      rankInQuestionSet: performanceSummary.rankInQuestionSet.rank,
      typingScore: performanceSummary.typingScore.score,
      typingGrade: performanceSummary.typingGrade.grade,
      correctTypingCount: performanceSummary.correctTypingCount,
      missTypingCount: performanceSummary.missTypingCount,
      keysPerSecond: performanceSummary.keysPerSecond.keysPerSecond,
    };
  }
}
