import TypingAttempt from "types/src/TypingAttempt";
import calculateCorrectTypingCount from "./calculateCorrectTypingCount";
import calculateMissTypingCount from "./calculateMissTypingCount";

export default function calculateScore(typingAttempts: TypingAttempt[]) {
  return (
    calculateCorrectTypingCount(typingAttempts) -
    calculateMissTypingCount(typingAttempts)
  );
}
