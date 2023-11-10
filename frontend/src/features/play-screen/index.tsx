// TODO: spellingLists の二重化に伴う修正
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
import typingTaskCollections from "@typing/question-sets";
import useCreateTypingSessionMutation from "../../api/hooks/typingSessionHooks";

import { TypingTask } from "@typing/core";

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
  const typingTaskCollectionId: string =
    localStorage.getItem("questionSetId") || typingTaskCollections[0].id; // TODO: localStorageのKey名を修正
  const [problemNumber, setProblemNumber] = useState<number>(0); // 何問目か
  const [typingTasks, setTypingTasks] = useState<TypingTask[]>(
    typingTaskCollections[0].typingTasks,
  ); // 単語とそのスペル
  const words = typingTasks.map((typingTask) => typingTask.word); // 出題される単語
  const spellingLists = typingTasks.map(
    (typingTask) => typingTask.spellingList,
  ); // 出題される単語のスペル
  const [correctInputCount, setCorrectInputCount] = useState<number>(0); // 正答文字数
  const [incorrectInputCount, setIncorrectInputCount] = useState<number>(0); // ミスタイプ数
  const [currentIndex, setCurrentIndex] = useState<number>(0); // 何文字目か
  // 時間
  const [time, setTime] = useState(0); // 現在の時間
  const [timeLimit] = useState(120); // 制限時間
  // 開始・終了判定
  const isLoading = spellingLists.length <= 1; // スピナーが回っているか
  const [isFinished, setIsFinished] = useState<boolean>(false); // 終わったか
  const { createTypingSession, createTypingSessionError } =
    useCreateTypingSessionMutation();
  if (createTypingSessionError) {
    console.error(createTypingSessionError);
  }
  const [inputTyping, setInputTyping] = useState<string>("");
  const [typingAttempts, setTypingAttempts] = useState<TypingAttempt[]>([]);

  // 正解音
  const correctSE: HTMLAudioElement = useMemo(
    () => new Audio("/correctSE.mp3"),
    [],
  );

  // 画面遷移用
  const Navigate = useNavigate();

  // キーを押したら開始
  useEffect(() => {
    function start() {
      if (startTime === undefined) {
        setStartTime(new Date());
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
      setTime((previousValue) => previousValue + 1);
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
        typingQuestionSetId: typingTaskCollectionId,
        typingAttempts: typingAttempts,
      },
    });
    Navigate(`/result/${typingSession?.id}`);
  }, [
    Navigate,
    createTypingSession,
    typingTaskCollectionId,
    startTime,
    typingAttempts,
  ]);

  // タイマーが変更されるたびに終了判定
  useEffect(() => {
    if (timeLimit - time <= 0 && !isFinished) {
      save();
    }
  }, [timeLimit, time, isFinished, save]);

  useEffect(() => {
    setTypingTasks(
      shuffle(
        // 問題順をシャッフル
        typingTaskCollections.find(
          // 選択された問題群を探す
          (typingTaskCollection) =>
            typingTaskCollection.id === typingTaskCollectionId,
        )?.typingTasks ?? typingTaskCollections[0].typingTasks,
      ),
    );
  }, [typingTaskCollectionId]);

  // キー入力のメイン処理
  useEffect(() => {
    async function main() {
      if (content === previousContent) return;
      setPreviousContent(content);
      const keyInput = content[content.length - 1]; // 追加された文字すなわち一番最後の文字を取り出す。
      if (keyInput === spellingLists[problemNumber][0][currentIndex]) {
        // TODO: 0を変数にする
        // 正答
        setCurrentIndex((prev) => prev + 1);
        setCorrectInputCount((prev) => prev + 1);
      } else if (keyInput.match(/[a-zA-Z]/)) {
        // アルファベットであればミスとする
        // 誤答
        setInputTyping((previousValue) => previousValue + keyInput);
        setIncorrectInputCount((prev) => prev + 1);
      }

      if (currentIndex === spellingLists[problemNumber][0].length - 1) {
        // TODO: 0を変数にする
        // 正解音が鳴る。最後の問題だけちょっと切れている
        correctSE.pause();
        correctSE.play();

        if (
          problemNumber === spellingLists.length - 1 &&
          isFinished === false
        ) {
          save();
        } else {
          // 次の問題へ
          setProblemNumber((prev) => prev + 1);
          setCurrentIndex(0);
          setTypingAttempts((previousValue) => [
            ...previousValue,
            {
              inputCharacters: inputTyping,
              targetCharacters: spellingLists[problemNumber][0], // TODO: 0を変数にする
            },
          ]);
          setInputTyping("");
        }
      }
    }
    main();
  }, [
    content,
    words,
    problemNumber,
    currentIndex,
    isFinished,
    previousContent,
    correctSE,
    save,
    inputTyping,
    spellingLists,
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
          spellingLists={spellingLists}
          problemSolved={problemNumber}
        />
      </Stack>
      <QuestionDisplay // TODO: 中身を直す
        isLoading={isLoading}
        isStarted={startTime !== undefined}
        words={words}
        problemSolved={problemNumber}
        currentIndex={currentIndex}
        spellingLists={spellingLists}
      />
      <Keyboard content={content} setContent={setContent} />
    </>
  );
}
