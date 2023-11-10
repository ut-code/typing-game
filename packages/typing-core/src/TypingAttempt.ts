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
      // 正解、次の文字へ
      inputCharactersIndex += 1;
    } else {
      // 間違い、ミスタイピングカウントを増やす
      missTypingCount += 1;
    }
  }
  return missTypingCount;
}

export default class TypingAttempt {
  readonly id: string;
  readonly targetCharacters: string;
  readonly inputCharacters: string;

  constructor(id: string, targetCharacters: string, inputCharacters: string) {
    this.id = id;
    this.targetCharacters = targetCharacters;
    this.inputCharacters = inputCharacters;
  }

  getCorrectTypingCount(): number {
    return calculateCorrectTypingCount(
      this.targetCharacters,
      this.inputCharacters,
    );
  }

  getMissTypingCount(): number {
    return calculateMissTypingCount(
      this.targetCharacters,
      this.inputCharacters,
    );
  }
}
