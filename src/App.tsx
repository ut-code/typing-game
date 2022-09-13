import React, { useEffect, useState } from "react";
// import {useKey} from 'react-use'

const initial = 0;
const Sample: () => void = () => {
  const [open, setOpen] = useState(initial);

  // const handleKeyDown = (event: KeyboardEvent):void => {
  //   if (event.code === 'KeyA' && open < 10000) {
  //     console.log('keydown Escape Key')
  //     setOpen(open + 1)
  //   }
  // }
  function increment(): void {
    setOpen((open) => ++open);
    console.log(open);
  }
  function hoge(e: KeyboardEvent): void {
    if (e.code === "KeyA") setOpen((open) => open + 1);
    console.log(open);
  }

  // useKey('a',increment);

  useEffect(() => {
    // increment();
    window.addEventListener("keydown", hoge);
  }, []); // depsに useState と useCallbackでラップした関数 が必要

  return (
    <>
      <div>sample</div>
      <button onClick={increment}>{open}</button>
    </>
  );
};

export default Sample;

// import React, { useState, useEffect, useCallback } from "react";
// // import {useKey} from "react-use";
// import Keyboard from "./components/keyboard";
// import eventCode from "./components/data/eventCode.json";

// export default function App(): JSX.Element {
//   const [functional, setFunctional] = useState<string>("qwerty");
//   const [physical, setPhysical] = useState<string>("jis109");
//   const [keyColors, setKeyColors] = useState<string[]>(
//     eventCode.map((code) => "rgba(0,0,0,0)")
//   );
//   // const [test, setTest] = useState<string[]>([])
//   // useKey('a',()=>{
//   //   // setKeyColors(eventCode.map((code,i)=>(code==='KeyA'?"lightgreen":keyColors[i])));
//   //   setTest([false,test[1]]);
//   // });
//   // useKey('b',()=>{
//   //   // setKeyColors(eventCode.map((code,i)=>(code==='KeyB'?"lightgreen":keyColors[i])))
//   //   setTest([test[0],false]);
//   // });
//   // console.log(test);
//   const keydowne = useCallback(
//     (e: KeyboardEvent) => {
//       setKeyColors(
//         eventCode.map((code, i) =>
//           code === e.code ? "lightgreen" : keyColors[i]
//         )
//       );
//       // setKeyColors(
//       //   eventCode.map((tmp, i) =>
//       //     tmp === e.code ? "orange" : keyColors[i]
//       //   )
//       // );
//       // setTimeout(() => {
//       //   setKeyColors(
//       //     eventCode.map((tmp, i) =>
//       //       tmp === e.code ? "rgba(0,0,0,0)" : keyColors[i]
//       //     )
//       //   );
//       // }, 50);
//     },
//     [keyColors]
//   );

//   useEffect(() => {
//     document.addEventListener("keydown", keydowne, false);
//   }, [keyColors, keydowne]);
//   return (
//     <>
//       {/* <div tabIndex={0} onKeyDown={(e)=>{setKeyColors(eventCode.map((code,i)=>(code===e.code?"lightgreen":keyColors[i])))}}>aaaaaaaaaaaaaaaaaaa</div> */}
//       <select
//         value={functional}
//         onChange={(e) => setFunctional(e.target.value)}
//       >
//         <option value="qwerty">QWERTY</option>
//         <option value="dvorak">Dvorak</option>
//       </select>
//       <select value={physical} onChange={(e) => setPhysical(e.target.value)}>
//         <option value="jis109">JIS109</option>
//       </select>
//       <Keyboard
//         functional={functional}
//         physical={physical}
//         keyColors={keyColors}
//         setKeyColors={setKeyColors}
//       ></Keyboard>
//     </>
//   );
// }
