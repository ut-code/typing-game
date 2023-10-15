import { PerformanceSummary } from "@typing/core";
import styles from "./styles.module.css";
import { ListGroup } from "react-bootstrap";

export default function PerformanceSummaryTable({
  performanceSummary,
}: {
  performanceSummary: PerformanceSummary;
}) {
  return (
    <div className={styles.statistics}>
      <ListGroup variant="flush">
        <ListGroup.Item className={styles.title}>
          {performanceSummary.player.name}さんの結果
        </ListGroup.Item>
        <ListGroup.Item className={styles.normalText}>
          順位 {performanceSummary.overAllRank.rank} 位
        </ListGroup.Item>
        <ListGroup.Item className={styles.normalText}>
          同問題順位 {performanceSummary.rankInQuestionSet.rank} 位
        </ListGroup.Item>
        <ListGroup.Item className={styles.normalText}>
          スコア {performanceSummary.typingScore.score} 点
        </ListGroup.Item>
        <ListGroup.Item className={styles.normalText}>
          総合ランク {performanceSummary.typingGrade.grade}
        </ListGroup.Item>
      </ListGroup>
      <ListGroup horizontal>
        <ListGroup.Item className={styles.smallText}>
          <div>正しいタイプ数</div>
          <div>{performanceSummary.correctTypingCount} 回</div>
        </ListGroup.Item>
        <ListGroup.Item className={styles.smallText}>
          <div>ミスタイプ数</div>
          <div>{performanceSummary.missTypingCount} 回</div>
        </ListGroup.Item>
        <ListGroup.Item className={styles.smallText}>
          <div>平均タイプ数</div>
          <div>{performanceSummary.keysPerSecond.keysPerSecond} 回/秒</div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
