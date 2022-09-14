import React, { useState, useEffect} from "react";
import Keyboard from "./components/keyboard";
import eventCode from "./components/data/eventCode.json";
import qwerty from "./components/data/qwerty.json";
import dvorak from "./components/data/dvorak.json";
import romantable from "./romantable.json";
import ReadJSONFile from "./../keyboard-layout-maker/src/components/ReadJSONFile";
const functionalLayoutType = { qwerty, dvorak,custom:qwerty };


function pressed(keyColors:string[],setKeyColors:(value:string[])=>void,code:string,content:string,setContent:(value:string)=>void,functional:string):void{
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  setContent((content: string)=>content+functionalLayoutType[functional][code]);
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

function toJapanese(content:string):string{
  console.log(content)
  let ans="";
  let tmp="";
  for(let i=0;i<content.length;i++){
    tmp=tmp+content[i].toLowerCase();
    const hoge=romantable.findIndex((element)=>element[0]===tmp);
    if(hoge!==-1){
      ans+=romantable[hoge][1];
      tmp="";
    }
  }
  return ans;
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
    <div>{toJapanese(content)}</div>
    <ReadJSONFile f={(x)=>{functionalLayoutType.custom=x}}></ReadJSONFile>
      <select
        value={functional}
        onChange={(e) => setFunctional(e.target.value)}
      >
        <option value="qwerty">QWERTY</option>
        <option value="dvorak">Dvorak</option>
        <option value="custom">Custom</option>
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
        keyLayout={functionalLayoutType.custom}
      ></Keyboard>
    </>
  );
}
