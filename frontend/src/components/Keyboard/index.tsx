/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { useState, useEffect } from "react";
import KeyboardCore from "./components/KeyboardCore";
import { convert } from "./components/KeyboardCore/convert.tsx";
import keyCodes from "./data/keyCodes.json";
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

function keydown(
  keyColors: string[],
  setKeyColors: (value: string[]) => void,
  e: KeyboardEvent,
  // @ts-ignore
  content: string,
  setContent: (value: string) => void,
  functional: string,
  isDefault: boolean,
  shift: boolean,
  setShift: (value: boolean) => void,
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
}

function keyup(
  keyColors: string[],
  setKeyColors: (value: string[]) => void,
  e: KeyboardEvent,
  // @ts-ignore
  content: string,
  functional: string,
  isDefault: boolean,
  shift: boolean,
  setShift: (value: boolean) => void,
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
    keyCodes.map((tmp, i) =>
      (!isDefault && tmp === e.code) ||
      (isDefault && // @ts-ignore
        functionalLayoutType[functional].content[tmp][0].toLowerCase()) ===
        e.key.toLowerCase()
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
}: {
  content?: string;
  setContent?: (value: string) => void;
}): JSX.Element {
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [keyboardLayout, setKeyboardLayout] =
    useState<KeyboardLayout>("jis_qwerty");
  const [functional, setFunctional] = useState<KeyboardLayout>(
    defaultFunctionalLayoutType,
  );
  const [physical, setPhysical] = useState<PhysicalKeyboardLayout>(
    defaultPhysicalLayoutType,
  );
  const [keyColors, setKeyColors] = useState<string[]>(
    new Array(keyCodes.length).fill("rgba(0,0,0,0)"),
  );
  const [shift, setShift] = useState<boolean>(false);
  useEffect(() => {
    function onKeydown(e: KeyboardEvent): void {
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
    function onKeyup(e: KeyboardEvent): void {
      keyup(
        keyColors,
        setKeyColors,
        e,
        content,
        functional,
        isCustom,
        shift,
        setShift,
      );
    }
    window.addEventListener("keydown", onKeydown);
    window.addEventListener("keyup", onKeyup);
    return () => {
      window.removeEventListener("keydown", onKeydown);
      window.removeEventListener("keyup", onKeyup);
    };
  }, [content, functional, isCustom, keyColors, setContent, shift]);
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
