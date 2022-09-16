import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <main>
        <h2>Keyboard Layout Maker</h2>
        <p>
          駒場祭のタイピングゲームのキーボード配列を作成するためのプログラムです。
        </p>
      </main>
      <nav>
        <Link to="/physical">物理配列</Link>
        <br />
        <Link to="/functional">論理配列</Link>
      </nav>
    </>
  );
}
