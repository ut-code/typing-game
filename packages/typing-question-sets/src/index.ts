import { TypingTaskCollection, TypingTask } from "@typing/core";
import TYPING_TASK_COLLECTIONS from "./typingTaskCollections.js";

const typingTaskCollections = TYPING_TASK_COLLECTIONS.map(
  (TYPING_TASK_COLLECTION) =>
    new TypingTaskCollection(
      TYPING_TASK_COLLECTION.id,
      TYPING_TASK_COLLECTION.title,
      TYPING_TASK_COLLECTION.typingTasks.map(
        (typingTask) =>
          new TypingTask(typingTask.word, typingTask.spellingList),
      ),
    ),
);

export default typingTaskCollections;
