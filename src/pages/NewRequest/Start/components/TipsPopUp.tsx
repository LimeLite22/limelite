import { useState } from "react";
import ReactDOM from "react-dom";
import { Sheet } from "react-modal-sheet";

import {
  ArrowBlue,
  ChatSupport,
  Close,
  DirectionArrow,
  Note,
  Valid,
} from "assets/images";

import useWindowWidth from "hooks/useWindowWidth";

import styles from "../NewRequestStart.module.scss";

const TipsPopUp = () => {
  const [isOpened, setIsOpened] = useState(false);
  const width = useWindowWidth();
  return (
    <>
      <div
        className={styles.nR_tips_header}
        onClick={() => {
          setIsOpened(!isOpened);
        }}
      >
        Check your credit usage & availability
        <img src={ArrowBlue} />
      </div>
      {width > 768 &&
        isOpened &&
        ReactDOM.createPortal(
          <div className={styles.nR_tips_popUpContainer}>
            <div
              className={styles.nR_tips_popUpContainer_content}
              tabIndex={0}
              onBlur={() => setIsOpened(false)}
            >
              <div
                onClick={() => setIsOpened(false)}
                className={styles.nR_tips_closeButton}
              >
                <img className={styles.nR_tips_close} src={Close} alt="Close" />
              </div>
              <div className={styles.nR_tips_popUpContainer_content_header}>
                Credit Usage & Availability ⚡️
              </div>
              <div className={styles.nR_tips_plan}>
                <div className={styles.nR_tips_plan_header}>
                  Your plan progress{" "}
                  <div className={styles.nR_tips_plan_header_progress}>
                    20
                    <div className={styles.nR_tips_plan_header_divider}>/</div>
                    <div className={styles.nR_tips_plan_header_number}>48</div>
                  </div>
                </div>
                <div className={styles.nR_tips_plan_text}>
                  <img src={Valid} alt="Valid" />
                  You have up to <span>6 Credit(s)</span> available thru the end
                  of the month ⓘ
                </div>
                <div className={styles.nR_tips_plan_text}>
                  <img src={Valid} alt="Valid" />
                  You have <span>28 Credit(s)</span> remaining thru{" "}
                  <span>October 31, 2025 </span>ⓘ
                </div>
                <div className={styles.nR_tips_subText}>
                  <img src={Note} alt="locationIcon" /> Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt.
                </div>
              </div>
              <div className={styles.nR_tips_assist}>
                <div className={styles.nR_tips_assist_img}>
                  <img src={ChatSupport} alt="" />
                </div>
                <div className={styles.nR_tips_assist_info}>
                  <div className={styles.nR_tips_assist_info_header}>
                    Need assistance scheduling a project?
                  </div>
                  <div className={styles.nR_tips_assist_info_text}>
                    Chat with a support specialist
                    <img src={DirectionArrow} alt={"DirectionArrow"} />
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
      {width < 768 && isOpened && (
        <Sheet
          isOpen={isOpened}
          onClose={() => setIsOpened(false)}
          dragVelocityThreshold={500}
          initialSnap={1}
          detent="full-height"
          style={{
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
            background: "#11100E99",
          }}
          className={styles.nR_tips_sheet}
        >
          <div
            className={styles.nR_tips_closeArea}
            onClick={() => setIsOpened(false)}
          ></div>
          <Sheet.Container className={styles.nR_tips_sheetContainer}>
            <div className={styles.nR_tips_line}></div>
            <Sheet.Content className={styles.learnMore_sheetContent}>
              <div className={styles.nR_tips_popUpContainer_content_header}>
                Credit Usage & Availability ⚡️
              </div>
              <div className={styles.nR_tips_plan}>
                <div className={styles.nR_tips_plan_header}>
                  Your plan progress{" "}
                  <div className={styles.nR_tips_plan_header_progress}>
                    20
                    <div className={styles.nR_tips_plan_header_divider}>/</div>
                    <div className={styles.nR_tips_plan_header_number}>48</div>
                  </div>
                </div>
                <div className={styles.nR_tips_plan_text}>
                  <img src={Valid} alt="Valid" />
                  You have up to <span>6 Credit(s)</span> available thru the end
                  of the month ⓘ
                </div>
                <div className={styles.nR_tips_plan_text}>
                  <img src={Valid} alt="Valid" />
                  You have <span>28 Credit(s)</span> remaining thru{" "}
                  <span>October 31, 2025 </span>ⓘ
                </div>
                <div className={styles.nR_tips_subText}>
                  <img src={Note} alt="locationIcon" /> Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt.
                </div>
              </div>
              <div className={styles.nR_tips_assist}>
                <div className={styles.nR_tips_assist_img}>
                  <img src={ChatSupport} alt="" />
                </div>
                <div className={styles.nR_tips_assist_info}>
                  <div className={styles.nR_tips_assist_info_header}>
                    Need assistance scheduling a project?
                  </div>
                  <div className={styles.nR_tips_assist_info_text}>
                    Chat with a support specialist
                    <img src={DirectionArrow} alt={"DirectionArrow"} />
                  </div>
                </div>
              </div>
            </Sheet.Content>
          </Sheet.Container>
        </Sheet>
      )}
    </>
  );
};

export default TipsPopUp;
