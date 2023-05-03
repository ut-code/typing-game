const calculateScoreRank = (
  problemSolved: number,
  correctInputCount: number,
  incorrectInputCount: number,
  kps: number,
  questionsLength: number
) => {
  if (incorrectInputCount === 0 && kps >= 5 && problemSolved === questionsLength) return "SS"
  else if (
    correctInputCount / (correctInputCount + incorrectInputCount + 1) > 0.9 &&
    kps >= 5 &&
    problemSolved === questionsLength
  )
    return "S"
  else if (correctInputCount / (correctInputCount + incorrectInputCount + 1) > 0.8 && kps >= 4) return "A"
  else if (correctInputCount / (correctInputCount + incorrectInputCount + 1) > 0.8 && kps >= 3) return "B"
  else if (correctInputCount / (correctInputCount + incorrectInputCount + 1) < 0.5) return "E"
  else if (correctInputCount / (correctInputCount + incorrectInputCount + 1) > 0.7 && kps >= 2) return "C"
  else return "D"
}

export default calculateScoreRank
