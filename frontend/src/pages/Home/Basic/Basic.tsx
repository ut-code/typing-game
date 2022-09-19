import { useEffect } from "react";
import Keyboard from "./../../../../../keyboard/src/App";
import "./style.css";
// @ts-ignore
import script from "./script";

export default function Basic() {
  useEffect(() => {
    script();
  }, []);
  return (
    <>
      {/* ここからHTMLファイル */}
      <div id="elements">
        <div>
          <p id="mondai">問題</p>
          <p id="question">スペースキーを押して開始</p>
          <table id="answer">
            <tbody>
              <tr>
                <th id="header">あなたの答え</th>
                <td id="your-answer"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table id="result">
            <p>結果</p>
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
            </tbody>
          </table>
        </div>
      </div>
      {/* ここまでHTMLファイル */}
      <Keyboard
        element={
          <>
            キーボード配列を自分で作りたい人は、
            <a href="https://keyboard-layout-maker.onrender.com/">このリンク</a>
            に飛んでください。
          </>
        }
      />
    </>
  );
}
