import { useState, useEffect, useRef } from "react";

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
            const sessionType = isBreak ? "Break" : "Work";
            const timeStamp = new Date().toLocaleTimeString();

            switchAudio.current.play();

            const nextDuration = isBreak
              ? workMinutes * 60
              : breakMinutes * 60;

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
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
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
    endAudio.current.play().catch((err) => console.log("End audio error:", err));
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    endAudio.current.play().catch((err) => console.log("End audio error:", err));
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
    <div style={styles.container}>
      <h2>Pomodoro Timer</h2>

      {!isStarted && (
        <div style={styles.inputs}>
          <div>
            <label>Work (min): </label>
            <input
              type="number"
              value={workMinutes}
              onChange={(e) => setWorkMinutes(Number(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label>Break (min): </label>
            <input
              type="number"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(Number(e.target.value))}
              min="1"
            />
          </div>
          <button onClick={handleStart}>Start Timer</button>
        </div>
      )}

      {isStarted && (
        <>
          <h3>{isBreak ? "Break Time" : "Work Time"}</h3>
          <div style={styles.timer}>{formatTime(secondsLeft)}</div>

          {/* Progress Bar */}
          <div style={styles.progressBarOuter}>
            <div
              style={{
                ...styles.progressBarInner,
                width: `${getProgressPercent()}%`,
              }}
            />
          </div>

          <div style={styles.buttons}>
            <button onClick={handleStartPause}>
              {isRunning ? "Pause" : "Resume"}
            </button>
            <button onClick={handleReset}>Reset</button>
          </div>
        </>
      )}

    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    margin: "2rem auto",
    padding: "1.5rem",
    border: "2px solid #ccc",
    borderRadius: "12px",
    width: "320px",
    backgroundColor: "#f9f9f9",
    color: "black",
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "1rem",
  },
  timer: {
    fontSize: "48px",
    margin: "1rem 0",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    gap: "1rem",
  },
  progressBarOuter: {
    height: "10px",
    width: "100%",
    backgroundColor: "#ddd",
    borderRadius: "10px",
    marginBottom: "1rem",
    overflow: "hidden",
  },
  progressBarInner: {
    height: "100%",
    backgroundColor: "#4caf50",
    transition: "width 1s linear",
  },

};

export default PomodoroTimer;
