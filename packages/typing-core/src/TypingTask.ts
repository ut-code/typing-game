export default class TypingTask {
  readonly word: string;
  readonly spellingList: string[];

  constructor(word: string, spellingList: string[]) {
    this.word = word;
    this.spellingList = spellingList;
  }
}
