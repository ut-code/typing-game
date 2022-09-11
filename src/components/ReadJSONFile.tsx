export default function ReadJSONFile(props: { f: (x: object) => void }) {
  return (
    <input
      type="file"
      accept=".json"
      onChange={async (e) => {
        if (e.target.files !== null) {
          const reader = new FileReader();
          const file = e.target.files[0];
          reader.readAsText(file, "utf-8");
          reader.onload = () => {
            props.f(JSON.parse(reader.result as string));
          };
        }
      }}
    />
  );
}
