import { useEffect, useState } from "react";
import Keyboard from "./../../../../keyboard-layout-creator/keyboard/src/App";
import "./style.css";
// @ts-ignore
import script from "./script";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

export default function Basic() {
  const [content, setContent] = useState<string>("a");
  const now = 60;
  useEffect(() => {
    script();
  }, []);
  const cont = document.getElementById("content");
  if (cont !== null) cont.textContent = content;
  return (
    <>
      {/* ここからHTMLファイル */}
      <div id="score-related">
        <table id="current">
          <tbody>
            <tr>
              <th>スコア：</th>
              <td id="score">000000</td>
            </tr>
            <tr>
              <th>正しいタイプ数：</th>
              <td id="correct"></td>
            </tr>
            <tr>
              <th>ミスタイプ数：</th>
              <td id="miss"></td>
            </tr>
            <tr>
              <th>経過時間：</th>
              <td id="time"></td>
            </tr>
            <tr>
              <th>残り時間：</th>
              <td id="timeLeft"></td>
            </tr>
          </tbody>
        </table>
        <div id="progress">3/10問</div>
      </div>
      <div id="elements">
        <div id="answer">
          {/* <p id="mondai">問題</p> */}
          <p id="question">[Space]を押して開始</p>
          <p id="your-answer"></p>
        </div>
      </div>
      <Button href="/" variant="secondary">
        Back
      </Button>
      {/* ここまでHTMLファイル */}
      {/* 下のdivの中にReactがキーボードの入力結果をいい感じにして、出力している。これを、読み取って使えば良い。 */}
      <div id="content"></div>
      <Keyboard
        element={
          <>
            キーボード配列を自分で作りたい人は、
            <a href="https://keyboard-layout-creator.onrender.com/">
              このリンク
            </a>
            に飛んでください。
          </>
        }
        output={content}
        setOutput={setContent}
      />
    </>
  );
}
