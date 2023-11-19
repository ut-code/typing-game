/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { useState, useEffect } from "react";
import KeyboardCore from "./components/KeyboardCore";
import { convert } from "./components/KeyboardCore/convert.tsx";
import romanTable from "./data/romanTable.json";
import {
  functionalLayoutType,
  physicalLayoutType,
  defaultFunctionalLayoutType,
  defaultPhysicalLayoutType,
} from "./data/keyboardSettings.tsx";
import "./style.css";
import { preventedKeys } from "../../utils/constants.ts";
import KeyboardSettings from "./components/KeyboardSettings/index.tsx";
import {
  KeyboardLayout,
  PhysicalKeyboardLayout,
} from "../../../../types/keyboardLayout.ts";
import keyCodes from "./data/keyCodes.json";

function keydown(
  e: KeyboardEvent,
  // @ts-ignore
  content: string,
  setContent: (value: string) => void,
  functional: string,
  isCustom: boolean,
  shift: boolean,
  setShift: (value: boolean) => void,
  keyColors: string[],
  setKeyColors: (value: string[]) => void,
): void {
  if (
    preventedKeys.includes(
      // @ts-ignore
      functionalLayoutType[functional].content[e.code][1],
    ) || // @ts-ignore
    (functionalLayoutType[functional].content[e.code] === undefined &&
      e.code === "")
  ) {
    e.preventDefault();
  }
  setKeyColors(
    keyCodes.map((keyCode, i) =>
      keyColors[i] !== "orange" && // @ts-ignore
      functionalLayoutType[functional].content[keyCode][0].toLowerCase() ===
        // @ts-ignore
        functionalLayoutType[functional].content[e.code][0].toLowerCase() &&
      // @ts-ignore
      functionalLayoutType[functional].content[keyCode][0].length === 1
        ? "red"
        : keyColors[i],
    ),
  );

  setContent(
    // @ts-ignore
    (content: string) =>
      convert(
        e,
        functional,
        functionalLayoutType,
        content,
        isCustom,
        shift,
        setShift,
      ),
  );
}

function keyup(
  e: KeyboardEvent,
  // @ts-ignore
  content: string,
  functional: string,
  shift: boolean,
  setShift: (value: boolean) => void,
  keyColors: string[],
  setKeyColors: (value: string[]) => void,
): void {
  if (
    preventedKeys.includes(
      // @ts-ignore
      functionalLayoutType[functional].content[e.code][1],
    ) || // @ts-ignore
    (functionalLayoutType[functional].content[e.code] === undefined &&
      e.code === "")
  ) {
    e.preventDefault();
  }

  if (
    // @ts-ignore
    functionalLayoutType[functional].content[e.code][!shift ? 0 : 1] === "Shift"
  ) {
    setShift(false);
  }

  setKeyColors(
    keyCodes.map((keyCode, i) =>
      keyColors[i] === "red" && // @ts-ignore
      functionalLayoutType[functional].content[keyCode][0].toLowerCase() ===
        // @ts-ignore
        functionalLayoutType[functional].content[e.code][0].toLowerCase()
        ? "rgba(0,0,0,0)"
        : keyColors[i],
    ),
  );
}

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function toJapanese(content: string): string {
  let ans = "";
  let tmp = "";
  for (let i = 0; i < content.length; i++) {
    tmp = tmp + content[i][0].toLowerCase();
    const hoge = romanTable.findIndex((element) => element[0] === tmp);
    if (hoge !== -1) {
      ans += romanTable[hoge][1];
      tmp = "";
    }
  }
  return ans;
}

export default function Keyboard({
  content = "",
  setContent = () => {},
  keyColors = [],
  setKeyColors = () => {},
  functional = defaultFunctionalLayoutType,
  setFunctional = () => {},
}: {
  content?: string;
  setContent?: (value: string) => void;
  keyColors?: string[];
  setKeyColors?: (value: string[]) => void;
  functional?: KeyboardLayout;
  setFunctional?: (value: KeyboardLayout) => void;
}): JSX.Element {
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [keyboardLayout, setKeyboardLayout] =
    useState<KeyboardLayout>("jis_qwerty");
  const [physical, setPhysical] = useState<PhysicalKeyboardLayout>(
    defaultPhysicalLayoutType,
  );
  const [shift, setShift] = useState<boolean>(false);
  useEffect(() => {
    function onKeydown(e: KeyboardEvent): void {
      keydown(
        e,
        content,
        setContent,
        functional,
        isCustom,
        shift,
        setShift,
        keyColors,
        setKeyColors,
      );
    }
    function onKeyup(e: KeyboardEvent): void {
      keyup(e, content, functional, shift, setShift, keyColors, setKeyColors);
    }
    window.addEventListener("keydown", onKeydown);
    window.addEventListener("keyup", onKeyup);
    return () => {
      window.removeEventListener("keydown", onKeydown);
      window.removeEventListener("keyup", onKeyup);
    };
  }, [
    content,
    functional,
    isCustom,
    keyColors,
    setContent,
    setKeyColors,
    shift,
  ]);
  setContent(content);
  return (
    <div id="wrapper">
      <KeyboardSettings
        isCustom={isCustom}
        setIsCustom={setIsCustom}
        keyboardLayout={keyboardLayout!}
        setKeyboardLayout={setKeyboardLayout}
        functional={functional}
        setFunctional={setFunctional}
        physical={physical}
        setPhysical={setPhysical}
      />
      <KeyboardCore
        functional={functional}
        physical={physical}
        keyColors={keyColors}
        setKeyColors={setKeyColors}
        setContent={setContent}
        keyLayout={functionalLayoutType.custom.content}
        physicalKeyLayout={physicalLayoutType.custom.content}
        shift={shift}
      />
    </div>
  );
}
