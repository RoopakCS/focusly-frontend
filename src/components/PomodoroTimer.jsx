import { useState, useEffect, useRef } from "react";
import api from "../api/api";

const PomodoroTimer = () => {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const totalSeconds = useRef(0);

  const switchAudio = useRef(new Audio("/switch.mp3"));
  const endAudio = useRef(new Audio("/end.mp3"));

  useEffect(() => {
    let timer = null;

    if (isRunning) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 0) {
            switchAudio.current.play();

            if (!isBreak) {
              const duration = workMinutes;
              const type = "Pomodoro";
              const username = localStorage.getItem("username") ?? "Guest"
              api.post("/api/stats", {
                username,
                duration,
                type,
              }).catch((err) => {
                console.error("Failed to log session:", err);
              });
            }

            const nextDuration = isBreak ? workMinutes * 60 : breakMinutes * 60;
            totalSeconds.current = nextDuration;
            setIsBreak((prev) => !prev);

            return nextDuration;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, isBreak, workMinutes, breakMinutes]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleStart = () => {
    const initialSeconds = workMinutes * 60;
    setSecondsLeft(initialSeconds);
    totalSeconds.current = initialSeconds;
    setIsStarted(true);
    setIsRunning(true);
    setIsBreak(false);
    endAudio.current.play().catch(() => { });
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    endAudio.current.play().catch(() => { });
    setIsRunning(false);
    setIsBreak(false);
    setIsStarted(false);
    setSecondsLeft(0);
    totalSeconds.current = 0;
  };

  const getProgressPercent = () => {
    if (totalSeconds.current === 0) return 0;
    return ((totalSeconds.current - secondsLeft) / totalSeconds.current) * 100;
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white dark:bg-zinc-900 shadow-xl rounded-2xl text-center transition-transform duration-200 hover:scale-105 hover:shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-white">
        🍅 Pomodoro Timer
      </h2>

      {!isStarted ? (
        <div className="space-y-4 mb-4">
          <div className="flex justify-between items-center">
            <label className="text-zinc-700 dark:text-zinc-300">
              Work (min):
            </label>
            <input
              type="number"
              min="1"
              value={workMinutes}
              onChange={(e) => setWorkMinutes(Number(e.target.value))}
              className="w-20 px-2 py-1 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="text-zinc-700 dark:text-zinc-300">
              Break (min):
            </label>
            <input
              type="number"
              min="1"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(Number(e.target.value))}
              className="w-20 px-2 py-1 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
            />
          </div>
          <button
            onClick={handleStart}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            Start Timer
          </button>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
            {isBreak ? "Break Time 🧘" : "Work Time 💻"}
          </h3>

          <div className="text-5xl font-bold my-4 text-zinc-900 dark:text-white">
            {formatTime(secondsLeft)}
          </div>

          <div className="w-full h-3 bg-zinc-300 dark:bg-zinc-700 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-green-500 transition-all duration-1000"
              style={{ width: `${getProgressPercent()}%` }}
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleStartPause}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium"
            >
              {isRunning ? "Pause" : "Resume"}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium"
            >
              Reset
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PomodoroTimer;
