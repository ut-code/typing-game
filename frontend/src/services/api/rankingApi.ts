import { API_BASE_URL } from "../../config/apiConfig";
import RankingEntry from "types/src/RankingEntry";

export async function getRankingApi(): Promise<RankingEntry[]> {
  const response = await fetch(`${API_BASE_URL}/ranking`);
  const data = await response.json();
  return data as RankingEntry[];
}
