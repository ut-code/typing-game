import { Accordion } from "react-bootstrap";

export default function RankingCriteria(): JSX.Element {
  return (
    <Accordion defaultActiveKey="1">
      <Accordion.Item eventKey="0">
        <Accordion.Header>スコアの基準</Accordion.Header>
        <Accordion.Body>
          <p>
            スコアは、正答タイプ数からミスタイプ数を引いた値です。正答タイプ数が多く、ミスタイプ数が少ないほど高いスコアになります。
          </p>
          <p>総合ランクは、次のような基準で決定されます。</p>
          <ul>
            <li>S+: スコアが 240 以上</li>
            <li>S: スコアが 210 以上</li>
            <li>S-: スコアが 180 以上</li>
            <li>A+: スコアが 165 以上</li>
            <li>A: スコアが 150 以上</li>
            <li>A-: スコアが 135 以上</li>
            <li>B+: スコアが 120 以上</li>
            <li>B: スコアが 105 以上</li>
            <li>B-: スコアが 90 以上</li>
            <li>C+: スコアが 75 以上</li>
            <li>C: スコアが 60 以上</li>
            <li>C-: スコアが 50 以上</li>
            <li>D+: スコアが 40 以上</li>
            <li>D: スコアが 30 以上</li>
            <li>D-: スコアが 20 以上</li>
            <li>E+: スコアが 10 以上</li>
            <li>E: スコアが 5 以上</li>
            <li>E-: スコアが 5 未満</li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
