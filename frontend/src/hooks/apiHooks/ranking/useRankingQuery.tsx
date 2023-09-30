import { getRankingApi } from "../../../services/api/rankingApi";
import useQuery from "../common/useQuery";

export default function useRankingQuery() {
  const {
    data: ranking,
    loading: loadingRanking,
    error: rankingError,
    refetch: refetchRanking,
  } = useQuery({}, getRankingApi);
  return {
    ranking,
    loadingRanking,
    rankingError,
    refetchRanking,
  };
}