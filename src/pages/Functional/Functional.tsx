/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import React, { useState } from "react";
// import EventCode from "./../../../../keyboard/src/components/data/eventCode";
import eventCode from "./../../../keyboard/src/components/data/eventCode.json";
import {
  functionalLayoutType,
  defaultFunctionalLayout,
  defaultPhysicalLayout,
} from "./../../../keyboard/src/components/data/keyboardSettings";
import Keyboard from "./../../../keyboard/src/components/keyboard";
import ReadJSONFile from "./../../components/ReadJSONFile";
import GetManySettings from "./../../components/GetManySettings";
import GetFileName from "./../../components/GetFileName";
import ConfirmButton from "./../../components/ConfirmButton";
import makeJSONFile from "./../../components/makeJSONFile";
import BackToHome from "./../../components/BackToHome";
import "./functional.css";
import "./../keyboard.css";

function keyToObject(keys: string[][]): object {
  const object = {};
  for (let i = 0; i < eventCode.length; i++) {
    Object.assign(object, { [eventCode[i]]: [keys[0][i], keys[1][i]] });
  }
  return object;
}

export default function Functional(): JSX.Element {
  const [keys, setKeys] = useState<string[][]>([
    eventCode.map(
      // @ts-ignore
      (code) => functionalLayoutType[defaultFunctionalLayout].content[code][0]
    ),
    eventCode.map(
      // @ts-ignore
      (code) => functionalLayoutType[defaultFunctionalLayout].content[code][1]
    ),
  ]);
  const [fileName, setFileName] = useState<string>("");
  return (
    <>
      <Keyboard
        functional="custom"
        physical={defaultPhysicalLayout}
        keyLayout={keyToObject(keys)}
        isDefault={true}
        shift={false}
      ></Keyboard>
      <div className="box"></div>
      <ReadJSONFile
        f={(x: object) => {
          setKeys([
            // @ts-ignore
            eventCode.map((code) => x[code][0]), // @ts-ignore
            eventCode.map((code) => x[code][1]),
          ]);
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
                  className="input"
                  items={keys[0]}
                  setItems={(value: string[]) => {
                    setKeys([value, keys[1]]);
                  }}
                  i={i}
                ></GetManySettings>
              </td>
              <td>
                <GetManySettings<string>
                  type="string"
                  className="input"
                  items={keys[1]}
                  setItems={(value: string[]) => {
                    setKeys([keys[0], value]);
                  }}
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
