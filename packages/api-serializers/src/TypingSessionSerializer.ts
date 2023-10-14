import { TypingSession, Player, TypingAttempt } from "@typing-game/core";
import typingQuestionSets from "@typing-game/question-sets";

export default class TypingSessionSerializer {
  static fromObject(typingSession: {
    id: string;
    startTime: Date;
    endTime: Date;
    playerName: string;
    typingQuestionSetId: string;
    typingAttempts: {
      id: string;
      inputCharacters: string;
      targetCharacters: string;
    }[];
  }): TypingSession {
    return new TypingSession(
      typingSession.id,
      typingSession.startTime,
      typingSession.endTime,
      new Player(typingSession.playerName),
      typingQuestionSets.find(
        (typingQuestionSet) =>
          typingQuestionSet.id === typingSession.typingQuestionSetId,
      ) ?? typingQuestionSets[0],
      typingSession.typingAttempts.map(
        (typingAttempt) =>
          new TypingAttempt(
            typingAttempt.id,
            typingAttempt.inputCharacters,
            typingAttempt.targetCharacters,
          ),
      ),
    );
  }

  static toObject(typingSession: TypingSession) {
    return {
      id: typingSession.id,
      startTime: typingSession.startTime,
      endTime: typingSession.endTime,
      playerName: typingSession.player.name,
      typingQuestionSetId: typingSession.typingQuestionSet.id,
      typingAttempts: typingSession.typingAttempts.map((typingAttempt) => ({
        id: typingAttempt.id,
        inputCharacters: typingAttempt.inputCharacters,
        targetCharacters: typingAttempt.targetCharacters,
      })),
    };
  }
}
