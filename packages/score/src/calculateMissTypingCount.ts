import TypingAttempt from "types/src/TypingAttempt";

function calculateMissTypingCountFromTypingAttempt(
  inputCharacters: string,
  targetCharacters: string,
): number {
  let inputCharactersIndex = 0;
  let missTypingCount = 0;
  for (
    let targetCharactersIndex = 0;
    targetCharactersIndex < targetCharacters.length;
    targetCharactersIndex += 1
  ) {
    if (
      inputCharactersIndex < inputCharacters.length &&
      inputCharacters[inputCharactersIndex] ===
        targetCharacters[targetCharactersIndex]
    ) {
      inputCharactersIndex += 1;
    } else {
      missTypingCount += 1;
    }
  }
  return missTypingCount;
}

export default function calculateMissTypingCount(
  typingAttempts: TypingAttempt[],
): number {
  return typingAttempts.reduce((missTypingCount, typingAttempt) => {
    return (
      missTypingCount +
      calculateMissTypingCountFromTypingAttempt(
        typingAttempt.inputCharacters,
        typingAttempt.targetCharacters,
      )
    );
  }, 0);
}
