import { Accordion } from "react-bootstrap";

export default function HowToPlay(): JSX.Element {
  return (
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
  );
}
