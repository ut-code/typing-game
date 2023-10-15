import { API_BASE_URL } from "../../config/apiConfig";
import {
  PostTypingSessionRequest,
  PostTypingSessionResponse,
} from "@typing/api-types";

export async function createTypingSessionService({
  variables,
}: {
  variables: PostTypingSessionRequest;
}): Promise<PostTypingSessionResponse> {
  const response = await fetch(`${API_BASE_URL}/typing-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(variables),
  });
  const data = await response.json();
  return data as PostTypingSessionResponse;
}
