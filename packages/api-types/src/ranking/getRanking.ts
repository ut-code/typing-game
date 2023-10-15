type Ranking = {
  playerName: string;
  typingQuestionSetId: string;
  typingScore: number;
  playedAt: Date;
}[];

export type GetRankingResponse = Ranking;
