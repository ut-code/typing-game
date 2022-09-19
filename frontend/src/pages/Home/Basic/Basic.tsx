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
        <p id="mondai">問題</p>
        <p id="question">スペースキーを押して開始</p>
        <table id="answer">
          <th id="header">あなたの答え</th>
          <td id="your-answer"></td>
        </table>
        <table id="result">
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
        </table>
      </div>
      {/* ここまでHTMLファイル */}
      キーボード配列を自分で作りたい人は、
      <a href="https://keyboard-layout-maker.onrender.com/">このリンク</a>
      に飛んでください。
      <Keyboard />
    </>
  );
}
