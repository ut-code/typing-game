import { ProgressBar } from "react-bootstrap";
import styles from "./styles.module.css";

export default function TypingProgressBar({
  spellingLists, // TODO: spellingLists で問題数のカウントをするべきではない
  problemSolved,
}: {
  spellingLists: string[][];
  problemSolved: number;
}): JSX.Element {
  return (
    <div className={styles.statisticsProgress}>
      {/* 何問目/全問題数 */}
      <div className={styles.progressNumber}>
        {problemSolved + 1 + "/" + spellingLists.length + "問"}
      </div>
      <div className={styles.progressBar}>
        <ProgressBar
          variant="success"
          animated
          now={Math.round((problemSolved / spellingLists.length) * 100)}
          label={`${Math.round((problemSolved / spellingLists.length) * 100)}%`}
        />
      </div>
    </div>
  );
}
