import { useEffect, useState } from "react";
import { getPerformanceSummaryApi } from "../../services/api/performanceSummaryApi";
import { Score } from "@typing-game/api-types";

export function usePerformanceSummary(typingSessionId: string) {
  const [score, setScore] = useState<Score>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  async function fetchPerformanceSummary() {
    setLoading(true);
    try {
      setScore(await getPerformanceSummaryApi(typingSessionId));
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchPerformanceSummary();
  }, []);

  return { loading, error, score, refetch: fetchPerformanceSummary };
}
