import eventCode from "./eventCode.json";
import qwerty from "./qwerty.json";
import { useState } from "react";
import EventCode from "./eventCode.d.ts";
import makeJSONFile from "./components/makeJSONFile";
import ReadJSONFile from "./components/ReadJSONFile";

let defaultKeyLayout: EventCode = qwerty;

export default function App() {
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
