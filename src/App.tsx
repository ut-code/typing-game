import eventCode from "./eventCode.json";
import qwerty from "./qwerty.json";
import jis109 from "./JIS109.json";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import EventCode from "./eventCode.d.ts";
import makeJSONFile from "./components/makeJSONFile";
import ReadJSONFile from "./components/ReadJSONFile";
import Keyboard from "./../keyboard/src/components/keyboard";
import "./App.css";

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
 * 確定ボタンのコンポーネントです。
 * @param f `onClick` 用の関数
 */
function ConfirmButton({ f }: { f: () => void }) {
  return <button onClick={f}>確定</button>;
}

function keyToObject(keys: string[]): object {
  let object = {};
  for (let i = 0; i < eventCode.length; i++) {
    Object.assign(object, { [eventCode[i]]: keys[i] });
  }
  return object;
}

function Functional() {
  const [keys, setKeys] = useState<string[]>(
    eventCode.map((code) => qwerty[code])
  );
  const [fileName, setFileName] = useState<string>("");
  return (
    <>
      <Keyboard
        functional="custom"
        physical="jis109"
        keyLayout={keyToObject(keys)}
      ></Keyboard>
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
        f={() => {
          makeJSONFile(keyToObject(keys), fileName);
        }}
      ></ConfirmButton>
    </>
  );
}

function physicalKeyToObject(
  marginRow: number,
  marginColumn: number,
  height: number,
  rows: number[],
  columns: number[],
  widths: number[],
  styles: string[]
) {
  let object = {};
  Object.assign(object, {
    marginRow: marginRow,
    marginColumn: marginColumn,
    height: height,
    eventCode: {},
  });
  for (let i = 0; i < eventCode.length; i++) {
    Object.assign(object.eventCode, {
      [eventCode[i]]: {
        row: rows[i],
        column: columns[i],
        width: widths[i],
        style: styles[i],
      },
    });
  }
  return object;
}

function Physical() {
  const [marginRow, setMarginRow] = useState<number>(jis109.marginRow);
  const [marginColumn, setMarginColumn] = useState<number>(jis109.marginColumn);
  const [height, setHeight] = useState<number>(jis109.height);
  const [rows, setRows] = useState<number[]>(
    eventCode.map((code) => jis109.eventCode[code].row)
  );
  const [columns, setColumns] = useState<number[]>(
    eventCode.map((code) => jis109.eventCode[code].column)
  );
  const [widths, setWidths] = useState<number[]>(
    eventCode.map((code) => jis109.eventCode[code].width)
  );
  const [styles, setStyles] = useState<string[]>(
    eventCode.map((code) => jis109.eventCode[code].style)
  );
  const [fileName, setFileName] = useState<string>("");
  return (
    <>
      <Keyboard
        functional="qwerty"
        physical="custom"
        physicalKeyLayout={physicalKeyToObject(
          marginRow,
          marginColumn,
          height,
          rows,
          columns,
          widths,
          styles
        )}
      ></Keyboard>
      <ReadJSONFile
        f={(x) => {
          setMarginRow(x.marginRow);
          setMarginColumn(x.marginColumn);
          setHeight(x.height);
          setRows(eventCode.map((code) => x.eventCode[code].row));
          setColumns(eventCode.map((code) => x.eventCode[code].column));
          setWidths(eventCode.map((code) => x.eventCode[code].width));
          setStyles(eventCode.map((code) => x.eventCode[code].style));
        }}
      ></ReadJSONFile>
      <div>
        margin-row
        <input
          type="number"
          value={marginRow}
          onChange={(e) => {
            setMarginRow(e.target.valueAsNumber);
          }}
        />
      </div>
      <div>
        margin-column
        <input
          type="number"
          value={marginColumn}
          onChange={(e) => {
            setMarginColumn(e.target.valueAsNumber);
          }}
        />
      </div>
      <div>
        height
        <input
          type="number"
          value={height}
          onChange={(e) => {
            setHeight(e.target.valueAsNumber);
          }}
        />
      </div>
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
            placeholder="width"
            items={widths}
            setItems={setWidths}
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
        f={() => {
          makeJSONFile(
            physicalKeyToObject(
              marginRow,
              marginColumn,
              height,
              rows,
              columns,
              widths,
              styles
            ),
            fileName
          );
        }}
      ></ConfirmButton>
    </>
  );
}
