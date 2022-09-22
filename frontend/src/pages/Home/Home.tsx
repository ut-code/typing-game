import { useEffect } from "react";
// @ts-ignore
import script from "./script.js";
import "./style.css";

export default function Home() {
  useEffect(() => {
    script();
  }, []);
  return (
    <>
      <header>
        <b>タイピングゲーム ホーム画面</b>
      </header>
      ユーザーネーム: <input name="username" placeholder="Guest" />
      問題番号: <input name="questionNumber" placeholder="0" />
      <button id="play-button">プレイする</button>
    </>
  );
}
