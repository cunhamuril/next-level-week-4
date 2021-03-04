import styles from "styles/components/Profile.module.css";

import { useChallenge } from "hooks/ChallengesContext";

const Profile: React.FC = () => {
  const { level } = useChallenge();

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/cunhamuril.png" alt="Murilo Cunha" />
      <div>
        <strong>Murilo Cunha</strong>
        <p>
          <img src="/icons/level.svg" alt="" />
          Level {level}
        </p>
      </div>
    </div>
  );
};

export default Profile;
