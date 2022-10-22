import { useEffect, useState } from "react";
import Footer from "./../../components/Footer";
import { Helmet } from "react-helmet";
import "./style.css";
// @ts-ignore
import script from "./script";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Stack } from "react-bootstrap";

export default function Result() {
  const [listItems, setListItems] = useState([
    { record_id: 1, problem: 1, username: "reactmuzui", score: -100 },
  ]);

  // script.jsを読み込む
  useEffect(() => {
    script(listItems);
  }, []);

  // RankingをfetchAPIしてくる
  useEffect(() => {
    (async () => {
      await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/fetchRanking`, // https://github.com/ut-code/typescript-react-node-template/blob/master/frontend/src/App.tsx を参照
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setListItems(data);
        });
    })();
  }, []);

  return (
    <>
      <Helmet>
        {/* https://github.com/nfl/react-helmet */}
        <title>結果</title>
      </Helmet>
      <Stack gap={3}>
        <div className="yourResults">
          <p id="finish">終了!</p>
          <p id="yourRank"></p>
          {/* {listItems.map((listItem) => ( # 順位 */}
          <p id="time"></p>
          <p id="score"></p>
        </div>
        <div>
          <Button href="/" variant="secondary">
            Back
          </Button>
        </div>
        <div className="rankBoard">
          <Table striped id="ranking">
            {/* {i=1} */}
            <thead id="ranking-head">
              <tr>
                <th>順位</th>
                <th>ユーザ</th>
                <th>得点</th>
              </tr>
            </thead>
            <tbody>
              {listItems.map((listItem, i) => (
                <tr key={listItem.record_id}>
                  <th>{i + 1}</th>
                  <th>{listItem.username}</th>
                  <th>{listItem.score}</th>
                  {/* {increment()} */}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div>
          <Button href="/" variant="secondary">
            Back
          </Button>
        </div>
      </Stack>
      <Footer />
    </>
  );
}
