import { useState, useEffect } from "react";
import styles from "@/styles/Timer.module.css";



export default function Timer({data}:any) {





  const [time, setTime] = useState<number>(25 * 60);
  const [focusTime, setFocusTime] = useState<number>(25);
  const [breakTime, setBreakTime] = useState<number>(5);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isBreak, setIsBreak] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<any>(null);
  const [sessions, setSessions] = useState<number>(0)
  useEffect(() => {
    if (!isRunning || isPaused) {
      return;
    }
    if (time === 0) {
      if (!isBreak) {
        setSessions(sessions + 1)
        setTime(breakTime * 60);
        setIsBreak(true);
      } else {
        setTime(focusTime * 60);
        setIsBreak(false);
      }
      return;
    }
    const id = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    setIntervalId(id);
    return () => {
      clearInterval(id);
    };
  }, [isRunning, isPaused, time, breakTime, focusTime, isBreak, sessions]);

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTime(focusTime * 60);
    clearInterval(intervalId);
  };

  const resetTimer = () => {

    setTime(focusTime * 60)
    setIsBreak(false);
  };

  const addFocusTime = (minutes: number) => {
    setFocusTime((prevFocusTime) => prevFocusTime + minutes);
    setTime((prevTime) => prevTime + minutes * 60);
  };

  const addBreakTime = (minutes: number) => {
    setBreakTime((prevBreakTime) => prevBreakTime + minutes);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };





  return (
    <div className={styles.pomodoro_timer}>
      <div className={styles.timer_display}>
        <div className={styles.timer_circle}>
          <h1>{formatTime(time)}</h1>
        </div>
      </div>
      <div className={styles.timer_controls}>
        <div className={styles.main_controls}>
          <button onClick={(isRunning && !isPaused) ? pauseTimer : startTimer}> {(isRunning && !isPaused) ? "Pause" : "Start"} </button>
          <button onClick={stopTimer}>Stop</button>
          <button onClick={resetTimer}>Reset</button>
        </div>
        <br />
        <div className={styles.setFocus}>
          <button onClick={() => { if (focusTime) addFocusTime(-1) }}>-1</button>
          <span>{Math.round(time / 60)}</span>
          <button onClick={() => addFocusTime(1)}>+1</button>
        </div>
        <br />
        <div className={styles.setBreak}>
          <button onClick={() => { if (breakTime) addBreakTime(-1) }}>-1</button>
          <span>{breakTime}</span>
          <button onClick={() => addBreakTime(1)}>+1</button>
        </div>
        <div className="bg-yellow-200 p-3 rounded-lg">
          Sessions Elapsed: {sessions}
        </div>
      </div>
    </div>
  );
};


