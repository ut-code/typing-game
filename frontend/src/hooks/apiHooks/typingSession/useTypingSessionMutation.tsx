import { createTypingSessionApi } from "../../../services/api/typingSessionApi";
import useMutation from "../common/useMutation";

export default function useCreateTypingSessionMutation() {
  const {
    mutate: createTypingSession,
    loading: loadingCreateTypingSession,
    error: createTypingSessionError,
  } = useMutation(createTypingSessionApi);
  return {
    createTypingSession,
    loadingCreateTypingSession,
    createTypingSessionError,
  };
}
