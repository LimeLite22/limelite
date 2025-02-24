import {
  ClosedBurgerIcon,
  OpenedBurgerIcon,
  SearchIcon,
} from "assets/images";
import { useSelector } from "react-redux";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { selectAccount } from "../../../../redux/account/account";
import styles from "./WelcomeHeader.module.scss";

interface IProps {
  isOpened?: boolean;
  isBurgerOpened?: boolean;
  setIsBurgerOpened: (value: boolean) => void;
};
const WelomeHeader = ({
  isOpened,
  isBurgerOpened,
  setIsBurgerOpened,
}: IProps) => {
  const account = useSelector(selectAccount);
  console.log(account);
  return (
    <div className={styles.headerContainer} id="PageHeader">
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
              Welcome,{account.name}!
            </div>
            <div className={styles.header_profile_content_text}>
              Subscriber Since July, 2020
            </div>
          </div>

          <img className={styles.header_profile_image} src={typeof account.foto === 'string' ? account.foto : URL.createObjectURL(account.foto)} alt="avatar" />
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
