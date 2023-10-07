import { useParams } from "react-router-dom";
import TypingResult from "../../features/typing-result";

export default function Result() {
  const { uuid: typingSessionId } = useParams();
  if (typingSessionId === undefined) {
    throw new Error("typingSessionId is undefined");
  }

  return <TypingResult typingSessionId={typingSessionId} />;
}
