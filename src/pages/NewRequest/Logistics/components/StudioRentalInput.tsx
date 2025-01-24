import "swiper/css";
import "swiper/css/pagination";

import {
  CheckBox,
  CheckBoxSelected,
  Expand,
  Note,
  SwiperFoto1,
  SwiperFoto2,
  SwiperFoto3,
} from "assets/images";
import { STUDIO_RENTAL } from "consts/consts";
import useWindowWidth from "hooks/useWindowWidth";
import { IStudioRentalProps } from "interfaces/interfaces";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";

const StudioRental = ({ isExpanded, setIsExpanded }: IStudioRentalProps) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const selectedRequest = useSelector(selectRequestInfo);
  const type = selectedRequest?.location?.type;
  const swiperRef = useRef<SwiperType>();
  const dispatch = useDispatch();
  const windowWidth = useWindowWidth();
  const handleCustomSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index); // Use slideTo method
    }
  };
  return (
    <div
      className={`
    ${styles.box}
    ${styles.box_xl}
    ${type === STUDIO_RENTAL ? styles.box_selected : ""} 
    ${isExpanded ? styles.box_expanded : ""}`}
      onClick={() => {
        dispatch(
          updateDraftField({
            path: "location.type",
            value: STUDIO_RENTAL,
          }),
        );
        !isExpanded && setIsExpanded(true);
      }}
      style={{ backgroundColor: "transparent" }}
      tabIndex={0}
      onBlur={() => {
        if (windowWidth < 768) {
          setIsExpanded(false);
        }
      }}
    >
      <div
        className={`
        ${styles.box_header2} 
        ${type === STUDIO_RENTAL ? styles.box_header_selected : ""} `}
      >
        {" "}
        <img
          className={styles.box_circle}
          src={type === STUDIO_RENTAL ? CheckBoxSelected : CheckBox}
          alt="CheckBox"
        />
        <span className={styles.box_title}>
          We'd like a studio rental
          <div className={styles.box_title_addOn}>Add-on</div>
        </span>
        <div className={styles.box_title2}>
          Pack your bags, the shoot is more than 50 miles away
        </div>
      </div>
      <div className={styles.box_container}>
        {" "}
        <div className={styles.box_content}>
          <div className={styles.box_content_swiper}>
            <Swiper
              spaceBetween={8}
              centeredSlides={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
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
          <div className={styles.box_content_info}>
            <div
              className={styles.box_content_info_header}
              onClick={() => handleCustomSlide(0)}
            >
              Premium Add-on:
              <span className={styles.box_content_info_header_addOn}>
                +$795
              </span>
            </div>
            <div>
              If you want a controlled environment for an HD shoot, a studio
              rental is a great option. Studios offer a professional setting
              while controlling for foot traffic lighting, and sound. Price
              includes booking and all studio usage fees.
            </div>
          </div>
        </div>
        <div className={styles.box_subText}>
          <img src={Note} alt="locationIcon" /> Note: You will have an
          opportunity to enter a discount code for any for a Standard Add-ons
          during check-out
        </div>
      </div>
      <img
        style={{ top: "19px" }}
        onClick={() => setIsExpanded(!isExpanded)}
        src={Expand}
        alt="Expand"
        className={styles.box_expand}
      />
    </div>
  );
};

export default StudioRental;
