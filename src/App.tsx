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
 * @param margin `margin`
 * @returns `width` と `margin` の合計
 */
function sumHeight(row: number, column: number, margin: number) {
  let sum = 1;
  let j = 0;
  for (const code of eventCode) {
    if (jis109[code].row === row && jis109[code].column < column) {
      sum += jis109[code].width + margin;
      j++;
    }
    if (j >= column) break;
  }
  return sum;
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
              top: jis109[code].row * 4 + "vw",
              left:
                sumHeight(jis109[code].row, jis109[code].column, 0.3 / 3.7) *
                  3.7 +
                "vw",
              width: jis109[code].width * 3.7 + "vw",
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
