import { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router";

import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { A11y, Keyboard, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import {
  SwiperFoto1,
  SwiperFoto1Mob,
  SwiperFoto2,
  SwiperFoto2Mob,
  SwiperFoto3,
  SwiperFoto3Mob,
} from "assets/images";

import useWindowWidth from "hooks/useWindowWidth";

import Header from "../../components/Header/Header";
import styles from "./WalkThrough.module.scss";

const WalkThrough = () => {
  const navigate = useNavigate();
  const [slideNumber, setSlideNumber] = useState(0);
  const width = useWindowWidth();
  const swiperRef = useRef<SwiperType>();
  const ChangeSlide = ({ position }: { position: number }) => {
    const swiper = useSwiper();
    useEffect(() => {
      if (swiper) {
        swiper.slideTo(position);
      }
    }, [swiper, position]);
    return null;
  };
  return (
    <div className={styles.walkThroughСontainer}>
      <Header />
      <div className={styles.walkThroughСontainer__content}>
        {width > 768 && (
          <>
            <img
              className={styles.walkThroughСontainer__content_swiperImage}
              src={
                slideNumber === 0
                  ? SwiperFoto1
                  : slideNumber === 1
                    ? SwiperFoto2
                    : SwiperFoto3
              }
              alt={"SwiperFoto1"}
            />
            <img
              className={styles.walkThroughСontainer__content_swiperImageMobile}
              src={
                slideNumber === 0
                  ? SwiperFoto1Mob
                  : slideNumber === 1
                    ? SwiperFoto2Mob
                    : SwiperFoto3Mob
              }
              alt={"SwiperFoto1"}
            />
            <div className={styles.walkThroughСontainer__content_header}>
              How it Works{" "}
            </div>
            <div className={styles.walkThroughСontainer__content_text}>
              Lorem Ispum Dollar is a Dummy Text That is Used in place of a text
              that is used in place of a text Lorem Ispum Dollar
            </div>
          </>
        )}
        {width <= 768 && (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Keyboard]}
            onBeforeInit={(swiper: SwiperType) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper: SwiperType) => {
              setSlideNumber(swiper.realIndex);
            }}
            allowTouchMove={true}
            spaceBetween={16}
            draggable={true}
            slidesPerView={1}
            navigation
            className={styles.walkThroughСontainer_swiper}
          >
            <ChangeSlide position={slideNumber} />
            <SwiperSlide className={styles.walkThroughСontainer_swiper_item}>
              <img
                className={styles.walkThroughСontainer__content_swiperImage}
                src={SwiperFoto1}
                alt={"SwiperFoto1"}
              />

              <img
                className={
                  styles.walkThroughСontainer__content_swiperImageMobile
                }
                src={SwiperFoto1Mob}
                alt={"SwiperFoto1"}
              />
              <div className={styles.walkThroughСontainer__content_header}>
                How it Works{" "}
              </div>
              <div className={styles.walkThroughСontainer__content_text}>
                Lorem Ispum Dollar is a Dummy Text That is Used in place of a
                text that is used in place of a text Lorem Ispum Dollar
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.walkThroughСontainer_swiper_item}>
              <img
                className={styles.walkThroughСontainer__content_swiperImage}
                src={SwiperFoto2}
                alt={"SwiperFoto1"}
              />
              <img
                className={
                  styles.walkThroughСontainer__content_swiperImageMobile
                }
                src={SwiperFoto2Mob}
                alt={"SwiperFoto1"}
              />
              <div className={styles.walkThroughСontainer__content_header}>
                How it Works{" "}
              </div>
              <div className={styles.walkThroughСontainer__content_text}>
                Lorem Ispum Dollar is a Dummy Text That is Used in place of a
                text that is used in place of a text Lorem Ispum Dollar
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.walkThroughСontainer_swiper_item}>
              <img
                className={styles.walkThroughСontainer__content_swiperImage}
                src={SwiperFoto3}
                alt={"SwiperFoto1"}
              />
              <img
                className={
                  styles.walkThroughСontainer__content_swiperImageMobile
                }
                src={SwiperFoto3Mob}
                alt={"SwiperFoto1"}
              />
              <div className={styles.walkThroughСontainer__content_header}>
                How it Works{" "}
              </div>
              <div className={styles.walkThroughСontainer__content_text}>
                Lorem Ispum Dollar is a Dummy Text That is Used in place of a
                text that is used in place of a text Lorem Ispum Dollar
              </div>
            </SwiperSlide>
          </Swiper>
        )}
        <div className={styles.walkThroughСontainer__content_navigation}>
          <div
            onClick={() => setSlideNumber(0)}
            className={`${
              styles.walkThroughСontainer__content_navigation_button
            } ${
              slideNumber === 0
                ? styles.walkThroughСontainer__content_navigation_button_active
                : ""
            } `}
          >
            {" "}
          </div>
          <div
            onClick={() => setSlideNumber(1)}
            className={`${
              styles.walkThroughСontainer__content_navigation_button
            } ${
              slideNumber === 1
                ? styles.walkThroughСontainer__content_navigation_button_active
                : ""
            } `}
          >
            {" "}
          </div>
          <div
            onClick={() => setSlideNumber(2)}
            className={`${
              styles.walkThroughСontainer__content_navigation_button
            } ${
              slideNumber === 2
                ? styles.walkThroughСontainer__content_navigation_button_active
                : ""
            } `}
          >
            {" "}
          </div>
        </div>
        <div className={styles.walkThroughСontainer__content_buttonContainer}>
          {slideNumber === 0 && (
            <div
              className={
                styles.walkThroughСontainer__content_buttonContainer_skipButton
              }
              onClick={() => setSlideNumber(2)}
            >
              Skip
            </div>
          )}
          {slideNumber !== 0 && (
            <div
              className={
                styles.walkThroughСontainer__content_buttonContainer_skipButton
              }
              onClick={() => slideNumber > 0 && setSlideNumber(slideNumber - 1)}
            >
              Back
            </div>
          )}
          <div
            className={
              styles.walkThroughСontainer__content_buttonContainer_continueButton
            }
            onClick={() => {
              if (slideNumber === 2) {
                navigate("/selectProfile");
              } else {
                setSlideNumber(slideNumber + 1);
              }
            }}
          >
            Next
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalkThrough;
