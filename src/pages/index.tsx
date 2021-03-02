import Head from "next/head";

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
      </div>
    </>
  );
}

export default MyApp;
