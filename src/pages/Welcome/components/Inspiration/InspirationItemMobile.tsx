import { useState } from "react";
import { useRef } from "react";
import { Sheet } from "react-modal-sheet";

import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { A11y, Keyboard, Mousewheel, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { AnnouncementVideos } from "assets/images";

import useWindowWidth from "hooks/useWindowWidth";

import styles from "../../Welcome.module.scss";

const embedCode1 = `
<div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><iframe src="https://fast.wistia.net/embed/iframe/iaz5uzdwi9?seo=true&videoFoam=true" title="Unstoppable Grit Cast Study: C&amp;S Machining (:30) Video" allow="autoplay; fullscreen" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" msallowfullscreen width="100%" height="100%"></iframe></div></div>
<script src="https://fast.wistia.net/assets/external/E-v1.js" async></script>
`;
const embedCode2 = `
<div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><iframe src="https://fast.wistia.net/embed/iframe/19ascp8unk?seo=true&videoFoam=true" title="C&amp;S Testimonial V1 Video" allow="autoplay; fullscreen" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" msallowfullscreen width="100%" height="100%"></iframe></div></div>
`;
const embedCode3 = `
<div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><iframe src="https://fast.wistia.net/embed/iframe/cagm1idqn9?seo=true&videoFoam=true" title="UGA_24_05 - Unstoppable Grit C&amp;S Machining 15s Video" allow="autoplay; fullscreen" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" msallowfullscreen width="100%" height="100%"></iframe></div></div>
<script src="https://fast.wistia.net/assets/external/E-v1.js" async></script>
`;

const InspirationItemMobile = (): JSX.Element => {
  const [isOpened, setIsOpened] = useState(false);
  const swiperRef = useRef<SwiperType>();
  const [activeIndex, setActiveIndex] = useState(1);
  const width = useWindowWidth();
  if (isOpened && width < 768) {
    return (
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
        className={styles.learnMore_sheetMain}
      >
        <div
          className={styles.learnMore_closeArea}
          onClick={() => setIsOpened(false)}
        ></div>
        <Sheet.Container className={styles.learnMore_sheet}>
          <Sheet.Content className={styles.learnMore_sheetContainer}>
            <div className={styles.learnMore_container_line}></div>
            <div className={styles.inspirationPopUpContainer_content_title}>
              Announcement Videos
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
              <div
                className={
                  styles.inspirationPopUpContainer_content_buttons_buttonContainer
                }
                onClick={() => {
                  setActiveIndex(0);
                  swiperRef.current?.slideTo(0);
                }}
              >
                <button
                  style={{
                    background: activeIndex === 0 ? "var(--green-dark2)" : "",
                  }}
                  className={
                    styles.inspirationPopUpContainer_content_buttons_button
                  }
                ></button>
              </div>
              <div
                className={
                  styles.inspirationPopUpContainer_content_buttons_buttonContainer
                }
                onClick={() => {
                  setActiveIndex(1);
                  swiperRef.current?.slideTo(1);
                }}
              >
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
              </div>
              <div
                className={
                  styles.inspirationPopUpContainer_content_buttons_buttonContainer
                }
                onClick={() => {
                  setActiveIndex(2);
                  swiperRef.current?.slideTo(2);
                }}
              >
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
            <div className={styles.inspirationPopUpContainer_content_text}>
              Dui rutrum aliquet lobortis fringilla turpis elementum pretium
              integer. Elementum venenatis nisi odio tempor. Nunc mi lacus
              sapien odio elit vel donec a. Massa id a in orci et lorem erat
              fermentum.
            </div>
            <div className={styles.inspirationPopUpContainer_content_text}>
              Dui rutrum aliquet lobortis fringilla turpis elementum pretium
              integer. Elementum venenatis nisi odio tempor. Nunc mi lacus
              sapien odio elit vel donec a. Massa id a in orci et lorem erat
              fermentum.
            </div>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    );
  }
  return (
    <div
      className={
        styles.welcomeContainer__content_main_inspirationMobile_cardItem
      }
      onClick={() => setIsOpened(true)}
    >
      {" "}
      <img src={AnnouncementVideos} alt={"AnnouncementVideos"} />{" "}
      <div
        className={
          styles.welcomeContainer__content_main_inspirationMobile_cardItem_header
        }
      >
        Announcement Videos
      </div>
    </div>
  );
};

export default InspirationItemMobile;
