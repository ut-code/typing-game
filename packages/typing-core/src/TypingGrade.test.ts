import { describe, expect, test } from "vitest";
import TypingGrade from "./TypingGrade.js";
import TypingScore from "./TypingScore.js";

describe("TypingGrade", () => {
  describe("calculate", () => {
    test("when score is 240", () => {
      const grade = TypingGrade.calculate(new TypingScore(240));
      expect(grade.grade).toBe("S+");
    });
    test("when score is 210", () => {
      const grade = TypingGrade.calculate(new TypingScore(210));
      expect(grade.grade).toBe("S");
    });
    test("when score is 180", () => {
      const grade = TypingGrade.calculate(new TypingScore(180));
      expect(grade.grade).toBe("S-");
    });
    test("when score is 165", () => {
      const grade = TypingGrade.calculate(new TypingScore(165));
      expect(grade.grade).toBe("A+");
    });
    test("when score is 150", () => {
      const grade = TypingGrade.calculate(new TypingScore(150));
      expect(grade.grade).toBe("A");
    });
    test("when score is 135", () => {
      const grade = TypingGrade.calculate(new TypingScore(135));
      expect(grade.grade).toBe("A-");
    });
    test("when score is 120", () => {
      const grade = TypingGrade.calculate(new TypingScore(120));
      expect(grade.grade).toBe("B+");
    });
    test("when score is 105", () => {
      const grade = TypingGrade.calculate(new TypingScore(105));
      expect(grade.grade).toBe("B");
    });
    test("when score is 90", () => {
      const grade = TypingGrade.calculate(new TypingScore(90));
      expect(grade.grade).toBe("B-");
    });
    test("when score is 75", () => {
      const grade = TypingGrade.calculate(new TypingScore(75));
      expect(grade.grade).toBe("C+");
    });
    test("when score is 60", () => {
      const grade = TypingGrade.calculate(new TypingScore(60));
      expect(grade.grade).toBe("C");
    });
    test("when score is 50", () => {
      const grade = TypingGrade.calculate(new TypingScore(50));
      expect(grade.grade).toBe("C-");
    });
    test("when score is 40", () => {
      const grade = TypingGrade.calculate(new TypingScore(40));
      expect(grade.grade).toBe("D+");
    });
    test("when score is 30", () => {
      const grade = TypingGrade.calculate(new TypingScore(30));
      expect(grade.grade).toBe("D");
    });
    test("when score is 20", () => {
      const grade = TypingGrade.calculate(new TypingScore(20));
      expect(grade.grade).toBe("D-");
    });
    test("when score is 10", () => {
      const grade = TypingGrade.calculate(new TypingScore(10));
      expect(grade.grade).toBe("E+");
    });
    test("when score is 5", () => {
      const grade = TypingGrade.calculate(new TypingScore(5));
      expect(grade.grade).toBe("E");
    });
    test("when score is 0", () => {
      const grade = TypingGrade.calculate(new TypingScore(0));
      expect(grade.grade).toBe("E-");
    });
  });
});
