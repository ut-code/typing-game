interface TypingAttempt {
  inputCharacters: string;
  targetCharacters: string;
}

export interface PostTypingSessionRequest {
  questionSetId: string;
  playerName: string;
  startTime: Date;
  endTime: Date;
  typingAttempts: TypingAttempt[];
}

export interface PostTypingSessionResponse {
  id: string;
  questionSetId: string;
  playerName: string;
  startTime: Date;
  endTime: Date;
}
