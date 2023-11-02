import { ProgressBar } from "react-bootstrap";
import styles from "./styles.module.css";

export default function TypingProgressBar({
  spelling,
  problemSolved,
}: {
  spelling: string[];
  problemSolved: number;
}): JSX.Element {
  return (
    <div className={styles.statisticsProgress}>
      {/* 何問目/全問題数 */}
      <div className={styles.progressNumber}>
        {problemSolved + 1 + "/" + spelling.length + "問"}
      </div>
      <div className={styles.progressBar}>
        <ProgressBar
          variant="success"
          animated
          now={Math.round((problemSolved / spelling.length) * 100)}
          label={`${Math.round((problemSolved / spelling.length) * 100)}%`}
        />
      </div>
    </div>
  );
}
