import { StandardKeyNameType, standardKeyNames } from "./StandardKeyName";

type KeyboardEventCodeToStandardKeyNameMapType = {
  [key: string]: StandardKeyNameType | null;
};

const linuxFirefoxKeyboardEventCodeToStandardKeyName: KeyboardEventCodeToStandardKeyNameMapType =
  {};

const linuxChromiumKeyboardEventCodeToStandardKeyName: KeyboardEventCodeToStandardKeyNameMapType =
  {
    Lang5: null,
    Lang3: null,
    Lang4: null,
    AudioVolumeMute: "VolumeMute",
    AudioVolumeDown: "VolumeDown",
    AudioVolumeUp: "VolumeUp",
    Sleep: null,
    NumpadParenLeft: null,
    NumpadParenRight: null,
  };

const macosFirefoxKeyboardEventCodeToStandardKeyName: KeyboardEventCodeToStandardKeyNameMapType =
  {};

const macosChromiumKeyboardEventCodeToStandardKeyName: KeyboardEventCodeToStandardKeyNameMapType =
  {
    AudioVolumeUp: "VolumeUp",
    AudioVolumeDown: "VolumeDown",
    AudioVolumeMute: "VolumeMute",
    Insert: "Help",
  };

const windowsFirefoxKeyboardEventCodeToStandardKeyName: KeyboardEventCodeToStandardKeyNameMapType =
  {
    AudioVolumeMute: "VolumeMute",
  };

const windowsChromiumKeyboardEventCodeToStandardKeyName: KeyboardEventCodeToStandardKeyNameMapType =
  {
    AudioVolumeMute: "VolumeMute",
    AudioVolumeDown: "VolumeDown",
    AudioVolumeUp: "VolumeUp",
  };

type Platform = "Linux" | "macOS" | "Windows";
type Browser = "Firefox" | "Chromium";

function getKeyboardEventCodeToStandardKeyNameMap(
  platform: Platform,
  browser: Browser,
) {
  switch (platform) {
    case "Linux":
      switch (browser) {
        case "Firefox":
          return linuxFirefoxKeyboardEventCodeToStandardKeyName;
        case "Chromium":
          return linuxChromiumKeyboardEventCodeToStandardKeyName;
      }
      break;
    case "macOS":
      switch (browser) {
        case "Firefox":
          return macosFirefoxKeyboardEventCodeToStandardKeyName;
        case "Chromium":
          return macosChromiumKeyboardEventCodeToStandardKeyName;
      }
      break;
    case "Windows":
      switch (browser) {
        case "Firefox":
          return windowsFirefoxKeyboardEventCodeToStandardKeyName;
        case "Chromium":
          return windowsChromiumKeyboardEventCodeToStandardKeyName;
      }
  }
}

export default function convertKeyboardEventCodeToStandardKeyName(
  platform: Platform,
  browser: Browser,
  keyboardEventCode: string,
): StandardKeyNameType | null {
  const keyboardEventCodeToStandardKeyNameMap =
    getKeyboardEventCodeToStandardKeyNameMap(platform, browser);
  switch (keyboardEventCodeToStandardKeyNameMap[keyboardEventCode]) {
    case null:
      return null;
    case undefined:
      if (
        !standardKeyNames.includes(keyboardEventCode as StandardKeyNameType)
      ) {
        throw new Error(
          `Unknown keyboard event code: ${keyboardEventCode} (platform: ${platform}, browser: ${browser})`,
        );
      }
      return keyboardEventCode as StandardKeyNameType;
    default:
      return keyboardEventCodeToStandardKeyNameMap[keyboardEventCode];
  }
}
