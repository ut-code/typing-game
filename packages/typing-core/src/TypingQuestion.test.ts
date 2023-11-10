import { describe, expect, test } from "vitest";
import TypingQuestion from "./TypingQuestion.js";

describe("TypingQuestion", () => {
  describe("equals", () => {
    test("when question is same", () => {
      const question = new TypingQuestion("Apple");
      expect(question.equals(new TypingQuestion("Apple"))).toBe(true);
    });
    test("when question is different", () => {
      const question = new TypingQuestion("Apple");
      expect(question.equals(new TypingQuestion("Banana"))).toBe(false);
    });
  });
});
