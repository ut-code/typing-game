import eventCode from "./eventCode.json"
import qwerty from "./qwerty.json"
import dvorak from "./dvorak.json"
import "./App.css"

const newRow = [
  "Backquote",
  "Tab",
  "CapsLock",
  "ShiftLeft",
  "ControlLeft",
];

const result = [];
let cnt = 0;
for (let i = 0; i <= newRow.length; i++) {
  const tmp = [];
  while (eventCode[cnt] !== newRow[i]) {
    tmp.push(eventCode[cnt]);
    cnt++;
  }
  result.push(tmp);
}

export default function App() {
  return (
    <>
      <div id="keyboard">
        {result.map((row,i)=>(
          <div id="row" key={i}>{row.map((code)=>(<div className="code" key={code}>{qwerty[code]}</div>))}</div>
        ))}
      </div>
      <div id="hoge">
        <div style={{position:"relative",left:"10px"}} >aaa</div>
        <div>bbb</div>
        <div>ccc</div>
        <span className="br" />
        <div style={{position:"relative",left:"10px"}}>ddd</div>
        <div>eee</div>
        <div>fff</div>
      </div>
    </>
  );
}