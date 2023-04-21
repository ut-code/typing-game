export default async function script(now, setNow) {
  let questions = [] // 問題
  let timerId //clearIntervalをするため

  const correctSE = new Audio("/correctSE.mp3")

  // 問題をquestionsに格納する関数
  const getQuestions = async () => {
    const json = JSON.stringify({
      qnumber: localStorage.getItem("qnumber") || 0,
    })
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/questions`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: json,
    })
    questions = JSON.parse(await response.text())
  }

  // 配列をシャッフルする関数
  const shuffle = (array) => {
    for (let i = 0; i < array.length; i++) {
      const j = Math.floor(Math.random() * array.length)
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  // scoreを計算する関数
  const calcScore = (time, word_num, correct, miss, velocity) => {
    // 使う変数
    const progress = word_num / questions.length
    const diff = 0
    const correct_rate = correct ** 2 / (miss + correct + 1) // 問題文字数多いと有利！
    if (velocity > 10) velocity = 10

    // 重みをつけて算出
    const w1 = 1000
    const w2 = 0.1
    const w3 = 1
    const w4 = 5
    return Math.floor(w1 * progress * (w2 * diff + w3 * correct_rate + w4 * velocity))
  }

  const qnumber = Number(localStorage.getItem("qnumber") || 0)

  async function results(time, word_num, correct, miss) {
    let velocity
    if (time === 0) velocity = 99.99
    else velocity = correct / time
    const score = calcScore(time, word_num, correct, miss, velocity)
    const kpm = Math.floor(velocity * Math.pow(10, 2)) / Math.pow(10, 2) // kpmじゃなくてkpsだった...
    let scorerank
    if (miss === 0 && kpm >= 5 && word_num === questions.length) scorerank = "SS"
    else if (correct / (correct + miss + 1) > 0.9 && kpm >= 5 && word_num === questions.length) scorerank = "S"
    else if (correct / (correct + miss + 1) > 0.8 && kpm >= 4) scorerank = "A"
    else if (correct / (correct + miss + 1) > 0.8 && kpm >= 3) scorerank = "B"
    else if (correct / (correct + miss + 1) < 0.5) scorerank = "E"
    else if (correct / (correct + miss + 1) > 0.7 && kpm >= 2) scorerank = "C"
    else scorerank = "D"

    const json = JSON.stringify({
      qnumber: qnumber,
      username: localStorage.getItem("username") || "Guest",
      score: score,
    })
    await fetch(`${import.meta.env.VITE_API_ENDPOINT}/submitScore`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: json,
    })

    localStorage.setItem("time", time)
    localStorage.setItem("score", score)
    localStorage.setItem("kpm", kpm)
    localStorage.setItem("correct", correct)
    localStorage.setItem("miss", miss)
    localStorage.setItem("scorerank", scorerank)
    window.location.href = "/result"
  }

  async function main() {
    // 問題をとってくる
    await getQuestions()
    // シャッフルする、ただし順番が無関係な問題のみ
    if (qnumber <= 5) {
      questions = shuffle(questions)
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
    ]
    function start() {
      if (isStarted === false) {
        document.getElementById("question").textContent = questions[word_num]
        // スペースが押されたら、時間計測
        isStarted = true
        timerId = setInterval(() => {
          time++
          document.getElementById("time").textContent = time + "秒"
          document.getElementById("remaining-time").textContent = timeLimit - time + "秒"

          if (timeLimit - time <= 0 && isFinished === false) {
            clearInterval(timerId)
            isFinished = true
            results(time, word_num, correct, miss)
          }
        }, 1000)
      }
    }

    // キーボードの入力をReactがdivの中に出力しているので、その変更が行われたのを読み取っている。
    const observer = new MutationObserver(() => {
      start()
      const previousContent = content
      content = document.getElementById("content").textContent
      const key = content[content.length - 1] // 追加された文字すなわち一番最後の文字を取り出す。

      if (content === previousContent) return

      // 何問目/全問題数を右上に表示
      document.getElementById("progress-number").textContent = word_num + 1 + "/" + questions.length + "問"

      if (key === questions[word_num][cnt]) {
        // 正答時
        answer += key
        cnt++
        correct++
        document.getElementById("correct").textContent = correct + "回"
      } else if (alphabet.includes(key.toLowerCase())) {
        // 間違えていたときでアルファベットであれば、不正解とする。
        // 不正解の時
        miss++
        document.getElementById("miss").textContent = miss + "回"
      }

      if (cnt == questions[word_num].length) {
        // 次の問題へ
        word_num++

        // 正解音が鳴る。最後の問題だけちょっと切れている
        correctSE.pause()
        correctSE.play()

        // 進捗バーを増やす
        setNow(Math.round((word_num / questions.length) * 100))

        answer = ""
        cnt = 0
        if (word_num === questions.length && isFinished === false) {
          // 二重submitを防ぐflag
          isFinished = true
          results(time, word_num, correct, miss)
        }
      }

      document.getElementById("answered").textContent = questions[word_num].slice(0, cnt)
      document.getElementById("question").textContent = questions[word_num].slice(cnt)
      document.getElementById("miss").textContent = miss + "回"
      document.getElementById("correct").textContent = correct + "回"
    })
    observer.observe(document.getElementById("content"), {
      attributes: true,
      childList: true,
      subtree: true,
    })

    window.addEventListener("keydown", () => {
      start()
    })
  }
  main()

  /*const content = document.getElementById("content");
  if (content != null) {
    const content = content.textContent;
  }
  if (content.length > 2) {
    content = content.slice(content.length-11,content.length-1);
  }
  console.log(content)*/

  let content = document.getElementById("content").textContent

  let answer = "" // 現在の到達状況
  let word_num = 0 // 何問目か
  let correct = 0 // 正答文字数
  let miss = 0 // ミスタイプ数
  let cnt = 0 // 何文字目か
  let isStarted = false // 始まったか
  let isFinished = false // 終わったか
  let time = 0 // 時間
  const timeLimit = 120 // 制限時間

  document.getElementById("correct").textContent = correct + "回"
  document.getElementById("miss").textContent = miss + "回"
  document.getElementById("time").textContent = time + "秒"
  document.getElementById("remaining-time").textContent = timeLimit - time + "秒"
}
