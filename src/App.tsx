import eventCode from "./eventCode.json";
import qwerty from "./qwerty.json";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import EventCode from "./eventCode.d.ts";
import makeJSONFile from "./components/makeJSONFile";
import ReadJSONFile from "./components/ReadJSONFile";

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

function GetFileName({
  fileName,
  setFileName,
}: {
  fileName: string;
  setFileName: (value: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder="ファイル名を入力してください。"
      value={fileName}
      onChange={(e) => {
        setFileName(e.target.value);
      }}
    />
  );
}

let defaultKeyLayout: EventCode = qwerty;
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
        <div key={code}>
          {code}
          <input
            type="text"
            value={keys[i]}
            onChange={(e) => {
              setKeys(keys.map((key, j) => (i === j ? e.target.value : key)));
            }}
          ></input>
        </div>
      ))}
      <GetFileName fileName={fileName} setFileName={setFileName}></GetFileName>
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
  const [rows, setRows] = useState<number[]>([]);
  const [columns, setColumns] = useState<number[]>([]);
  const [heights, setHeights] = useState<number[]>([]);
  const [styles, setStyles] = useState<string[]>([]);
  return (
    <>
      {eventCode.map((code, i) => (
        <div key={code}>
          {code}
          <input
            type="number"
            min="0"
            style={{ width: "80px" }}
            placeholder="row"
            value={rows[i]}
            onChange={(e) => {
              setRows(
                rows.map((row, j) => (i === j ? e.target.valueAsNumber : row))
              );
            }}
          />
          <input
            type="number"
            min="0"
            style={{ width: "80px" }}
            placeholder="column"
            value={columns[i]}
            onChange={(e) => {
              setColumns(
                columns.map((column, j) =>
                  i === j ? e.target.valueAsNumber : column
                )
              );
            }}
          />
          <input
            type="number"
            min="0"
            style={{ width: "80px" }}
            placeholder="height"
            value={heights[i]}
            onChange={(e) => {
              setHeights(
                heights.map((height, j) =>
                  i === j ? e.target.valueAsNumber : height
                )
              );
            }}
          />
          <input
            type="text"
            placeholder="style"
            value={styles[i]}
            onChange={(e) => {
              setStyles(
                styles.map((style, j) => (i === j ? e.target.value : style))
              );
            }}
          />
        </div>
      ))}
    </>
  );
}
