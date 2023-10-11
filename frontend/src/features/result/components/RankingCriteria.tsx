import { Accordion } from "react-bootstrap";

export default function RankingCriteria(): JSX.Element {
  return (
    <Accordion defaultActiveKey="1">
      <Accordion.Item eventKey="0">
        <Accordion.Header>総合ランクの基準</Accordion.Header>
        <Accordion.Body>
          <div>
            SS: 平均タイプ数 5.00 回/秒以上 かつ ミスタイプ率 0% かつ 完答
          </div>
          <div>
            S: 平均タイプ数 5.00 回/秒以上 かつ ミスタイプ率 10%未満 かつ 完答
          </div>
          <div>A: 平均タイプ数 4.00 回/秒以上 かつ ミスタイプ率 20%未満</div>
          <div>B: 平均タイプ数 3.00 回/秒以上 かつ ミスタイプ率 20%未満</div>
          <div>C: 平均タイプ数 2.00 回/秒以上 かつ ミスタイプ率 30%未満</div>
          <div>D: 平均タイプ数 2.00 回/秒未満 かつ ミスタイプ率 50%未満</div>
          <div>E: ミスタイプ率 50%以上</div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
