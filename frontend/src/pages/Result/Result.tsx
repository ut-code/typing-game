/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
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
  const [userName, setUserName] = useState<string>("");

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
      let tmp = await response.text();
      let data = JSON.parse(tmp);

      let rank = 1;
      for (let listItem of listItems) {
        if (data.score == listItem.score) {
          break;
        } else {
          rank++;
        }
      }

      setUserName(data.username);
      document.getElementById("yourRank").textContent = "順位" + rank + "位";
      document.getElementById("time").textContent = "時間" + data.time + "秒";
      document.getElementById("score").textContent =
        "スコア" + data.score + "点";
    }
    tmp();
  }, []);

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
          <p id="yourRank"></p>
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
