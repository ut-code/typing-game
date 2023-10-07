import { Form } from "react-bootstrap";

export default function QuestionSetInput({
  questionSetId,
  setQuestionSetId,
}: {
  questionSetId: string;
  setQuestionSetId: (questionSetId: string) => void;
}): JSX.Element {
  return (
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
  );
}
