import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import "./style.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Stack, Accordion } from "react-bootstrap";

export default function Home() {
  const [userName, setUserName] = useState<string>("");
  const [qnumber, setQnumber] = useState<string>("");
  const navigation = useNavigate();
  return (
    <>
      <Header />
      <Stack gap={3}>
        <div id="userinput">
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>ユーザーネーム（20文字まで）</Form.Label>
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
              <Form.Label>問題番号</Form.Label>
              <Form.Select
                value={qnumber}
                onChange={(e) => {
                  setQnumber(e.target.value);
                }}
              >
                <option>0</option>
                <option>5</option>
                <option>10</option>
                <option>20</option>
                <option>21</option>
                <option>22</option>
                <option>23</option>
                <option>99</option>
              </Form.Select>
              <Form.Text className="text-muted">
                0: 手頃なやつ 5: 長い英単語集 10: htmlを書いてみよう 11:
                ゲティスバーグ演説 20: ロンドン橋落ちた 21: ハンプティダンプティ
                22: きらきら星 23: Hey Diddle Diddle 99: テスト用
              </Form.Text>
            </Form.Group>

            <Button
              variant="secondary"
              id="play-button"
              onClick={() => {
                // ユーザーの入力情報を受け取る関数
                async function postStorage() {
                  const json = JSON.stringify({
                    username: userName,
                    qnumber: qnumber,
                  });
                  const response = await fetch(
                    `${import.meta.env.VITE_API_ENDPOINT}/localSave`,
                    {
                      method: "post",
                      headers: { "Content-Type": "application/json" },
                      body: json,
                    }
                  );
                  // fetchAPI後に別ページへ遷移
                  navigation("basic");
                }
                postStorage();
              }}
            >
              Play
            </Button>
          </Form>
        </div>

        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>遊び方</Accordion.Header>
            <Accordion.Body>
              ユーザーネームを入力し、問題番号を選択してPlayボタンを押します。スペースキーを押すと問題が表示され、ゲームがスタートします。
              <br></br>
              速く正確なタイピングで、高得点を目指して頑張りましょう！制限時間に気をつけて！
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Stack>
      <Footer />
    </>
  );
}
