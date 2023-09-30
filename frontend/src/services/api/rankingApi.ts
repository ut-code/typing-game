import { API_BASE_URL } from "../../config/apiConfig";
import { GetRankingResponse } from "@typing-game/api-types";

export async function getRankingApi(): Promise<GetRankingResponse> {
  const response = await fetch(`${API_BASE_URL}/ranking`);
  const data = await response.json();
  return data as GetRankingResponse;
}
