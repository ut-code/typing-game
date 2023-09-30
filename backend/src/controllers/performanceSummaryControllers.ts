import { Request, Response } from "express";
import { getPerformanceSummary } from "../services/performanceSummaryService";

export async function getPerformanceSummaryHandler(
  request: Request,
  response: Response,
) {
  const score = await getPerformanceSummary(request.params.id);
  response.json(score);
}
