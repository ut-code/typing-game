// TODO: spellingLists 二重化の対応
// TODO: spellingLists[problemSolved][0] （一旦0番目を使用するとしている）をすべて修正
import { Spinner } from "react-bootstrap";
import styles from "./styles.module.css";

export default function QuestionDisplay({
  isLoading,
  isStarted,
  words,
  problemSolved,
  currentIndex,
  spellingLists,
}: {
  isLoading: boolean;
  isStarted: boolean;
  words: string[];
  problemSolved: number;
  currentIndex: number;
  spellingLists: string[][];
}) {
  const typedText = spellingLists[problemSolved][0] // TODO: 0を変数にする
    ? spellingLists[problemSolved][0].slice(0, currentIndex) // TODO: 0を変数にする
    : "";
  const untypedText = spellingLists[problemSolved][0] // TODO: 0を変数にする
    ? spellingLists[problemSolved][0].slice(currentIndex) // TODO: 0を変数にする
    : "";
  const newtypedText = typedText.replace(/ /g, "_");
  const DisplayText = words[problemSolved];

  return (
    <div className={styles.questionDisplay}>
      {isLoading ? (
        <Spinner animation="border" role="status" className="spinner" />
      ) : (
        <div>
          {isStarted ? (
            words[problemSolved] == spellingLists[problemSolved][0] ? ( // TODO: 0を変数にする
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
