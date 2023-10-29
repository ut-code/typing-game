import { describe, expect, test } from "vitest";
import Player from "./Player.js";

describe("Player", () => {
  describe("equals", () => {
    test("when name is same", () => {
      const player = new Player("Alice");
      expect(player.equals(new Player("Alice"))).toBe(true);
    });
    test("when name is different", () => {
      const player = new Player("Alice");
      expect(player.equals(new Player("Bob"))).toBe(false);
    });
  });
});
