import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "./../components/Header"
import Footer from "./../components/Footer"
import "./style.css"

import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Form, Stack, Accordion } from "react-bootstrap"

export default function Home() {
  const [userName, setUserName] = useState<string>("")
  const [qnumber, setQnumber] = useState<string>("")
  const navigation = useNavigate()
  return (
    <>
      <Header />
      <Stack gap={3}>
        <div id="userinput">
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>
                <b>ユーザーネーム（20文字まで）</b>
              </Form.Label>
              <Form.Control
                placeholder="Guest"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value)
                }}
                maxLength={20}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="qnumber">
              <Form.Label>
                <b>問題番号</b>
              </Form.Label>
              <Form.Select
                value={qnumber}
                onChange={(e) => {
                  setQnumber(e.target.value)
                }}
              >
                <option>0: 関東地方(かんとう地方)</option>
                <option>1: マックのメニュー</option>
                <option>2: 日本食</option>
                <option>3: 惑星名</option>
                <option>4: 短い英単語集</option>
                <option>5: 長い英単語集</option>
                <option>6: アクセス数の多いサイト</option>
                <option>7: SDGs</option>
                <option>8: MDGs</option>
                <option>9: キーボード配列</option>
                {/* <option>10: htmlを書いてみよう</option> */}
                <option>11: ゲティスバーグ演説</option>
                <option>20: ロンドン橋落ちた</option>
                <option>21: ハンプティダンプティ</option>
                <option>22: きらきら星</option>
                <option>23: Hey Diddle Diddle</option>
              </Form.Select>
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
                  })
                  const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/localSave`, {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: json,
                  })
                  // fetchAPI後に別ページへ遷移
                  navigation("basic")
                }
                postStorage()
              }}
            >
              Play
            </Button>
          </Form>
        </div>

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
      </Stack>
      <Footer />
    </>
  )
}
