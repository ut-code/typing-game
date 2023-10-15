import { Request, Response } from "express";
import { createTypingSessionLogic } from "../services/typingSessionService.js";
import {
  PostTypingSessionRequest,
  PostTypingSessionResponse,
} from "@typing/api-types";
import { TypingSessionSerializer } from "@typing/api-serializers";

export async function postTypingSessionHandler(
  request: Request,
  response: Response,
) {
  const { startTime, endTime, playerName, questionSetId, typingAttempts } =
    request.body as PostTypingSessionRequest;
  const typingSession: PostTypingSessionResponse =
    TypingSessionSerializer.toObject(
      await createTypingSessionLogic(
        startTime,
        endTime,
        playerName,
        questionSetId,
        typingAttempts,
      ),
    );
  response.json(typingSession);
}
