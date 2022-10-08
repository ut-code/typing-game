import React from "react";
/**
 * ユーザーから受け取った JSON ファイルを引数で指定した関数で処理します。
 * @param f JSON ファイルを処理する関数
 * @returns
 */
export default function ReadJSONFile({
  f,
}: {
  f: (x: object) => void;
}): JSX.Element {
  return (
    <input
      type="file"
      accept=".json"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onChange={async (e) => {
        if (e.target.files !== null) {
          const reader = new FileReader();
          const file = e.target.files[0];
          reader.readAsText(file, "utf-8");
          reader.onload = () => {
            f(JSON.parse(reader.result as string));
          };
        }
      }}
    />
  );
}
