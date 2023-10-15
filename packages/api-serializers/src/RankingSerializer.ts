import { Ranking, Player, TypingScore } from "@typing/core";
import typingQuestionSets from "@typing/question-sets";

export default class RankingSerializer {
  static fromObject(
    ranking: {
      playerName: string;
      typingQuestionSetId: string;
      typingScore: number;
      playedAt: Date;
    }[],
  ): Ranking {
    return new Ranking(
      ranking.map((rankingEntry) => ({
        player: new Player(rankingEntry.playerName),
        typingQuestionSet:
          typingQuestionSets.find(
            (typingQuestionSet) =>
              typingQuestionSet.id === rankingEntry.typingQuestionSetId,
          ) ?? typingQuestionSets[0],
        typingScore: new TypingScore(rankingEntry.typingScore),
        playedAt: rankingEntry.playedAt,
      })),
    );
  }

  static toObject(ranking: Ranking): {
    playerName: string;
    typingQuestionSetId: string;
    typingScore: number;
    playedAt: Date;
  }[] {
    return ranking.map((rankingEntry) => ({
      playerName: rankingEntry.player.name,
      typingQuestionSetId: rankingEntry.typingQuestionSet.id,
      typingScore: rankingEntry.typingScore.score,
      playedAt: rankingEntry.playedAt,
    }));
  }
}
