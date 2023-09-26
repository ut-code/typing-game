/**
 * Calculate score
 * @param time time spent
 * @param problemSolved number of problems solved
 * @param questionCount number of questions
 * @param correctInputCount number of correct inputs
 * @param incorrectInputCount number of incorrect inputs
 * @returns score
 */
export default function calculateScore(
  time: number,
  problemSolved: number,
  questionCount: number,
  correctInputCount: number,
  incorrectInputCount: number,
): number {
  const progressRate = problemSolved / questionCount;
  const inputCount = correctInputCount + incorrectInputCount;
  const correctRate = correctInputCount ** 2 / (inputCount + 1); // 問題文字数多いと有利！
  const typingSpeed = time === 0 ? 99.99 : correctInputCount / time;

  // 重みをつけて算出
  const progressWeight = 1000;
  const correctRateWeight = 1;
  const typingSpeedWeight = 5;
  return Math.floor(
    progressWeight *
      progressRate *
      (correctRateWeight * correctRate + typingSpeedWeight * typingSpeed),
  );
}
