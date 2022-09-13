import { useState, useEffect, useCallback } from "react";
// import {useKey} from "react-use";
import Keyboard from "./components/keyboard";
import eventCode from "./components/data/eventCode.json";
import { render } from "react-dom";

export default function App() {
  const [functional, setFunctional] = useState<string>("qwerty");
  const [physical, setPhysical] = useState<string>("jis109");
  const [keyColors, setKeyColors] = useState<string[]>(
    eventCode.map((code) => "rgba(0,0,0,0)")
  );
  const [test, setTest] = useState<string[]>([]);
  // useKey('a',()=>{
  //   // setKeyColors(eventCode.map((code,i)=>(code==='KeyA'?"lightgreen":keyColors[i])));
  //   setTest([false,test[1]]);
  // });
  // useKey('b',()=>{
  //   // setKeyColors(eventCode.map((code,i)=>(code==='KeyB'?"lightgreen":keyColors[i])))
  //   setTest([test[0],false]);
  // });
  // console.log(test);
  const keydowne = useCallback(
    (e: KeyboardEvent) => {
      setKeyColors(
        eventCode.map((code, i) =>
          code === e.code ? "lightgreen" : keyColors[i]
        )
      );
    },
    [keyColors]
  );

  useEffect(() => {
    document.addEventListener("keydown", keydowne, false);
  }, [keyColors, keydowne]);
  return (
    <>
      {/* <div tabIndex={0} onKeyDown={(e)=>{setKeyColors(eventCode.map((code,i)=>(code===e.code?"lightgreen":keyColors[i])))}}>aaaaaaaaaaaaaaaaaaa</div> */}
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
