import { describe, expect, test } from "vitest";
import TypingScore from "./TypingScore.js";
import TypingSession from "./TypingSession.js";
import Player from "./Player.js";
import TypingTaskCollection from "./TypingTaskCollection.js";
import TypingAttempt from "./TypingAttempt.js";
import TypingTask from "./TypingTask.js";

describe("TypingScore", () => {
  describe("calculate", () => {
    test("when targetCharacters is same with inputCharacters", () => {
      const score = TypingScore.calculate(
        new TypingSession(
          "id",
          new Date("2023-01-01T01:23:45"),
          new Date("2023-01-01T01:23:46"),
          new Player("Alice"),
          new TypingTaskCollection("id", "title", [
            new TypingTask("Apple", ["Apple"]),
          ]),
          [
            new TypingAttempt("id", "Apple", "Apple"),
            new TypingAttempt("id", "Apple", "Apple"),
          ],
        ),
      );
      expect(score.score).toBe(10);
    });
    test("when targetCharacters is different from inputCharacters", () => {
      const score = TypingScore.calculate(
        new TypingSession(
          "id",
          new Date("2023-01-01T01:23:45"),
          new Date("2023-01-01T01:23:46"),
          new Player("Alice"),
          new TypingTaskCollection("id", "title", [
            new TypingTask("Apple", ["Apple"]),
          ]),
          [
            new TypingAttempt("id", "Apple", "Apple"),
            new TypingAttempt("id", "Apple", "Aapple"),
          ],
        ),
      );
      expect(score.score).toBe(9);
    });
  });
});
