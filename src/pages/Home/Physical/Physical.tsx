/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import React, { useState } from "react";
// import EventCode from "./../../../../keyboard/src/components/data/eventCode";
import eventCode from "./../../../../keyboard/src/components/data/eventCode.json";
import jis109 from "./../../../../keyboard/src/components/data/JIS109.json";
import Keyboard from "../../../../keyboard/src/components/keyboard";
import ReadJSONFile from "./../../../components/ReadJSONFile";
import GetManySettings from "./../../../components/GetManySettings";
import GetFileName from "./../../../components/GetFileName";
import makeJSONFile from "./../../../components/makeJSONFile";
import ConfirmButton from "./../../../components/ConfirmButton";
import BackToHome from "../../../components/BackToHome";
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
    eventCode: {},
  });
  for (let i = 0; i < eventCode.length; i++) {
    // @ts-ignore
    Object.assign(object.eventCode, {
      [eventCode[i]]: {
        row: rows[i],
        column: columns[i],
        width: widths[i],
        style: JSON.parse(styles[i]),
      },
    });
  }
  return object;
}

export default function Physical(): JSX.Element {
  const [marginRow, setMarginRow] = useState<number>(jis109.marginRow);
  const [marginColumn, setMarginColumn] = useState<number>(jis109.marginColumn);
  const [height, setHeight] = useState<number>(jis109.height);
  const [rows, setRows] = useState<number[]>(
    // @ts-ignore
    eventCode.map((code) => jis109.eventCode[code].row)
  );
  const [columns, setColumns] = useState<number[]>(
    // @ts-ignore
    eventCode.map((code) => jis109.eventCode[code].column)
  );
  const [widths, setWidths] = useState<number[]>(
    // @ts-ignore
    eventCode.map((code) => jis109.eventCode[code].width)
  );
  const [styles, setStyles] = useState<string[]>(
    // @ts-ignore
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
          setRows(eventCode.map((code) => x.eventCode[code].row));
          // @ts-ignore
          setColumns(eventCode.map((code) => x.eventCode[code].column));
          // @ts-ignore
          setWidths(eventCode.map((code) => x.eventCode[code].width));
          // @ts-ignore
          setStyles(eventCode.map((code) => x.eventCode[code].style));
        }}
      ></ReadJSONFile>
      <table>
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
      </table>
      <table>
        {eventCode.map((code, i) => (
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
