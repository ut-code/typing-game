import { useMemo } from "react";
import { getRankingService } from "../services/rankingServices";
import useQuery from "./common/useQuery";

export default function useRankingQuery() {
  const {
    data: ranking,
    loading: loadingRanking,
    error: rankingError,
    refetch: refetchRanking,
  } = useQuery(
    useMemo(() => {}, []),
    getRankingService,
  );
  return {
    ranking,
    loadingRanking,
    rankingError,
    refetchRanking,
  };
}
