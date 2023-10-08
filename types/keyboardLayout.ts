export type KeyboardLayout =
  | "jis_qwerty"
  | "mac_jis_qwerty"
  | "mac_us_qwerty"
  | "dvorak"
  | "azerty"
  | "qwertz"
  | "custom";

export type PhysicalKeyboardLayout =
  | "jis109"
  | "us_default"
  | "dvorak_jis"
  | "azerty_jis"
  | "qwertz_jis"
  | "custom";

export interface FunctionalLayoutJSON {
  version: string;
  Esc: [string, string];
  F1: [string, string];
  F2: [string, string];
  F3: [string, string];
  F4: [string, string];
  F5: [string, string];
  F6: [string, string];
  F7: [string, string];
  F8: [string, string];
  F9: [string, string];
  F10: [string, string];
  F11: [string, string];
  F12: [string, string];
  Backquote: [string, string];
  Digit1: [string, string];
  Digit2: [string, string];
  Digit3: [string, string];
  Digit4: [string, string];
  Digit5: [string, string];
  Digit6: [string, string];
  Digit7: [string, string];
  Digit8: [string, string];
  Digit9: [string, string];
  Digit0: [string, string];
  Minus: [string, string];
  Equal: [string, string];
  IntlYen: [string, string];
  Backspace: [string, string];
  Tab: [string, string];
  KeyQ: [string, string];
  KeyW: [string, string];
  KeyE: [string, string];
  KeyR: [string, string];
  KeyT: [string, string];
  KeyY: [string, string];
  KeyU: [string, string];
  KeyI: [string, string];
  KeyO: [string, string];
  KeyP: [string, string];
  BracketLeft: [string, string];
  BracketRight: [string, string];
  Enter: [string, string];
  CapsLock: [string, string];
  KeyA: [string, string];
  KeyS: [string, string];
  KeyD: [string, string];
  KeyF: [string, string];
  KeyG: [string, string];
  KeyH: [string, string];
  KeyJ: [string, string];
  KeyK: [string, string];
  KeyL: [string, string];
  Semicolon: [string, string];
  Quote: [string, string];
  Backslash: [string, string];
  ShiftLeft: [string, string];
  KeyZ: [string, string];
  KeyX: [string, string];
  KeyC: [string, string];
  KeyV: [string, string];
  KeyB: [string, string];
  KeyN: [string, string];
  KeyM: [string, string];
  Comma: [string, string];
  Period: [string, string];
  Slash: [string, string];
  IntlRo: [string, string];
  ShiftRight: [string, string];
  ControlLeft: [string, string];
  SuperLeft: [string, string];
  AltLeft: [string, string];
  NonConvert: [string, string];
  Space: [string, string];
  Convert: [string, string];
  KanaMode: [string, string];
  AltRight: [string, string];
  SuperRight: [string, string];
  App: [string, string];
  CtrlRight: [string, string];
}

export interface PhysicalLayoutJSON {
  version: string;
  marginRow: number;
  marginColumn: number;
  height: number;
  keyCodes: {
    [key in keyof FunctionalLayoutJSON]: {
      row: number;
      column: number;
      width: number;
      style: string;
    };
  };
}
