import { Link } from "react-router-dom";
import howToUse from "/how_to_use.mp4";
import "./style.css";
export default function KeyboardLayoutCreator(): JSX.Element {
  return (
    <>
      <main>
        <h2>Keyboard Layout Creator</h2>
        <p>
          駒場祭のタイピングゲームのキーボード配列を作成するためのプログラムです。
        </p>
        <p>
          論理配列と物理配列をそれぞれ自分で作成して、
          <Link to="/">駒場祭のタイピングゲーム</Link>
          でそれを使用することができます。自分にあったキーボード配列を作ってタイピング速度を上げてみてください。
        </p>
        <p>
          基本的には、論理配列の方を編集すればよいでしょう。ここで、キーを交換することなどが自由にできます。どうしても、キーボードの物理的な配列を変えたいときには、物理配列の方を編集してみてください。
        </p>

        <video controls muted src={howToUse} width="700px" />
      </main>
      <nav>
        <Link to="/keyboard-layout-creator/functional">論理配列</Link>
        <br />
        <Link to="/keyboard-layout-creator/physical">物理配列</Link>
      </nav>
    </>
  );
}
