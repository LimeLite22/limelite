import {
  ClosedBurgerIcon,
  OpenedBurgerIcon,
  SearchIcon,
  User1Foto,
} from "assets/images";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./WelcomeHeader.module.scss";

type IProps = {
  isOpened?: boolean;
  isBurgerOpened?: boolean;
  setIsBurgerOpened: (value: boolean) => void;
};
const WelomeHeader = ({
  isOpened,
  isBurgerOpened,
  setIsBurgerOpened,
}: IProps) => {
  return (
    <div className={styles.headerContainer}>
      <Swiper
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={2000}
        modules={[Autoplay]}
        className={styles.notification}
      >
        <SwiperSlide>
          <div className={styles.notification_text}>Summer is here!☀️</div>
        </SwiperSlide>
        <SwiperSlide className={styles.notification_text}>
          <div className={styles.notification_text}>
            {" "}
            Submit your requests early to avoid scheduling conflicts.
          </div>
        </SwiperSlide>
      </Swiper>
      <div
        style={{ paddingLeft: !isOpened ? "35px" : "" }}
        className={`${styles.header} ${styles.header_isUser}`}
      >
        {" "}
        <div className={styles.header_user}>
          {!isOpened && <div className={styles.header_user_logo}></div>}
          {isOpened && (
            <div className={styles.header_user_logoOpenedSideBar}></div>
          )}
          <div className={styles.header_user_searchContainer}>
            <input
              className={styles.header_user_search}
              placeholder="Search"
            ></input>
            <img
              className={styles.header_user_search_icon}
              src={SearchIcon}
              alt={"SearchIcon"}
            />
          </div>
        </div>
        <div className={styles.header_profile}>
          <div className={styles.header_profile_content}>
            <div className={styles.header_profile_content_name}>
              Welcome, Clay!
            </div>
            <div className={styles.header_profile_content_text}>
              Subscriber Since July, 2020
            </div>
          </div>
          <img
            className={styles.header_profile_image}
            src={User1Foto}
            alt={"UserIcon"}
          />
          <div
            className={styles.header_burgerButton}
            onClick={() => setIsBurgerOpened(!isBurgerOpened)}
          >
            <img
              src={!isBurgerOpened ? OpenedBurgerIcon : ClosedBurgerIcon}
              alt={"UserIcon"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelomeHeader;
