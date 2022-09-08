import eventCode from "./eventCode.json";
import defaultKeyLayout from "./qwerty.json";
import { useState } from "react";

export default function App() {
  const [keys, setKeys] = useState<string[]>(eventCode.map((code) => (defaultKeyLayout[code])));
  return (
    <>
      {eventCode.map((code, i) => (
        <li key={code}>{code}
          <input
            value={keys[i]}
            onChange={(e) => {
              setKeys(keys.map((key, j) => (i === j ? e.target.value : key)));
            }}></input>
        </li>
      ))}
      <button onClick={() => {
        let result = '{';
        for (let i = 0; i < eventCode.length; i++) {
          result += '"' + eventCode[i] + '":"' + keys[i] + '"';
          if (i !== eventCode.length - 1) result += ',';
        }
        result += '}';
        result = result.replace('\\', '\\\\'); //先頭しか置換されない
        console.log(result);
      }}>確定</button>
    </>
  );
}
