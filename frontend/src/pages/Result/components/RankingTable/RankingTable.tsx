import React from "react";
import { Table } from "react-bootstrap";
import { RankingEntry } from "typing-game-api-types";

export default function RankingTable({ ranking }: { ranking: RankingEntry[] }) {
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
            <td>{ranking.playerName}</td>
            <td>{ranking.score}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
