import eventCode from "./eventCode.json";
import qwerty from "./qwerty.json";
import dvorak from "./dvorak.json";
import jis109 from "./JIS109.json";
import "./App.css";

export default function App() {
  return (
    <>
      <div id="keyboard">
        {eventCode.map((code) => (
          <div
            id={code}
            className="key"
            style={{
              position: "absolute",
              top: jis109[code].row * 10 + "%",
              left: jis109[code].column * 10 + "%",
              width: jis109[code].width / 10 + "%",
            }}
          >
            {code}
          </div>
        ))}
      </div>
    </>
  );
}
