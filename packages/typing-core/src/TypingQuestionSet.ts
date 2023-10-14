import TypingQuestion from "./TypingQuestion";

export default class TypingQuestionSet {
  readonly id: string;
  readonly title: string;
  readonly questions: TypingQuestion[];

  constructor(id: string, title: string, questions: TypingQuestion[]) {
    this.id = id;
    this.title = title;
    this.questions = questions;
  }

  equals(other: TypingQuestionSet): boolean {
    return this.id === other.id;
  }
}
