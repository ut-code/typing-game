import React, { useState, useEffect} from "react";
import Keyboard from "./components/keyboard";
import eventCode from "./components/data/eventCode.json";
import qwerty from "./components/data/qwerty.json";
import dvorak from "./components/data/dvorak.json";
const functionalLayoutType = { qwerty, dvorak };


function pressed(keyColors:string[],setKeyColors:(value:string[])=>void,code:string,content:string,setContent:(value:string)=>void,functional:string):void{
  setContent((content)=>content+functionalLayoutType[functional][code]);
  setKeyColors(
    eventCode.map((tmp, i) =>
      tmp === code ? "orange" : keyColors[i]
    )
  );
  setTimeout(() => {
    setKeyColors(
      eventCode.map((tmp, i) =>
        tmp === code ? "rgba(0,0,0,0)" : keyColors[i]
      )
    );
  }, 100);
}

export default function App(): JSX.Element {
  const [functional, setFunctional] = useState<string>("qwerty");
  const [physical, setPhysical] = useState<string>("jis109");
  const [keyColors, setKeyColors] = useState<string[]>(
    eventCode.map((code) => "rgba(0,0,0,0)")
  );
  const [content,setContent]=useState<string>("");
  useEffect(() => {
    function tmp(e:KeyboardEvent):void{
      pressed(keyColors,setKeyColors,e.code,content,setContent,functional);
    }    
    window.addEventListener("keydown", tmp);
    return ()=>{
      window.removeEventListener("keydown",tmp);
    }
  },[functional]);
  return (
    <>
    <div>{content}</div>
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
        pressed={pressed}
        content={content}
        setContent={setContent}
      ></Keyboard>
    </>
  );
}
