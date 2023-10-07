import { useMemo } from "react";
import { getPerformanceSummaryService } from "../services/performanceSummaryServices";
import useQuery from "./common/useQuery";

export default function usePerformanceSummaryQuery(typingSessionId: string) {
  const {
    data: performanceSummary,
    loading: loadingPerformanceSummary,
    error: performanceSummaryError,
    refetch: refetchPerformanceSummary,
  } = useQuery(
    useMemo(
      () => ({
        typingSessionId,
      }),
      [typingSessionId],
    ),
    getPerformanceSummaryService,
  );
  return {
    performanceSummary,
    loadingPerformanceSummary,
    performanceSummaryError,
    refetchPerformanceSummary,
  };
}
