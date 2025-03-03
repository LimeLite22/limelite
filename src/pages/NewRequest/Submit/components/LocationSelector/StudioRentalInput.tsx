import {
  Note,
} from "assets/images";
import { STUDIO_RENTAL } from "consts/consts";
import useWindowWidth from "hooks/useWindowWidth";
import DefaultSlider from "pages/NewRequest/components/DefaultSlider";
import { useDispatch } from "react-redux";

import {
  updateDraftField,
} from "../../../../../redux/requests/reducer";
import styles from "../../../NewRequest.module.scss";

const StudioRental = () => {
  const dispatch = useDispatch();
  const windowWidth = useWindowWidth();
  return (
    <div
      className={`
    ${styles.box}
    ${styles.box_submit}
    ${styles.box_xl}
    ${styles.box_expanded}
`
      }
      onClick={() => {
        dispatch(
          updateDraftField({
            path: "logisticSettings.location.type",
            value: STUDIO_RENTAL,
          }),
        );
      }}
      style={{ backgroundColor: "transparent" }}
      tabIndex={0}
      onBlur={() => {
        if (windowWidth < 768) {
        }
      }}
    >
      <div className={`${styles.box_container} ${styles.box_containerSubmit} `}>
        {" "}
        <div className={styles.box_content}>
          <DefaultSlider />
          <div className={styles.box_content_info}>
            <div
              className={styles.box_content_info_header}
            >
              Premium Add-on:
              <span className={styles.box_content_info_header_addOn}>
                +$795
              </span>
            </div>
            <div>
              If you want a controlled environment for an HD shoot, a studio
              rental is a great option. Studios offer a professional setting
              while controlling for foot traffic lighting, and sound. Price
              includes booking and all studio usage fees.
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

export default StudioRental;
