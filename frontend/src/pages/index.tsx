import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// CSS関連
import "./style.css";
import { Button, Form } from "react-bootstrap";

// コンポーネント
import Header from "../components/Header";
import Footer from "../components/Footer";
import typingGameQuestionSets from "@typing-game/question-sets";
import HowToPlay from "../features/game-setup/components/HowToPlay";
import UserNameInput from "../features/game-setup/components/UserNameInput";

export default function Home() {
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
    Navigate("/basic");
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
    <>
      <Header />

      <div className="elements">
        <Form>
          <UserNameInput userName={userName} setUserName={setUserName} />
          <Form.Group className="mb-3" controlId="qnumber">
            <Form.Label>
              <b>問題番号</b>
            </Form.Label>
            <Form.Select
              value={questionSetId}
              onChange={(e) => {
                setQuestionSetId(e.target.value);
              }}
            >
              <option value={0}>Basic</option>
              <option value={1}>Fruits</option>
            </Form.Select>
          </Form.Group>

          <Button variant="secondary" id="play-button" onClick={postStorage}>
            Play
          </Button>
        </Form>
        <HowToPlay />
      </div>

      <Footer />
    </>
  );
}
