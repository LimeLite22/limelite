import styles from "../Welcome.module.scss";

const ProjectBoost = () => {
  return (
    <div className={styles.welcomeContainer__content_main_projectBoost}>
      <div
        className={styles.welcomeContainer__content_main_projectBoost_foto}
      ></div>

      <div
        className={styles.welcomeContainer__content_main_projectBoost_content}
      >
        <div
          className={
            styles.welcomeContainer__content_main_projectBoost_content_header
          }
        >
          Project Manager Boost 🚀
        </div>
        <div
          className={
            styles.welcomeContainer__content_main_projectBoost_content_text
          }
        >
          Put your LimeLite subscription on autopilot with a dedicated Project
          Manager boost, and take your subscription to the next level!
        </div>
        <button
          className={
            styles.welcomeContainer__content_main_projectBoost_content_button
          }
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default ProjectBoost;
