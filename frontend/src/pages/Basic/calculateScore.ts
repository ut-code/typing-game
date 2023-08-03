/**
 * calculate score
 * @param time time taken to solve the problem
 * @param problemSolved number of problems solved
 * @param correctInputCount number of correct inputs
 * @param incorrectInputCount number of incorrect inputs
 * @param questionsLength number of questions
 * @returns score
 */
const calculateScore = (
  time: number,
  problemSolved: number,
  correctInputCount: number,
  incorrectInputCount: number,
  questionsLength: number,
) => {
  const progressRate = problemSolved / questionsLength
  const difficulty = 0
  const correctRate = correctInputCount ** 2 / (incorrectInputCount + correctInputCount + 1) // 問題文字数多いと有利！
  const typingSpeed = time === 0 ? 99.99 : correctInputCount / time

  // 重みをつけて算出
  const weight1 = 1000
  const weight2 = 0 // 難易度は未実装
  const weight3 = 1
  const weight4 = 5
  return Math.floor(weight1 * progressRate * (weight2 * difficulty + weight3 * correctRate + weight4 * typingSpeed))
}

export default calculateScore
