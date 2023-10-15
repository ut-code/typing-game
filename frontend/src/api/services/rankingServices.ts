import { Ranking } from "@typing/core";
import { API_BASE_URL } from "../../config/apiConfig";
import { GetRankingResponse } from "@typing/api-types";
import { RankingSerializer } from "@typing/api-serializers";

export async function getRankingService(): Promise<Ranking> {
  const response = await fetch(`${API_BASE_URL}/ranking`);
  const data: GetRankingResponse = await response.json();
  return RankingSerializer.fromObject(data);
}
