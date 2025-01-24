import { Arrow, ChatIcon, EmailIcon, SmallMailIcon } from "assets/images";
import { Link } from "react-router-dom";

import styles from "./Support.module.scss";

const Support = (): JSX.Element => {
  return (
    <>
      <div className={styles.supportContainer__content_main_header}>
        <div className={styles.supportContainer__content_main_header_text}>
          Chat with Support
        </div>
        <div className={styles.supportContainer__content_main_header_subText}>
          <div
            className={styles.supportContainer__content_main_header_subText_dot}
          ></div>{" "}
          Choose preferred method
        </div>
      </div>
      <div className={styles.supportContainer__content_main_content}>
        <img
          src={EmailIcon}
          alt={"EmailIcon"}
          className={styles.supportContainer__content_main_content_icon}
        />

        <div className={styles.supportContainer__content_main_content_text}>
          How can we help you?
        </div>
        <div className={styles.supportContainer__content_main_content_subText}>
          You have used 0 of 4 credit this month
        </div>
        <div className={styles.supportContainer__content_main_content_cards}>
          <Link
            to="/chatSupport"
            className={styles.supportContainer__content_main_content_card}
          >
            <div
              className={
                styles.supportContainer__content_main_content_card_header
              }
            >
              <div
                className={
                  styles.supportContainer__content_main_content_card_header_text
                }
              >
                <img src={ChatIcon} alt={"ChatIcon"} />
                Live Chat
              </div>
              <img src={Arrow} alt={"Arrow"} />
            </div>
            <div
              className={
                styles.supportContainer__content_main_content_card_line
              }
            ></div>
            <div
              className={
                styles.supportContainer__content_main_content_card_text
              }
            >
              Praesent mattis nisl etiam malesuada. Donec placerat nulla ipsum
              amet laoreet amet lorem. Ipsum id.
            </div>
          </Link>
          <div className={styles.supportContainer__content_main_content_card}>
            <div
              className={
                styles.supportContainer__content_main_content_card_header
              }
            >
              <div
                className={
                  styles.supportContainer__content_main_content_card_header_text
                }
              >
                <img src={SmallMailIcon} alt={"SmallMailIcon"} />
                Send Message
              </div>
              <img src={Arrow} alt={"Arrow"} />
            </div>
            <div
              className={
                styles.supportContainer__content_main_content_card_line
              }
            ></div>
            <div
              className={
                styles.supportContainer__content_main_content_card_text
              }
            >
              Praesent mattis nisl etiam malesuada. Donec placerat nulla ipsum
              amet laoreet amet lorem. Ipsum id.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Support;
