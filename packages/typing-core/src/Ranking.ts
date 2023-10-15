import TypingQuestionSet from "./TypingQuestionSet.js";
import TypingSession from "./TypingSession.js";
import Player from "./Player.js";
import TypingScore from "./TypingScore.js";

class RankingEntry {
  readonly player: Player;
  readonly typingQuestionSet: TypingQuestionSet;
  readonly typingScore: TypingScore;
  readonly playedAt: Date;
  constructor(
    player: Player,
    typingQuestionSet: TypingQuestionSet,
    typingScore: TypingScore,
    playedAt: Date,
  ) {
    this.player = player;
    this.typingQuestionSet = typingQuestionSet;
    this.typingScore = typingScore;
    this.playedAt = playedAt;
  }
}

export default class Ranking extends Array<RankingEntry> {
  constructor(
    ranking: {
      player: Player;
      typingQuestionSet: TypingQuestionSet;
      typingScore: TypingScore;
      playedAt: Date;
    }[],
  ) {
    const sortedRanking = Array.isArray(ranking)
      ? ranking.sort((a, b) => {
          return b.typingScore.score - a.typingScore.score;
        })
      : [];
    super(
      ...sortedRanking.map(
        (rankingEntry) =>
          new RankingEntry(
            rankingEntry.player,
            rankingEntry.typingQuestionSet,
            rankingEntry.typingScore,
            rankingEntry.playedAt,
          ),
      ),
    );
  }

  static generate(typingSessions: TypingSession[]): Ranking {
    const ranking = typingSessions.map((typingSession) => ({
      player: typingSession.player,
      typingQuestionSet: typingSession.typingQuestionSet,
      typingScore: TypingScore.calculate(typingSession),
      playedAt: typingSession.endTime,
    }));
    return new Ranking(ranking);
  }
}
