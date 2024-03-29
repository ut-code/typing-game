import usePerformanceSummaryQuery from "../../../../api/hooks/performanceSummaryHooks";
import PerformanceSummaryTable from "./components/performance-summary-table";

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
