import React from "react";
import styles from "./styles.module.css";

export default function TypingStatistics({
  time,
  timeLeft,
  correctInputCount,
  incorrectInputCount,
}: {
  time: number;
  timeLeft: number;
  correctInputCount: number;
  incorrectInputCount: number;
}): JSX.Element {
  return (
    <table className={styles.statisticsTable}>
      <tbody>
        <tr>
          <th className={styles.statisticsTableHeader}>正しいタイプ数：</th>
          <td className={styles.statisticsTableData}>{correctInputCount}回</td>
        </tr>
        <tr>
          <th className={styles.statisticsTableHeader}>ミスタイプ数：</th>
          <td className={styles.statisticsTableData}>
            {incorrectInputCount}回
          </td>
        </tr>
        <tr>
          <th className={styles.statisticsTableHeader}>経過時間：</th>
          <td className={styles.statisticsTableData}>{time}秒</td>
        </tr>
        <tr>
          <th className={styles.statisticsTableHeader}>残り時間：</th>
          <td className={styles.statisticsTableData}>{timeLeft}秒</td>
        </tr>
      </tbody>
    </table>
  );
}
