import Player from "./Player";
import TypingAttempt from "./TypingAttempt";
import TypingQuestionSet from "./TypingQuestionSet";

function calculateCorrectTypingCount(typingAttempts: TypingAttempt[]): number {
  return typingAttempts.reduce((correctTypingCount, typingAttempt) => {
    return correctTypingCount + typingAttempt.getCorrectTypingCount();
  }, 0);
}

function calculateMissTypingCount(typingAttempts: TypingAttempt[]): number {
  return typingAttempts.reduce((missTypingCount, typingAttempt) => {
    return missTypingCount + typingAttempt.getMissTypingCount();
  }, 0);
}

export default class TypingSession {
  readonly id: string;
  readonly startTime: Date;
  readonly endTime: Date;
  readonly player: Player;
  readonly typingQuestionSet: TypingQuestionSet;
  readonly typingAttempts: TypingAttempt[];

  constructor(
    id: string,
    startTime: Date,
    endTime: Date,
    player: Player,
    questionSet: TypingQuestionSet,
    typingAttempts: TypingAttempt[],
  ) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
    this.player = player;
    this.typingQuestionSet = questionSet;
    this.typingAttempts = typingAttempts;
  }

  getCorrectTypingCount(): number {
    return calculateCorrectTypingCount(this.typingAttempts);
  }

  getMissTypingCount(): number {
    return calculateMissTypingCount(this.typingAttempts);
  }
}
