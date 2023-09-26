/**
 * Calculates typing speed in characters per second.
 * @param time time spent
 * @param correctInputCount number of correct inputs
 * @returns typing speed in characters per second
 */
export default function calculateTypingSpeed(
  time: number,
  correctInputCount: number,
): number {
  return time === 0 ? 99.99 : correctInputCount / time;
}
