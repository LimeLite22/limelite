import {
  Note,
} from "assets/images";
import DefaultSlider from "pages/NewRequest/components/DefaultSlider";
import styles from "../../../NewRequest.module.scss";


const ProffTrack = () => {
  return (
    <div
      className={`
      ${styles.box}
      ${styles.box_submit}
      ${styles.box_xl}
      ${styles.box_expanded}
  `}
    >
      <div className={`${styles.box_container} ${styles.box_containerSubmit} `}>
        <div className={styles.box_content}>
          <DefaultSlider />
          <div className={styles.box_content_info}>
            <div className={styles.box_content_info_header}>
              Standart Add-on:
              <span className={styles.box_content_info_header_addOn}>
                +$895
              </span>
            </div>
            <div className={styles.box_content_info_text}>
              Add some polish to your LimeLite Video! For videos without
              on-camera talent (customers, employees, actors, etc.), a
              professional Voiceover Artist is an excellent option. Price
              includes casting, auditions, recording session, and all usage
              rights (for web/social media usage only).
            </div>
          </div>
        </div>
        <div className={styles.box_subText}>
          <img src={Note} alt="locationIcon" /> Note: You will have an
          opportunity to enter a discount code for any for a Standard Add-ons
          during check-out
        </div>
      </div>
    </div>
  );
};

export default ProffTrack;
