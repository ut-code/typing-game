import { getPerformanceSummaryApi } from "../../../services/api/performanceSummaryApi";
import useQuery from "../common/useQuery";

export default function usePerformanceSummaryQuery(typingSessionId: string) {
  const {
    data: performanceSummary,
    loading: loadingPerformanceSummary,
    error: performanceSummaryError,
    refetch: refetchPerformanceSummary,
  } = useQuery({ typingSessionId }, getPerformanceSummaryApi);
  return {
    performanceSummary,
    loadingPerformanceSummary,
    performanceSummaryError,
    refetchPerformanceSummary,
  };
}
