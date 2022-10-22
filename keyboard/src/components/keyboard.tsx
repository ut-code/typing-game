/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import React from "react"; // ,{useRef}
import keyCode from "./data/keyCode.json";
import "./keyboard.css";
import useWindowDimensions from "./useWindowDimensions";
import {
  functionalLayoutType,
  physicalLayoutType,
  defaultFunctionalLayout,
  defaultPhysicalLayout,
} from "./data/keyboardSettings";

let functionalLayout = defaultFunctionalLayout;
let physicalLayout = defaultPhysicalLayout;

/**
 * `row` 行の `column` 列までの幅の合計を計算します。
 * @param row `row`
 * @param column `column`
 * @returns `width` と `jis109.keyCode.marginColumn` の合計
 */
function sumWidth(row: number, column: number): number {
  // @ts-ignore
  let sum = physicalLayoutType[physicalLayout].content.marginColumn;
  let j = 0;
  for (const code of keyCode) {
    if (
      // @ts-ignore
      physicalLayoutType[physicalLayout].content.keyCode[code].row === row &&
      // @ts-ignore
      physicalLayoutType[physicalLayout].content.keyCode[code].column < column
    ) {
      sum += // @ts-ignore
        physicalLayoutType[physicalLayout].content.keyCode[code].width + // @ts-ignore
        (physicalLayoutType[physicalLayout].content.keyCode[code].width === 0
          ? 0 // @ts-ignore
          : physicalLayoutType[physicalLayout].content.marginColumn);
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
function sumHeight(row: number): number {
  return (
    // @ts-ignore
    physicalLayoutType[physicalLayout].content.marginRow + // @ts-ignore
    (physicalLayoutType[physicalLayout].content.height + // @ts-ignore
      physicalLayoutType[physicalLayout].content.marginRow) *
      (row - 1)
  );
}

function fontSize(keyName: string): string {
  let cnt = 0;
  for (let i = 0; i < keyName.length; i++) {
    if (keyName.charCodeAt(i) < 256) cnt++;
    else cnt += 2;
  }
  if (cnt === 1) return "one";
  else if (cnt <= 3) return "three";
  else if (cnt <= 4) return "four";
  else if (cnt <= 6) return "six";
  else return "inf";
}

export default function Keyboard({
  functional,
  physical,
  keyColors = [],
  setKeyColors = (value: string[]) => {},
  keydown = () => {},
  content = "",
  setContent = (value: string) => {},
  keyLayout = functionalLayoutType[defaultFunctionalLayout].content,
  physicalKeyLayout,
  isDefault,
  shift,
  setShift
}: {
  functional: string;
  physical: string;
  keyColors?: string[];
  setKeyColors?: (value: string[]) => void;
  keydown?: (
    keyColors: string[],
    setKeyColors: (value: string[]) => void,
    e: KeyboardEvent,
    content: string,
    setContent: (value: string) => void,
    functional: string,
    isDefault: boolean,
    shift:boolean,
    setShift:(value:boolean)=>void
  ) => void;
  content?: string;
  setContent?: (value: string) => void;
  keyLayout?: object;
  physicalKeyLayout?: object;
  isDefault: boolean;
  shift:boolean;
  setShift?:(value:boolean)=>void
}): JSX.Element {
  const { width } = useWindowDimensions();
  const magnification = 5.8 * (width < 850 ? 1 : 850 / width);

  functionalLayout = functional;
  physicalLayout = physical;
  // @ts-ignore
  functionalLayoutType.custom.content = keyLayout;
  // @ts-ignore
  physicalLayoutType.custom.content = physicalKeyLayout;
  return (
    <>
      <div id="keyboard">
        {keyCode.map((code, i) => (
          <React.Fragment key={code}>
            {/* @ts-ignore */}
            {physicalLayoutType[physicalLayout].content.keyCode[code]
              .width !== 0 && (
              <div
                id={code}
                className={`key ${fontSize(
                  // @ts-ignore
                  functionalLayoutType[functionalLayout].content[code][!shift?0:1]
                )}`}
                onClick={() =>
                  // @ts-ignore
                  keydown(
                    // @ts-ignore
                    keyColors,
                    setKeyColors,
                    new KeyboardEvent("keydown", { code }),
                    content,
                    setContent,
                    functional,
                    isDefault,
                    shift,
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    setShift!
                  )
                }
                style={{
                  position: "absolute",
                  // @ts-ignore
                  backgroundColor: keyColors[i],
                  top: `${
                    sumHeight(
                      // @ts-ignore
                      physicalLayoutType[physicalLayout].content.keyCode[code]
                        .row
                    ) * magnification
                  }vw`,
                  // @ts-ignore
                  left: `${
                    sumWidth(
                      // @ts-ignore
                      physicalLayoutType[physicalLayout].content.keyCode[code]
                        .row, // @ts-ignore
                      physicalLayoutType[physicalLayout].content.keyCode[code]
                        .column
                    ) * magnification
                  }vw`,
                  width: `${
                    // @ts-ignore
                    physicalLayoutType[physicalLayout].content.keyCode[code]
                      .width * magnification
                  }vw`,
                  height: `${
                    // @ts-ignore
                    physicalLayoutType[physicalLayout].content.height *
                    magnification
                  }vw`,
                }}
                // ref={dom=>{
                //   let fontSizePx=window.innerWidth*fontSize;
                //   const widthPx=physicalLayoutType[physicalLayout].content.keyCode[code].width * magnification* window.innerWidth*0.01;// func
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
                {/* @ts-ignore */}
                {functionalLayoutType[functionalLayout].content[code][!shift?0:1]}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
