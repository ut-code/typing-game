import typingTaskCollections from "@typing/question-sets";
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
        <strong>問題番号</strong>
      </Form.Label>
      <Form.Select
        value={questionSetId}
        onChange={(e) => {
          setQuestionSetId(e.target.value);
        }}
      >
        {typingTaskCollections.map((typingTaskCollection) => (
          <option key={typingTaskCollection.id} value={typingTaskCollection.id}>
            {typingTaskCollection.title}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}
