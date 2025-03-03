
import { Note } from "assets/images";
import DefaultSlider from "pages/NewRequest/components/DefaultSlider";

import styles from "../../../NewRequest.module.scss";

const VirtualInterview = () => {
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
        {" "}
        <div className={styles.box_content}>
          <DefaultSlider />
          <div className={styles.box_content_info}>
            <div className={styles.box_content_info_header}>
              Premium Add-on:
              <span className={styles.box_content_info_header_addOn}>
                +$695
              </span>
            </div>
            <div className={styles.box_content_info_text}>
              If you want a unique, unintrusive location for your LimeLite
              shoot, a one-day Home Rental is the way to go. We'll manage
              everything from scouting, booking, and deposits to contracts,
              insurance and cleanup. Price includes a one-day home rental.
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

export default VirtualInterview;
