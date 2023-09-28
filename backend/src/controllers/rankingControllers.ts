import { Request, Response } from "express";
import { generateRankingLogic } from "../services/rankingService";

export async function getRankingHandler(request: Request, response: Response) {
  const ranking = await generateRankingLogic();
  response.json(ranking);
}
