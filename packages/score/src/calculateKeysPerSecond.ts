import TypingAttempt from "types/src/TypingAttempt";

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
