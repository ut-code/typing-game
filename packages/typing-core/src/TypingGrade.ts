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
  if (typingScore >= 500) {
    return "S+";
  } else if (typingScore >= 400) {
    return "S";
  } else if (typingScore >= 300) {
    return "S-";
  } else if (typingScore >= 250) {
    return "A+";
  } else if (typingScore >= 220) {
    return "A";
  } else if (typingScore >= 200) {
    return "A-";
  } else if (typingScore >= 190) {
    return "B+";
  } else if (typingScore >= 170) {
    return "B";
  } else if (typingScore >= 150) {
    return "B-";
  } else if (typingScore >= 140) {
    return "C+";
  } else if (typingScore >= 120) {
    return "C";
  } else if (typingScore >= 100) {
    return "C-";
  } else if (typingScore >= 90) {
    return "D+";
  } else if (typingScore >= 70) {
    return "D";
  } else if (typingScore >= 50) {
    return "D-";
  } else if (typingScore >= 30) {
    return "E+";
  } else if (typingScore >= 10) {
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
