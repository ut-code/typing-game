import { Table } from "react-bootstrap";
import { Ranking } from "@typing/core";

export default function RankingTable({ ranking }: { ranking: Ranking }) {
  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>順位</th>
          <th>ユーザ</th>
          <th>得点</th>
        </tr>
      </thead>
      <tbody>
        {ranking.map((ranking, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{ranking.player.name}</td>
            <td>{ranking.typingScore.score}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
