import "swiper/css";
import "swiper/css/pagination";

import { Close } from "assets/images";
import useWindowWidth from "hooks/useWindowWidth";
import { useEffect, useState } from "react";
import { useRef } from "react";
import ReactDOM from "react-dom";
import type { Swiper as SwiperType } from "swiper";
import { Sheet } from "react-modal-sheet";

import { embedCode1, embedCode2, embedCode3, embedCode4 } from "./data";
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
  const [selectedVideo, setSelectedVideo] = useState(embedCode1);
  const width = useWindowWidth();
  const handleOpen = () => {
    setIsOpened(true);
  };

  const swiperRef = useRef<SwiperType>();
  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    if (swiperInstance) {
      const handleTransitionStart = () => {
        swiperInstance.update();
      };

      swiperInstance.on("slideChangeTransitionStart", handleTransitionStart);

      return () => {
        swiperInstance.off("slideChangeTransitionStart", handleTransitionStart);
      };
    }
  }, []);

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
          <div
            style={{ width: "100%", height: "auto", maxWidth: "480px", paddingTop: "20px", margin: "0 auto" }}
            dangerouslySetInnerHTML={{ __html: selectedVideo }}
          />
          <div className={styles.inspirationPopUpContainer_swiper}>
            <div className={styles.inspirationPopUpContainer_swiper_item}
              onClick={() => {
                setSelectedVideo(embedCode1);
              }}
            >
              <div className={styles.inspirationPopUpContainer_swiper_item_shadow}></div>
              <div
                style={{ width: "100%", height: "auto", maxWidth: "480px", margin: "0 auto" }}
                dangerouslySetInnerHTML={{ __html: embedCode1 }}
              />
            </div>

            <div className={styles.inspirationPopUpContainer_swiper_item}
              onClick={() => {
                setSelectedVideo(embedCode2);
              }}
            >
              <div className={styles.inspirationPopUpContainer_swiper_item_shadow}></div>
              <div
                style={{ width: "100%", height: "auto", maxWidth: "480px", margin: "0 auto" }}
                dangerouslySetInnerHTML={{ __html: embedCode2 }}
              />
            </div>
            <div className={styles.inspirationPopUpContainer_swiper_item}
              onClick={() => {
                setSelectedVideo(embedCode3);
              }}
            >
              <div className={styles.inspirationPopUpContainer_swiper_item_shadow}></div>
              <div
                style={{ width: "100%", height: "auto", maxWidth: "480px", margin: "0 auto" }}
                dangerouslySetInnerHTML={{ __html: embedCode3 }}
              />
            </div>
            <div className={styles.inspirationPopUpContainer_swiper_item}
              onClick={(e) => {
                setSelectedVideo(embedCode4);
                e.stopPropagation();

              }}
            >
              <div className={styles.inspirationPopUpContainer_swiper_item_shadow}></div>
              <div
                style={{ width: "100%", height: "auto", maxWidth: "480px", margin: "0 auto", userSelect: "none" }}
                dangerouslySetInnerHTML={{ __html: embedCode4 }}
              />
            </div>
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
        <Sheet.Container className={styles.learnMore_sheetInspiration}>
          <Sheet.Content className={styles.learnMore_sheetContainer}>
            <div className={styles.learnMore_container_line}></div>
            <Sheet.Scroller draggableAt="both">
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
              <div
                style={{ width: "100%", height: "auto", maxWidth: "480px", paddingTop: "20px", margin: "0 auto" }}
                dangerouslySetInnerHTML={{ __html: selectedVideo }}
              />
              <div className={styles.inspirationPopUpContainer_swiper}>
                <div className={styles.inspirationPopUpContainer_swiper_item}
                  onClick={() => {
                    setSelectedVideo(embedCode1);
                  }}
                >
                  <div className={styles.inspirationPopUpContainer_swiper_item_shadow}></div>
                  <div
                    style={{ width: "100%", height: "auto", maxWidth: "480px", margin: "0 auto" }}
                    dangerouslySetInnerHTML={{ __html: embedCode1 }}
                  />
                </div>

                <div className={styles.inspirationPopUpContainer_swiper_item}
                  onClick={() => {
                    setSelectedVideo(embedCode2);
                  }}
                >
                  <div className={styles.inspirationPopUpContainer_swiper_item_shadow}></div>
                  <div
                    style={{ width: "100%", height: "auto", maxWidth: "480px", margin: "0 auto" }}
                    dangerouslySetInnerHTML={{ __html: embedCode2 }}
                  />
                </div>
                <div className={styles.inspirationPopUpContainer_swiper_item}
                  onClick={() => {
                    setSelectedVideo(embedCode3);
                  }}
                >
                  <div className={styles.inspirationPopUpContainer_swiper_item_shadow}></div>
                  <div
                    style={{ width: "100%", height: "auto", maxWidth: "480px", margin: "0 auto" }}
                    dangerouslySetInnerHTML={{ __html: embedCode3 }}
                  />
                </div>
                <div className={styles.inspirationPopUpContainer_swiper_item}
                  onClick={(e) => {
                    setSelectedVideo(embedCode4);
                    e.stopPropagation();

                  }}
                >
                  <div className={styles.inspirationPopUpContainer_swiper_item_shadow}></div>
                  <div
                    style={{ width: "100%", height: "auto", maxWidth: "480px", margin: "0 auto", userSelect: "none" }}
                    dangerouslySetInnerHTML={{ __html: embedCode4 }}
                  />
                </div>
              </div>
            </Sheet.Scroller>

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
