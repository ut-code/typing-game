/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
let shift = false;
export function keyup(
  code: string,
  functional: string,
  functionalLayoutType: object
): void {
  // @ts-ignore
  const key = functionalLayoutType[functional][code];
  switch (key) {
    case "Shift":
      shift = false;
  }
}
export function convert(
  e: KeyboardEvent,
  functional: string,
  functionalLayoutType: object,
  content: string,
  isDefault: boolean
): string {
  // @ts-ignore
  const key = functionalLayoutType[functional][e.code];
  let ans = content;
  if (key === undefined) {
    ans += "";
  } else if (key.length === 1) {
    if (shift) ans += key.toUpperCase();
    else ans += key.toLowerCase();
  } else {
    switch (key) {
      case "Space":
        ans += " ";
        break;
      case "Shift":
        shift = true;
        break;
      case "Back Space":
        ans += ""; // ans = content.slice(0, -1);
        break;
      default:
        ans += "";
        break;
    }
  }
  return isDefault ? content + (e.key.length === 1 ? e.key : "") : ans;
}
