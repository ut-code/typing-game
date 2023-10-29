export default class TypingQuestion {
  readonly question: string;

  constructor(question: string) {
    this.question = question;
  }

  equals(other: TypingQuestion): boolean {
    return this.question === other.question;
  }
}
