import { Tab, Tabs } from "react-bootstrap";
import RankingTable from "../RankingTable";
import useRankingQuery from "../../../api/hooks/rankingHooks";
import styles from "./styles.module.css";

export default function Ranking() {
  const { ranking, loadingRanking, rankingError } = useRankingQuery();
  if (rankingError) {
    console.error(rankingError);
  }
  return (
    <div className={styles.rankingBoard}>
      <Tabs defaultActiveKey="overall" justify>
        <Tab eventKey="overall" title="全体のランキング">
          {loadingRanking || ranking === undefined ? (
            <div>Loading...</div>
          ) : (
            <RankingTable ranking={ranking} />
          )}
        </Tab>
      </Tabs>
    </div>
  );
}
