import "swiper/css";
import "swiper/css/pagination";

import { Close } from "assets/images";
import useWindowWidth from "hooks/useWindowWidth";
import { useState } from "react";
import { useRef } from "react";
import ReactDOM from "react-dom";
import type { Swiper as SwiperType } from "swiper";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { A11y, Keyboard, Mousewheel, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Sheet } from "react-modal-sheet";

import { embedCode1, embedCode2, embedCode3 } from "./data";
import styles from "../../Welcome.module.scss";
export interface IInspiration {
  id: string;
  img: string;
  header: string;
  text: string;
  header2: string;
  text2: string;
  text3: string;
  title1?: string;
  title2?: string;
}

const InspirationItem = ({ item }: { item: IInspiration }): JSX.Element => {
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
            <img src={item.img} alt={"AnnouncementVideos"} />
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
            {item.header2}
          </div>
          <div className={styles.inspirationPopUpContainer_content_text}>
            {item.text2}
          </div>
          <div className={styles.inspirationPopUpContainer_content_text}>
            {item.text3}
          </div>
          {item.title1 && (
            <div className={styles.inspirationPopUpContainer_content_title2}>
              {item.title1}
            </div>
          )
          }
          {
            item.title2 && (
              <div className={styles.inspirationPopUpContainer_content_title2}>
                {item.title2}
              </div>
            )
          }
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
              {item.header2}
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
              {item.text2}
            </div>
            <div className={styles.inspirationPopUpContainer_content_text}>
              {item.text3}
            </div>
            {item.title1 && (
              <div className={styles.inspirationPopUpContainer_content_title2}>
                {item.title1}
              </div>
            )
            }
            {
              item.title2 && (
                <div className={styles.inspirationPopUpContainer_content_title2}>
                  {item.title2}
                </div>
              )
            }
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    );
  }

  return (
    <div onClick={handleOpen} className={
      styles.welcomeContainer__content_main_inspiration_cardItem
    } >
      <div
        className={
          styles.welcomeContainer__content_main_inspiration_cardItem_img
        }
      >
        {" "}
        <img src={item.img} alt={"AnnouncementVideos"} />{" "}
      </div>{" "}
      <div
        className={
          styles.welcomeContainer__content_main_inspiration_cardItem_header
        }

        style={
          item.header === 'Testimonials/Case Studies' ?
            {
              wordBreak: `break-word`,
              overflowWrap: `break-word`
            } : {}}
      >
        {item.header}
      </div>
      <div
        className={
          styles.welcomeContainer__content_main_inspiration_cardItem_text
        }
      >
        {item.text}
      </div>
      <div
        className={
          styles.welcomeContainer__content_main_inspiration_cardItem_downArrow
        }
      ></div>
    </div >
  );
};

export default InspirationItem;
