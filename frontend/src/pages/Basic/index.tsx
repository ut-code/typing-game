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
  const [content, setContent] = useState<string>("")
  const [now, setNow] = useState<number>(0)
  const [problemSolved, setProblemSolved] = useState<number>(0) // 何問目か
  const [questions, setQuestions] = useState<string[]>([])
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const [time, setTime] = useState(0) // 現在の時間
  const [timeLimit] = useState(12) // 制限時間
  const [correctInputCount, setCorrectInputCount] = useState<number>(0) // 正答文字数
  const [incorrectInputCount, setIncorrectInputCount] = useState<number>(0) // ミスタイプ数
  const [currentIndex, setCurrentIndex] = useState<number>(0) // 何文字目か
  const [isFinished, setIsFinished] = useState<boolean>(false) // 終わったか

  const correctSE: HTMLAudioElement = new Audio("/correctSE.mp3")
  const questionNumber: number = Number(localStorage.getItem("questionNumber")) || 0

  const Navigate = useNavigate()

  async function saveResults(
    time: number,
    problemSolved: number,
    correctInputCount: number,
    incorrectInputCount: number,
    questionsLength: number
  ) {
    const score = calculateScore(time, problemSolved, correctInputCount, incorrectInputCount, questionsLength)
    const kps = calculateKps(time, correctInputCount)
    const scoreRank = calculateScoreRank(problemSolved, correctInputCount, incorrectInputCount, kps, questionsLength)

    const json = JSON.stringify({
      qnumber: questionNumber,
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
    localStorage.setItem("correctInputCount", correctInputCount.toString())
    localStorage.setItem("incorrectInputCount", incorrectInputCount.toString())
    localStorage.setItem("scoreRank", scoreRank)
    Navigate("/result")
  }

  useEffect(() => {
    // 開始キーを押したら開始
    window.addEventListener("keydown", () => {
      if (!isStarted) setIsStarted(true)
    })

    return () => {
      window.removeEventListener("keydown", () => {
        if (!isStarted) setIsStarted(true)
      })
    }
  }, [])

  // isStarted が変更されたら実行。
  useEffect(() => {
    if (!isStarted) return
    const timerId = setInterval(() => {
      setTime((prev) => prev + 1)
    }, 1000)

    return () => {
      clearInterval(timerId)
    }
  }, [isStarted, setTime])

  useEffect(() => {
    if (timeLimit - time <= 0 && !isFinished) {
      setIsFinished(true)
      saveResults(time, problemSolved, correctInputCount, incorrectInputCount, questions.length)
    }
  }, [timeLimit, time, problemSolved, correctInputCount, incorrectInputCount, questions])

  useEffect(() => {
    // 問題をquestionsに格納する
    ;(async () => {
      const json = JSON.stringify({
        qnumber: questionNumber,
      })
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/questions`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: json,
      })
      const data: string[] = JSON.parse(await response.text())
      if (questionNumber <= 5) setQuestions(shuffle(data)) // 順番が無関係な問題のみシャッフル
      else setQuestions(data)
    })()
  }, [])

  const [previousContent, setPreviousContent] = useState(content)

  useEffect(() => {
    async function main() {
      if (content === previousContent) return
      setPreviousContent(content)
      const keyInput = content[content.length - 1] // 追加された文字すなわち一番最後の文字を取り出す。

      if (keyInput === questions[problemSolved][currentIndex]) {
        // 正答時
        setCurrentIndex((prev) => prev + 1)
        setCorrectInputCount((prev) => prev + 1)
      } else if (keyInput.match(/[a-zA-Z]/)) {
        // 間違えていたときでアルファベットであれば、不正解とする。
        // 不正解の時
        setIncorrectInputCount((prev) => prev + 1)
      }

      if (currentIndex === questions[problemSolved].length - 1) {
        // 次の問題へ
        if (problemSolved < questions.length - 1) {
          setProblemSolved((prev) => prev + 1)
        }

        // 正解音が鳴る。最後の問題だけちょっと切れている
        correctSE.pause()
        correctSE.play()

        // 進捗バーを増やす
        setNow(Math.round((problemSolved / questions.length) * 100))

        setCurrentIndex(0)
        if (problemSolved === questions.length && isFinished === false) {
          // clearInterval(timerId)
          // 二重submitを防ぐflag
          setIsFinished(true)
          saveResults(time, problemSolved, correctInputCount, incorrectInputCount, questions.length)
        }
      }
    }
    main()
  }, [content, questions, problemSolved, correctInputCount, incorrectInputCount, currentIndex, isFinished])

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
                <td id="miss">{incorrectInputCount}回</td>
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
          <span id="answered">{isStarted ? questions[problemSolved].slice(0, currentIndex) : ""}</span>
          <span id="question">{isStarted ? questions[problemSolved].slice(currentIndex) : "[Space]を押して開始"}</span>
        </div>
      </div>
      <Keyboard content={content} setContent={setContent} />
    </>
  )
}
