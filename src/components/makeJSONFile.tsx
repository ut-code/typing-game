export default function makeJSONFile(object: object, fileName: string) {
  const blob = new Blob([JSON.stringify(object)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName + ".json";
  a.click();
  URL.revokeObjectURL(a.href);
}
