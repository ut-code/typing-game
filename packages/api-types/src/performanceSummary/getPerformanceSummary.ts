interface PerformanceSummary {
  playerName: string;
  overAllRank: number;
  rankInQuestionSet: number;
  score: number;
  grade: string;
  correctTypingCount: number;
  missTypingCount: number;
  keysPerSecond: number;
}

export type GetPerformanceSummaryResponse = PerformanceSummary;
