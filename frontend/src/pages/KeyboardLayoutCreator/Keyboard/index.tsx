/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { useState, useEffect } from "react";
import Keyboard from "../../../components/keyboard/keyboard.tsx";
import { convert } from "../../../components/keyboard/convert.tsx";
import keyCodes from "../../../components/keyboard/data/keyCodes.json";
import romantable from "./romantable.json";
import {
  functionalLayoutType,
  physicalLayoutType,
  defaultFunctionalLayoutType,
  defaultPhysicalLayoutType,
} from "../../../components/keyboard/data/keyboardSettings.tsx";
import "./style.css";
import { preventedKeys } from "../../../utils/constants.ts";
import KeyboardSettings from "../../../features/play/components/KeyboardSettings/index.tsx";
import {
  KeyboardLayout,
  PhysicalKeyboardLayout,
} from "../../../../../types/keyboardLayout.ts";

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
      keyup(keyColors, setKeyColors, e, content, functional, isCustom);
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
    <>
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
        />
      </div>
    </>
  );
}
