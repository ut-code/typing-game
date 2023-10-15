import { API_BASE_URL } from "../../config/apiConfig";
import { GetPerformanceSummaryResponse } from "@typing/api-types";

export async function getPerformanceSummaryService(variables: {
  typingSessionId: string;
}): Promise<GetPerformanceSummaryResponse> {
  const response = await fetch(
    `${API_BASE_URL}/performance-summary/${variables.typingSessionId}`,
  );
  const data = await response.json();
  return data as GetPerformanceSummaryResponse;
}
