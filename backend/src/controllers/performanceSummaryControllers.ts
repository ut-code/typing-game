import { Request, Response } from "express";
import { getPerformanceSummary } from "../services/performanceSummaryService.js";
import { GetPerformanceSummaryResponse } from "@typing-game/api-types";

export async function getPerformanceSummaryHandler(
  request: Request,
  response: Response,
) {
  const performanceSummary: GetPerformanceSummaryResponse =
    await getPerformanceSummary(request.params.id);
  response.json(performanceSummary);
}
