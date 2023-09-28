import { API_BASE_URL } from "../../config/apiConfig";

export async function createTypingSessionApi(
  startTime: Date,
  endTime: Date,
  playerName: string,
  questionSetId: string,
  typingAttempts: { inputCharacters: string; targetCharacters: string }[],
) {
  const response = await fetch(`${API_BASE_URL}/typing-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      startTime,
      endTime,
      playerName,
      questionSetId,
      typingAttempts,
    }),
  });
  const data = await response.json();
  return data;
}
