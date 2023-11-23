import { describe, expect, test } from "vitest";
import TypingGrade from "./TypingGrade.js";
import TypingScore from "./TypingScore.js";

describe("TypingGrade", () => {
  describe("calculate", () => {
    test("when score is 100", () => {
      const grade = TypingGrade.calculate(new TypingScore(100));
      expect(grade.grade).toBe("S");
    });
    test("when score is 90", () => {
      const grade = TypingGrade.calculate(new TypingScore(90));
      expect(grade.grade).toBe("S");
    });
    test("when score is 80", () => {
      const grade = TypingGrade.calculate(new TypingScore(80));
      expect(grade.grade).toBe("A");
    });
    test("when score is 70", () => {
      const grade = TypingGrade.calculate(new TypingScore(70));
      expect(grade.grade).toBe("B");
    });
    test("when score is 60", () => {
      const grade = TypingGrade.calculate(new TypingScore(60));
      expect(grade.grade).toBe("C");
    });
    test("when score is 50", () => {
      const grade = TypingGrade.calculate(new TypingScore(50));
      expect(grade.grade).toBe("D");
    });
    test("when score is 40", () => {
      const grade = TypingGrade.calculate(new TypingScore(40));
      expect(grade.grade).toBe("E");
    });
    test("when score is 30", () => {
      const grade = TypingGrade.calculate(new TypingScore(30));
      expect(grade.grade).toBe("E");
    });
  });
});
