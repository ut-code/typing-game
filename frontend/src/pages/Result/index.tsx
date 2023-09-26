import React, { useEffect, useState } from "react";

// CSS関連
import "./style.css";
import "../../components/css/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Stack, ListGroup, Accordion, Tab, Tabs } from "react-bootstrap";

// コンポーネント
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BackButton from "../../components/BackButton";
import RankingTable from "./components/rankingTable";

export default function Result() {
  const [listItems, setListItems] = useState([
    { record_id: 1, problem: 1, username: "sample", score: -100 },
  ]);
  const [listItemsKf73, setListItemsKf73] = useState([
    { record_id: 1, problem: 1, username: "sample", score: -100 },
  ]);
  const [listItemsMf96, setListItemsMf96] = useState([
    { record_id: 1, problem: 1, username: "sample", score: -100 },
  ]);
  const [userName, setUserName] = useState<string>("");
  const [userRank, setUserRank] = useState<number>(0);
  const [userRankSame, setUserRankSame] = useState<number>(0);
  const [, setUserTime] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(0);
  const [userKpm, setUserKpm] = useState<number>(0);
  const [userCorrect, setUserCorrect] = useState<number>(0);
  const [userMiss, setUserMiss] = useState<number>(0);
  const [userScoreRank, setUserScoreRank] = useState<string>("");

  let unmounted = false;
  useEffect(() => {
    if (unmounted) return;
    unmounted = true;

    async function tmp() {
      const qnumber = Number(localStorage.getItem("questionNumber"));
      const username = localStorage.getItem("username") || "Guest";
      const time = Number(localStorage.getItem("time"));
      const score = Number(localStorage.getItem("score"));
      const kpm = Number(localStorage.getItem("kpm"));
      const correct = Number(localStorage.getItem("correctInputCount"));
      const miss = Number(localStorage.getItem("incorrectInputCount"));
      const scorerank = localStorage.getItem("scoreRank") || "?";
      setUserName(username);
      setUserTime(time);
      setUserScore(score);
      setUserKpm(kpm);
      setUserCorrect(correct);
      setUserMiss(miss);
      setUserScoreRank(scorerank);

      let cnt = 1;
      for (const listItem of listItemsMf96) {
        if (score === listItem.score) {
          setUserRank(cnt);
          break;
        }
        cnt++;
      }

      cnt = 1;
      for (const listItem of listItemsMf96) {
        if (qnumber === listItem.problem) {
          if (score === listItem.score) {
            setUserRankSame(cnt);
            break;
          }
          cnt++;
        }
      }
    }
    tmp();
  }, [listItemsMf96]);

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

  useEffect(() => {
    (async () => {
      await fetch(`${import.meta.env.VITE_API_ENDPOINT}/fetchRankingKf73`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          setListItemsKf73(data);
        });
    })();
  }, []);

  // RankingをfetchAPIしてくる
  useEffect(() => {
    (async () => {
      await fetch(`${import.meta.env.VITE_API_ENDPOINT}/fetchRankingMf96`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          setListItemsMf96(data);
        });
    })();
  }, []);

  return (
    <>
      <Header />
      <Stack gap={3}>
        <div className="result-elements">
          <BackButton />

          <Stack direction="horizontal" gap={3}>
            <div className="stats">
              <ListGroup variant="flush">
                <ListGroup.Item className="title">
                  {userName}さんの結果
                </ListGroup.Item>
                <ListGroup.Item className="normal-text">
                  順位 {userRank} 位
                </ListGroup.Item>
                <ListGroup.Item className="normal-text">
                  同問題順位 {userRankSame} 位
                </ListGroup.Item>
                <ListGroup.Item className="normal-text">
                  スコア {userScore} 点
                </ListGroup.Item>
                <ListGroup.Item className="normal-text">
                  総合ランク {userScoreRank}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup horizontal>
                <ListGroup.Item className="small-text">
                  正しいタイプ数<br></br>
                  {userCorrect} 回
                </ListGroup.Item>
                <ListGroup.Item className="small-text">
                  ミスタイプ数<br></br>
                  {userMiss} 回
                </ListGroup.Item>
                <ListGroup.Item className="small-text">
                  平均タイプ数<br></br>
                  {userKpm} 回/秒
                </ListGroup.Item>
              </ListGroup>
            </div>
            <div className="ranking-board">
              <Tabs defaultActiveKey="overall" justify>
                <Tab eventKey="overall" title="全体のランキング">
                  <RankingTable listItems={listItems} />
                </Tab>
                <Tab eventKey="kf73" title="第73回駒場祭">
                  <RankingTable listItems={listItemsKf73} />
                </Tab>
                <Tab eventKey="mf96" title="第96回五月祭">
                  <RankingTable listItems={listItemsMf96} />
                </Tab>
              </Tabs>
            </div>
          </Stack>
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>総合ランクの基準</Accordion.Header>
              <Accordion.Body>
                SS: 平均タイプ数 5.00 回/秒以上 かつ ミスタイプ率 0% かつ 完答
                <br></br>
                S: 平均タイプ数 5.00 回/秒以上 かつ ミスタイプ率 10%未満 かつ
                完答
                <br></br>
                A: 平均タイプ数 4.00 回/秒以上 かつ ミスタイプ率 20%未満
                <br></br>
                B: 平均タイプ数 3.00 回/秒以上 かつ ミスタイプ率 20%未満
                <br></br>
                C: 平均タイプ数 2.00 回/秒以上 かつ ミスタイプ率 30%未満
                <br></br>
                D: 平均タイプ数 2.00 回/秒未満 かつ ミスタイプ率 50%未満
                <br></br>
                E: ミスタイプ率 50%以上
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </Stack>
      <Footer />
    </>
  );
}
