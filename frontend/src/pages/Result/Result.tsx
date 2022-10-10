import { useEffect, useState } from "react";
import Footer from "./../../components/Footer";
import { Helmet } from "react-helmet";
import "./style.css";
// @ts-ignore
import script from "./script";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Stack } from "react-bootstrap";

let i: number = 0;
// const listItems: string[] = ['りんご', 'バナナ', 'みかん'];

export default function Result() {
  const [name, setName] = useState("");
  const [id, setId] = useState("AWS");
  const [score, setScore] = useState(0);
  const [listItems, setListItems] = useState([
    { record_id: 1, problem: 1, username: "reactmuzui", score: -100 },
  ]);
  useEffect(() => {
    script();
  }, []);
  useEffect(() => {
    (async () => {
      await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/test`, // https://github.com/ut-code/typescript-react-node-template/blob/master/frontend/src/App.tsx を参照
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setScore(data.score);
        });
      //     // (`https://api.github.com/users/${id}`)
      //       .then(response => response.json())
      //       .then(data => {
      //         setName(data.name)
      //       })
    })();
  }, [score]);
  return (
    <>
      <p>{score}</p>
      <p>{listItems[i].score}</p>
      <ul>
        {listItems.map((listItem) => (
          <li key={listItem.record_id}>
            {listItem.username} {listItem.score}
          </li>
        ))}
      </ul>
      <Helmet>
        {/* https://github.com/nfl/react-helmet */}
        <title>結果</title>
      </Helmet>
      <Stack gap={3}>
        <div className="yourResults">
          <p>結果</p>
          <p id="time"></p>
          <p id="score"></p>
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
              {listItems.map((listItem) => (
                <tr key={listItem.record_id}>
                  <th>1</th>
                  <th>{listItem.username}</th>
                  <th>{listItem.score}</th>
                </tr>
              ))}
              {/* <tr>
                <th>2</th>
                <th>Guest</th>
                <th>100</th>
              </tr>
              <tr>
                <th>3</th>
                <th>Guest</th>
                <th>80</th>
              </tr> */}
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
