import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

// CSS関連
import { Stack } from "react-bootstrap";

// 関数
import shuffle from "../../utils/shuffle";
// コンポーネント
import Keyboard from "../../components/Keyboard";
import BackButton from "../../components/BackButton";
import TypingStatistics from "./components/typing-statistics";
import TypingProgressBar from "./components/typing-progress-bar";
import QuestionDisplay from "./components/question-display";
import typingGameQuestionSets from "@typing/question-sets";
import useCreateTypingSessionMutation from "../../api/hooks/typingSessionHooks";
import keyCodes from "../../components/Keyboard/data/keyCodes.json";

type TypingAttempt = {
  inputCharacters: string;
  targetCharacters: string;
};

export default function PlayScreen(): JSX.Element {
  const [startTime, setStartTime] = useState<Date>();
  // キー入力
  const [content, setContent] = useState<string>("");
  const [previousContent, setPreviousContent] = useState(content);
  // 問題
  const typingQuestionSetId: string =
    localStorage.getItem("questionSetId") || typingGameQuestionSets[0].id;
  const [problemNumber, setProblemNumber] = useState<number>(0); // 何問目か
  const [questions, setQuestions] = useState<string[]>(["sample"]);
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
  const { createTypingSession, createTypingSessionError } =
    useCreateTypingSessionMutation();
  if (createTypingSessionError) {
    console.error(createTypingSessionError);
  }
  const [inputTyping, setInputTyping] = useState<string>("");
  const [typingAttempts, setTypingAttempts] = useState<TypingAttempt[]>([]);
  const [keyColors, setKeyColors] = useState<string[]>(
    new Array(keyCodes.length).fill("rgba(0,0,0,0)"),
  );
  // 正解音
  const correctSE: HTMLAudioElement = useMemo(
    () => new Audio("/correctSE.mp3"),
    [],
  );

  // 画面遷移用
  const Navigate = useNavigate();

  // キーを押したら開始
  useEffect(() => {
    function start(e: KeyboardEvent) {
      if (startTime === undefined && e.code === "Space") {
        setStartTime(new Date());
        setIsStarted(true);
      }
    }

    // 開始キーを押したら開始
    window.addEventListener("keydown", start);

    return () => {
      window.removeEventListener("keydown", start);
    };
  }, [startTime]);

  // タイマーを開始
  useEffect(() => {
    if (startTime === undefined) return;
    const timerId = setInterval(() => {
      setTime((previoutValue) => previoutValue + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [startTime, setTime]);

  const save = useCallback(async () => {
    setIsFinished(true);
    const typingSession = await createTypingSession({
      variables: {
        startTime: startTime as Date,
        endTime: new Date(),
        playerName: localStorage.getItem("playerName") || "名無し",
        typingQuestionSetId: typingQuestionSetId,
        typingAttempts: [
          ...typingAttempts,
          {
            targetCharacters: questions[problemNumber],
            inputCharacters: inputTyping + content[content.length - 1],
          },
        ],
      },
    });
    Navigate(`/result/${typingSession?.id}`);
  }, [
    typingAttempts,
    inputTyping,
    content,
    questions,
    problemNumber,
    createTypingSession,
    startTime,
    typingQuestionSetId,
    Navigate,
  ]);

  // タイマーが変更されるたびに終了判定
  useEffect(() => {
    if (timeLimit - time <= 0 && !isFinished) {
      save();
    }
  }, [timeLimit, time, isFinished, save]);

  useEffect(() => {
    setQuestions(
      shuffle(
        typingGameQuestionSets
          .find(
            (typingGameQuestionSet) =>
              typingGameQuestionSet.id === typingQuestionSetId,
          )
          ?.questions.map(
            (typingGameQuestion) => typingGameQuestion.question,
          ) || [],
      ),
    );
  }, [typingQuestionSetId]);

  // キー入力のメイン処理
  useEffect(() => {
    async function main() {
      if (content === previousContent) return;
      setPreviousContent(content);
      const keyInput = content[content.length - 1]; // 追加された文字すなわち一番最後の文字を取り出す。
      setInputTyping((previoutValue) => previoutValue + keyInput);

      if (keyInput === questions[problemNumber][currentIndex]) {
        // 正答
        setCurrentIndex((prev) => prev + 1);
        setCorrectInputCount((prev) => prev + 1);
        if (currentIndex === questions[problemNumber].length - 1) {
          // 正解音が鳴る。最後の問題だけちょっと切れている
          correctSE.pause();
          correctSE.play();

          if (problemNumber === questions.length - 1 && isFinished === false) {
            save();
          } else {
            // 次の問題へ
            setProblemNumber((prev) => prev + 1);
            setCurrentIndex(0);
            setTypingAttempts((previoutValue) => [
              ...previoutValue,
              {
                inputCharacters: inputTyping + keyInput,
                targetCharacters: questions[problemNumber],
              },
            ]);
            setInputTyping("");
          }
        }
      } else if (keyInput.match(/[a-zA-Z]/)) {
        // アルファベットであればミスとする
        // 誤答
        if (isStarted) {
          setIncorrectInputCount((prev) => prev + 1);
        }
      }
    }
    main();
  }, [
    content,
    questions,
    problemNumber,
    currentIndex,
    isStarted,
    isFinished,
    previousContent,
    correctSE,
    save,
    inputTyping,
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
          problemSolved={problemNumber}
        />
      </Stack>
      <QuestionDisplay
        isLoading={isLoading}
        isStarted={startTime !== undefined}
        questions={questions}
        problemSolved={problemNumber}
        currentIndex={currentIndex}
      />
      <Keyboard
        content={content}
        setContent={setContent}
        keyColors={keyColors}
        setKeyColors={setKeyColors}
      />
    </>
  );
}
