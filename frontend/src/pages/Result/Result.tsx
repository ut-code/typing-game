/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { useEffect, useState } from "react";
import Footer from "./../../components/Footer";
import { Helmet } from "react-helmet";
import "./style.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Stack } from "react-bootstrap";

export default function Result() {
  const [listItems, setListItems] = useState([
    { record_id: 1, problem: 1, username: "sample", score: -100 },
  ]);
  const [userName, setUserName] = useState<string>("");
  const [userRank, setUserRank] = useState<number>(0);
  const [userTime, setUserTime] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(0);

  // script.jsを読み込む
  useEffect(() => {
    async function tmp() {
      const response = await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/fetchScore`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
        }
      );
      // わざわざstringにしてからobjectにしている...
      const tmp = await response.text();
      const data = JSON.parse(tmp);

      let cnt = 1;
      for (const listItem of listItems) {
        if (data.score == listItem.score) {
          setUserRank(cnt);
          break;
        } else {
          cnt++;
        }
      }

      setUserName(data.username);
      setUserTime(data.time);
      setUserScore(data.score);
    }
    tmp();
  }, [listItems]);

  // RankingをfetchAPIしてくる
  useEffect(() => {
    (async () => {
      await fetch(`${import.meta.env.VITE_API_ENDPOINT}/fetchRanking`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          setListItems(data);
        });
    })();
  }, []);

  return (
    <>
      <Helmet>
        <title>結果</title>
      </Helmet>
      <Stack gap={3}>
        <div className="yourResults">
          <p>{userName}さんの結果</p>
          <p>順位{userRank}位</p>
          <p>時間{userTime}秒</p>
          <p>スコア{userScore}点</p>
        </div>
        <div>
          <Button href="/" variant="secondary">
            Back
          </Button>
        </div>
        <div className="rankBoard">
          <Table striped id="ranking">
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
