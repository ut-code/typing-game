interface RankingEntry {
  questionSetId: string;
  playerName: string;
  score: number;
  playedAt: Date;
}

export type GetRankingResponse = RankingEntry[];
