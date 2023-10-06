import { Stack } from "react-bootstrap";

// コンポーネント
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BackButton from "../../components/BackButton";
import { useParams } from "react-router-dom";
import Ranking from "./components/Ranking/Ranking";
import PerformanceSummary from "./components/PerformanceSummary/PerformanceSummary";
import RankingCriteria from "./components/RankingCriteria";

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
