import { Spinner } from "react-bootstrap";
import styles from "./styles.module.css";

export default function QuestionDisplay({
  isLoading,
  isStarted,
  questions,
  problemSolved,
  currentIndex,
  spelling,
}: {
  isLoading: boolean;
  isStarted: boolean;
  questions: string[];
  problemSolved: number;
  currentIndex: number;
  spelling: string[];
}) {
  const typedText = spelling[problemSolved]
    ? spelling[problemSolved].slice(0, currentIndex)
    : "";
  const untypedText = spelling[problemSolved]
    ? spelling[problemSolved].slice(currentIndex)
    : "";
  const newtypedText = typedText.replace(/ /g, "_");
  const DisplayText = questions[problemSolved];

  return (
    <div className={styles.questionDisplay}>
      {isLoading ? (
        <Spinner animation="border" role="status" className="spinner" />
      ) : (
        <div>
          {isStarted ? (
            questions[problemSolved] == spelling[problemSolved] ? (
              <>
                <span className={styles.answeredText}>{newtypedText}</span>
                <span className={styles.caretstyle}>|</span>
                <span className={styles.spellingText}>{untypedText}</span>
              </>
            ) : (
              <>
                <div className={styles.questionText}>{DisplayText}</div>
                <span className={styles.answeredText}>{newtypedText}</span>
                <span className={styles.caretstyle}>|</span>
                <span className={styles.spellingText}>{untypedText}</span>
              </>
            )
          ) : (
            "[Space]を押して開始"
          )}
        </div>
      )}
    </div>
  );
}
