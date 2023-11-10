import { describe, expect, test } from "vitest";
import Ranking, { RankingEntry } from "./Ranking.js";
import Player from "./Player.js";
import TypingTaskCollection from "./TypingTaskCollection.js";
import TypingSession from "./TypingSession.js";
import TypingAttempt from "./TypingAttempt.js";
import TypingScore from "./TypingScore.js";

describe("Ranking", () => {
  describe("generate", () => {
    test("when there is no session", () => {
      const ranking = Ranking.generate([]);
      expect(ranking).toEqual([]);
    });
    test("when there is one session", () => {
      const ranking = Ranking.generate([
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
      ]);
      expect(ranking).toEqual([
        new RankingEntry(
          new Player("Alice"),
          new TypingTaskCollection("id", "title", []),
          new TypingScore(9),
          new Date("2023-01-01T01:23:46"),
        ),
      ]);
    });
    test("when there are two sessions", () => {
      const ranking = Ranking.generate([
        new TypingSession(
          "id1",
          new Date("2023-01-01T01:23:45"),
          new Date("2023-01-01T01:23:46"),
          new Player("Alice"),
          new TypingTaskCollection("id", "title", []),
          [
            new TypingAttempt("id", "Apple", "Apple"),
            new TypingAttempt("id", "Apple", "Apple"),
          ],
        ),
        new TypingSession(
          "id2",
          new Date("2023-01-01T01:23:45"),
          new Date("2023-01-01T01:23:47"),
          new Player("Bob"),
          new TypingTaskCollection("id", "title", []),
          [
            new TypingAttempt("id", "Apple", "Apple"),
            new TypingAttempt("id", "Apple", "Aapple"),
          ],
        ),
      ]);
      expect(ranking).toEqual([
        new RankingEntry(
          new Player("Alice"),
          new TypingTaskCollection("id", "title", []),
          new TypingScore(10),
          new Date("2023-01-01T01:23:46"),
        ),
        new RankingEntry(
          new Player("Bob"),
          new TypingTaskCollection("id", "title", []),
          new TypingScore(9),
          new Date("2023-01-01T01:23:47"),
        ),
      ]);
    });
  });
});
