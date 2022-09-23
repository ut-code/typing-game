/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import React, { useState } from "react";
// import EventCode from "./../../../../keyboard/src/components/data/eventCode";
import eventCode from "./../../../../keyboard/src/components/data/eventCode.json";
import {
  functionalLayoutType,
  defaultFunctionalLayout,
  defaultPhysicalLayout,
} from "../../../../keyboard/src/components/data/keyboardSettings";
import Keyboard from "../../../../keyboard/src/components/keyboard";
import ReadJSONFile from "./../../../components/ReadJSONFile";
import GetManySettings from "./../../../components/GetManySettings";
import GetFileName from "./../../../components/GetFileName";
import ConfirmButton from "./../../../components/ConfirmButton";
import makeJSONFile from "./../../../components/makeJSONFile";
import BackToHome from "../../../components/BackToHome";
import "./functional.css";
import "./../keyboard.css";

function keyToObject(keys: string[]): object {
  const object = {};
  for (let i = 0; i < eventCode.length; i++) {
    Object.assign(object, { [eventCode[i]]: keys[i] });
  }
  return object;
}

export default function Functional(): JSX.Element {
  const [keys, setKeys] = useState<string[]>(
    eventCode.map(
      // @ts-ignore
      (code) => functionalLayoutType[defaultFunctionalLayout].content[code]
    )
  );
  const [fileName, setFileName] = useState<string>("");
  return (
    <>
      <Keyboard
        functional="custom"
        physical={defaultPhysicalLayout}
        keyLayout={keyToObject(keys)}
        isDefault={true}
      ></Keyboard>
      <div className="box"></div>
      <ReadJSONFile
        f={(x: object) => {
          // @ts-ignore
          setKeys(eventCode.map((code) => x[code]));
        }}
      ></ReadJSONFile>
      <table>
        <tbody>
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
        </tbody>
      </table>
      <GetFileName fileName={fileName} setFileName={setFileName}></GetFileName>
      <ConfirmButton
        f={() => {
          makeJSONFile(keyToObject(keys), fileName);
        }}
      ></ConfirmButton>
      <BackToHome></BackToHome>
    </>
  );
}
