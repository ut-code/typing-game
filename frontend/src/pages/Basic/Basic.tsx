import { useEffect, useState } from "react";
import Keyboard from "./../../../keyboard-layout-creator/keyboard/src/App";
import "./style.css";
// @ts-ignore
import script from "./script";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ProgressBar, Stack } from "react-bootstrap";

export default function Basic() {
  const [content, setContent] = useState<string>("a");
  const [now, setNow] = useState<number>(0);

  useEffect(() => {
    script(now, setNow);
  }, []);
  const cont = document.getElementById("content");
  if (cont !== null) cont.textContent = content;
  return (
    <>
      {/* ここからHTMLファイル */}
      <div id="score-related">
        <Stack direction="horizontal" gap={3}>
          <table id="current">
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

          <div id="rawcode">{}</div>

          <div id="compilecode">
            {/* addcodeを画面に表示したものを入れる */}
          </div>

          <Stack gap={0} id="progress">
            <div id="progress-number"></div>
            <div className="pb-5" id="progress-bar">
              <ProgressBar
                variant="success"
                striped
                animated
                now={now}
                label={`${now}%`}
              />
            </div>
          </Stack>
        </Stack>
      </div>
      <div id="elements">
        <div id="answer">
          {/* <p id="mondai">問題</p> */}
          <span id="answered"></span>
          <span id="question">[Space]を押して開始</span>
          {/*<p id="your-answer"></p>*/}
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
