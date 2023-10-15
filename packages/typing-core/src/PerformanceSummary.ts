import Player from "./Player.js";
import TypingScore from "./TypingScore.js";
import TypingGrade from "./TypingGrade.js";
import KeysPerSecond from "./KeysPerSecond.js";
import TypingSession from "./TypingSession.js";
import Ranking from "./Ranking.js";
import OverAllRank from "./OverAllRank.js";
import RankInQuestionSet from "./RankInQuestionSet.js";

export default class PerformanceSummary {
  readonly player: Player;
  readonly overAllRank: OverAllRank;
  readonly rankInQuestionSet: RankInQuestionSet;
  readonly typingScore: TypingScore;
  readonly typingGrade: TypingGrade;
  readonly correctTypingCount: number;
  readonly missTypingCount: number;
  readonly keysPerSecond: KeysPerSecond;

  constructor(
    player: Player,
    overAllRank: OverAllRank,
    rankInQuestionSet: RankInQuestionSet,
    typingScore: TypingScore,
    typingGrade: TypingGrade,
    correctTypingCount: number,
    missTypingCount: number,
    keysPerSecond: KeysPerSecond,
  ) {
    this.player = player;
    this.overAllRank = overAllRank;
    this.rankInQuestionSet = rankInQuestionSet;
    this.typingScore = typingScore;
    this.typingGrade = typingGrade;
    this.correctTypingCount = correctTypingCount;
    this.missTypingCount = missTypingCount;
    this.keysPerSecond = keysPerSecond;
  }

  static calculate(
    typingSession: TypingSession,
    ranking: Ranking,
  ): PerformanceSummary {
    return new PerformanceSummary(
      typingSession.player,
      OverAllRank.calculate(typingSession, ranking),
      RankInQuestionSet.calculate(typingSession, ranking),
      TypingScore.calculate(typingSession),
      TypingGrade.calculate(TypingScore.calculate(typingSession)),
      typingSession.getCorrectTypingCount(),
      typingSession.getMissTypingCount(),
      KeysPerSecond.calculate(typingSession),
    );
  }
}
