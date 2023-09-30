import { TypingAttempt } from "types";

export default function calculateKeysPerSecond(
  typingAttempts: TypingAttempt[],
  typingDurationInSeconds: number,
) {
  const totalInputCharacters = typingAttempts.reduce(
    (totalTypingCount, typingAttempt) => {
      return totalTypingCount + typingAttempt.inputCharacters.length;
    },
    0,
  );
  return totalInputCharacters / typingDurationInSeconds;
}
