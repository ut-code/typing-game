import TypingScore from "./TypingScore.js";

type TypingGradeType = "S" | "A" | "B" | "C" | "D" | "E";

function calculateTypingGrade(typingScore: number): TypingGradeType {
  if (typingScore >= 90) {
    return "S";
  } else if (typingScore >= 80) {
    return "A";
  } else if (typingScore >= 70) {
    return "B";
  } else if (typingScore >= 60) {
    return "C";
  } else if (typingScore >= 50) {
    return "D";
  } else {
    return "E";
  }
}

export default class TypingGrade {
  readonly grade: TypingGradeType;

  constructor(grade: string) {
    if (
      grade !== "S" &&
      grade !== "A" &&
      grade !== "B" &&
      grade !== "C" &&
      grade !== "D" &&
      grade !== "E"
    ) {
      throw new Error("Invalid grade");
    }
    this.grade = grade;
  }

  static calculate(typingScore: TypingScore): TypingGrade {
    return new TypingGrade(calculateTypingGrade(typingScore.score));
  }
}
