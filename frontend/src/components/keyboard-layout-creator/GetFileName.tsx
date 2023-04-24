import React from "react"
/**
 * ファイル名を入力させるinputタグ
 */
export default function GetFileName({
  fileName,
  setFileName,
}: {
  fileName: string
  setFileName: (value: string) => void
}): JSX.Element {
  return (
    <input
      type="text"
      placeholder="ファイル名を入力してください。"
      value={fileName}
      onChange={(e) => {
        setFileName(e.target.value)
      }}
    />
  )
}
