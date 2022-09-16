import { useState } from "react";
import EventCode from "./../../keyboard/src/components/data/eventCode";
import eventCode from "./../../keyboard/src/components/data/eventCode.json";
import qwerty from "../../keyboard/src/components/data/qwerty.json";
import Keyboard from "../../keyboard/src/components/keyboard";
import ReadJSONFile from "./ReadJSONFile";
import GetManySettings from "./GetManySettings";
import GetFileName from "./GetFileName";
import ConfirmButton from "./ConfirmButton";
import makeJSONFile from "./makeJSONFile";
import "./functional.css";
import "./keyboard.css";

function keyToObject(keys: string[]): object {
  let object = {};
  for (let i = 0; i < eventCode.length; i++) {
    Object.assign(object, { [eventCode[i]]: keys[i] });
  }
  return object;
}

export default function Functional() {
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
      <div className="box"></div>
      <ReadJSONFile
        f={(x: object) => {
          setKeys(eventCode.map((code) => x[code]));
        }}
      ></ReadJSONFile>
      <table>
        {eventCode.map((code, i) => (
          <tr key={code}>
            <th>{code}</th>
            <td>
              <GetManySettings<string>
                type="string"
                items={keys}
                setItems={setKeys}
                i={i}
              ></GetManySettings>
            </td>
          </tr>
        ))}
      </table>
      <GetFileName fileName={fileName} setFileName={setFileName}></GetFileName>
      <ConfirmButton
        f={() => {
          makeJSONFile(keyToObject(keys), fileName);
        }}
      ></ConfirmButton>
    </>
  );
}
