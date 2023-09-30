import { Request, Response } from "express";
import { generateRankingLogic } from "../services/rankingService";
import { GetRankingResponse } from "@typing-game/api-types";

export async function getRankingHandler(request: Request, response: Response) {
  const ranking: GetRankingResponse = await generateRankingLogic();
  response.json(ranking);
}
