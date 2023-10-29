import { describe, expect, test } from "vitest";
import TypingAttempt from "./TypingAttempt.js";

describe("TypingAttempt", () => {
  describe("id", () => {
    test("when id is id1", () => {
      const attempt = new TypingAttempt("id1", "Apple", "Apple");
      expect(attempt.id).toBe("id1");
    });
  });
  describe("inputCharacters", () => {
    test("when inputCharacters is Apple", () => {
      const attempt = new TypingAttempt("id", "Apple", "Aapple");
      expect(attempt.inputCharacters).toBe("Apple");
    });
  });
  describe("targetCharacters", () => {
    test("when targetCharacters is Aapple", () => {
      const attempt = new TypingAttempt("id", "Apple", "Aapple");
      expect(attempt.targetCharacters).toBe("Aapple");
    });
  });
  describe("getCorrectTypingCount", () => {
    test("when targetCharacters is same with inputCharacters", () => {
      const attempt = new TypingAttempt("id", "Apple", "Apple");
      expect(attempt.getCorrectTypingCount()).toBe(5);
    });
    test("when targetCharacters is different from inputCharacters", () => {
      const attempt = new TypingAttempt("id", "Apple", "Aapple");
      expect(attempt.getCorrectTypingCount()).toBe(5);
    });
  });
  describe("getMissTypingCount", () => {
    test("when targetCharacters is same with inputCharacters", () => {
      const attempt = new TypingAttempt("id", "Apple", "Apple");
      expect(attempt.getMissTypingCount()).toBe(0);
    });
    test("when targetCharacters is different from inputCharacters", () => {
      const attempt = new TypingAttempt("id", "Apple", "Aapple");
      expect(attempt.getMissTypingCount()).toBe(1);
    });
  });
});
