import React from "react";

// CSS関連
import styles from "./styles.module.css";
import { Stack, Accordion, Tab, Tabs } from "react-bootstrap";

// コンポーネント
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BackButton from "../../components/BackButton";
import usePerformanceSummaryQuery from "../../hooks/apiHooks/performanceSummary/usePerformanceSummaryQuery";
import PerformanceSummaryTable from "./components/PerformanceSummaryTable/PerformanceSummaryTable";
import useRankingQuery from "../../hooks/apiHooks/ranking/useRankingQuery";
import RankingTable from "./components/RankingTable/RankingTable";
import { useParams } from "react-router-dom";

export default function Result() {
  const { uuid: typingSessionId } = useParams();
  if (typingSessionId === undefined) {
    throw new Error("typingSessionId is undefined");
  }
  const {
    performanceSummary,
    loadingPerformanceSummary,
    performanceSummaryError,
  } = usePerformanceSummaryQuery(typingSessionId);
  if (performanceSummaryError) {
    console.error(performanceSummaryError);
  }
  const { ranking, loadingRanking, rankingError } = useRankingQuery();
  if (rankingError) {
    console.error(rankingError);
  }

  return (
    <>
      <Header />
      <Stack gap={3}>
        <div className={styles.resultElements}>
          <BackButton />
          <Stack direction="horizontal" gap={3}>
            {loadingPerformanceSummary || performanceSummary === undefined ? (
              <div>Loading...</div>
            ) : (
              <PerformanceSummaryTable
                performanceSummary={performanceSummary}
              />
            )}
            <div className={styles.rankingBoard}>
              <Tabs defaultActiveKey="overall" justify>
                <Tab eventKey="overall" title="全体のランキング">
                  {loadingRanking || ranking === undefined ? (
                    <div>Loading...</div>
                  ) : (
                    <RankingTable ranking={ranking} />
                  )}
                </Tab>
              </Tabs>
            </div>
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
