import TypingTask from "./TypingTask.js";

export default class TypingTaskCollection {
  readonly id: string;
  readonly title: string;
  readonly typingTasks: TypingTask[];

  constructor(id: string, title: string, typingTasks: TypingTask[]) {
    this.id = id;
    this.title = title;
    this.typingTasks = typingTasks;
  }

  equals(other: TypingTaskCollection): boolean {
    return this.id === other.id;
  }
}
