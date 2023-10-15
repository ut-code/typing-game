import TypingSession from "./TypingSession";
import Ranking from "./Ranking";

function calculateOverAllRank(typingSession: TypingSession, ranking: Ranking) {
  return (
    ranking.findIndex((rankingEntry) => {
      return rankingEntry.player.equals(typingSession.player);
    }) + 1
  );
}

export default class OverAllRank {
  readonly rank: number;

  constructor(rank: number) {
    this.rank = rank;
  }

  static calculate(
    typingSession: TypingSession,
    ranking: Ranking,
  ): OverAllRank {
    return new OverAllRank(calculateOverAllRank(typingSession, ranking));
  }
}
