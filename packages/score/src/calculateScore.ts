import { TypingAttempt } from "types";
import calculateCorrectTypingCount from "./calculateCorrectTypingCount.js";
import calculateMissTypingCount from "./calculateMissTypingCount.js";

export default function calculateScore(typingAttempts: TypingAttempt[]) {
  return (
    calculateCorrectTypingCount(typingAttempts) -
    calculateMissTypingCount(typingAttempts)
  );
}
