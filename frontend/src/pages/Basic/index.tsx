import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Keyboard from "../KeyboardLayoutCreator/Keyboard"
import "./style.css"

import "bootstrap/dist/css/bootstrap.min.css"
import { Button, ProgressBar, Stack } from "react-bootstrap"
import shuffle from "./shuffle"
import calculateScore from "./calculateScore"
import calculateKps from "./calculateKps"
import calculateScoreRank from "./calculateScoreRank"

export default function Basic() {
  const [content, setContent] = useState<string>("a")
  const [now, setNow] = useState<number>(0)
  const [problemSolved, setProblemSolved] = useState<number>(0) // 何問目か
  const [questions, setQuestions] = useState<string[]>([])
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const [time, setTime] = useState(0) // 現在の時間
  const [timeLimit] = useState(12) // 制限時間
  const [correctInputCount, setCorrectInputCount] = useState<number>(0) // 正答文字数
  const [miss, setMiss] = useState<number>(0) // ミスタイプ数
  const [cnt, setCnt] = useState<number>(0) // 何文字目か
  const [isFinished, setIsFinished] = useState<boolean>(false) // 終わったか

  const correctSE: HTMLAudioElement = new Audio("/correctSE.mp3")
  const qnumber: number = Number(localStorage.getItem("qnumber")) || 0

  const Navigate = useNavigate()

  async function results(time: number, wordNum: number, correct: number, miss: number, questions: string[]) {
    const score = calculateScore(time, wordNum, correct, miss, questions.length)
    const kps = calculateKps(time, correct)
    const scoreRank = calculateScoreRank(wordNum, correct, miss, kps, questions.length)

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
    localStorage.setItem("kpm", kps.toString())
    localStorage.setItem("correct", correct.toString())
    localStorage.setItem("miss", miss.toString())
    localStorage.setItem("scorerank", scoreRank)
    Navigate("/result")
  }

  useEffect(() => {
    // 問題をquestionsに格納する
    ;(async () => {
      const json = JSON.stringify({
        qnumber: qnumber,
      })
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/questions`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: json,
      })
      const data: string[] = JSON.parse(await response.text())
      if (qnumber <= 5) setQuestions(shuffle(data)) // 順番が無関係な問題のみシャッフル
      else setQuestions(data)
    })()
  }, [])

  let timerId: NodeJS.Timeout | any
  const updateTime = () => {
    console.log(typeof timerId)
    timerId =
      !timerId &&
      setInterval(() => {
        setTime((prev) => prev + 1)
      }, 1000)

    if (timeLimit - time <= 0 && !isFinished) {
      console.log(typeof timerId)
      clearInterval(timerId)
      setIsFinished(true)
      results(time, problemSolved, correctInputCount, miss, questions)
    }
  }

  // 初回はisStartedが変更されたら実行。その後はtimeが変更されたら実行。
  useEffect(() => {
    if (!isStarted) return
    updateTime()

    return () => clearInterval(timerId)
  }, [isStarted, time])

  const [previousContent, setPreviousContent] = useState(content)

  useEffect(() => {
    async function main() {
      if (content === previousContent) return
      setPreviousContent(content)
      const keyInput = content[content.length - 1] // 追加された文字すなわち一番最後の文字を取り出す。

      if (keyInput === questions[problemSolved][cnt]) {
        // 正答時
        setCnt((prev) => prev + 1)
        setCorrectInputCount((prev) => prev + 1)
      } else if (keyInput.match(/[a-zA-Z]/)) {
        // 間違えていたときでアルファベットであれば、不正解とする。
        // 不正解の時
        setMiss((prev) => prev + 1)
      }

      if (cnt === questions[problemSolved].length) {
        // 次の問題へ
        setProblemSolved((prev) => prev + 1)

        // 正解音が鳴る。最後の問題だけちょっと切れている
        correctSE.pause()
        correctSE.play()

        // 進捗バーを増やす
        setNow(Math.round((problemSolved / questions.length) * 100))

        setCnt(0)
        if (problemSolved === questions.length && isFinished === false) {
          // clearInterval(timerId)
          // 二重submitを防ぐflag
          setIsFinished(true)
          results(time, problemSolved, correctInputCount, miss, questions)
        }
      }

      // 開始キーを押したら開始
      window.addEventListener("keydown", () => {
        if (!isStarted) setIsStarted(true)
      })
    }
    main()
  }, [content, questions, problemSolved, correctInputCount, miss, cnt, isFinished])

  return (
    <>
      <Link to="/">
        <Button variant="secondary" id="backbutton">
          Back
        </Button>
      </Link>
      <div id="score-related">
        <Stack direction="horizontal" gap={3}>
          <table id="current">
            <tbody>
              <tr>
                <th>正しいタイプ数：</th>
                <td id="correct">{correctInputCount}回</td>
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
            {/* 何問目/全問題数 */}
            <div id="progress-number">{problemSolved + 1 + "/" + questions.length + "問"}</div>
            <div className="pb-5" id="progress-bar">
              <ProgressBar variant="success" animated now={now} label={`${now}%`} />
            </div>
          </Stack>
        </Stack>
      </div>
      <div id="elements">
        <div id="answer">
          <span id="answered">{isStarted ? questions[problemSolved].slice(0, cnt) : ""}</span>
          <span id="question">{isStarted ? questions[problemSolved].slice(cnt) : "[Space]を押して開始"}</span>
        </div>
      </div>
      <Keyboard output={content} setOutput={setContent} />
    </>
  )
}
