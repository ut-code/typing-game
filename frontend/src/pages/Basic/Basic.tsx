/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Keyboard from "./../../../keyboard-layout-creator/keyboard/src/App"
import "./style.css"

// Audioファイルの読み込み
const correctSE = new Audio("/correctSE.mp3")

import "bootstrap/dist/css/bootstrap.min.css"
import { Button, ProgressBar, Stack } from "react-bootstrap"

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

export default function Basic() {
  const [content, setContent] = useState<string>("a")
  const [questions, setQuestions] = useState<string[]>([])
  const [now, setNow] = useState<number>(0)
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const [isFinished, setIsFinished] = useState<boolean>(false)
  const [currentQuestion, setCurrentQuestion] = useState<string>("")
  const [wordnum, setWordnum] = useState<number>(0)
  const [time, setTime] = useState<number>(0)
  const [correct, setCorrect] = useState<number>(0)
  const [miss, setMiss] = useState<number>(0)
  const [count, setCount] = useState<number>(0)
  const [answer, setAnswer] = useState<string>("")

  // useNavigate を Navigate に変化させる呪文
  const Navigate = useNavigate()

  const qnumber = Number(localStorage.getItem("qnumber") || 0)
  const timeLimit = 120 // 制限時間
  let contentElement = document.getElementById("content")

  // 配列をシャッフルする関数
  const shuffle = (array: string[]) => {
    for (let i = 0; i < array.length; i++) {
      const j = Math.floor(Math.random() * array.length)
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  // 問題をquestionsに格納する関数
  const getQuestions = async () => {
    const json = JSON.stringify({
      qnumber: qnumber,
    })
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/questions`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: json,
    })
    let data = JSON.parse(await response.text())
    if (qnumber <= 5) data = shuffle(data)
    setQuestions(data)
  }
  getQuestions()

  // scoreを計算する関数
  const calcScore = (velocity: number) => {
    const progress = wordnum / questions.length
    const diff = 0
    const correctRate = correct ** 2 / (miss + correct + 1) // 問題文字数多いと有利！

    // 重みをつけて算出
    const w1 = 1000,
      w2 = 0.1,
      w3 = 1,
      w4 = 5
    return Math.floor(w1 * progress * (w2 * diff + w3 * correctRate + w4 * velocity))
  }

  // 結果を表示する関数
  const results = async () => {
    // velocityはtimeが0になると無限大になるので、0.1を足す
    const velocity = correct / (time + 0.1)
    const score = calcScore(velocity)
    const kps = Math.floor(velocity * Math.pow(10, 2)) / Math.pow(10, 2)

    let scoreRank
    if (miss === 0 && kps >= 5 && wordnum === questions.length) scoreRank = "SS"
    else if (correct / (correct + miss + 1) > 0.9 && kps >= 5 && wordnum === questions.length) scoreRank = "S"
    else if (correct / (correct + miss + 1) > 0.8 && kps >= 4) scoreRank = "A"
    else if (correct / (correct + miss + 1) > 0.8 && kps >= 3) scoreRank = "B"
    else if (correct / (correct + miss + 1) < 0.5) scoreRank = "E"
    else if (correct / (correct + miss + 1) > 0.7 && kps >= 2) scoreRank = "C"
    else scoreRank = "D"

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

    localStorage.setItem("time", time.toString())
    localStorage.setItem("score", score.toString())
    localStorage.setItem("kps", kps.toString())
    localStorage.setItem("correct", correct.toString())
    localStorage.setItem("miss", miss.toString())
    localStorage.setItem("scorerank", scoreRank)
    Navigate("/result")
  }

  const start = () => {
    if (isStarted) return
    setIsStarted(true)
    setCurrentQuestion(questions[wordnum])

    // タイマーを開始する
    const timerId = setInterval(() => {
      setTime((prev) => prev + 1)
      if (timeLimit - time <= 0 && isFinished === false) {
        clearInterval(timerId)
        setIsFinished(true)
        results()
      }
    }, 1000)
  }

  // キーボードの入力をReactがdivの中に出力しているので、その変更が行われたのを読み取っている。
  const observer = new MutationObserver(() => {
    start()
    const previousContent = contentElement
    // @ts-ignore
    contentElement = document.getElementById("content").textContent
    const key = content[content.length - 1] // 追加された文字すなわち一番最後の文字を取り出す。

    if (contentElement === previousContent) return

    if (key === questions[wordnum][count]) {
      // 正答時
      setAnswer((prev) => prev + key)
      setCount((prev) => prev + 1)
      setCorrect((prev) => prev + 1)
    } else if (alphabet.includes(key.toLowerCase())) {
      // 間違えていたときでアルファベットであれば、不正解とする。
      // 不正解の時
      setMiss((prev) => prev + 1)
    }

    if (count === questions[wordnum].length) {
      // 次の問題へ
      setWordnum((prev) => prev + 1)

      // 正解音が鳴る。最後の問題だけちょっと切れている
      correctSE.pause()
      correctSE.play()

      // 進捗バーを増やす
      setNow(Math.round((wordnum / questions.length) * 100))

      setAnswer("")
      setCount(0)
      if (wordnum === questions.length && isFinished === false) {
        // 最後の問題を解いたら終了
        setIsFinished(true)
        results()
      }
    }
  })

  function addObserverIfDesiredNodeAvailable() {
    var composeBox = document.querySelectorAll("content")[2]
    if (!composeBox) {
      // The node we need does not exist yet.
      // Wait 500ms and try again
      window.setTimeout(addObserverIfDesiredNodeAvailable, 500)
      return
    }
    // @ts-ignore
    observer.observe(document.getElementById("content"), {
      attributes: true,
      childList: true,
      subtree: true,
    })
  }
  addObserverIfDesiredNodeAvailable()

  window.addEventListener("keydown", () => {
    start()
  })

  /*const content = document.getElementById("content");
  if (content != null) {
    const content = content.textContent;
  }
  if (content.length > 2) {
    content = content.slice(content.length-11,content.length-1);
  }
  console.log(content)*/

  // useEffect(() => {
  //   script(now, setNow)
  // }, [])
  const cont = document.getElementById("content")
  if (cont !== null) cont.textContent = content

  return (
    <>
      <Button href="/" variant="secondary" id="backbutton">
        Back
      </Button>
      <div id="score-related">
        <Stack direction="horizontal" gap={3}>
          <table id="current">
            <tbody>
              <tr>
                <th>正しいタイプ数：</th>
                <td id="correct">{correct}回</td>
              </tr>
              <tr>
                <th>ミスタイプ数：</th>
                <td id="miss">{miss}回</td>
              </tr>
              <tr>
                <th>経過時間：</th>
                <td id="time">{time}秒</td>
              </tr>
              <tr>
                <th>残り時間：</th>
                <td id="remaining-time">{timeLimit - time}秒</td>
              </tr>
            </tbody>
          </table>

          <Stack gap={0} id="progress">
            <div id="progress-number">{wordnum + 1 + "/" + questions.length + "問"}</div>
            <div className="pb-5" id="progress-bar">
              <ProgressBar
                variant="success"
                animated
                now={Math.round((wordnum / questions.length) * 100)}
                label={`${Math.round((wordnum / questions.length) * 100)}%`}
              />
            </div>
          </Stack>
        </Stack>
      </div>
      <div id="elements">
        <div id="answer">
          <span id="answered"></span>
          <span id="question">[Space]を押して開始</span>
        </div>
      </div>
      {/* 下のdivの中にReactがキーボードの入力結果をいい感じにして、出力している。これを、読み取って使えば良い。 */}
      <div id="content"></div>
      <Keyboard output={content} setOutput={setContent} />
    </>
  )
}
