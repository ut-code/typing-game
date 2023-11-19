import { describe, expect, test } from "vitest";
import TypingTaskCollection from "./TypingTaskCollection.js";

describe("TypingTaskCollection", () => {
  describe("equals", () => {
    test("when id is same", () => {
      const questionSet = new TypingTaskCollection("id", "title", []);
      expect(
        questionSet.equals(new TypingTaskCollection("id", "title", [])),
      ).toBe(true);
    });
    test("when id is different", () => {
      const questionSet = new TypingTaskCollection("id", "title", []);
      expect(
        questionSet.equals(new TypingTaskCollection("id2", "title", [])),
      ).toBe(false);
    });
  });
});
