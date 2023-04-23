/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */

export function keyup(
  code: string,
  functional: string,
  functionalLayoutType: object,
  shift: boolean,
  setShift: (value: boolean) => void
): void {
  // @ts-ignore
  const key = functionalLayoutType[functional].content[code][!shift ? 0 : 1]
  switch (key) {
    case "Shift":
      setShift(false)
  }
}
export function convert(
  e: KeyboardEvent,
  functional: string,
  functionalLayoutType: object,
  content: string,
  isCustom: boolean,
  shift: boolean,
  setShift: (value: boolean) => void
): string {
  // @ts-ignore
  const keys = functionalLayoutType[functional].content[e.code]
  let ans = content
  if (keys === undefined) {
    ans += ""
  } else {
    const key = keys[!shift ? 0 : 1]
    if (key.length === 1) {
      ans += key
    } else {
      switch (key) {
        case "Space":
          ans += " "
          break
        case "Shift":
          setShift(true)
          break
        case "Back Space":
          ans += "" // ans = content.slice(0, -1);
          break
        default:
          ans += ""
          break
      }
    }
  }
  return isCustom ? ans : content + (e.key.length === 1 ? e.key : "")
}
