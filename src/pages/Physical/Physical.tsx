/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import React, { useState } from "react";
// import keyCodes from "./../../../../keyboard/src/components/data/keyCodes";
import keyCodes from "./../../../keyboard/src/components/data/keyCodes.json";
import {
  physicalLayoutType,
  defaultFunctionalLayout,
  defaultPhysicalLayout,
} from "./../../../keyboard/src/components/data/keyboardSettings";
import Keyboard from "./../../../keyboard/src/components/keyboard";
import ReadJSONFile from "./../../components/ReadJSONFile";
import GetManySettings from "./../../components/GetManySettings";
import GetFileName from "./../../components/GetFileName";
import makeJSONFile from "./../../components/makeJSONFile";
import ConfirmButton from "./../../components/ConfirmButton";
import BackToHome from "../../components/BackToHome";
import "./physical.css";
import "./../keyboard.css";

function physicalKeyToObject(
  marginRow: number,
  marginColumn: number,
  height: number,
  rows: number[],
  columns: number[],
  widths: number[],
  styles: string[]
): object {
  const object = {};
  Object.assign(object, {
    marginRow,
    marginColumn,
    height,
    keyCodes: {},
  });
  for (let i = 0; i < keyCodes.length; i++) {
    // @ts-ignore
    Object.assign(object.keyCodes, {
      [keyCodes[i]]: {
        row: rows[i],
        column: columns[i],
        width: widths[i],
        style: styles[i],
      },
    });
  }
  return object;
}

export default function Physical(): JSX.Element {
  const defaultPhysical = physicalLayoutType[defaultPhysicalLayout].content;
  const [marginRow, setMarginRow] = useState<number>(defaultPhysical.marginRow);
  const [marginColumn, setMarginColumn] = useState<number>(
    defaultPhysical.marginColumn
  );
  const [height, setHeight] = useState<number>(defaultPhysical.height);
  const [rows, setRows] = useState<number[]>(
    // @ts-ignore
    keyCodes.map((code) => defaultPhysical.keyCodes[code].row)
  );
  const [columns, setColumns] = useState<number[]>(
    // @ts-ignore
    keyCodes.map((code) => defaultPhysical.keyCodes[code].column)
  );
  const [widths, setWidths] = useState<number[]>(
    // @ts-ignore
    keyCodes.map((code) => defaultPhysical.keyCodes[code].width)
  );
  const [styles, setStyles] = useState<string[]>(
    // @ts-ignore
    keyCodes.map((code) => defaultPhysical.keyCodes[code].style)
  );
  const [fileName, setFileName] = useState<string>("");
  return (
    <>
      <Keyboard
        functional={defaultFunctionalLayout}
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
        isDefault={true}
        shift={false}
      ></Keyboard>
      <div className="box"></div>
      <ReadJSONFile
        f={(x: object) => {
          // @ts-ignore
          setMarginRow(x.marginRow);
          // @ts-ignore
          setMarginColumn(x.marginColumn);
          // @ts-ignore
          setHeight(x.height);
          // @ts-ignore
          setRows(keyCodes.map((code) => x.keyCodes[code].row));
          // @ts-ignore
          setColumns(keyCodes.map((code) => x.keyCodes[code].column));
          // @ts-ignore
          setWidths(keyCodes.map((code) => x.keyCodes[code].width));
          // @ts-ignore
          setStyles(keyCodes.map((code) => x.keyCodes[code].style));
        }}
      ></ReadJSONFile>
      <table>
        <tbody>
          <tr>
            <th>margin-row</th>
            <td>
              <input
                type="number"
                value={marginRow}
                onChange={(e) => {
                  setMarginRow(e.target.valueAsNumber);
                }}
              />
            </td>
          </tr>
          <tr>
            <th>margin-column</th>
            <td>
              <input
                type="number"
                value={marginColumn}
                onChange={(e) => {
                  setMarginColumn(e.target.valueAsNumber);
                }}
              />
            </td>
          </tr>
          <tr>
            <th>height</th>
            <td>
              <input
                type="number"
                value={height}
                onChange={(e) => {
                  setHeight(e.target.valueAsNumber);
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          {keyCodes.map((code, i) => (
            <tr key={code}>
              <th>{code}</th>
              <td>
                <GetManySettings<number>
                  type="number"
                  min={0}
                  className="row"
                  placeholder="row"
                  items={rows}
                  setItems={setRows}
                  i={i}
                ></GetManySettings>
              </td>
              <td>
                <GetManySettings<number>
                  type="number"
                  min={0}
                  className="column"
                  placeholder="column"
                  items={columns}
                  setItems={setColumns}
                  i={i}
                ></GetManySettings>
              </td>
              <td>
                <GetManySettings<number>
                  type="number"
                  min={0}
                  className="width"
                  placeholder="width"
                  items={widths}
                  setItems={setWidths}
                  i={i}
                ></GetManySettings>
              </td>
              <td>
                <GetManySettings<string>
                  type="string"
                  className="style"
                  placeholder="style"
                  items={styles}
                  setItems={setStyles}
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
      <BackToHome></BackToHome>
    </>
  );
}
