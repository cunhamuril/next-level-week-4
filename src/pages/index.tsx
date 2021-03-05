import Head from "next/head";
import { GetServerSideProps } from "next";

import { CountdownProvider } from "hooks/CountdownContext";
import { ChallengesProvider } from "hooks/ChallengesContext";

import ChallengeBox from "components/ChallengeBox";
import Countdown from "components/Countdown";
import CompletedChallenges from "components/CompletedChallenges";
import ExperienceBar from "components/ExperienceBar";
import Profile from "components/Profile";

import styles from "styles/pages/Home.module.css";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

const MyApp: React.FC<HomeProps> = ({
  level,
  currentExperience,
  challengesCompleted,
}) => {
  return (
    <ChallengesProvider
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
    >
      <Head>
        <title>Início | move.it</title>
      </Head>

      <div className={styles.container}>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};

export default MyApp;
