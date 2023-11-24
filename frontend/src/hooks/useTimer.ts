import { useState, useEffect, useCallback } from "react";

export default function useTimer(initialTime: number, onTimerEnd?: () => void) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  // Function to start the timer
  const startTimer = useCallback(() => {
    setIsActive(true);
  }, []);

  // Function to stop the timer
  const stopTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  // Function to reset the timer
  const resetTimer = useCallback(() => {
    setTimeLeft(initialTime);
    setIsActive(false);
  }, [initialTime]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      if (onTimerEnd) onTimerEnd();
      setIsActive(false);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isActive, timeLeft, onTimerEnd]);

  return { timeLeft, startTimer, stopTimer, resetTimer };
}
