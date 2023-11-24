import TypingSession from "./TypingSession.js";

function calculateKeysPerSecond(typingSession: TypingSession) {
  const typingAttempts = typingSession.typingAttempts;
  const typingDurationInSeconds =
    (typingSession.endTime.getTime() - typingSession.startTime.getTime()) /
    1000;
  const totalInputCharacters = typingAttempts.reduce(
    (totalTypingCount, typingAttempt) => {
      return totalTypingCount + typingAttempt.targetCharacters.length;
    },
    0,
  );
  return parseFloat(
    (totalInputCharacters / typingDurationInSeconds).toFixed(2),
  );
}
export default class KeysPerSecond {
  readonly keysPerSecond: number;

  constructor(keysPerSecond: number) {
    this.keysPerSecond = keysPerSecond;
  }

  static calculate(typingSession: TypingSession): KeysPerSecond {
    return new KeysPerSecond(calculateKeysPerSecond(typingSession));
  }
}
