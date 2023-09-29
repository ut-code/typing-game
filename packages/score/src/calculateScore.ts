import { TypingAttempt } from "types";
import calculateCorrectTypingCount from "./calculateCorrectTypingCount";
import calculateMissTypingCount from "./calculateMissTypingCount";

export default function calculateScore(typingAttempts: TypingAttempt[]) {
  return (
    calculateCorrectTypingCount(typingAttempts) -
    calculateMissTypingCount(typingAttempts)
  );
}
