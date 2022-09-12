import eventCode from "./eventCode.json";
import qwerty from "./qwerty.json";
import jis109 from "./JIS109.json";
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

/**
 * ファイル名を入力させるinputタグ
 */
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

/**
 * `i` 番目を入力させるinputタグ
 */
function GetManySettings<T extends string | number>({
  type,
  items,
  setItems,
  i,
  min,
  style,
  placeholder,
}: {
  type: "string" | "number";
  items: T[];
  setItems: (value: T[]) => void;
  i: number;
  min?: number;
  style?: object;
  placeholder?: string;
}) {
  return (
    <input
      type={type === "string" ? "text" : "number"}
      min={min}
      style={style}
      placeholder={placeholder}
      value={items[i]}
      onChange={(e) => {
        setItems(
          items.map((item, j) =>
            i !== j
              ? item
              : type === "string"
              ? e.target.value
              : e.target.valueAsNumber
          )
        );
      }}
    />
  );
}

/**
 * `i` 番目のオブジェクトを決めてそれを出力するコンポーネントです。
 * @param f `i` を受け取って、`i` 番目のオブジェクトを返す関数
 * @param fileName ファイル名
 */
function ConfirmButton({
  f,
  fileName,
}: {
  f: (i: number) => object;
  fileName: string;
}) {
  return (
    <button
      onClick={() => {
        let result = {};
        for (let i = 0; i < eventCode.length; i++) {
          Object.assign(result, f(i));
        }
        makeJSONFile(result, fileName);
      }}
    >
      確定
    </button>
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
          setKeys(eventCode.map((code) => x[code]));
        }}
      ></ReadJSONFile>
      {eventCode.map((code, i) => (
        <div key={code}>
          {code}
          <GetManySettings<string>
            type="string"
            items={keys}
            setItems={setKeys}
            i={i}
          ></GetManySettings>
        </div>
      ))}
      <GetFileName fileName={fileName} setFileName={setFileName}></GetFileName>
      <ConfirmButton
        f={(i) => ({ [eventCode[i]]: keys[i] })}
        fileName={fileName}
      ></ConfirmButton>
    </>
  );
}

function Physical() {
  const [rows, setRows] = useState<number[]>(
    eventCode.map((code) => jis109[code].row)
  );
  const [columns, setColumns] = useState<number[]>(
    eventCode.map((code) => jis109[code].column)
  );
  const [heights, setHeights] = useState<number[]>(
    eventCode.map((code) => jis109[code].height)
  );
  const [styles, setStyles] = useState<string[]>(
    eventCode.map((code) => jis109[code].style)
  );
  const [fileName, setFileName] = useState<string>("");
  return (
    <>
      <ReadJSONFile
        f={(x) => {
          setRows(eventCode.map((code) => x[code].row));
          setColumns(eventCode.map((code) => x[code].column));
          setHeights(eventCode.map((code) => x[code].height));
          setStyles(eventCode.map((code) => x[code].style));
        }}
      ></ReadJSONFile>
      {eventCode.map((code, i) => (
        <div key={code}>
          {code}
          <GetManySettings<number>
            type="number"
            min={0}
            style={{ width: "80px" }}
            placeholder="row"
            items={rows}
            setItems={setRows}
            i={i}
          ></GetManySettings>
          <GetManySettings<number>
            type="number"
            min={0}
            style={{ width: "80px" }}
            placeholder="column"
            items={columns}
            setItems={setColumns}
            i={i}
          ></GetManySettings>
          <GetManySettings<number>
            type="number"
            min={0}
            style={{ width: "80px" }}
            placeholder="height"
            items={heights}
            setItems={setHeights}
            i={i}
          ></GetManySettings>
          <GetManySettings<string>
            type="string"
            placeholder="style"
            items={styles}
            setItems={setStyles}
            i={i}
          ></GetManySettings>
        </div>
      ))}
      <GetFileName fileName={fileName} setFileName={setFileName}></GetFileName>
      <ConfirmButton
        f={(i) => ({
          [eventCode[i]]: {
            row: rows[i],
            column: columns[i],
            height: heights[i],
            style: styles[i],
          },
        })}
        fileName={fileName}
      ></ConfirmButton>
    </>
  );
}
