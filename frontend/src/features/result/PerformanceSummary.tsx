import usePerformanceSummaryQuery from "../../api/hooks/performanceSummaryHooks";
import PerformanceSummaryTable from "./PerformanceSummaryTable/PerformanceSummaryTable";

export default function PerformanceSummary({
  typingSessionId,
}: {
  typingSessionId: string;
}): JSX.Element {
  const {
    performanceSummary,
    loadingPerformanceSummary,
    performanceSummaryError,
  } = usePerformanceSummaryQuery(typingSessionId);
  if (performanceSummaryError) {
    console.error(performanceSummaryError);
  }
  return loadingPerformanceSummary || performanceSummary === undefined ? (
    <div>Loading...</div>
  ) : (
    <PerformanceSummaryTable performanceSummary={performanceSummary} />
  );
}
