import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

// CSS関連
import { Stack } from "react-bootstrap";

// 関数
import shuffle from "../../utils/shuffle";
import calculateScore from "../../utils/score/calculateScore";
import calculateKps from "../../utils/score/calculateKps";
import calculateScoreRank from "../../utils/score/calculateScoreRank";
// コンポーネント
import Keyboard from "../KeyboardLayoutCreator/Keyboard";
import BackButton from "../../components/BackButton";
import TypingStatistics from "../../components/TypingStatistics/TypingStatictics";
import TypingProgressBar from "../../components/TypingProgressBar/TypingProgressBar";
import QuestionDisplay from "../../components/QuestionDisplay/QuestionDisplay";
import typingGameQuestionSets from "../../data/questionSet";

export default function Basic() {
  // キー入力
  const [content, setContent] = useState<string>("");
  const [previousContent, setPreviousContent] = useState(content);
  // 問題
  const questionSetId: string =
    localStorage.getItem("questionSetId") || typingGameQuestionSets[0].id;
  const [problemSolved, setProblemSolved] = useState<number>(0); // 何問目か
  const [questions, setQuestions] = useState<string[]>([]);
  const [correctInputCount, setCorrectInputCount] = useState<number>(0); // 正答文字数
  const [incorrectInputCount, setIncorrectInputCount] = useState<number>(0); // ミスタイプ数
  const [currentIndex, setCurrentIndex] = useState<number>(0); // 何文字目か
  // 時間
  const [time, setTime] = useState(0); // 現在の時間
  const [timeLimit] = useState(120); // 制限時間
  // 開始・終了判定
  const isLoading = questions.length <= 1; // スピナーが回っているか
  const [isStarted, setIsStarted] = useState<boolean>(false); // 始まったか
  const [isFinished, setIsFinished] = useState<boolean>(false); // 終わったか

  // 正解音
  const correctSE: HTMLAudioElement = new Audio("/correctSE.mp3");

  // 画面遷移用
  const Navigate = useNavigate();

  // 終了時の処理
  async function saveResults(
    time: number,
    problemSolved: number,
    correctInputCount: number,
    incorrectInputCount: number,
    questionsLength: number,
  ) {
    const score = calculateScore(
      time,
      problemSolved,
      questionsLength,
      correctInputCount,
      incorrectInputCount,
    );
    const kps = calculateKps(time, correctInputCount);
    const scoreRank = calculateScoreRank(
      problemSolved,
      questionsLength,
      correctInputCount,
      incorrectInputCount,
      kps,
    );

    // submit処理
    const json = JSON.stringify({
      questionSetId: questionSetId,
      username: localStorage.getItem("username") || "Guest",
      score: score,
    });
    await fetch(`${import.meta.env.VITE_API_ENDPOINT}/submitScore`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: json,
    });

    // ローカルストレージに保存
    localStorage.setItem("time", time.toString());
    localStorage.setItem("score", score.toString());
    localStorage.setItem("kpm", kps.toString());
    localStorage.setItem("correctInputCount", correctInputCount.toString());
    localStorage.setItem("incorrectInputCount", incorrectInputCount.toString());
    localStorage.setItem("scoreRank", scoreRank);

    // 画面遷移
    Navigate("/result");
  }

  useEffect(() => {
    setQuestions(
      shuffle(
        typingGameQuestionSets
          .find(
            (typingGameQuestionSet) =>
              typingGameQuestionSet.id === questionSetId,
          )
          ?.questions.map(
            (typingGameQuestion) => typingGameQuestion.question,
          ) || [],
      ),
    );
  }, [questionSetId]);

  // キーを押したら開始
  useEffect(() => {
    // 開始キーを押したら開始
    window.addEventListener("keydown", () => {
      if (!isStarted) setIsStarted(true);
    });

    return () => {
      window.removeEventListener("keydown", () => {
        if (!isStarted) setIsStarted(true);
      });
    };
  }, []);

  // isStarted が変更されたらタイマーを開始
  useEffect(() => {
    if (!isStarted) return;
    const timerId = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [isStarted, setTime]);

  // タイマーが変更されるたびに終了判定
  useEffect(() => {
    if (timeLimit - time <= 0 && !isFinished) {
      setIsFinished(true);
      saveResults(
        time,
        problemSolved,
        correctInputCount,
        incorrectInputCount,
        questions.length,
      );
    }
  }, [
    timeLimit,
    time,
    problemSolved,
    correctInputCount,
    incorrectInputCount,
    questions,
  ]);

  // キー入力のメイン処理
  useEffect(() => {
    async function main() {
      if (content === previousContent) return;
      setPreviousContent(content);
      const keyInput = content[content.length - 1]; // 追加された文字すなわち一番最後の文字を取り出す。

      if (keyInput === questions[problemSolved][currentIndex]) {
        // 正答
        setCurrentIndex((prev) => prev + 1);
        setCorrectInputCount((prev) => prev + 1);
      } else if (keyInput.match(/[a-zA-Z]/)) {
        // アルファベットであればミスとする
        // 誤答
        setIncorrectInputCount((prev) => prev + 1);
      }

      if (currentIndex === questions[problemSolved].length - 1) {
        // 正解音が鳴る。最後の問題だけちょっと切れている
        correctSE.pause();
        correctSE.play();

        if (problemSolved === questions.length - 1 && isFinished === false) {
          // 終了処理
          setIsFinished(true); // 二重submitを防ぐflag
          saveResults(
            time,
            problemSolved,
            correctInputCount,
            incorrectInputCount,
            questions.length,
          );
        } else {
          // 次の問題へ
          setProblemSolved((prev) => prev + 1);
          setCurrentIndex(0);
        }
      }
    }
    main();
  }, [
    content,
    questions,
    problemSolved,
    correctInputCount,
    incorrectInputCount,
    currentIndex,
    isFinished,
  ]);

  return (
    <>
      <BackButton />

      <Stack direction="horizontal" className={styles.statisticsSection}>
        <TypingStatistics
          time={time}
          timeLeft={timeLimit - time}
          correctInputCount={correctInputCount}
          incorrectInputCount={incorrectInputCount}
        />
        <TypingProgressBar
          questions={questions}
          problemSolved={problemSolved}
        />
      </Stack>
      <QuestionDisplay
        isLoading={isLoading}
        isStarted={isStarted}
        questions={questions}
        problemSolved={problemSolved}
        currentIndex={currentIndex}
      />
      <Keyboard content={content} setContent={setContent} />
    </>
  );
}
