import { API_BASE_URL } from "../../config/apiConfig";
import { Score } from "@typing-game/api-types";

export async function getPerformanceSummaryApi(
  typingSessionId: string,
): Promise<Score> {
  const response = await fetch(
    `${API_BASE_URL}/performance-summary/${typingSessionId}`,
  );
  const data = await response.json();
  return data as Score;
}
