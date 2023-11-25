import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import typingGameQuestionSets from "@typing/question-sets";
import PlayerNameInput from "./components/PlayerNameInput";
import QuestionSetInput from "./components/QuestionSetInput";

export default function SetupForm(): JSX.Element {
  const [playerName, setPlayerName] = useState<string>(
    localStorage.getItem("playerName") || "Guest",
  );
  const [questionSetId, setQuestionSetId] = useState<string>(
    typingGameQuestionSets[0].id,
  );

  const Navigate = useNavigate();

  // ユーザーの入力情報を受け取る関数
  const postStorage = () => {
    localStorage.setItem("playerName", playerName);
    localStorage.setItem("questionSetId", questionSetId);
    // fetchAPI後に別ページへ遷移
    Navigate("/play");
  };

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      postStorage();
    }
  });

  return (
    <Form>
      <PlayerNameInput playerName={playerName} setPlayerName={setPlayerName} />
      <QuestionSetInput
        questionSetId={questionSetId}
        setQuestionSetId={setQuestionSetId}
      />
      <Button variant="secondary" id="play-button" onClick={postStorage}>
        Play
      </Button>
    </Form>
  );
}
