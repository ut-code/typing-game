import { GetPerformanceSummaryResponse } from "@typing/api-types";
import styles from "./styles.module.css";
import { ListGroup } from "react-bootstrap";

export default function PerformanceSummaryTable({
  performanceSummary: score,
}: {
  performanceSummary: GetPerformanceSummaryResponse;
}) {
  return (
    <div className={styles.statistics}>
      <ListGroup variant="flush">
        <ListGroup.Item className={styles.title}>
          {score.playerName}さんの結果
        </ListGroup.Item>
        <ListGroup.Item className={styles.normalText}>
          順位 {score.overAllRank} 位
        </ListGroup.Item>
        <ListGroup.Item className={styles.normalText}>
          同問題順位 {score.rankInQuestionSet} 位
        </ListGroup.Item>
        <ListGroup.Item className={styles.normalText}>
          スコア {score.score} 点
        </ListGroup.Item>
        <ListGroup.Item className={styles.normalText}>
          総合ランク {score.grade}
        </ListGroup.Item>
      </ListGroup>
      <ListGroup horizontal>
        <ListGroup.Item className={styles.smallText}>
          <div>正しいタイプ数</div>
          <div>{score.correctTypingCount} 回</div>
        </ListGroup.Item>
        <ListGroup.Item className={styles.smallText}>
          <div>ミスタイプ数</div>
          <div>{score.missTypingCount} 回</div>
        </ListGroup.Item>
        <ListGroup.Item className={styles.smallText}>
          <div>平均タイプ数</div>
          <div>{score.keysPerSecond} 回/秒</div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
