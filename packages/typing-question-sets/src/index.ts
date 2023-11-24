import { TypingTaskCollection, TypingTask } from "@typing/core";
import TYPING_TASK_COLLECTIONS from "./typingTaskCollections.js";
import { hiraganaToRomas } from "hiragana-parser";

// hiraganaToRomasでローマ字候補の配列を生成してます

const typingTaskCollections = TYPING_TASK_COLLECTIONS.map(
  (TYPING_TASK_COLLECTION) =>
    new TypingTaskCollection(
      TYPING_TASK_COLLECTION.id,
      TYPING_TASK_COLLECTION.title,
      TYPING_TASK_COLLECTION.typingTasks.map(
        (typingTask) =>
          new TypingTask(
            typingTask.question,
            typingTask.language === "Japanese"
              ? hiraganaToRomas(typingTask.reading)
              : [typingTask.question],
          ),
      ),
    ),
);

export default typingTaskCollections;
