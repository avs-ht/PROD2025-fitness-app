import { useEffect, useRef, useState } from 'react';

export const useTimer = (initialSeconds: number) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isTimeStopped, setTimeStopped] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerFunc = () =>
    setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);
  const startTime = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
    if (seconds > 0) timerRef.current = timerFunc();
    setTimeStopped(false);
  };
  useEffect(() => {
    if (seconds <= 0 || isTimeStopped) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = timerFunc();
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, [seconds, isTimeStopped]);

  const increaseTime = (seconds: number) =>
    setSeconds(prevSeconds => prevSeconds + seconds);
  const decreaseTime = (seconds: number) =>
    setSeconds(prevSeconds =>
      prevSeconds - seconds <= 0 ? 0 : prevSeconds - seconds
    );

  const stopTime = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
    setTimeStopped(true);
  };

  return {
    seconds,
    increaseTime,
    decreaseTime,
    stopTime,
    startTime,
    isTimeStopped
  };
};
