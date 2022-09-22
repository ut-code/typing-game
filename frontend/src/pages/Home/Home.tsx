// @ts-ignore
import script from "./script.js";
import "./style.css";

export default function Home() {
  return (
    <>
      <header>
        <b>タイピングゲーム ホーム画面</b>
      </header>
      <form method="post" action="/cook">
        ユーザーネーム: <input name="username" placeholder="Guest" />
        問題番号: <input name="question-number" placeholder="0" />
        <button name="play-button">プレイする</button>
      </form>
    </>
  );
}
