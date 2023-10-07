import { Spinner } from "react-bootstrap";
import styles from "./styles.module.css";

export default function QuestionDisplay({
  isLoading,
  isStarted,
  questions,
  problemSolved,
  currentIndex,
}: {
  isLoading: boolean;
  isStarted: boolean;
  questions: string[];
  problemSolved: number;
  currentIndex: number;
}) {
  const typedText = questions[problemSolved].slice(0, currentIndex);
  const untypedText = questions[problemSolved].slice(currentIndex);
  const newtypedText = typedText.replace(/ /g, "_");
  return (
    <div className={styles.questionDisplay}>
      {isLoading ? (
        <Spinner animation="border" role="status" className="spinner" />
      ) : (
        <div>
          {isStarted ? (
            <>
              <span className={styles.answeredText}> {newtypedText} </span>
              <span className={styles.questionText}> {untypedText} </span>
            </>
          ) : (
            "[Space]を押して開始"
          )}
        </div>
      )}
    </div>
  );
}
