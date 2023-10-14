import { Stack } from "react-bootstrap";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BackButton from "../../components/BackButton";
import Ranking from "./components/ranking";
import PerformanceSummary from "./components/performance-summary";
import RankingCriteria from "./components/ranking-criteria";

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
