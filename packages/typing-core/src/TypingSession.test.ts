import { describe, expect, test } from "vitest";
import TypingSession from "./TypingSession.js";
import Player from "./Player.js";
import TypingQuestionSet from "./TypingQuestionSet.js";
import TypingAttempt from "./TypingAttempt.js";

describe("TypingSession", () => {
  describe("getCorrectTypingCount", () => {
    test("when there is no attempt", () => {
      const session = new TypingSession(
        "id",
        new Date("2023-01-01T01:23:45"),
        new Date("2023-01-01T01:23:46"),
        new Player("Alice"),
        new TypingQuestionSet("id", "title", []),
        [],
      );
      expect(session.getCorrectTypingCount()).toBe(0);
    });
    test("when there is one attempt", () => {
      const session = new TypingSession(
        "id",
        new Date("2023-01-01T01:23:45"),
        new Date("2023-01-01T01:23:46"),
        new Player("Alice"),
        new TypingQuestionSet("id", "title", []),
        [new TypingAttempt("id", "Apple", "Apple")],
      );
      expect(session.getCorrectTypingCount()).toBe(5);
    });
    test("when there are two attempts", () => {
      const session = new TypingSession(
        "id",
        new Date("2023-01-01T01:23:45"),
        new Date("2023-01-01T01:23:46"),
        new Player("Alice"),
        new TypingQuestionSet("id", "title", []),
        [
          new TypingAttempt("id", "Apple", "Apple"),
          new TypingAttempt("id", "Apple", "Aapple"),
        ],
      );
      expect(session.getCorrectTypingCount()).toBe(10);
    });
  });
  describe("getMissTypingCount", () => {
    test("when there is no attempt", () => {
      const session = new TypingSession(
        "id",
        new Date("2023-01-01T01:23:45"),
        new Date("2023-01-01T01:23:46"),
        new Player("Alice"),
        new TypingQuestionSet("id", "title", []),
        [],
      );
      expect(session.getMissTypingCount()).toBe(0);
    });
    test("when there is one attempt", () => {
      const session = new TypingSession(
        "id",
        new Date("2023-01-01T01:23:45"),
        new Date("2023-01-01T01:23:46"),
        new Player("Alice"),
        new TypingQuestionSet("id", "title", []),
        [new TypingAttempt("id", "Apple", "Apple")],
      );
      expect(session.getMissTypingCount()).toBe(0);
    });
    test("when there are two attempts", () => {
      const session = new TypingSession(
        "id",
        new Date("2023-01-01T01:23:45"),
        new Date("2023-01-01T01:23:46"),
        new Player("Alice"),
        new TypingQuestionSet("id", "title", []),
        [
          new TypingAttempt("id", "Apple", "Apple"),
          new TypingAttempt("id", "Apple", "Aapple"),
        ],
      );
      expect(session.getMissTypingCount()).toBe(1);
    });
  });
});
