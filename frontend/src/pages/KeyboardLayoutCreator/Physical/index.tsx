/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import React, { useState } from "react"
// import keyCodes from "./../../../../keyboard/src/components/data/keyCodes";
import keyCodes from "../../../../keyboard-layout-creator/keyboard/src/components/data/keyCodes.json"
import {
  physicalLayoutType,
  defaultFunctionalLayoutType,
  defaultPhysicalLayoutType,
} from "../../../../keyboard-layout-creator/keyboard/src/components/data/keyboardSettings"
import Keyboard from "../../../../keyboard-layout-creator/keyboard/src/components/keyboard"
import ReadJSONFile from "../../../../keyboard-layout-creator/src/components/ReadJSONFile"
import GetManySettings from "../../../../keyboard-layout-creator/src/components/GetManySettings"
import GetFileName from "../../../../keyboard-layout-creator/src/components/GetFileName"
import makeJSONFile from "../../../../keyboard-layout-creator/src/components/makeJSONFile"
import ConfirmButton from "../../../../keyboard-layout-creator/src/components/ConfirmButton"
import BackToHome from "../../../../keyboard-layout-creator/src/components/BackToHome"
import "./style.css"
import "./../keyboard.css"

function physicalKeyToObject(
  marginRow: number,
  marginColumn: number,
  height: number,
  rows: number[],
  columns: number[],
  widths: number[],
  styles: string[]
): object {
  const version = "1.0"
  const object = {}
  Object.assign(object, {
    version,
    marginRow,
    marginColumn,
    height,
    keyCodes: {},
  })
  for (let i = 0; i < keyCodes.length; i++) {
    // @ts-ignore
    Object.assign(object.keyCodes, {
      [keyCodes[i]]: {
        row: rows[i],
        column: columns[i],
        width: widths[i],
        style: styles[i],
      },
    })
  }
  return object
}

export default function Physical(): JSX.Element {
  const defaultPhysical = physicalLayoutType[defaultPhysicalLayoutType].content
  const [marginRow, setMarginRow] = useState<number>(defaultPhysical.marginRow)
  const [marginColumn, setMarginColumn] = useState<number>(defaultPhysical.marginColumn)
  const [height, setHeight] = useState<number>(defaultPhysical.height)
  const [rows, setRows] = useState<number[]>(
    // @ts-ignore
    keyCodes.map((keyCode) => defaultPhysical.keyCodes[keyCode].row)
  )
  const [columns, setColumns] = useState<number[]>(
    // @ts-ignore
    keyCodes.map((keyCode) => defaultPhysical.keyCodes[keyCode].column)
  )
  const [widths, setWidths] = useState<number[]>(
    // @ts-ignore
    keyCodes.map((keyCode) => defaultPhysical.keyCodes[keyCode].width)
  )
  const [styles, setStyles] = useState<string[]>(
    // @ts-ignore
    keyCodes.map((keyCode) => defaultPhysical.keyCodes[keyCode].style)
  )
  const [fileName, setFileName] = useState<string>("")
  return (
    <>
      <Keyboard
        functional={defaultFunctionalLayoutType}
        physical="custom"
        physicalKeyLayout={physicalKeyToObject(marginRow, marginColumn, height, rows, columns, widths, styles)}
        isCustom={false}
        shift={false}
      ></Keyboard>
      <div className="box"></div>

      <div className="content">
        すでに作成したデータを読み込んでそれを編集したい場合は、ここからファイルを読み込んでください。はじめての場合は、無視してください。
      </div>
      <ReadJSONFile
        f={(x: object) => {
          // @ts-ignore
          setMarginRow(x.marginRow)
          // @ts-ignore
          setMarginColumn(x.marginColumn)
          // @ts-ignore
          setHeight(x.height)
          // @ts-ignore
          setRows(keyCodes.map((keyCode) => x.keyCodes[keyCode].row))
          // @ts-ignore
          setColumns(keyCodes.map((keyCode) => x.keyCodes[keyCode].column))
          // @ts-ignore
          setWidths(keyCodes.map((keyCode) => x.keyCodes[keyCode].width))
          // @ts-ignore
          setStyles(keyCodes.map((keyCode) => x.keyCodes[keyCode].style))
        }}
      ></ReadJSONFile>

      <br />
      <br />
      <div className="content">
        margin-row：列の間隔
        <br />
        margin-column：行の間隔
        <br />
        height：キーの高さ
        <br />
      </div>
      <table>
        <tbody>
          <tr>
            <th>margin-row</th>
            <td>
              <input
                type="number"
                value={marginRow}
                onChange={(e) => {
                  setMarginRow(e.target.valueAsNumber)
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
                  setMarginColumn(e.target.valueAsNumber)
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
                  setHeight(e.target.valueAsNumber)
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <div className="content">
        左に行、右に列の番号を入力すると、キーがそこに表示されます。基本は変えなくて良いでしょう。
        一番右には、キーの横幅を入力することができます。
      </div>
      <table>
        <tbody>
          {keyCodes.map((keyCode, i) => (
            <tr key={keyCode}>
              <th>{keyCode}</th>
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
              {/* <td>
                <GetManySettings<string>
                  type="string"
                  className="style"
                  placeholder="style"
                  items={styles}
                  setItems={setStyles}
                  i={i}
                ></GetManySettings>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <div className="content">
        拡張子を除いたファイル名を入力して、確定ボタンを押してください。今作ったデータがダウンロードされます。
      </div>
      <GetFileName fileName={fileName} setFileName={setFileName}></GetFileName>
      <ConfirmButton
        f={() => {
          makeJSONFile(physicalKeyToObject(marginRow, marginColumn, height, rows, columns, widths, styles), fileName)
        }}
      ></ConfirmButton>
      <BackToHome></BackToHome>
    </>
  )
}
