import { useState } from "react";
import { createTypingSessionApi } from "../../services/api/typingSessionApi";
import { TypingSession } from "typing-game-api-types";

export function useTypingSession() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  async function addTypingSession({
    variables: {
      startTime,
      endTime,
      playerName,
      questionSetId,
      typingAttempts,
    },
  }: {
    variables: {
      startTime: Date;
      endTime: Date;
      playerName: string;
      questionSetId: string;
      typingAttempts: { inputCharacters: string; targetCharacters: string }[];
    };
  }): Promise<TypingSession> {
    setLoading(true);
    let typingSession: TypingSession;
    try {
      typingSession = await createTypingSessionApi(
        startTime,
        endTime,
        playerName,
        questionSetId,
        typingAttempts,
      );
    } catch (error) {
      setError(error);
      throw error;
    }
    setLoading(false);
    return typingSession;
  }

  return { addTypingSession, loading, error };
}
