const eventCode = [
  "Esc",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "F10",
  "F11",
  "F12",
  "Backquote",
  "Digit1",
  "Digit2",
  "Digit3",
  "Digit4",
  "Digit5",
  "Digit6",
  "Digit7",
  "Digit8",
  "Digit9",
  "Digit0",
  "Minus",
  "Equal",
  "IntlYen",
  "Backspace",
  "Tab",
  "KeyQ",
  "KeyW",
  "KeyE",
  "KeyR",
  "KeyT",
  "KeyY",
  "KeyU",
  "KeyI",
  "KeyO",
  "KeyP",
  "BracketLeft",
  "BracketRight",
  "Enter",
  "CapsLock",
  "KeyA",
  "KeyS",
  "KeyD",
  "KeyF",
  "KeyG",
  "KeyH",
  "KeyJ",
  "KeyK",
  "KeyL",
  "Semicolon",
  "Quote",
  "Backslash",
  "ShiftLeft",
  "KeyZ",
  "KeyX",
  "KeyC",
  "KeyV",
  "KeyB",
  "KeyN",
  "KeyM",
  "Comma",
  "Period",
  "Slash",
  "IntlRo",
  "ShiftRight",
  "ControlLeft",
  "AAA",
  "AltLeft",
  "NonConvert",
  "Space",
  "Convert",
  "KanaMode",
  "AltRight",
  "BBB",
  "CCC",
  "CtrlRight",
];

const qwerty = {
  Esc: "Esc",
  F1: "F1",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  F10: "F10",
  F11: "F11",
  F12: "F12",
  Backquote: "半角/全角",
  Digit1: "1",
  Digit2: "2",
  Digit3: "3",
  Digit4: "4",
  Digit5: "5",
  Digit6: "6",
  Digit7: "7",
  Digit8: "8",
  Digit9: "9",
  Digit0: "0",
  Minus: "-",
  Equal: "^",
  IntlYen: "¥",
  Backspace: "Back Space",
  Tab: "Tab",
  KeyQ: "Q",
  KeyW: "W",
  KeyE: "E",
  KeyR: "R",
  KeyT: "T",
  KeyY: "Y",
  KeyU: "U",
  KeyI: "I",
  KeyO: "O",
  KeyP: "P",
  BracketLeft: "@",
  BracketRight: "[",
  Enter: "Enter",
  CapsLock: "Caps Lock",
  KeyA: "A",
  KeyS: "S",
  KeyD: "D",
  KeyF: "F",
  KeyG: "G",
  KeyH: "H",
  KeyJ: "J",
  KeyK: "K",
  KeyL: "L",
  Semicolon: ";",
  Quote: ":",
  Backslash: "]",
  ShiftLeft: "Shift",
  KeyZ: "Z",
  KeyX: "X",
  KeyC: "C",
  KeyV: "V",
  KeyB: "B",
  KeyN: "N",
  KeyM: "M",
  Comma: ",",
  Period: ".",
  Slash: "/",
  IntlRo: "\\",
  ShiftRight: "Shift",
  ControlLeft: "Ctrl",
  AAA: "Win",
  AltLeft: "Alt",
  NonConvert: "無変換",
  Space: "Space",
  Convert: "変換",
  KanaMode: "かたかなひらがな",
  AltRight: "Alt",
  BBB: "Win",
  CCC: "App.",
  CtrlRight: "Ctrl",
};

const dvorak = {
  Esc: "Esc",
  F1: "F1",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  F10: "F10",
  F11: "F11",
  F12: "F12",
  Backquote: "`",
  Digit1: "1",
  Digit2: "2",
  Digit3: "3",
  Digit4: "4",
  Digit5: "5",
  Digit6: "6",
  Digit7: "7",
  Digit8: "8",
  Digit9: "9",
  Digit0: "0",
  Minus: "[",
  Equal: "]",
  IntlYen: "¥",
  Backspace: "Back Space",
  Tab: "Tab",
  KeyQ: "'",
  KeyW: ",",
  KeyE: ".",
  KeyR: "P",
  KeyT: "Y",
  KeyY: "F",
  KeyU: "G",
  KeyI: "C",
  KeyO: "R",
  KeyP: "L",
  BracketLeft: "/",
  BracketRight: "=",
  Enter: "Enter",
  CapsLock: "Caps Lock",
  KeyA: "A",
  KeyS: "O",
  KeyD: "E",
  KeyF: "U",
  KeyG: "I",
  KeyH: "D",
  KeyJ: "H",
  KeyK: "T",
  KeyL: "N",
  Semicolon: "S",
  Quote: "-",
  Backslash: "\\",
  ShiftLeft: "Shift",
  KeyZ: ";",
  KeyX: "Q",
  KeyC: "J",
  KeyV: "K",
  KeyB: "X",
  KeyN: "B",
  KeyM: "M",
  Comma: "W",
  Period: "V",
  Slash: "Z",
  IntlRo: "",
  ShiftRight: "Shift",
  ControlLeft: "Ctrl",
  AAA: "Win",
  AltLeft: "Alt",
  NonConvert: "無変換",
  Space: "Space",
  Convert: "変換",
  KanaMode: "かたかなひらがな",
  AltRight: "Alt",
  BBB: "Win",
  CCC: "App.",
  CtrlRight: "Ctrl",
};

let layout = true;
if (document.getElementById("keyLayout").value === "dvorak") layout = false;
const convert = (e) => {
  return layout ? qwerty[e.code].toLowerCase() : dvorak[e.code].toLowerCase();
};
const qwertytr = ["Backquote", "Tab", "CapsLock", "ShiftLeft", "ControlLeft"];
const keyboard = document.getElementById("keyboard");
let tr = document.createElement("tr");
for (const code of eventCode) {
  if (
    code === qwertytr[0] ||
    code === qwertytr[1] ||
    code === qwertytr[2] ||
    code === qwertytr[3] ||
    code === qwertytr[4]
  ) {
    keyboard.appendChild(tr);
    tr = document.createElement("tr");
  }
  const td = document.createElement("td");
  td.textContent = layout ? qwerty[code] : dvorak[code];
  td.id = code;
  tr.appendChild(td);
}
keyboard.appendChild(tr);

let questions = []; // 問題
// 問題をquestionsに格納
async function getQuestions() {
  // JSON形式でmain.jsから受信
  const response = await fetch("/questions", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });
  // テキストを取り出し、objectに
  questions = JSON.parse(await response.text());

  // 配列をシャッフルする。
  // let array = questions;
  for (let i = 0; i < questions.length; i++) {
    let j = Math.floor(Math.random() * questions.length);
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  // questions = array;

  window.addEventListener("keydown", (e) => {
    // 何かキーが押されたら、実行 https://developer.mozilla.org/ja/docs/Web/API/Element/keydown_event
    if (convert(e) === questions[word_num][cnt]) {
      // 正答時
      answer = answer + convert(e);
      cnt++;
      correct++;
    } else if (convert(e).length === 1) {
      // 不正解の時
      miss++;
    }
    if (cnt == questions[word_num].length) {
      // 次の問題へ
      word_num++;
      answer = "";
      cnt = 0;
      if (word_num === questions.length) finished(time);
    }
    if (e.code === "Space" && isStarted === false) {
      // スペースが押されたら、時間計測
      isStarted = true;
      setInterval(() => {
        time++;
        document.getElementById("time").textContent =
          "経過時間：" + time + "秒";
      }, 1000);
    }
    document.getElementById("question").textContent = questions[word_num];
    document.getElementById("answer").textContent = answer;
    document.getElementById("miss").textContent =
      "ミスタイプ数：" + miss + "回";
    document.getElementById("correct").textContent =
      "正しいタイプ数：" + correct + "回";
    document.getElementById(e.code).style.backgroundColor = "red";
    setTimeout(() => {
      document.getElementById(e.code).style.backgroundColor = "white";
    }, 100);
  });
}
getQuestions();

async function finished(time) {
  const json = JSON.stringify({ time: time });
  await fetch("/finished", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: json,
  });
  window.location.href = "/finished";
}

let answer = ""; // 現在の到達状況
let word_num = 0; // 何問目か
let correct = 0; // 正答文字数
let miss = 0; // ミスタイプ数
let cnt = 0; // 何文字目か
let isStarted = false; // 始まったか
let time = 0; // 時間

document.getElementById("miss").textContent = "ミスタイプ数：" + miss + "回";
document.getElementById("correct").textContent =
  "正しいタイプ数：" + correct + "回";
document.getElementById("time").textContent = "経過時間：" + time + "秒";
