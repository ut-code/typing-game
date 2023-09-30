import { useEffect, useState } from "react";
import { getScoreApi } from "../../services/api/scoreApi";
import { Score } from "types";

export function useScore(typingSessionId: string) {
  const [score, setScore] = useState<Score>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  async function fetchScore() {
    setLoading(true);
    try {
      setScore(await getScoreApi(typingSessionId));
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchScore();
  }, []);

  return { loading, error, score, refetch: fetchScore };
}
