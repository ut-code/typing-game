// CSS関連
import styles from "./styles.module.css";
import { Stack, Accordion } from "react-bootstrap";

// コンポーネント
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BackButton from "../../components/BackButton";
import { useParams } from "react-router-dom";
import Ranking from "./components/Ranking/Ranking";
import PerformanceSummary from "./components/PerformanceSummary/PerformanceSummary";

export default function Result() {
  const { uuid: typingSessionId } = useParams();
  if (typingSessionId === undefined) {
    throw new Error("typingSessionId is undefined");
  }

  return (
    <>
      <Header />
      <Stack gap={3}>
        <div className={styles.resultElements}>
          <BackButton />
          <Stack direction="horizontal" gap={3}>
            <PerformanceSummary typingSessionId={typingSessionId} />
            <Ranking />
          </Stack>
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>総合ランクの基準</Accordion.Header>
              <Accordion.Body>
                <div>
                  SS: 平均タイプ数 5.00 回/秒以上 かつ ミスタイプ率 0% かつ 完答
                </div>
                <div>
                  S: 平均タイプ数 5.00 回/秒以上 かつ ミスタイプ率 10%未満 かつ
                  完答
                </div>
                <div>
                  A: 平均タイプ数 4.00 回/秒以上 かつ ミスタイプ率 20%未満
                </div>
                <div>
                  B: 平均タイプ数 3.00 回/秒以上 かつ ミスタイプ率 20%未満
                </div>
                <div>
                  C: 平均タイプ数 2.00 回/秒以上 かつ ミスタイプ率 30%未満
                </div>
                <div>
                  D: 平均タイプ数 2.00 回/秒未満 かつ ミスタイプ率 50%未満
                </div>
                <div>E: ミスタイプ率 50%以上</div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </Stack>
      <Footer />
    </>
  );
}
