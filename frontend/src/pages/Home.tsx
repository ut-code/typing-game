import { useEffect } from "react";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import "./style.css";
// @ts-ignore
import script from "./script.js";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Stack, Accordion } from "react-bootstrap";

export default function Home() {
  useEffect(() => {
    script();
  }, []);
  return (
    <>
      <Header />
      {/* ユーザーネーム: <input name="username" placeholder="Guest" />
        問題番号: <input name="questionNumber" placeholder="0" /> */}
      <Stack gap={3}>
        <div id="userinput">
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>ユーザーネーム</Form.Label>
              <Form.Control placeholder="Guest" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="qnumber">
              <Form.Label>問題番号</Form.Label>
              <Form.Select>
                <option>0</option>
                <option>11</option>
                <option>20</option>
                <option>21</option>
                <option>22</option>
                <option>23</option>
              </Form.Select>
              <Form.Text className="text-muted">
                0: テスト用 11: ゲティスバーグ演説 20: ロンドン橋落ちた 21:
                ハンプティダンプティ 22: きらきら星 23: Hey Diddle Diddle
              </Form.Text>
            </Form.Group>

            <Button variant="secondary" id="play-button">
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
