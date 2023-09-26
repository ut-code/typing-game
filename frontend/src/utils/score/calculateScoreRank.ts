type ScoreRank = "SS" | "S" | "A" | "B" | "C" | "D" | "E";

/**
 * Calculate score rank.
 * @param problemSolved number of problems solved
 * @param questionCount number of questions
 * @param correctInputCount number of correct inputs
 * @param incorrectInputCount number of incorrect inputs
 * @param kps key strokes per second
 * @returns score rank
 */
export default function calculateScoreRank(
  problemSolved: number,
  questionCount: number,
  correctInputCount: number,
  incorrectInputCount: number,
  kps: number,
): ScoreRank {
  if (incorrectInputCount === 0 && kps >= 5 && problemSolved === questionCount)
    return "SS";
  else if (
    correctInputCount / (correctInputCount + incorrectInputCount + 1) > 0.9 &&
    kps >= 5 &&
    problemSolved === questionCount
  )
    return "S";
  else if (
    correctInputCount / (correctInputCount + incorrectInputCount + 1) > 0.8 &&
    kps >= 4
  )
    return "A";
  else if (
    correctInputCount / (correctInputCount + incorrectInputCount + 1) > 0.8 &&
    kps >= 3
  )
    return "B";
  else if (
    correctInputCount / (correctInputCount + incorrectInputCount + 1) <
    0.5
  )
    return "E";
  else if (
    correctInputCount / (correctInputCount + incorrectInputCount + 1) > 0.7 &&
    kps >= 2
  )
    return "C";
  else return "D";
}
