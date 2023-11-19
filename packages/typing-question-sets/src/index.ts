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
            typingTask.word,
            typingTask.word === typingTask.spellingList[0]
              ? [typingTask.word]
              : hiraganaToRomas(typingTask.kana),
          ),
      ),
    ),
);

export default typingTaskCollections;
