import React from "react"; // ,{useRef}
import eventCode from "./data/eventCode.json";
import qwerty from "./data/qwerty.json";
import dvorak from "./data/dvorak.json";
import jis109 from "./data/JIS109.json";
import "./keyboard.css";

let functionalLayout = "qwerty";
const functionalLayoutType = { qwerty, dvorak,custom:qwerty };
let physicalLayout = "jis109";
const physicalLayoutType = { jis109 };
const magnification = 3;

/**
 * `row` 行の `column` 列までの幅の合計を計算します。
 * @param row `row`
 * @param column `column`
 * @returns `width` と `jis109.eventCode.marginColumn` の合計
 */
function sumWidth(row: number, column: number):number {
  let sum = physicalLayoutType[physicalLayout].marginColumn;
  let j = 0;
  for (const code of eventCode) {
    if (
      physicalLayoutType[physicalLayout].eventCode[code].row === row &&
      physicalLayoutType[physicalLayout].eventCode[code].column < column
    ) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      sum += physicalLayoutType[physicalLayout].eventCode[code].width + physicalLayoutType[physicalLayout].marginColumn;
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
function sumHeight(row: number):number {
  return (
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    physicalLayoutType[physicalLayout].marginRow + (physicalLayoutType[physicalLayout].height + physicalLayoutType[physicalLayout].marginRow) * (row - 1)
  );
}

Keyboard.defaultProps={
  keyColors:"",
  setKeyColors:(value:string)=>{},
  pressed:()=>{},
  content:"",
  setContent:(value:string)=>{},
  keyLayout:qwerty
}

export default function Keyboard({
  functional,
  physical,
  keyColors,
  setKeyColors,
  pressed,
  content,
  setContent,
  keyLayout
}: {
  functional: string;
  physical: string;
  keyColors?: string[];
  setKeyColors?: (value: string[]) => void;
  pressed?:(keyColors:string[],setKeyColors:(value:string[])=>void,code:string,content:string,setContent:(value:string)=>void,functional:string)=>void;
  content?:string;
  setContent?:(value:string)=>void;
  keyLayout?:object
}):JSX.Element {
  functionalLayout = functional;
  physicalLayout = physical;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  functionalLayoutType.custom=keyLayout!;
  // const fontSize=0.015; // vw/100
  return (
    <>
      <div id="keyboard">
        {eventCode.map((code, i) => (
          <div
            key={code}
            id={code}
            className="key"
            onClick={()=>pressed(keyColors,setKeyColors,code,content,setContent,functional)}
            style={{
              position: "absolute",
              backgroundColor: keyColors[i],
              top:
                `${sumHeight(physicalLayoutType[physicalLayout].eventCode[code].row) * magnification}vw`,
              left:
                `${sumWidth(physicalLayoutType[physicalLayout].eventCode[code].row,physicalLayoutType[physicalLayout].eventCode[code].column) * magnification}vw`,
              width:
              `${physicalLayoutType[physicalLayout].eventCode[code].width * magnification}vw`,
              height:
                `${physicalLayoutType[physicalLayout].height * magnification}vw`,
            }}
            // ref={dom=>{
            //   let fontSizePx=window.innerWidth*fontSize;
            //   const widthPx=physicalLayoutType[physicalLayout].eventCode[code].width * magnification* window.innerWidth*0.01;// func
            //   // while(dom?.scrollWidth>=widthPx){
            //   //   fontSizePx--;
            //   //   // dom?.style.fontSize="10px";//fontSizePx+"px"
            //   // }
            //   // dom?.style.backgroundColor="black";
            //   // console.log(dom?.style.fontSize);
            // }}
            // // while(dom?.scrollWidth>=dom.width){
            //   //   dom.fontSize=dom.fontSize-1;
            //   // }
          >
            {functionalLayoutType[functionalLayout][code]}
          </div>
        ))}
      </div>
    </>
  );
}
