import {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";

import challenges from "../../challenges.json";

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  lowestExperience: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

const ChallengesContext = createContext({} as ChallengesContextData);

const ChallengesProvider: React.FC = ({ children }) => {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [lowestExperience, setLowestExperience] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = useMemo(() => {
    // Calculo utilizado em RPGs para calcular experiência
    return Math.pow((level + 1) * 4, 2);
  }, [level]);

  const levelUp = useCallback(() => {
    setLevel(level + 1);
  }, [level]);

  const startNewChallenge = useCallback(() => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  }, []);

  const resetChallenge = useCallback(() => {
    setActiveChallenge(null);
  }, []);

  const completeChallenge = useCallback(() => {
    setCurrentExperience((prev) => prev + activeChallenge.amount);
    setChallengesCompleted((prev) => prev + 1);
    resetChallenge();
  }, [activeChallenge, resetChallenge]);

  useEffect(() => {
    if (currentExperience >= experienceToNextLevel) {
      levelUp();
      setLowestExperience(experienceToNextLevel);
    }
  }, [currentExperience, experienceToNextLevel, levelUp]);

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        lowestExperience,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
};

const useChallenge = () => useContext(ChallengesContext);

export { ChallengesProvider, useChallenge };
