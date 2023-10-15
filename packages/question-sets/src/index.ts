import { TypingQuestionSet, TypingQuestion } from "@typing-game/core";
import typingQuestionSets from "./questionSets.js";

export default typingQuestionSets.map(
  (typingQuestionSet) =>
    new TypingQuestionSet(
      typingQuestionSet.id,
      typingQuestionSet.title,
      typingQuestionSet.questions.map(
        (typingQuestion) => new TypingQuestion(typingQuestion.question),
      ),
    ),
);
