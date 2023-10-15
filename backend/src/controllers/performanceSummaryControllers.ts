import { Request, Response } from "express";
import { generatePerformanceSummaryLogic } from "../services/performanceSummaryService.js";
import { GetPerformanceSummaryResponse } from "@typing-game/api-types";
import { PerformanceSummarySerializer } from "@typing-game/api-serializers";

export async function getPerformanceSummaryHandler(
  request: Request,
  response: Response,
) {
  const performanceSummary: GetPerformanceSummaryResponse =
    PerformanceSummarySerializer.toObject(
      await generatePerformanceSummaryLogic(request.params.id),
    );
  response.json(performanceSummary);
}
