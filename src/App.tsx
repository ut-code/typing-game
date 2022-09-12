import { useState } from "react";
import eventCode from "./eventCode.json";
import qwerty from "./qwerty.json";
import dvorak from "./dvorak.json";
import jis109 from "./JIS109.json";
import "./App.css";

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
              left: jis109[code].column * 4 + "vw",
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
