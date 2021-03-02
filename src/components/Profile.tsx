import styles from "styles/components/Profile.module.css";

const Profile: React.FC = () => {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/cunhamuril.png" alt="Murilo Cunha" />
      <div>
        <strong>Murilo Cunha</strong>
        <p>
          <img src="/icons/level.svg" alt="" />
          Level 1
        </p>
      </div>
    </div>
  );
};

export default Profile;
