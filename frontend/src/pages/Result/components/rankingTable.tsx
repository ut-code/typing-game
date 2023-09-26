import React from "react";
import { Table } from "react-bootstrap";

type RankingTableProps = {
  listItems: {
    record_id: number;
    problem: number;
    username: string;
    score: number;
  }[];
};

export default function RankingTable(props: RankingTableProps) {
  const { listItems } = props;
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
        {listItems.map((listItem, i) => (
          <tr key={listItem.record_id}>
            <td>{i + 1}</td>
            <td>{listItem.username}</td>
            <td>{listItem.score}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
