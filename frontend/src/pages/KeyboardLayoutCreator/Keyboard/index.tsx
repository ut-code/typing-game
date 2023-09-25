/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Keyboard from "../../../components/keyboard-layout-creator/keyboard/keyboard";
import {
  keyup,
  convert,
} from "../../../components/keyboard-layout-creator/keyboard/convert";
import keyCodes from "../../../components/keyboard-layout-creator/keyboard/data/keyCodes.json";
import romantable from "./romantable.json";
import ReadJSONFile from "../../../components/keyboard-layout-creator/ReadJSONFile";
import {
  layoutType,
  functionalLayoutType,
  physicalLayoutType,
  defaultFunctionalLayoutType,
  defaultPhysicalLayoutType,
} from "../../../components/keyboard-layout-creator/keyboard/data/keyboardSettings";
import "./style.css";

function keydown(
  keyColors: string[],
  setKeyColors: (value: string[]) => void,
  e: KeyboardEvent,
  content: string,
  setContent: (value: string) => void,
  functional: string,
  isDefault: boolean,
  shift: boolean,
  setShift: (value: boolean) => void,
): void {
  const prohibitedKey = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "Enter",
    "Space",
    "/",
  ];
  if (
    prohibitedKey.includes(
      // @ts-ignore
      functionalLayoutType[functional].content[e.code][1],
    ) || // @ts-ignore
    (functionalLayoutType[functional].content[e.code] === undefined &&
      e.code === "")
  ) {
    e.preventDefault();
  }

  setContent(
    // @ts-ignore
    (content: string) =>
      convert(
        e,
        functional,
        functionalLayoutType,
        content,
        isDefault,
        shift,
        setShift,
      ),
  );
  setKeyColors(
    keyCodes.map((tmp, i) =>
      (!isDefault && tmp === e.code) ||
      (isDefault && // @ts-ignore
        functionalLayoutType[functional].content[tmp][0].toLowerCase()) ===
        e.key.toLowerCase()
        ? "orange"
        : keyColors[i],
    ),
  );
  setTimeout(() => {
    setKeyColors(
      keyCodes.map((tmp, i) =>
        (!isDefault && tmp === e.code) ||
        (isDefault && // @ts-ignore
          functionalLayoutType[functional].content[tmp][0].toLowerCase()) ===
          e.key.toLowerCase()
          ? "rgba(0,0,0,0)"
          : keyColors[i],
      ),
    );
  }, 100);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function toJapanese(content: string): string {
  let ans = "";
  let tmp = "";
  for (let i = 0; i < content.length; i++) {
    tmp = tmp + content[i][0].toLowerCase();
    const hoge = romantable.findIndex((element) => element[0] === tmp);
    if (hoge !== -1) {
      ans += romantable[hoge][1];
      tmp = "";
    }
  }
  return ans;
}

export default function App({
  content = "",
  setContent = () => {},
}: {
  content?: string;
  setContent?: (value: string) => void;
}): JSX.Element {
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [layout, setLayout] = useState<string>();
  const [functional, setFunctional] = useState<string>(
    defaultFunctionalLayoutType,
  );
  const [physical, setPhysical] = useState<string>(defaultPhysicalLayoutType);
  const [keyColors, setKeyColors] = useState<string[]>(
    keyCodes.map(() => "rgba(0,0,0,0)"),
  );
  const [shift, setShift] = useState<boolean>(false);
  useEffect(() => {
    function tmp(e: KeyboardEvent): void {
      keydown(
        keyColors,
        setKeyColors,
        e,
        content,
        setContent,
        functional,
        isCustom,
        shift,
        setShift,
      );
    }
    function temp(e: KeyboardEvent): void {
      keyup(e.code, functional, functionalLayoutType, shift, setShift);
    }
    window.addEventListener("keydown", tmp);
    window.addEventListener("keyup", temp);
    return () => {
      window.removeEventListener("keydown", tmp);
      window.removeEventListener("keyup", temp);
    };
  }, [functional, isCustom, shift]);
  setContent(content);
  return (
    <>
      <div id="wrapper">
        <div id="settings">
          {/* {content} */}
          {/* <div>{toJapanese(content)}</div> */}
          <div>
            <input
              type="checkbox"
              checked={isCustom}
              onChange={(e) => {
                setIsCustom(e.target.checked);
              }}
            />
            <label>キーボードをカスタマイズする</label>
          </div>
          {isCustom && (
            <>
              次のボタンで使いたいキーボード配列を選んでください。Dvorakなどを選択してみると違いがよく分かるはずです。
              <br />
              <select
                value={layout}
                onChange={(e) => {
                  setLayout(e.target.value);
                  // @ts-ignore
                  setFunctional(
                    layoutType[
                      e.target.value as
                        | "jis_qwerty"
                        | "mac_jis_qwerty"
                        | "mac_us_qwerty"
                        | "dvorak"
                        | "azerty"
                        | "qwertz"
                        | "custom"
                    ].functionalLayoutType,
                  );
                  // @ts-ignore
                  setPhysical(layoutType[e.target.value].physicalLayoutType);
                }}
              >
                {Object.keys(layoutType).map((key, i) => (
                  // @ts-ignore
                  <option key={i} value={layoutType[key].id}>
                    {/* @ts-ignore */}
                    {layoutType[key].name}
                  </option>
                ))}
              </select>
              <br />
              <br />
              <br />
              キーボード配列を自分で作りたい人は、
              <Link to="/keyboard-layout-creator">このリンク</Link>
              に飛んでキーボード配列を作ってから、下記のボタンで選択してください。
              <br />
              <br />
              <span>自作の論理配列を選択</span>
              <ReadJSONFile
                f={(x) => {
                  // @ts-ignore
                  functionalLayoutType.custom.content = x;
                }}
              ></ReadJSONFile>
              <br />
              <br />
              <span>自作の物理配列を選択</span>
              <ReadJSONFile
                f={(x) => {
                  // @ts-ignore
                  physicalLayoutType.custom.content = x;
                }}
              ></ReadJSONFile>
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
          keyLayout={functionalLayoutType.custom.content}
          physicalKeyLayout={physicalLayoutType.custom.content}
          isCustom={isCustom}
          shift={shift}
          setShift={setShift}
        ></Keyboard>
      </div>
    </>
  );
}
