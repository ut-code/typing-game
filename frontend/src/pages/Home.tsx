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
      <div>
        {/* ユーザーネーム: <input name="username" placeholder="Guest" />
        問題番号: <input name="questionNumber" placeholder="0" /> */}
        <Stack gap={3}>
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
                Play
              </Button>
            </Form>
          </div>

          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>遊び方</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Stack>
      </div>
      <Footer />
    </>
  );
}
