import { AnnouncementVideosIcon, Close } from "assets/images";
import useWindowWidth from "hooks/useWindowWidth";
import { useState } from "react";
import { useRef } from "react";
import ReactDOM from "react-dom";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { A11y, Keyboard, Mousewheel, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "../../Welcome.module.scss";
import { embedCode1, embedCode2, embedCode3 } from "./data";

const InspirationItem = (): JSX.Element => {
  const [isOpened, setIsOpened] = useState(false);
  const swiperRef = useRef<SwiperType>();
  const [activeIndex, setActiveIndex] = useState(1);
  const width = useWindowWidth();
  const handleOpen = () => {
    setIsOpened(true);
  };
  if (isOpened && width > 768) {
    return ReactDOM.createPortal(
      <div
        className={styles.inspirationPopUpContainer}
        onClick={() => setIsOpened(false)}
      >
        <div
          className={styles.inspirationPopUpContainer_content}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.inspirationPopUpContainer_content_header}>
            <img src={AnnouncementVideosIcon} alt={"AnnouncementVideosIcon"} />
            <div className={styles.welcomeContainer_closeButton}>
              <img
                onClick={() => setIsOpened(false)}
                className={styles.nR_tips_close}
                src={Close}
                alt="Close"
              />
            </div>
          </div>
          <div className={styles.inspirationPopUpContainer_content_title}>
            Announcement Videos
          </div>
          <div className={styles.inspirationPopUpContainer_content_text}>
            Dui rutrum aliquet lobortis fringilla turpis elementum pretium
            integer. Elementum venenatis nisi odio tempor. Nunc mi lacus sapien
            odio elit vel donec a. Massa id a in orci et lorem erat fermentum.
          </div>
          <div className={styles.inspirationPopUpContainer_content_text}>
            Dui rutrum aliquet lobortis fringilla turpis elementum pretium
            integer. Elementum venenatis nisi odio tempor. Nunc mi lacus sapien
            odio elit vel donec a. Massa id a in orci et lorem erat fermentum.
          </div>
          <Swiper
            modules={[
              Navigation,
              Pagination,
              Scrollbar,
              A11y,
              Keyboard,
              Mousewheel,
              EffectCoverflow,
            ]}
            onBeforeInit={(swiper: SwiperType) => {
              swiperRef.current = swiper;
            }}
            allowTouchMove={true}
            spaceBetween={16}
            draggable={true}
            slidesPerView={1}
            initialSlide={1}
            navigation
            className={styles.inspirationPopUpContainer_content_swiper}
            effect="coverflow"
            coverflowEffect={{
              rotate: 10,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
          >
            <SwiperSlide
              className={styles.inspirationPopUpContainer_content_swiper_item}
            >
              <div
                style={{ width: "100%", height: "100%" }}
                dangerouslySetInnerHTML={{ __html: embedCode1 }}
              />
            </SwiperSlide>
            <SwiperSlide
              className={styles.inspirationPopUpContainer_content_swiper_item}
            >
              <div
                style={{ width: "100%", height: "100%" }}
                dangerouslySetInnerHTML={{ __html: embedCode2 }}
              />
            </SwiperSlide>
            <SwiperSlide
              className={styles.inspirationPopUpContainer_content_swiper_item}
            >
              <div
                style={{ width: "100%", height: "100%" }}
                dangerouslySetInnerHTML={{ __html: embedCode3 }}
              />
            </SwiperSlide>
          </Swiper>
          <div className={styles.inspirationPopUpContainer_content_buttons}>
            <button
              style={{
                background: activeIndex === 0 ? "var(--green-dark2)" : "",
              }}
              className={
                styles.inspirationPopUpContainer_content_buttons_button
              }
              onClick={() => {
                setActiveIndex(0);
                swiperRef.current?.slideTo(0);
              }}
            ></button>
            <button
              style={{
                background: activeIndex === 1 ? "var(--green-dark2)" : "",
              }}
              className={
                styles.inspirationPopUpContainer_content_buttons_button
              }
              onClick={() => {
                setActiveIndex(1);
                swiperRef.current?.slideTo(1);
              }}
            ></button>
            <button
              style={{
                background: activeIndex === 2 ? "var(--green-dark2)" : "",
              }}
              className={
                styles.inspirationPopUpContainer_content_buttons_button
              }
              onClick={() => {
                setActiveIndex(2);
                swiperRef.current?.slideTo(2);
              }}
            ></button>
          </div>
        </div>
      </div>,
      document.body,
    );
  }


  return (
    <div onClick={handleOpen}>
      <div
        className={
          styles.welcomeContainer__content_main_inspiration_cardItem_img
        }
      >
        {" "}
        <img src={AnnouncementVideosIcon} alt={"AnnouncementVideosIcon"} />{" "}
      </div>{" "}
      <div
        className={
          styles.welcomeContainer__content_main_inspiration_cardItem_header
        }
      >
        Announcement Videos
      </div>
      <div
        className={
          styles.welcomeContainer__content_main_inspiration_cardItem_text
        }
      >
        Maecenas egestas est eget cras sed morbi est.
      </div>
      <div
        className={
          styles.welcomeContainer__content_main_inspiration_cardItem_downArrow
        }
      ></div>
    </div>
  );
};

export default InspirationItem;
