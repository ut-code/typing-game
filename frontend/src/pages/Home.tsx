/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import "./style.css";
// @ts-ignore
import script from "./script.js";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Stack, Accordion } from "react-bootstrap";

export default function Home() {
  const [userName, setUserName] = useState<string>("");
  const [qnumber, setQnumber] = useState<string>("");
  const navigation = useNavigate();
  useEffect(() => {
    script();
  }, []);
  return (
    <>
      <Header />
      <Stack gap={3}>
        <div id="userinput">
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>ユーザーネーム</Form.Label>
              <Form.Control
                placeholder="Guest"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
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
                <option>99</option>
                <option>1</option>
                <option>20</option>
                <option>21</option>
                <option>22</option>
                <option>23</option>
              </Form.Select>
              <Form.Text className="text-muted">
                1: htmlを書いてみよう 10: 手頃なやつ 20: ロンドン橋落ちた 21:
                ハンプティダンプティ 22: きらきら星 23: Hey Diddle Diddle 99:
                テスト用
              </Form.Text>
            </Form.Group>

            <Button
              variant="secondary"
              id="play-button"
              onClick={() => {
                // ユーザーの入力情報を受け取る関数
                async function postStorage() {
                  // JSON形式でmain.jsから受信
                  const json = JSON.stringify({
                    username: userName,
                    qnumber: qnumber,
                  });
                  const response = await fetch(
                    `${import.meta.env.VITE_API_ENDPOINT}/localSave`, // https://github.com/ut-code/typescript-react-node-template/blob/master/frontend/src/App.tsx を参照
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
