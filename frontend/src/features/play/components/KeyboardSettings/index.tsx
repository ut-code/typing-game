import { Link } from "react-router-dom";
import {
  functionalLayoutType,
  layoutType,
  physicalLayoutType,
} from "../../../../components/keyboard/data/keyboardSettings";
import ReadJSONFile from "../../../keyboardLayoutCreator/ReadJSONFile";
import {
  FunctionalLayoutJSON,
  KeyboardLayout,
  PhysicalKeyboardLayout,
  PhysicalLayoutJSON,
} from "../../../../../../types/keyboardLayout";
import { getKeys } from "../../../../../../utils/getKeys";

type KeyboardSettingsProps = {
  isCustom: boolean;
  setIsCustom: (isCustom: boolean) => void;
  keyboardLayout: KeyboardLayout;
  setKeyboardLayout: (keyboardLayout: KeyboardLayout) => void;
  functional: string;
  setFunctional: (functional: KeyboardLayout) => void;
  physical: string;
  setPhysical: (physical: PhysicalKeyboardLayout) => void;
};

/**
 * キーボード配列の設定部分
 */
export default function KeyboardSettings(props: KeyboardSettingsProps) {
  const {
    isCustom,
    setIsCustom,
    keyboardLayout,
    setKeyboardLayout,
    // setFunctional と setPhysical はこのコンポーネントでやらないほうがよいか？
    // functional,
    setFunctional,
    // physical,
    setPhysical,
  } = props;
  return (
    <div id="settings">
      <div>
        <input
          id="isCustom"
          type="checkbox"
          checked={isCustom}
          onChange={(e) => {
            setIsCustom(e.target.checked);
          }}
        />
        <label htmlFor="isCustom">キーボードをカスタマイズする</label>
      </div>
      {isCustom && (
        <>
          次のボタンで使いたいキーボード配列を選んでください。Dvorakなどを選択してみると違いがよく分かるはずです。
          <br />
          <select
            value={keyboardLayout}
            onChange={(e) => {
              setKeyboardLayout(e.target.value as KeyboardLayout);
              setFunctional(
                layoutType[e.target.value as KeyboardLayout]
                  .functionalLayoutType,
              );
              setPhysical(
                layoutType[e.target.value as KeyboardLayout].physicalLayoutType,
              );
            }}
          >
            {getKeys(layoutType).map((key, i) => (
              <option key={i} value={key}>
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
            f={(x: FunctionalLayoutJSON) => {
              functionalLayoutType.custom.content = x;
            }}
          ></ReadJSONFile>
          <br />
          <br />
          <span>自作の物理配列を選択</span>
          <ReadJSONFile
            f={(x: PhysicalLayoutJSON) => {
              physicalLayoutType.custom.content = x;
            }}
          />
        </>
      )}
    </div>
  );
}
