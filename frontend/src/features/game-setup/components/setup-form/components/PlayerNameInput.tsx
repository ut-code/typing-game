import { Form } from "react-bootstrap";

export default function PlayerNameInput({
  playerName: playerName,
  setPlayerName: setPlayerName,
}: {
  playerName: string;
  setPlayerName: (playerName: string) => void;
}): JSX.Element {
  return (
    <Form.Group className="mb-3" controlId="playerName">
      <Form.Label>
        <strong>ユーザー名（20文字まで）</strong>
      </Form.Label>
      <Form.Control
        placeholder="Guest"
        value={playerName}
        onChange={(e) => {
          setPlayerName(e.target.value);
        }}
        maxLength={20}
      />
    </Form.Group>
  );
}
