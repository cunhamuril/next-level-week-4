import { useState, useMemo, useCallback, useEffect } from "react";

import { useChallenge } from "hooks/ChallengesContext";

import styles from "styles/components/Countdown.module.css";

let countdownTimeout: NodeJS.Timeout;

const Countdown: React.FC = () => {
  const { startNewChallenge } = useChallenge();

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const [minuteLeft, minuteRight] = useMemo(() => {
    const minutes = Math.floor(time / 60);

    return String(minutes).padStart(2, "0").split("");
  }, [time]);

  const [secondLeft, secondRight] = useMemo(() => {
    const seconds = time % 60;

    return String(seconds).padStart(2, "0").split("");
  }, [time]);

  const startCountdown = useCallback(() => {
    setIsActive(true);
  }, []);

  const resetCountdown = useCallback(() => {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
  }, []);

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </>
  );
};

export default Countdown;
