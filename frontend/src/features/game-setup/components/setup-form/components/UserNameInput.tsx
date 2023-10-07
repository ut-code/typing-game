import { Form } from "react-bootstrap";

export default function UserNameInput({
  userName,
  setUserName,
}: {
  userName: string;
  setUserName: (userName: string) => void;
}): JSX.Element {
  return (
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
  );
}
