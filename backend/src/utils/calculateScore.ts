import { TypingAttempt } from "@prisma/client";
import calculateCorrectTypingCount from "./calculateCorrectTypingCount";
import calculateMissTypingCount from "./calculateMissTypingCount";

export default function calculateScore(typingAttempts: TypingAttempt[]) {
  return (
    calculateCorrectTypingCount(typingAttempts) -
    calculateMissTypingCount(typingAttempts)
  );
}
