import { TypingAttempt } from "@prisma/client";

function calculateCorrectTypingCountFromTypingAttempt(
  inputCharacters: string,
  targetCharacters: string,
): number {
  let inputCharactersIndex = 0;
  let correctTypingCount = 0;
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
      correctTypingCount += 1;
    }
  }
  return correctTypingCount;
}

export default function calculateCorrectTypingCount(
  typingAttempts: TypingAttempt[],
): number {
  return typingAttempts.reduce((correctTypingCount, typingAttempt) => {
    return (
      correctTypingCount +
      calculateCorrectTypingCountFromTypingAttempt(
        typingAttempt.inputCharacters,
        typingAttempt.targetCharacters,
      )
    );
  }, 0);
}
