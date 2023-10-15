import TypingSession from "./TypingSession";
import Ranking from "./Ranking";

function calculateRankInQuestionSet(
  typingSession: TypingSession,
  ranking: Ranking,
) {
  const filteredRanking = ranking.filter((rankingEntry) => {
    return rankingEntry.typingQuestionSet.equals(
      typingSession.typingQuestionSet,
    );
  });
  return (
    filteredRanking.findIndex((rankingEntry) => {
      return rankingEntry.player.equals(typingSession.player);
    }) + 1
  );
}

export default class RankInQuestionSet {
  readonly rank: number;

  constructor(rank: number) {
    this.rank = rank;
  }

  static calculate(
    typingSession: TypingSession,
    ranking: Ranking,
  ): RankInQuestionSet {
    return new RankInQuestionSet(
      calculateRankInQuestionSet(typingSession, ranking),
    );
  }
}
