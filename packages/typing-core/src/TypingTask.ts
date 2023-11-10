export default class TypingTask {
  readonly word: string;
  readonly spellingList: string[];

  constructor(displayText: string, spellingList: string[]) {
    this.word = displayText;
    this.spellingList = spellingList;
  }
}
