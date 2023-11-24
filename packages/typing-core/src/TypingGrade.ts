import TypingScore from "./TypingScore.js";

type TypingGradeType =
  | "S+"
  | "S"
  | "S-"
  | "A+"
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C"
  | "C-"
  | "D+"
  | "D"
  | "D-"
  | "E+"
  | "E"
  | "E-";

function calculateTypingGrade(typingScore: number): TypingGradeType {
  if (typingScore >= 240) {
    return "S+";
  } else if (typingScore >= 210) {
    return "S";
  } else if (typingScore >= 180) {
    return "S-";
  } else if (typingScore >= 165) {
    return "A+";
  } else if (typingScore >= 150) {
    return "A";
  } else if (typingScore >= 135) {
    return "A-";
  } else if (typingScore >= 120) {
    return "B+";
  } else if (typingScore >= 105) {
    return "B";
  } else if (typingScore >= 90) {
    return "B-";
  } else if (typingScore >= 75) {
    return "C+";
  } else if (typingScore >= 60) {
    return "C";
  } else if (typingScore >= 50) {
    return "C-";
  } else if (typingScore >= 40) {
    return "D+";
  } else if (typingScore >= 30) {
    return "D";
  } else if (typingScore >= 20) {
    return "D-";
  } else if (typingScore >= 10) {
    return "E+";
  } else if (typingScore >= 5) {
    return "E";
  } else {
    return "E-";
  }
}

export default class TypingGrade {
  readonly grade: TypingGradeType;

  constructor(grade: string) {
    if (
      grade !== "S+" &&
      grade !== "S" &&
      grade !== "S-" &&
      grade !== "A+" &&
      grade !== "A" &&
      grade !== "A-" &&
      grade !== "B+" &&
      grade !== "B" &&
      grade !== "B-" &&
      grade !== "C+" &&
      grade !== "C" &&
      grade !== "C-" &&
      grade !== "D+" &&
      grade !== "D" &&
      grade !== "D-" &&
      grade !== "E+" &&
      grade !== "E" &&
      grade !== "E-"
    ) {
      throw new Error("Invalid grade");
    }
    this.grade = grade;
  }

  static calculate(typingScore: TypingScore): TypingGrade {
    return new TypingGrade(calculateTypingGrade(typingScore.score));
  }
}
