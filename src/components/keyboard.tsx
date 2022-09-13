import { useState } from "react";
import eventCode from "./data/eventCode.json";
import qwerty from "./data/qwerty.json";
import dvorak from "./data/dvorak.json";
import jis109 from "./data/JIS109.json";
import "./keyboard.css";

let functionalLayout = "qwerty";
const functionalLayoutType = { qwerty: qwerty, dvorak: dvorak };
let physicalLayout = "jis109";
const physicalLayoutType = { jis109: jis109 };
const magnification = 3;

/**
 * `row` 行の `column` 列までの幅の合計を計算します。
 * @param row `row`
 * @param column `column`
 * @returns `width` と `jis109.eventCode.marginColumn` の合計
 */
function sumWidth(row: number, column: number) {
  let sum = physicalLayoutType[physicalLayout].marginColumn;
  let j = 0;
  for (const code of eventCode) {
    if (
      physicalLayoutType[physicalLayout].eventCode[code].row === row &&
      physicalLayoutType[physicalLayout].eventCode[code].column < column
    ) {
      sum +=
        physicalLayoutType[physicalLayout].eventCode[code].width +
        physicalLayoutType[physicalLayout].marginColumn;
      j++;
    }
    if (j >= column) break;
  }
  return sum;
}

/**
 * `row` までの高さの合計を計算します。
 * @param row `row`
 * @returns `row` までの高さの合計
 */
function sumHeight(row: number) {
  return (
    physicalLayoutType[physicalLayout].marginRow +
    (physicalLayoutType[physicalLayout].height +
      physicalLayoutType[physicalLayout].marginRow) *
      (row - 1)
  );
}

export default function Keyboard({
  functional,
  physical,
  keyColors,
  setKeyColors,
}: {
  functional: string;
  physical: string;
  keyColors: string[];
  setKeyColors: (value: Array<string>) => void;
}) {
  functionalLayout = functional;
  physicalLayout = physical;
  return (
    <>
      <div id="keyboard">
        {eventCode.map((code, i) => (
          <div
            key={code}
            id={code}
            className="key"
            style={{
              position: "absolute",
              backgroundColor: keyColors[i],
              top:
                sumHeight(
                  physicalLayoutType[physicalLayout].eventCode[code].row
                ) *
                  magnification +
                "vw",
              left:
                sumWidth(
                  physicalLayoutType[physicalLayout].eventCode[code].row,
                  physicalLayoutType[physicalLayout].eventCode[code].column
                ) *
                  magnification +
                "vw",
              width:
                physicalLayoutType[physicalLayout].eventCode[code].width *
                  magnification +
                "vw",
              height:
                physicalLayoutType[physicalLayout].height * magnification +
                "vw",
            }}
            // ref={dom=>{console.log(dom?.textContent)}}
          >
            {functionalLayoutType[functionalLayout][code]}
          </div>
        ))}
      </div>
    </>
  );
}
