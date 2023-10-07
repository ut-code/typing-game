import { createTypingSessionService } from "../services/typingSessionServices";
import useMutation from "./common/useMutation";

export default function useCreateTypingSessionMutation() {
  const {
    mutate: createTypingSession,
    loading: loadingCreateTypingSession,
    error: createTypingSessionError,
  } = useMutation(createTypingSessionService);
  return {
    createTypingSession,
    loadingCreateTypingSession,
    createTypingSessionError,
  };
}
