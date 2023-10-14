import { Ranking } from "../../../packages/typing-core/dist/index.js";
import { getAllTypingSessionLogic } from "./typingSessionService.js";

export async function generateRankingLogic(): Promise<Ranking> {
  const typingSessions = await getAllTypingSessionLogic();
  const ranking = Ranking.generate(typingSessions);
  return ranking;
}
