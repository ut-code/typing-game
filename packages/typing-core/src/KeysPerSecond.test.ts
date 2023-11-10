import { describe, expect, test } from "vitest";
import KeysPerSecond from "./KeysPerSecond.js";
import TypingSession from "./TypingSession.js";
import TypingAttempt from "./TypingAttempt.js";
import Player from "./Player.js";
import TypingTaskCollection from "./TypingTaskCollection.js";

describe("KeysPerSecond", () => {
  describe("calculate", () => {
    test("when seconds is 1", () => {
      const keysPerSecond = KeysPerSecond.calculate(
        new TypingSession(
          "id",
          new Date("2023-01-01T01:23:45"),
          new Date("2023-01-01T01:23:46"),
          new Player("Alice"),
          new TypingTaskCollection("id", "title", []),
          [
            new TypingAttempt("id", "Apple", "Apple"),
            new TypingAttempt("id", "Apple", "Aapple"),
          ],
        ),
      );
      expect(keysPerSecond.keysPerSecond).toBe(10);
    });
    test("when seconds is 2", () => {
      const keysPerSecond = KeysPerSecond.calculate(
        new TypingSession(
          "id",
          new Date("2023-01-01T01:23:45"),
          new Date("2023-01-01T01:23:47"),
          new Player("Alice"),
          new TypingTaskCollection("id", "title", []),
          [
            new TypingAttempt("id", "Apple", "Apple"),
            new TypingAttempt("id", "Apple", "Aapple"),
          ],
        ),
      );
      expect(keysPerSecond.keysPerSecond).toBe(5);
    });
  });
});
