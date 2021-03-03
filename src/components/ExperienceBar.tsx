import { useMemo } from "react";

import styles from "styles/components/ExperienceBar.module.css";

import { useChallenge } from "hooks/ChallengesContext";

export default function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useChallenge();

  const percentToNextLevel = useMemo(() => {
    // Regra de 3 simples
    const calc = Math.round((currentExperience * 100) / experienceToNextLevel);

    return `${calc}%`;
  }, [currentExperience, experienceToNextLevel]);

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: percentToNextLevel }} />
        <span
          className={styles.currentExperience}
          style={{ left: percentToNextLevel }}
        >
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}
