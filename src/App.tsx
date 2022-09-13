import React, { useState, useEffect} from "react";
import Keyboard from "./components/keyboard";
import eventCode from "./components/data/eventCode.json";

export default function App(): JSX.Element {
  const [functional, setFunctional] = useState<string>("qwerty");
  const [physical, setPhysical] = useState<string>("jis109");
  const [keyColors, setKeyColors] = useState<string[]>(
    eventCode.map((code) => "rgba(0,0,0,0)")
  );
  const keydowne = (e: KeyboardEvent) => {
      setKeyColors((keyColors)=>
        eventCode.map((code, i) =>
          code === e.code ? "lightgreen" : keyColors[i]
        )
      );
      // setKeyColors(
      //   eventCode.map((tmp, i) =>
      //     tmp === e.code ? "orange" : keyColors[i]
      //   )
      // );
      // setTimeout(() => {
      //   setKeyColors(
      //     eventCode.map((tmp, i) =>
      //       tmp === e.code ? "rgba(0,0,0,0)" : keyColors[i]
      //     )
      //   );
      // }, 50);
    };

  useEffect(() => {
    document.addEventListener("keydown", keydowne);
  },[]);
  return (
    <>
      <select
        value={functional}
        onChange={(e) => setFunctional(e.target.value)}
      >
        <option value="qwerty">QWERTY</option>
        <option value="dvorak">Dvorak</option>
      </select>
      <select value={physical} onChange={(e) => setPhysical(e.target.value)}>
        <option value="jis109">JIS109</option>
      </select>
      <Keyboard
        functional={functional}
        physical={physical}
        keyColors={keyColors}
        setKeyColors={setKeyColors}
      ></Keyboard>
    </>
  );
}
