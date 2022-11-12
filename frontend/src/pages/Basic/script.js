export default async function script(now, setNow, code, setCode) {
  // ここから
  let questions = []; // 問題
  let timerId; //clearIntervalをするため 無視してOK

  const typeSE = new Audio("/typeSE.mp3");
  const correctSE = new Audio("/correctSE.mp3");

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
    let w1 = 1000;
    let w2 = 0.1;
    let w3 = 1;
    let w4 = 10;
    return Math.floor(
      w1 * progress * (w2 * diff + w3 * correct_rate + w4 * velocity)
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

      // タイプ音が鳴る。早すぎると間に合わない
      typeSE.pause();
      typeSE.play();

      const previousContent = content;
      content = document.getElementById("content").textContent;
      const key = content[content.length - 1]; // 追加された文字すなわち一番最後の文字を取り出す。

      if (content === previousContent) return;

      // 何問目/全問題数を右上に表示
      document.getElementById("progress-number").textContent =
        word_num + 1 + "/" + questions.length + "問";
      if (qnumber === 1 && word_num >= 7) {
        document.getElementById("progress-number2").textContent =
          word_num + 1 + "/" + questions.length + "問";
      }

      if (key === questions[word_num][cnt]) {
        // 正答時
        answer += key;
        cnt++;
        correct++;
        document.getElementById("correct").textContent = correct + "回";
        if (qnumber === 1 && word_num >= 3) {
          document.getElementById("correct2").textContent = correct + "回";
        }
      } else if (alphabet.includes(key.toLowerCase())) {
        // 間違えていたときでアルファベットであれば、不正解とする。
        // 不正解の時
        miss++;
        document.getElementById("miss").textContent = miss + "回";
        if (qnumber === 1 && word_num >= 3) {
          document.getElementById("miss2").textContent = miss + "回";
        }
      }

      if (cnt == questions[word_num].length) {
        // 次の問題へ
        word_num++;

        // 正解音が鳴る。最後の問題だけちょっと切れている
        correctSE.pause();
        correctSE.play();

        // コードを書き換える
        if (qnumber === 1) addcode();

        // 進捗バーを増やす
        setNow(Math.round((word_num / questions.length) * 100));

        answer = "";
        cnt = 0;
        if (word_num === questions.length && isFinished === false) {
          // 二重submitを防ぐflag
          isFinished = true;
          results(time, word_num, correct, miss);
        }
      }

      document.getElementById("answered").textContent = questions[
        word_num
      ].slice(0, cnt);
      document.getElementById("question").textContent =
        questions[word_num].slice(cnt);
      // document.getElementById("your-answer").textContent = answer;
      document.getElementById("miss").textContent = miss + "回";
      document.getElementById("correct").textContent = correct + "回";

      // qnumber === 1用
      if (qnumber === 1 && word_num >= 3) {
        document.getElementById("correct2").textContent = correct + "回";
      }
      if (qnumber === 1 && word_num >= 3) {
        document.getElementById("miss2").textContent = miss + "回";
      }
      if (qnumber === 1 && word_num >= 11) {
        document.getElementById("answered2").textContent = questions[
          word_num
        ].slice(0, cnt);
      }
      if (qnumber === 1 && word_num >= 12) {
        document.getElementById("question2").textContent =
          questions[word_num].slice(cnt);
      }
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
        if (qnumber === 1 && word_num >= 12) {
          document.getElementById("question2").textContent =
            questions[word_num];
        }
        // スペースが押されたら、時間計測
        isStarted = true;
        timerId = setInterval(() => {
          time++;
          document.getElementById("time").textContent = time + "秒";
          if (qnumber === 1 && word_num >= 5) {
            document.getElementById("time2").textContent = time + "秒";
          }
          document.getElementById("remaining-time").textContent =
            timeLimit - time + "秒";
          if (qnumber === 1 && word_num >= 6) {
            document.getElementById("remaining-time2").textContent =
              timeLimit - time + "秒";
          }

          if (timeLimit - time <= 0 && isFinished === false) {
            clearInterval(timerId);
            isFinished = true;
            results(time, word_num, correct, miss);
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
  let isFinished = false; // 終わったか
  let time = 0; // 時間
  let timeLimit = 30; // 制限時間
  if (qnumber === 1) timeLimit = 300;
  else if (qnumber === 11) timeLimit = 120;
  let html = [
    "<!DOCTYPE html>",
    '\n<html lang="ja">',
    "\n\t<head>",
    '\n\t\t<meta charset="utf-8" />',
    "\n\t</head>",
    "\n\t<body>",
    "\n\t</body>",
    "\n</html>",
  ];
  let html2;

  let content = document.getElementById("content").textContent;

  document.getElementById("correct").textContent = correct + "回";
  document.getElementById("miss").textContent = miss + "回";
  document.getElementById("time").textContent = time + "秒";
  document.getElementById("remaining-time").textContent =
    timeLimit - time + "秒";

  // Web開発追体験(learn.jsに移植したい)
  function addcode() {
    if (word_num === 0) {
      // html2 = html.join("");
      setCode(html2);
    } else if (word_num === 1) {
      html.splice(6, 0, '\n\t\t<div id="score-related2">', "\n\t\t</div>");
    } else if (word_num === 2) {
      html.splice(
        7,
        0,
        '\n\t\t\t<table id="current2">',
        "\n\t\t\t\t<tbody>",
        "\n\t\t\t\t</tbody>",
        "\n\t\t\t</table>"
      );
    } else if (word_num === 3) {
      html.splice(
        9,
        0,
        "\n\t\t\t\t\t<tr>",
        "\n\t\t\t\t\t\t<th>Correct: </th>",
        '\n\t\t\t\t\t\t<td id="correct2"></td>',
        "\n\t\t\t\t\t</tr>"
      );
    } else if (word_num === 4) {
      html.splice(
        13,
        0,
        "\n\t\t\t\t\t<tr>",
        "\n\t\t\t\t\t\t<th>Miss: </th>",
        '\n\t\t\t\t\t\t<td id="miss2"></td>',
        "\n\t\t\t\t\t</tr>"
      );
    } else if (word_num === 5) {
      html.splice(
        17,
        0,
        "\n\t\t\t\t\t<tr>",
        "\n\t\t\t\t\t\t<th>Time: </th>",
        '\n\t\t\t\t\t\t<td id="time2"></td>',
        "\n\t\t\t\t\t</tr>"
      );
    } else if (word_num === 6) {
      html.splice(
        21,
        0,
        "\n\t\t\t\t\t<tr>",
        "\n\t\t\t\t\t\t<th>Remaining Time: </th>",
        '\n\t\t\t\t\t\t<td id="remaining-time2"></td>',
        "\n\t\t\t\t\t</tr>"
      );
    } else if (word_num === 7) {
      html.splice(27, 0, '\n\t\t\t<div id="progress-number2"></div>');
    } else if (word_num === 8) {
      html.splice(29, 0, '\n\t\t<div id="elements2">', "\n\t\t</div>");
    } else if (word_num === 9) {
      html.splice(30, 0, '\n\t\t\t\t<div id="answer2"></div>');
    } else if (word_num === 10) {
      html.splice(31, 0, '\n\t\t\t\t<span id="answered2"></span>');
    } else if (word_num === 11) {
      html.splice(32, 0, '\n\t\t\t\t<span id="question2"></span>');
    } else if (word_num === 12) {
      html.splice(34, 0, '\n\t\t<Button href="/">Back</Button>');
    }

    html2 = html.join("");
    document.getElementById("rawcode").textContent = html2;
    document.getElementById("preview-box").innerHTML = html2;
  }
  if (qnumber === 1) addcode();
  // ここまで
}
