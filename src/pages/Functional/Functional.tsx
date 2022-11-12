/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import React, { useState } from "react";
// import keyCodes from "./../../../../keyboard/src/components/data/keyCodes";
import keyCodes from "./../../../keyboard/src/components/data/keyCodes.json";
import {
  functionalLayoutType,
  defaultFunctionalLayoutType,
  defaultPhysicalLayoutType,
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
  for (let i = 0; i < keyCodes.length; i++) {
    Object.assign(object, { [keyCodes[i]]: [keys[0][i], keys[1][i]] });
  }
  return object;
}

export default function Functional(): JSX.Element {
  const [shift, setShift] = useState<boolean>(false);
  const [keys, setKeys] = useState<string[][]>([
    keyCodes.map(
      (
        keyCode // @ts-ignore
      ) => functionalLayoutType[defaultFunctionalLayoutType].content[keyCode][0]
    ),
    keyCodes.map(
      (
        keyCode // @ts-ignore
      ) => functionalLayoutType[defaultFunctionalLayoutType].content[keyCode][1]
    ),
  ]);
  const [fileName, setFileName] = useState<string>("");
  return (
    <>
      <div id="shift">
        <input
          type="checkbox"
          checked={shift}
          onChange={(e) => {
            setShift(e.target.checked);
          }}
        />
        <label>Shift</label>
      </div>
      <Keyboard
        functional="custom"
        physical={defaultPhysicalLayoutType}
        keyLayout={keyToObject(keys)}
        isDefault={true}
        shift={shift}
      ></Keyboard>
      <div className="box"></div>
      <ReadJSONFile
        f={(x: object) => {
          setKeys([
            // @ts-ignore
            keyCodes.map((keyCode) => x[keyCode][0]), // @ts-ignore
            keyCodes.map((keyCode) => x[keyCode][1]),
          ]);
        }}
      ></ReadJSONFile>
      <table>
        <tbody>
          {keyCodes.map((keyCode, i) => (
            <tr key={keyCode}>
              <th>{keyCode}</th>
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
