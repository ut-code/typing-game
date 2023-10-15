export interface PostTypingSessionRequest {
  startTime: Date;
  endTime: Date;
  playerName: string;
  typingQuestionSetId: string;
  typingAttempts: {
    inputCharacters: string;
    targetCharacters: string;
  }[];
}

export interface PostTypingSessionResponse {
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
}
