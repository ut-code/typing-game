/**
 * `object` を `FileName.json` に変換して、ダウンロードさせる関数です。
 * @param object 任意のオブジェクト
 * @param fileName 任意のファイル名
 */
export default function makeJSONFile(object: object, fileName: string) {
  const blob = new Blob([JSON.stringify(object)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName + ".json";
  a.click();
  URL.revokeObjectURL(a.href);
}
