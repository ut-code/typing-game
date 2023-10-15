import TypingSession from "./TypingSession";

function calculateTypingScore(
  correctTypingCount: number,
  missTypingCount: number,
): number {
  return correctTypingCount - missTypingCount;
}

export default class TypingScore {
  readonly score: number;

  constructor(score: number) {
    this.score = score;
  }

  static calculate(typingSession: TypingSession): TypingScore {
    return new TypingScore(
      calculateTypingScore(
        typingSession.getCorrectTypingCount(),
        typingSession.getMissTypingCount(),
      ),
    );
  }
}
