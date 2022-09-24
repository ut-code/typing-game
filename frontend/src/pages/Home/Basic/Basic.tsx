import { useEffect, useState } from "react";
import Keyboard from "./../../../../../keyboard/src/App";
import "./style.css";
// @ts-ignore
import script from "./script";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ProgressBar } from "react-bootstrap";

export default function Basic() {
  const [content, setContent] = useState<string>("a");
  useEffect(() => {
    script();
  }, []);
  const cont = document.getElementById("content");
  if (cont !== null) cont.textContent = content;
  return (
    <>
      {/* ここからHTMLファイル */}
      <body>
        <div id="elements">
          <div>
            {/* <p id="mondai">問題</p> */}
            <p id="question">[Space]を押して開始</p>
            <p id="your-answer"></p>
            {/* <table id="answer">
              <tbody>
                <tr>
                  <th id="header">あなたの答え</th>
                  <td id="your-answer"></td>
                </tr>
              </tbody>
            </table> */}
          </div>
        </div>
        <div>
          <table id="result">
            <tbody>
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
        </div>
        <Button href="/" variant="secondary">
          Back
        </Button>
      </body>
      {/* ここまでHTMLファイル */}
      {/* 下のdivの中にReactがキーボードの入力結果をいい感じにして、出力している。これを、読み取って使えば良い。 */}
      <div id="content"></div>
      <Keyboard
        element={
          <>
            キーボード配列を自分で作りたい人は、
            <a href="https://keyboard-layout-maker.onrender.com/">このリンク</a>
            に飛んでください。
          </>
        }
        output={content}
        setOutput={setContent}
      />
    </>
  );
}
