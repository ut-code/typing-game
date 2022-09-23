import { useEffect } from "react";
// @ts-ignore
import script from "./script.js";
import "./style.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";

export default function Home() {
  useEffect(() => {
    script();
  }, []);
  return (
    <>
      <header>
        <b>ut.code(); タイピングゲーム</b>
      </header>
      <body>
        {/* ユーザーネーム: <input name="username" placeholder="Guest" />
        問題番号: <input name="questionNumber" placeholder="0" /> */}

        <div id="userinput">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ユーザーネーム</Form.Label>
              <Form.Control placeholder="Guest" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>問題番号</Form.Label>
              <Form.Select>
                <option>0</option>
                <option>11</option>
              </Form.Select>
              <Form.Text className="text-muted">
                0: テスト用 11: ゲティスバーグ演説
              </Form.Text>
            </Form.Group>

            <Button variant="secondary" id="play-button">
              プレイする
            </Button>
          </Form>
        </div>
      </body>
      <footer>
        <hr></hr>
        <p>© Copyright 2022 ut.code();</p>
      </footer>
    </>
  );
}
