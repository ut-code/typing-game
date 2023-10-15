interface PerformanceSummary {
  playerName: string;
  overAllRank: number;
  rankInQuestionSet: number;
  typingScore: number;
  typingGrade: string;
  correctTypingCount: number;
  missTypingCount: number;
  keysPerSecond: number;
}

export type GetPerformanceSummaryResponse = PerformanceSummary;
