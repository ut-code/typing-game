import { useEffect, useState } from "react";
import { getRankingApi } from "../../services/api/rankingApi";
import RankingEntry from "../../types/RankingEntry";

export function useRanking() {
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  async function fetchRanking() {
    setLoading(true);
    try {
      setRanking(await getRankingApi());
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchRanking();
  }, []);

  return { loading, error, ranking, refetch: fetchRanking };
}
