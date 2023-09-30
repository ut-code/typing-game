import { Request, Response } from "express";
import { getScore } from "../services/scoreService";

export async function getScoreHandler(request: Request, response: Response) {
  const score = await getScore(request.params.id);
  response.json(score);
}
