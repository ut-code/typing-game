import { describe, expect, test } from "vitest";
import TypingQuestionSet from "./TypingQuestionSet.js";

describe("TypingQuestionSet", () => {
  describe("equals", () => {
    test("when id is same", () => {
      const questionSet = new TypingQuestionSet("id", "title", []);
      expect(questionSet.equals(new TypingQuestionSet("id", "title", []))).toBe(
        true,
      );
    });
    test("when id is different", () => {
      const questionSet = new TypingQuestionSet("id", "title", []);
      expect(
        questionSet.equals(new TypingQuestionSet("id2", "title", [])),
      ).toBe(false);
    });
  });
});
