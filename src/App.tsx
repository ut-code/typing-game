import eventCode from "./eventCode.json";
import qwerty from "./qwerty.json";
import React, { useState } from "react";

let defaultKeyLayout: any = qwerty;

const makeJSONFile = (object: object, fileName: string) => {
  const blob = new Blob([JSON.stringify(object)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName + ".json";
  a.click();
  URL.revokeObjectURL(a.href);
}

const ReadJSONFile = (props: { f: (x: object) => void }) => {
  return (
    <input type="file" accept=".json" onChange={async (e) => {
      if (e.target.files !== null) {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.readAsText(file, "utf-8");
        reader.onload = () => {
          props.f(JSON.parse(reader.result as string));
        }
      }
    }} />
  );
}

export default function App() {
  const [keys, setKeys] = useState<string[]>(eventCode.map((code) => (defaultKeyLayout[code])));
  const [fileName, setFileName] = useState<string>("");
  return (
    <>
      <ReadJSONFile f={(x) => {
        defaultKeyLayout = x;
        setKeys(eventCode.map((code) => (defaultKeyLayout[code])));
      }} ></ReadJSONFile>
      {eventCode.map((code, i) => (
        <li key={code}>{code}
          <input
            value={keys[i]}
            onChange={(e) => {
              setKeys(keys.map((key, j) => (i === j ? e.target.value : key)));
            }}></input>
        </li>
      ))}
      <input type="text" placeholder="ファイル名を入力してください。" value={fileName} onChange={(e) => { setFileName(e.target.value) }} />
      <button onClick={() => {
        let result = {};
        for (let i = 0; i < keys.length; i++) {
          Object.assign(result, { [eventCode[i]]: keys[i] });
        }
        makeJSONFile(result, fileName);
      }}>確定</button>
    </>
  );
}
