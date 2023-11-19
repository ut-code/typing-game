export default class TypingOriginTask {
  readonly word: string;
  readonly kana: string;
  readonly spellingList: string[];

  constructor(word: string, kana: string, spellingList: string[]) {
    this.word = word;
    this.kana = kana;
    this.spellingList = spellingList;
  }
}
