export default class TypingQuestion {
  readonly question: string;
  readonly spelling: string;

  constructor(question: string, spelling: string) {
    this.question = question;
    this.spelling = spelling;
  }
}
