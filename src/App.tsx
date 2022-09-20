/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import React, { useState, useEffect } from "react";
import Keyboard from "./components/keyboard";
import { keyup, convert } from "./components/convert";
import eventCode from "./components/data/eventCode.json";
import qwerty from "./components/data/qwerty.json";
import dvorak from "./components/data/dvorak.json";
import romantable from "./romantable.json";
import ReadJSONFile from "./../keyboard-layout-maker/src/components/ReadJSONFile";
import jis109 from "./components/data/JIS109.json";
import "./App.css";
const functionalLayoutType = { qwerty, dvorak, custom: qwerty };
const physicalLayoutType = { jis109, custom: jis109 };

function keydown(
  keyColors: string[],
  setKeyColors: (value: string[]) => void,
  e: KeyboardEvent,
  content: string,
  setContent: (value: string) => void,
  functional: string,
  isDefault: boolean
): void {
  setContent(
    // @ts-ignore
    (content: string) =>
      convert(e, functional, functionalLayoutType, content, isDefault)
  );
  setKeyColors(
    eventCode.map((tmp, i) =>
      (!isDefault && tmp === e.code) || // @ts-ignore
      (isDefault && functionalLayoutType[functional][tmp].toLowerCase()) ===
        e.key.toLowerCase()
        ? "orange"
        : keyColors[i]
    )
  );
  setTimeout(() => {
    setKeyColors(
      eventCode.map((tmp, i) =>
        (!isDefault && tmp === e.code) || // @ts-ignore
        (isDefault && functionalLayoutType[functional][tmp].toLowerCase()) ===
          e.key.toLowerCase()
          ? "rgba(0,0,0,0)"
          : keyColors[i]
      )
    );
  }, 100);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function toJapanese(content: string): string {
  let ans = "";
  let tmp = "";
  for (let i = 0; i < content.length; i++) {
    tmp = tmp + content[i].toLowerCase();
    const hoge = romantable.findIndex((element) => element[0] === tmp);
    if (hoge !== -1) {
      ans += romantable[hoge][1];
      tmp = "";
    }
  }
  return ans;
}

export default function App({
  element = <></>,
  output = "",
  setOutput = () => {},
}: {
  element?: JSX.Element;
  output?: string;
  setOutput?: (value: string) => void;
}): JSX.Element {
  const [isDefault, setIsDefault] = useState<boolean>(true);
  const [functional, setFunctional] = useState<string>("qwerty");
  const [physical, setPhysical] = useState<string>("jis109");
  const [keyColors, setKeyColors] = useState<string[]>(
    eventCode.map((code) => "rgba(0,0,0,0)")
  );
  const [content, setContent] = useState<string>("");
  useEffect(() => {
    function tmp(e: KeyboardEvent): void {
      keydown(
        keyColors,
        setKeyColors,
        e,
        content,
        setContent,
        functional,
        isDefault
      );
    }
    function temp(e: KeyboardEvent): void {
      keyup(e.code, functional, functionalLayoutType);
    }
    window.addEventListener("keydown", tmp);
    window.addEventListener("keyup", temp);
    return () => {
      window.removeEventListener("keydown", tmp);
      window.removeEventListener("keyup", temp);
    };
  }, [functional, isDefault]);
  setOutput(content);
  return (
    <>
      <div id="wrapper">
        <div id="settings">
          {element}
          {content}
          {/* <div>{toJapanese(content)}</div> */}
          <div>
            <input
              type="checkbox"
              checked={isDefault}
              onChange={(e) => {
                setIsDefault(e.target.checked);
              }}
            />
            <label>Default</label>
          </div>
          {!isDefault && (
            <>
              <span>論理配列</span>
              <ReadJSONFile
                f={(x) => {
                  // @ts-ignore
                  functionalLayoutType.custom = x;
                }}
              ></ReadJSONFile>
              <br />
              <span>物理配列</span>
              <ReadJSONFile
                f={(x) => {
                  // @ts-ignore
                  physicalLayoutType.custom = x;
                }}
              ></ReadJSONFile>
              <br />
              <select
                value={functional}
                onChange={(e) => setFunctional(e.target.value)}
              >
                <option value="qwerty">QWERTY</option>
                <option value="dvorak">Dvorak</option>
                <option value="custom">Custom</option>
              </select>
              <select
                value={physical}
                onChange={(e) => setPhysical(e.target.value)}
              >
                <option value="jis109">JIS109</option>
                <option value="custom">Custom</option>
              </select>
            </>
          )}
        </div>
        <Keyboard
          functional={functional}
          physical={physical}
          keyColors={keyColors}
          setKeyColors={setKeyColors}
          keydown={keydown}
          content={content}
          setContent={setContent}
          keyLayout={functionalLayoutType.custom}
          physicalKeyLayout={physicalLayoutType.custom}
          isDefault={isDefault}
        ></Keyboard>
      </div>
    </>
  );
}
