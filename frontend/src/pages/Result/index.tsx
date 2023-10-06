import { useParams } from "react-router-dom";
import TypingResult from "../../features/typingResult";

export default function Result() {
  const { uuid: typingSessionId } = useParams();
  if (typingSessionId === undefined) {
    throw new Error("typingSessionId is undefined");
  }

  return <TypingResult typingSessionId={typingSessionId} />;
}
