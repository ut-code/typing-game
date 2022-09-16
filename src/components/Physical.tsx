import { useState } from "react";
import eventCode from "./../eventCode.json";
import jis109 from "./../JIS109.json";
import Keyboard from "../../keyboard/src/components/keyboard";
import ReadJSONFile from "./ReadJSONFile";
import GetManySettings from "./GetManySettings";
import GetFileName from "./GetFileName";
import makeJSONFile from "./makeJSONFile";
import ConfirmButton from "./ConfirmButton";
import "./physical.css";
import "./keyboard.css";

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

export default function Physical() {
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
      <div className="box"></div>
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
    </>
  );
}
