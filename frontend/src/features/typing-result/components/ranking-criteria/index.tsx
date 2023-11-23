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
            <li>S+: スコアが 500 以上</li>
            <li>S: スコアが 400 以上</li>
            <li>S-: スコアが 300 以上</li>
            <li>A+: スコアが 250 以上</li>
            <li>A: スコアが 220 以上</li>
            <li>A-: スコアが 200 以上</li>
            <li>B+: スコアが 190 以上</li>
            <li>B: スコアが 170 以上</li>
            <li>B-: スコアが 150 以上</li>
            <li>C+: スコアが 140 以上</li>
            <li>C: スコアが 120 以上</li>
            <li>C-: スコアが 100 以上</li>
            <li>D+: スコアが 90 以上</li>
            <li>D: スコアが 70 以上</li>
            <li>D-: スコアが 50 以上</li>
            <li>E+: スコアが 30 以上</li>
            <li>E: スコアが 10 以上</li>
            <li>E-: スコアが 10 未満</li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
