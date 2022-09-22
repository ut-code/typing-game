export default async function script() {
  // ここから
  let questions = []; // 問題
  let timerId; //clearIntervalをするため 無視してOK

  // 問題をquestionsに格納する関数
  async function getQuestions() {
    // JSON形式でmain.jsから受信
    const response = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/questions`, // https://github.com/ut-code/typescript-react-node-template/blob/master/frontend/src/App.tsx を参照
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
      }
    );
    // テキストを取り出し、objectに
    questions = JSON.parse(await response.text());
  }

  // 配列をシャッフルする関数
  function shuffle(array) {
    for (let i = 0; i < array.length; i++) {
      let j = Math.floor(Math.random() * array.length);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // scoreを計算する関数
  function calcScore(time, correct, miss) {
    return 100 - Math.floor(((time * miss) / correct) * 10);
  }

  async function results(timeLeft, time, correct, miss) {
    let score = calcScore(timeLeft, correct, miss);
    const json = JSON.stringify({ time: time, score: score });
    const response = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/results`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: json,
      }
    );
    const html = await response.text();
    document.body.innerHTML = html;
  }

  async function main() {
    //問題をとってくる
    await getQuestions();
    //シャッフルする
    questions = shuffle(questions);

    const alphabet = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    // キーボードの入力をReactがdivの中に出力しているので、その変更が行われたのを読み取っている。
    const observer = new MutationObserver(() => {
      // https://developer.mozilla.org/ja/docs/Web/API/MutationObserver
      const content = document.getElementById("content").textContent;
      const key = content[content.length - 1]; // 追加された文字すなわち一番最後の文字を取り出す。
      if (key === questions[word_num][cnt]) {
        // 正答時
        answer = answer + key;
        cnt++;
        correct++;
      } else if (alphabet.includes(key.toLowerCase())) {
        // 間違えていたときでアルファベットであれば、不正解とする。
        // 不正解の時
        miss++;
      }
      if (cnt == questions[word_num].length) {
        // 次の問題へ
        word_num++;
        answer = "";
        cnt = 0;
        if (word_num === questions.length) {
          clearInterval(timerId);
          results(timeLimit - time, time, correct, miss);
        }
      }
      if (timeLimit - time < 0) {
        // 時間制限でも終了
        clearInterval(timerId);
        results(timeLimit - time, time, correct, miss);
      }
      document.getElementById("question").textContent = questions[word_num];
      document.getElementById("your-answer").textContent = answer;
      document.getElementById("miss").textContent = miss + "回";
      document.getElementById("correct").textContent = correct + "回";
    });
    observer.observe(document.getElementById("content"), {
      attributes: true,
      childList: true,
      subtree: true,
    });

    // 何かキーが押されたら、実行 https://developer.mozilla.org/ja/docs/Web/API/Element/keydown_event
    window.addEventListener("keydown", (e) => {
      // allowedKeyに書かれたキーの動作は無効化しない
      const allowedKey = [
        "F5",
        "F12",
        "Alt",
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
      ];
      if (!allowedKey.includes(e.key)) e.preventDefault(); // キーボードの既定の動作を無効化 https://developer.mozilla.org/ja/docs/Web/API/Event/preventDefault を参照
      if (e.key === " " && isStarted === false) {
        document.getElementById("question").textContent = questions[word_num];
        // スペースが押されたら、時間計測
        isStarted = true;
        timerId = setInterval(() => {
          time++;
          document.getElementById("time").textContent = time + "秒";
          document.getElementById("timeLeft").textContent =
            timeLimit - time + "秒";
        }, 1000);
      }
    });
  }
  main();

  let answer = ""; // 現在の到達状況
  let word_num = 0; // 何問目か
  let correct = 0; // 正答文字数
  let miss = 0; // ミスタイプ数
  let cnt = 0; // 何文字目か
  let isStarted = false; // 始まったか
  let time = 0; // 時間
  let timeLimit = 30; // 制限時間

  document.getElementById("correct").textContent = correct + "回";
  document.getElementById("miss").textContent = miss + "回";
  document.getElementById("time").textContent = time + "秒";
  document.getElementById("timeLeft").textContent = timeLimit - time + "秒";
  // ここまで
}
