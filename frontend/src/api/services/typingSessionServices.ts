import { TypingSession } from "@typing/core";
import { API_BASE_URL } from "../../config/apiConfig";
import {
  PostTypingSessionRequest,
  PostTypingSessionResponse,
} from "@typing/api-types";
import { TypingSessionSerializer } from "@typing/api-serializers";

export async function createTypingSessionService({
  variables,
}: {
  variables: PostTypingSessionRequest;
}): Promise<TypingSession> {
  const response = await fetch(`${API_BASE_URL}/typing-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(variables),
  });
  const data: PostTypingSessionResponse = await response.json();
  return TypingSessionSerializer.fromObject(data);
}
