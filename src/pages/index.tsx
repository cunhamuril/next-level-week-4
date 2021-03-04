import Head from "next/head";

import { CountdownProvider } from "hooks/CountdownContext";

import ChallengeBox from "components/ChallengeBox";
import Countdown from "components/Countdown";
import CompletedChallenges from "components/CompletedChallenges";
import ExperienceBar from "components/ExperienceBar";
import Profile from "components/Profile";

import styles from "styles/pages/Home.module.css";

function MyApp() {
  return (
    <>
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
    </>
  );
}

export default MyApp;
