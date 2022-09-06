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

  document.addEventListener("keydown", (event) => {
    // 何かキーが押されたら、実行 https://developer.mozilla.org/ja/docs/Web/API/Element/keydown_event
    if (event.key === questions[word_num][cnt]) {
      // 正答時
      answer = answer + event.key;
      cnt++;
      correct++;
    } else if (65 <= event.keyCode && event.keyCode <= 90) {
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
    if (event.key === " " && isStarted === false) {
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
