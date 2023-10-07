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
  return (
    <div className={styles.questionDisplay}>
      {isLoading ? (
        <Spinner animation="border" role="status" className="spinner" />
      ) : (
        <div>
          <span className={styles.answeredText}>
            {isStarted ? questions[problemSolved].slice(0, currentIndex) : ""}
          </span>
          <span className={styles.questionText}>
            {isStarted
              ? questions[problemSolved].slice(currentIndex)
              : "[Space]を押して開始"}
          </span>
        </div>
      )}
    </div>
  );
}
