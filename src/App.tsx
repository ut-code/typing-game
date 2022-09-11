import eventCode from "./eventCode.json";
import qwerty from "./qwerty.json";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import EventCode from "./eventCode.d.ts";
import makeJSONFile from "./components/makeJSONFile";
import ReadJSONFile from "./components/ReadJSONFile";

let defaultKeyLayout: EventCode = qwerty;

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/physical" element={<Physical />}></Route>
        <Route path="/functional" element={<Functional />}></Route>
      </Routes>
    </>
  );
}

function Home() {
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

function Functional() {
  const [keys, setKeys] = useState<string[]>(
    eventCode.map((code) => defaultKeyLayout[code])
  );
  const [fileName, setFileName] = useState<string>("");
  return (
    <>
      <ReadJSONFile
        f={(x: EventCode) => {
          defaultKeyLayout = x;
          setKeys(eventCode.map((code) => defaultKeyLayout[code]));
        }}
      ></ReadJSONFile>
      {eventCode.map((code, i) => (
        <li key={code}>
          {code}
          <input
            value={keys[i]}
            onChange={(e) => {
              setKeys(keys.map((key, j) => (i === j ? e.target.value : key)));
            }}
          ></input>
        </li>
      ))}
      <input
        type="text"
        placeholder="ファイル名を入力してください。"
        value={fileName}
        onChange={(e) => {
          setFileName(e.target.value);
        }}
      />
      <button
        onClick={() => {
          let result = {};
          for (let i = 0; i < keys.length; i++) {
            Object.assign(result, { [eventCode[i]]: keys[i] });
          }
          makeJSONFile(result, fileName);
        }}
      >
        確定
      </button>
    </>
  );
}

function Physical() {
  return <div>hello</div>;
}
