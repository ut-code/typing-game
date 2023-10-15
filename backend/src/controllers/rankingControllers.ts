import { Request, Response } from "express";
import { generateRankingLogic } from "../services/rankingService.js";
import { GetRankingResponse } from "@typing-game/api-types";
import { RankingSerializer } from "@typing-game/api-serializers";

export async function getRankingHandler(request: Request, response: Response) {
  const ranking: GetRankingResponse = RankingSerializer.toObject(
    await generateRankingLogic(),
  );
  response.json(ranking);
}
