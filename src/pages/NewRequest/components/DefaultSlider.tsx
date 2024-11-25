import {
    SwiperFoto1,
    SwiperFoto2,
    SwiperFoto3,
} from "assets/images";
import { Navigation, Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useRef, useState } from "react";
import styles from "../NewRequest.module.scss";

const DefaultSlider = () => {
    const [slideNumber, setSlideNumber] = useState(0);

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

    const handleCustomSlide = (index: number) => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(index);
        }
    };
    return (
        <div className={styles.box_content_swiper}>
            <Swiper
                spaceBetween={8}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                centeredSlides={true}
                onBeforeInit={(swiper: SwiperType) => {
                    swiperRef.current = swiper;
                }}
                onSlideChange={(swiper: SwiperType) => {
                    setSlideNumber(swiper.realIndex);
                }}
                loop={true}
                navigation={true}
                className={styles.box_content_swiper_container}
                modules={[Autoplay, Pagination, Navigation]}
            >
                <SwiperSlide>
                    <img
                        className={styles.box_content_swiper_img}
                        src={SwiperFoto1}
                        alt={"SwiperFoto1"}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    {" "}
                    <img
                        className={styles.box_content_swiper_img}
                        src={SwiperFoto2}
                        alt={"SwiperFoto1"}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    {" "}
                    <img
                        className={styles.box_content_swiper_img}
                        src={SwiperFoto3}
                        alt={"SwiperFoto1"}
                    />
                </SwiperSlide>
            </Swiper>
            <div className={styles.box_content_swiper_dots}>
                <div
                    className={`
          ${styles.box_content_swiper_dots_dot} 
          ${slideNumber === 0 ? styles.box_content_swiper_dots_dot_active : ""}`}
                    onClick={() => handleCustomSlide(0)}
                ></div>
                <div
                    className={`
             ${styles.box_content_swiper_dots_dot} 
             ${slideNumber === 1 ? styles.box_content_swiper_dots_dot_active : ""}`}
                    onClick={() => handleCustomSlide(1)}
                ></div>
                <div
                    className={`
             ${styles.box_content_swiper_dots_dot} 
             ${slideNumber === 2 ? styles.box_content_swiper_dots_dot_active : ""}`}
                    onClick={() => handleCustomSlide(2)}
                ></div>
            </div>
        </div>
    );
};

export default DefaultSlider