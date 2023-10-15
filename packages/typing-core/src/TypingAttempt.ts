function calculateCorrectTypingCount(
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

function calculateMissTypingCount(
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

export default class TypingAttempt {
  readonly id: string;
  readonly inputCharacters: string;
  readonly targetCharacters: string;

  constructor(id: string, inputCharacters: string, targetCharacters: string) {
    this.id = id;
    this.inputCharacters = inputCharacters;
    this.targetCharacters = targetCharacters;
  }

  getCorrectTypingCount(): number {
    return calculateCorrectTypingCount(
      this.inputCharacters,
      this.targetCharacters,
    );
  }

  getMissTypingCount(): number {
    return calculateMissTypingCount(
      this.inputCharacters,
      this.targetCharacters,
    );
  }
}
