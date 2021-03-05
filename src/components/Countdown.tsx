import { useCountdown } from "hooks/CountdownContext";
import { useMemo } from "react";
import Head from "next/head";

import styles from "styles/components/Countdown.module.css";

const Countdown: React.FC = () => {
  const {
    time,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown,
  } = useCountdown();

  const [minuteLeft, minuteRight] = useMemo(() => {
    const minutes = Math.floor(time / 60);

    return String(minutes).padStart(2, "0").split("");
  }, [time]);

  const [secondLeft, secondRight] = useMemo(() => {
    const seconds = time % 60;

    return String(seconds).padStart(2, "0").split("");
  }, [time]);

  const timer = useMemo(() => {
    return `${minuteLeft}${minuteRight}:${secondLeft}${secondRight}`;
  }, [minuteLeft, minuteRight, secondLeft, secondRight]);

  return (
    <>
      <Head>
        <title>{timer && isActive ? `${timer} | move.it` : "move.it"}</title>
      </Head>

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
