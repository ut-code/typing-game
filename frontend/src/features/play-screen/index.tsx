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
import keyCodes from "../../components/Keyboard/data/keyCodes.json";
import {
  functionalLayoutType,
  defaultFunctionalLayoutType,
} from "../../components/Keyboard/data/keyboardSettings";
import { KeyboardLayout } from "../../../../types/keyboardLayout";

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
  const [spellingLists, setSpelligLists] = useState<string[][]>(
    typingTasks.map((typingTask) => typingTask.spellingList),
  ); // 出題される単語のスペル
  const [correctInputCount, setCorrectInputCount] = useState<number>(0); // 正答文字数
  const [incorrectInputCount, setIncorrectInputCount] = useState<number>(0); // ミスタイプ数
  const [currentIndex, setCurrentIndex] = useState<number>(0); // 何文字目か
  // 時間
  const [time, setTime] = useState(0); // 現在の時間
  const [timeLimit] = useState(120); // 制限時間
  // 開始・終了判定
  const isLoading = spellingLists.length <= 1; // スピナーが回っているか
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
  const [functional, setFunctional] = useState<KeyboardLayout>(
    defaultFunctionalLayoutType,
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
        typingAttempts: [
          ...typingAttempts,
          {
            targetCharacters: spellingLists[problemNumber][0],
            inputCharacters: inputTyping + content[content.length - 1],
          },
        ],
      },
    });
    Navigate(`/result/${typingSession?.id}`);
  }, [
    typingTaskCollectionId,
    typingAttempts,
    inputTyping,
    content,
    problemNumber,
    createTypingSession,
    startTime,
    Navigate,
    spellingLists,
  ]);

  // タイマーが変更されるたびに終了判定
  useEffect(() => {
    if (timeLimit - time <= 0 && !isFinished) {
      save();
    }
  }, [timeLimit, time, isFinished, save]);

  useEffect(() => {
    const newTypingTasks = shuffle(
      // 問題順をシャッフル
      typingTaskCollections.find(
        // 選択された問題群を探す
        (typingTaskCollection) =>
          typingTaskCollection.id === typingTaskCollectionId,
      )?.typingTasks ?? typingTaskCollections[0].typingTasks,
    );
    setTypingTasks(newTypingTasks);
    setSpelligLists(
      newTypingTasks.map((typingTask) => typingTask.spellingList),
    );
  }, [typingTaskCollectionId]);

  // キー入力のメイン処理
  useEffect(() => {
    async function main() {
      if (content === previousContent) return;
      setPreviousContent(content);
      const keyInput = content[content.length - 1]; // 追加された文字すなわち一番最後の文字を取り出す。
      setInputTyping((previousValue) => previousValue + keyInput);

      //スペルの候補一つずつに対して判定
      const TempSpellingLists: string[] = [];
      let correctflag = 0;
      let endflag = 0;
      let missflag = 0;
      let continueingflag = 0;
      for (
        let candidateNumber = 0;
        candidateNumber < spellingLists[problemNumber].length;
        candidateNumber++
      ) {
        if (
          keyInput ===
          spellingLists[problemNumber][candidateNumber][currentIndex]
        ) {
          // 正答
          correctflag = 1;

          if (
            currentIndex ===
            spellingLists[problemNumber][candidateNumber].length - 1
          ) {
            // 正答かつ問題終わり
            endflag = 1;
            break; //判定終了
          } else {
            // 正答だが続くとき
            continueingflag = 1;
            TempSpellingLists.push(
              spellingLists[problemNumber][candidateNumber],
            );
          }
        } else if (keyInput.match(/[a-zA-Z]/) && isStarted) {
          // 誤答
          missflag++;
        }
      }
      if (missflag === spellingLists[problemNumber].length) {
        setIncorrectInputCount((prev) => prev + 1);
      }
      if (continueingflag === 1) {
        setSpelligLists((prev) => {
          const newSpellingLists = [...prev];
          newSpellingLists[problemNumber] = TempSpellingLists;

          return newSpellingLists;
        });
      }

      if (correctflag === 1) {
        setCurrentIndex((prev) => prev + 1);
        setCorrectInputCount((prev) => prev + 1);
      }

      if (endflag === 1) {
        // 正解音が鳴る。最後の問題だけちょっと切れている
        correctSE.pause();
        correctSE.play();
        if (
          // 全問題終了
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
              inputCharacters: inputTyping + keyInput,
              targetCharacters: spellingLists[problemNumber][0], // TODO: 0を変数にする
            },
          ]);
          setInputTyping("");
        }
      }

      const displayAlphabet = spellingLists[problemNumber][0][currentIndex];
      if (isStarted && !isFinished && displayAlphabet != "") {
        setKeyColors(
          keyCodes.map((KeyCode) => {
            if (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              functionalLayoutType[functional].content[KeyCode][0] ===
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              displayAlphabet.toLowerCase()
            )
              return "orange";
            if (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              displayAlphabet !==
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                displayAlphabet.toLowerCase() &&
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              functionalLayoutType[functional].content[KeyCode][0] === "Shift"
            )
              return "orange";
            if (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              displayAlphabet === " " &&
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              functionalLayoutType[functional].content[KeyCode][0] === "Space"
            )
              return "orange";
            return "rgba(0,0,0,0)";
          }),
        );
      }
    }

    main();
  }, [
    content,
    words,
    problemNumber,
    currentIndex,
    isStarted,
    isFinished,
    previousContent,
    correctSE,
    save,
    inputTyping,
    spellingLists,
    functional,
    keyCodes,
    functionalLayoutType,
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
      <Keyboard
        content={content}
        setContent={setContent}
        keyColors={keyColors}
        setKeyColors={setKeyColors}
        functional={functional}
        setFunctional={setFunctional}
      />
    </>
  );
}
