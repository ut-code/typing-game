import { API_BASE_URL } from "../../config/apiConfig";
import Score from "../../types/Score";

export async function getScoreApi(typingSessionId: string): Promise<Score> {
  const response = await fetch(`${API_BASE_URL}/score/${typingSessionId}`);
  const data = await response.json();
  return data as Score;
}
