/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { useEffect, useState } from "react";
import Footer from "./../../components/Footer";
import { Helmet } from "react-helmet";
import "./style.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Stack, ListGroup, Container } from "react-bootstrap";

export default function Result() {
  const [listItems, setListItems] = useState([
    { record_id: 1, problem: 1, username: "sample", score: -100 },
  ]);
  const [userName, setUserName] = useState<string>("");
  const [userRank, setUserRank] = useState<number>(0);
  const [userTime, setUserTime] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(0);
  const [userKpm, setUserKpm] = useState<number>(0);
  const [userCorrect, setUserCorrect] = useState<number>(0);
  const [userMiss, setUserMiss] = useState<number>(0);

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
      const data = await response.json();

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
      setUserKpm(data.kpm);
      setUserCorrect(data.correct);
      setUserMiss(data.miss);
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
        <Stack direction="horizontal" gap={3}>
          <div className="yourResults">
            <ListGroup variant="flush">
              <ListGroup.Item>{userName}さんの結果</ListGroup.Item>
              <ListGroup.Item>順位{userRank}位</ListGroup.Item>
              <ListGroup.Item>同じ問題を解いた人の中での順位</ListGroup.Item>
              <ListGroup.Item>時間{userTime}秒</ListGroup.Item>
              <ListGroup.Item>スコア{userScore}点</ListGroup.Item>
            </ListGroup>
            <ListGroup horizontal>
              <ListGroup.Item>
                正しいタイプ数<br></br>
                {userCorrect}回
              </ListGroup.Item>
              <ListGroup.Item>
                ミスタイプ数<br></br>
                {userMiss}回
              </ListGroup.Item>
              <ListGroup.Item>
                平均タイプ数<br></br>
                {userKpm}回/秒
              </ListGroup.Item>
            </ListGroup>
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
        </Stack>
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
