import { useParams } from "react-router-dom";
import { Stack } from "react-bootstrap";

import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import BackButton from "../../components/common/BackButton";
import Ranking from "../../features/result/Ranking/Ranking";
import PerformanceSummary from "../../features/result/PerformanceSummary";
import RankingCriteria from "../../features/result/RankingCriteria";

export default function Result() {
  const { uuid: typingSessionId } = useParams();
  if (typingSessionId === undefined) {
    throw new Error("typingSessionId is undefined");
  }
  return (
    <>
      <Header />
      <Stack gap={3}>
        <BackButton />
        <Stack direction="horizontal" gap={3}>
          <PerformanceSummary typingSessionId={typingSessionId} />
          <Ranking />
        </Stack>
        <RankingCriteria />
      </Stack>
      <Footer />
    </>
  );
}
