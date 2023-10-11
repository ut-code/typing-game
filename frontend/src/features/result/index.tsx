import { Stack } from "react-bootstrap";

import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import BackButton from "../../components/common/BackButton";
import Ranking from "./components/Ranking/Ranking";
import PerformanceSummary from "./components/PerformanceSummary";
import RankingCriteria from "./components/RankingCriteria";

export default function TypingResult({
  typingSessionId,
}: {
  typingSessionId: string;
}): JSX.Element {
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
