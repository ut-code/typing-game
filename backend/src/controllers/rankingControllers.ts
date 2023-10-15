import { Request, Response } from "express";
import { generateRankingLogic } from "../services/rankingService.js";
import { GetRankingResponse } from "@typing/api-types";
import { RankingSerializer } from "@typing/api-serializers";

export async function getRankingHandler(request: Request, response: Response) {
  const ranking: GetRankingResponse = RankingSerializer.toObject(
    await generateRankingLogic(),
  );
  response.json(ranking);
}
