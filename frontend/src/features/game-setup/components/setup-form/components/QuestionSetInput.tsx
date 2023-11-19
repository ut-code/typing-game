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
        <option value={"0b6d3308-5670-41fc-bb3e-590a4d34d754"}>Basic</option>
        <option value={"51710ca4-7b81-4e17-9389-384dbf6d75dc"}>Fruits</option>
        <option value={"9d6156fe-d4c1-4c38-8152-f313cf64020d"}>都道府県</option>
        <option value={"23huh40ih5670-41fchua2uh590a4d34d754"}>魚の名前</option>
      </Form.Select>
    </Form.Group>
  );
}
