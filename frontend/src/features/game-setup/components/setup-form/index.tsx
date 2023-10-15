import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import typingGameQuestionSets from "@typing/question-sets";
import UserNameInput from "./components/UserNameInput";
import QuestionSetInput from "./components/QuestionSetInput";

export default function SetupForm(): JSX.Element {
  const [userName, setUserName] = useState<string>(
    localStorage.getItem("username") || "",
  );
  const [questionSetId, setQuestionSetId] = useState<string>(
    typingGameQuestionSets[0].id,
  );
  // useNavigate を Navigate に変化させる呪文
  const Navigate = useNavigate();

  // ユーザーの入力情報を受け取る関数
  const postStorage = () => {
    localStorage.setItem("username", userName || "Guest");
    localStorage.setItem("questionSetId", questionSetId);
    // fetchAPI後に別ページへ遷移
    Navigate("/play");
  };

  // localStorageをリセットする
  let unmounted = false;
  useEffect(() => {
    if (unmounted) return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    unmounted = true;
    Object.keys(localStorage).forEach((key) => {
      if (key !== "username") localStorage.removeItem(key);
    });
  }, []);

  return (
    <Form>
      <UserNameInput userName={userName} setUserName={setUserName} />
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
