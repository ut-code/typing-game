import { Request, Response } from "express";
import { createTypingSessionLogic } from "../services/typingSessionService";

export async function postTypingSessionHandler(
  request: Request,
  response: Response,
) {
  const { startTime, endTime, playerName, questionSetId, typingAttempts } =
    request.body;
  const typingSession = await createTypingSessionLogic(
    startTime,
    endTime,
    playerName,
    questionSetId,
    typingAttempts,
  );
  response.json(typingSession);
}
