export default async function script(now, setNow) {
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
  function calcScore(time, word_num, correct, miss) {
    // 使う変数
    let progress = word_num / questions.length;
    let diff = 2 ** questions.length;
    let correct_rate = correct ** 2 / (miss + correct + 1);
    let velocity = correct / time;

    // 重みをつけて算出
    let w1 = 1;
    let w2 = 0.1;
    let w3 = 1;
    let w4 = 10;
    return Math.floor(
      1000 * progress * (w2 * diff + w3 * correct_rate + w4 * velocity)
    );
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/fetchScore`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
    }
  );
  // わざわざstringにしてからobjectにしている...
  let tmp = await response.text();
  let data = JSON.parse(tmp);
  let qnumber = Number(data.qnumber);

  async function results(time, word_num, correct, miss) {
    let score = calcScore(time, word_num, correct, miss);
    const json = JSON.stringify({ time: time, score: score });
    const response = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/results`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: json,
      }
    );
    window.location.href = "/result";
    // const html = await response.text();
    // document.body.innerHTML = html;
  }

  async function main() {
    //問題をとってくる
    await getQuestions();
    //シャッフルする、ただし順番が無関係な問題のみ
    if (qnumber === 0) {
      questions = shuffle(questions);
    }

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

      const previousContent = content;
      content = document.getElementById("content").textContent;
      const key = content[content.length - 1]; // 追加された文字すなわち一番最後の文字を取り出す。

      if (content === previousContent) return;

      document.getElementById("progress-number").textContent =
        word_num + 1 + "/" + questions.length + "問";

      // 何問目/全問題数を右上に表示
      document.getElementById("progress-number").textContent =
        word_num + 1 + "/" + questions.length + "問";
      if (key === questions[word_num][cnt]) {
        // 正答時
        answer += key;
        cnt++;
        correct++;
      } else if (alphabet.includes(key.toLowerCase())) {
        // 間違えていたときでアルファベットであれば、不正解とする。
        // 不正解の時
        miss++;
      }
      if (timeLimit - time <= 0) {
        results(timeLimit - time, time, correct, miss);
      }
      if (cnt == questions[word_num].length) {
        // 次の問題へ
        if (qnumber === 1) addcode(questions[word_num]);
        word_num++;
        setNow(Math.round((word_num / questions.length) * 100));
        answer = "";
        cnt = 0;
        if (word_num === questions.length) {
          clearInterval(timerId);
          results(time, word_num, correct, miss);
        }
      }
      // if (time > timeLimit) {
      //   // 時間制限でも終了, ただキー押さないと移行しない
      //   // clearInterval(timerId);
      //   results(timeLimit - time, time, correct, miss);
      // }

      document.getElementById("answered").textContent = questions[
        word_num
      ].slice(0, cnt);
      document.getElementById("question").textContent =
        questions[word_num].slice(cnt);
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
      if (e.key === " " && isStarted === false) {
        document.getElementById("question").textContent = questions[word_num];
        // スペースが押されたら、時間計測
        isStarted = true;
        timerId = setInterval(() => {
          time++;
          document.getElementById("time").textContent = time + "秒";
          document.getElementById("timeLeft").textContent =
            timeLimit - time + "秒";
          if (timeLimit - time <= 0) {
            clearInterval(timerId);
            document.getElementById("question").textContent = "キーを押してね";
          }
        }, 1000);
      }
    });
  }
  main();

  /*const content = document.getElementById("content");
  if (content != null) {
    const content = content.textContent;
  }
  if (content.length > 2) {
    content = content.slice(content.length-11,content.length-1);
  }
  console.log(content)*/

  let answer = ""; // 現在の到達状況
  let word_num = 0; // 何問目か
  let correct = 0; // 正答文字数
  let miss = 0; // ミスタイプ数
  let cnt = 0; // 何文字目か
  let isStarted = false; // 始まったか
  let time = 0; // 時間
  let timeLimit = 30; // 制限時間

  let content = document.getElementById("content").textContent;

  document.getElementById("correct").textContent = correct + "回";
  document.getElementById("miss").textContent = miss + "回";
  document.getElementById("time").textContent = time + "秒";
  document.getElementById("timeLeft").textContent = timeLimit - time + "秒";

  // Web開発追体験(learn.jsに移植したい)
  function addcode(question) {
    let rawcode = document.createElement("code");
    q;
    rawcode.textContent = question;
    document.getElementById("rawcode").appendChild(rawcode);
    // document.getElementById("rawcode").textContent = question;
    // let code = document.createElement("script");
    // code.textContent = question;
    // document.getElementById("rawcode").appendChild(code);
    document.getElementById("compilecode").innerHTML = question;
  }
  // ここまで
}
