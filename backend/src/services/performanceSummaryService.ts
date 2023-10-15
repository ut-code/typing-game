import { GetPerformanceSummaryResponse } from "@typing-game/api-types";
import { getTypingSessionLogic } from "./typingSessionService.js";
import { PerformanceSummary } from "@typing-game/core";
import { generateRankingLogic } from "./rankingService.js";

export async function generatePerformanceSummaryLogic(
  typingSessionId: string,
): Promise<GetPerformanceSummaryResponse> {
  const performanceSummary: PerformanceSummary = PerformanceSummary.calculate(
    await getTypingSessionLogic(typingSessionId),
    await generateRankingLogic(),
  );
  return performanceSummary;
}
