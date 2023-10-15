import { API_BASE_URL } from "../../config/apiConfig";
import { GetPerformanceSummaryResponse } from "@typing/api-types";
import { PerformanceSummarySerializer } from "@typing/api-serializers";
import { PerformanceSummary } from "@typing/core";

export async function getPerformanceSummaryService(variables: {
  typingSessionId: string;
}): Promise<PerformanceSummary> {
  const response = await fetch(
    `${API_BASE_URL}/performance-summary/${variables.typingSessionId}`,
  );
  const data: GetPerformanceSummaryResponse = await response.json();
  return PerformanceSummarySerializer.fromObject(data);
}
