import { useState, useEffect } from "react";
// import {useKey} from "react-use";
import Keyboard from "./components/keyboard";
import eventCode from "./components/data/eventCode.json";

export default function App() {
  const [functional, setFunctional] = useState<string>("qwerty");
  const [physical, setPhysical] = useState<string>("jis109");
  const [keyColors, setKeyColors] = useState<string[]>(
    eventCode.map((code) => "red")
  );
  console.log("aaa");
  // useKey('KeyA',()=>{setKeyColors(eventCode.map((code,i)=>(code==='KeyA'?"lightgreen":keyColors[i])))});
  // useEffect(()=>{
  //   window.addEventListener("keydown",(e)=>{
  //     setKeyColors(eventCode.map((code,i)=>(code===e.code?"lightgreen":keyColors[i])));
  //     // console.log(eventCode.map((code,i)=>(code===e.code?"lightgreen":keyColors[i])));
  //   });
  // },[]);
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
