import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// CSS関連
import "./style.css";
import { Button, Form, Accordion } from "react-bootstrap";

// コンポーネント
import Header from "../components/Header";
import Footer from "../components/Footer";
import typingGameQuestionSets from "../data/questionSet";

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
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>
              <b>ユーザーネーム（20文字まで）</b>
            </Form.Label>
            <Form.Control
              placeholder="Guest"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              maxLength={20}
            />
          </Form.Group>

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

        <Accordion defaultActiveKey="0" alwaysOpen id="how-to-play">
          <Accordion.Item eventKey="0">
            <Accordion.Header>遊び方</Accordion.Header>
            <Accordion.Body>
              ユーザーネームと問題番号を決めたら、Playボタンを押します。
              <br></br>
              スペースキーを押すと問題が表示され、ゲームがスタートします。
              <br></br>
              速く正確なタイピングで、制限時間内に高得点を目指して頑張りましょう！
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

      <Footer />
    </>
  );
}
