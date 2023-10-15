import { Ranking } from "@typing/core";
import { getAllTypingSessionLogic } from "./typingSessionService.js";

export async function generateRankingLogic(): Promise<Ranking> {
  const typingSessions = await getAllTypingSessionLogic();
  const ranking = Ranking.generate(typingSessions);
  return ranking;
}
