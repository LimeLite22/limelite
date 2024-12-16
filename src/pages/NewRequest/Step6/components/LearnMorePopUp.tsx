import { useState } from "react";
import ReactDOM from "react-dom";
import { Sheet } from "react-modal-sheet";

import { LearnMore } from "assets/images";
import Close from "assets/images/LearnMore/Close.svg";
import TestImage from "assets/images/LearnMore/TestImage.png";

import useWindowWidth from "hooks/useWindowWidth";

import styles from "../../NewRequest.module.scss";

const LearnMorePopUp = ({ smallMargin }: { smallMargin?: boolean }) => {
  const [isOpen, setOpen] = useState(false);
  const span1 = window.innerHeight * 1;
  const span2 = window.innerHeight * 0.63;
  const width = useWindowWidth();
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={styles.box_question_header_subText}
        style={{ marginBottom: smallMargin ? "4px" : "" }}
      >
        Learn more <img src={LearnMore} alt="LearnMore" />
      </div>
      {width < 768 && isOpen && (
        <Sheet
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          snapPoints={[span1, span2]}
          dragVelocityThreshold={500}
          initialSnap={1}
          detent="full-height"
          style={{
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
            background: "#11100E99",
          }}
          className={styles.learnMore_sheetMain}
        >
          <div
            className={styles.learnMore_closeArea}
            onClick={() => setOpen(false)}
          ></div>
          <Sheet.Container className={styles.learnMore_sheet}>
            <Sheet.Content className={styles.learnMore_sheetContainer}>
              <div className={styles.learnMore_container_line}></div>
              <div className={styles.learnMore_sheetContainer_top}>
                <div className={styles.learnMore_container_header}>
                  The locations for a shoot
                </div>
                <img
                  className={styles.learnMore_container_testImage}
                  src={TestImage}
                  alt="TestImage"
                />
                <div className={styles.learnMore_container_text}>
                  Tempus venenatis nibh a congue. Felis feugiat aliquam mi
                  consequat arcu blandit volutpat faucibus vel. Enim volutpat
                  donec aenean est integer varius malesuada. Ut justo sed in et
                  quam. Turpis sapien ut hac maecenas pulvinar sed consectetur.
                  Ullamcorper neque tristique tellus vulputate in faucibus
                  facilisis ultricies urna.
                </div>
              </div>
              <div
                className={styles.learnMore_sheetContainer_bottom}
                id="bottom"
              >
                <div className={styles.learnMore_container_subHeader}>
                  Urna elementum pellentesque est gravida in.
                  <span>+$595</span>
                </div>
                <div className={styles.learnMore_container_subText}>
                  Dui rutrum aliquet lobortis fringilla turpis elementum pretium
                  integer. Elementum venenatis nisi odio tempor. Nunc mi lacus
                  sapien odio elit vel donec a. Massa id.{" "}
                </div>
                <div className={styles.learnMore_container_subHeader}>
                  Urna elementum pellentesque est gravida in.
                  <span>+$595</span>
                </div>
                <div className={styles.learnMore_container_subText}>
                  Dui rutrum aliquet lobortis fringilla turpis elementum pretium
                  integer. Elementum venenatis nisi odio tempor. Nunc mi lacus
                  sapien odio elit vel donec a. Massa id.{" "}
                </div>
                <div className={styles.learnMore_container_subHeader}>
                  Urna elementum pellentesque est gravida in.
                  <span>+$595</span>
                </div>
                <div className={styles.learnMore_container_subText}>
                  Dui rutrum aliquet lobortis fringilla turpis elementum pretium
                  integer. Elementum venenatis nisi odio tempor. Nunc mi lacus
                  sapien odio elit vel donec a. Massa id.{" "}
                </div>
              </div>
            </Sheet.Content>
          </Sheet.Container>
        </Sheet>
      )}
      {width > 768 &&
        isOpen &&
        ReactDOM.createPortal(
          <div className={styles.learnMore}>
            <div className={styles.learnMore_container}>
              <div className={styles.learnMore_container_header}>
                The locations for a shoot
              </div>
              <img
                className={styles.learnMore_container_testImage}
                src={TestImage}
                alt="TestImage"
              />
              <div
                onClick={() => setOpen(false)}
                className={styles.learnMore_container_closeButton}
              >
                <img
                  className={styles.learnMore_container_close}
                  src={Close}
                  alt="Close"
                />
              </div>

              <div className={styles.learnMore_container_text}>
                Tempus venenatis nibh a congue. Felis feugiat aliquam mi
                consequat arcu blandit volutpat faucibus vel. Enim volutpat
                donec aenean est integer varius malesuada. Ut justo sed in et
                quam. Turpis sapien ut hac maecenas pulvinar sed consectetur.
                Ullamcorper neque tristique tellus vulputate in faucibus
                facilisis ultricies urna.
              </div>
              <div className={styles.learnMore_container_subHeader}>
                Urna elementum pellentesque est gravida in.<span>+$595</span>
              </div>
              <div className={styles.learnMore_container_subText}>
                Dui rutrum aliquet lobortis fringilla turpis elementum pretium
                integer. Elementum venenatis nisi odio tempor. Nunc mi lacus
                sapien odio elit vel donec a. Massa id.{" "}
              </div>
              <div className={styles.learnMore_container_subHeader}>
                Urna elementum pellentesque est gravida in.<span>+$595</span>
              </div>
              <div className={styles.learnMore_container_subText}>
                Dui rutrum aliquet lobortis fringilla turpis elementum pretium
                integer. Elementum venenatis nisi odio tempor.
              </div>
              <div className={styles.learnMore_container_subHeader}>
                Urna elementum pellentesque est gravida in.<span>+$595</span>
              </div>
              <div
                className={styles.learnMore_container_subText}
                style={{ borderBottom: "none" }}
              >
                Dui rutrum aliquet lobortis fringilla turpis elementum pretium
                integer. Elementum venenatis nisi odio tempor. Massa id.
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
export default LearnMorePopUp;
