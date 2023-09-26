import calculateTypingSpeed from "./calculateTypingSpeed";

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
  const typingSpeed = calculateTypingSpeed(time, correctInputCount);
  return parseFloat(typingSpeed.toFixed(2));
}
