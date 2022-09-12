import { useState } from "react";
import eventCode from "./eventCode.json";
import qwerty from "./qwerty.json";
import dvorak from "./dvorak.json";
import jis109 from "./JIS109.json";
import "./App.css";

/**
 * `row` 行の `column` 列までの幅の合計を計算します。
 * @param row `row`
 * @param column `column`
 * @returns `width` と `jis109.eventCode.marginColumn` の合計
 */
function sumWidth(row: number, column: number) {
  let sum = jis109.marginColumn;
  let j = 0;
  for (const code of eventCode) {
    if (
      jis109.eventCode[code].row === row &&
      jis109.eventCode[code].column < column
    ) {
      sum += jis109.eventCode[code].width + jis109.marginColumn;
      j++;
    }
    if (j >= column) break;
  }
  return sum;
}

function sumHeight(row: number) {
  return jis109.marginRow + (jis109.height + jis109.marginRow) * (row - 1);
}

export default function App() {
  return (
    <>
      <div id="keyboard">
        {eventCode.map((code) => (
          <div
            id={code}
            className="key"
            style={{
              position: "absolute",
              top: sumHeight(jis109.eventCode[code].row) * 3 + "vw",
              left:
                sumWidth(
                  jis109.eventCode[code].row,
                  jis109.eventCode[code].column
                ) *
                  3 +
                "vw",
              width: jis109.eventCode[code].width * 3 + "vw",
              height: jis109.height * 3 + "vw",
            }}
            // ref={dom=>{console.log(dom?.textContent)}}
          >
            {code}
          </div>
        ))}
      </div>
    </>
  );
}
