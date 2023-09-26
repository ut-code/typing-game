/**
 * Calculates the typing speed in KPS (Keystrokes per second)
 * @param time time spent
 * @param correctInputCount number of correct inputs
 * @returns typing speed in KPS
 */
export default function calculateKps(
  time: number,
  correctInputCount: number,
): number {
  const typingSpeed = time === 0 ? 99.99 : correctInputCount / time;
  return parseFloat(typingSpeed.toFixed(2));
}
