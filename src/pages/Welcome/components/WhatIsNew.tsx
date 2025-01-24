import "swiper/css";
import "swiper/css/pagination";

import {
  CompanyType,
  EducationType,
  QuestionIcon,
  SocialMediaType,
  WhatisNew1,
  WhatisNew2,
  WhatisNew3,
  WhatisNew4,
} from "assets/images";
import useWindowWidth from "hooks/useWindowWidth";
import { useEffect, useState } from "react";
import {
  A11y,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { generateUniqueId } from "utils/generateId";

import styles from "../Welcome.module.scss";

const WhatisNew = (): JSX.Element => {
  const [position, setPosition] = useState(0);
  const windowWidth = useWindowWidth();
  const value = windowWidth > 1024 ? 5 : windowWidth < 768 ? 7 : 6;
  const ChangeSlide = ({ position }: { position: number }) => {
    const swiper = useSwiper();
    useEffect(() => {
      if (swiper) {
        swiper.slideTo(position);
      }
    }, [swiper, position]);
    return null;
  };
  const items = [
    {
      id: generateUniqueId(),
      header: "Social Media",
      text: "Create FOMO: How Event Recap Videos Drive Future Attendance",
      img: WhatisNew1,
      imgType: SocialMediaType,
    },
    {
      id: generateUniqueId(),
      header: "Company Overview",
      text: "Create FOMO: How Event Recap Videos Drive Future Attendance",
      img: WhatisNew2,
      imgType: CompanyType,
    },
    {
      id: generateUniqueId(),
      header: "Social Media",
      text: "Create FOMO: How Event Recap Videos Drive Future Attendance",
      img: WhatisNew3,
      imgType: SocialMediaType,
    },
    {
      id: generateUniqueId(),
      header: "Social Media",
      text: "Create FOMO: How Event Recap Videos Drive Future Attendance",
      img: WhatisNew4,
      imgType: EducationType,
    },
    {
      id: generateUniqueId(),
      header: "Social Media",
      text: "Create FOMO: How Event Recap Videos Drive Future Attendance",
      img: WhatisNew3,
      imgType: EducationType,
    },
    {
      id: generateUniqueId(),
      header: "Social Media",
      text: "Create FOMO: How Event Recap Videos Drive Future Attendance",
      img: WhatisNew4,
      imgType: EducationType,
    },
  ];
  return (
    <div className={styles.welcomeContainer__content_main_whatIsNew}>
      <div className={styles.welcomeContainer__content_main_whatIsNew_text}>
        What’s New
        <img src={QuestionIcon} alt={"QuestionIconDarkGray"} />
        <div
          className={
            styles.welcomeContainer__content_main_whatIsNew_text_seeAll
          }
        >
          See All
        </div>
      </div>
      <div
        className={styles.welcomeContainer__content_main_whatIsNew_cardsList}
      >
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            Keyboard,
            Mousewheel,
          ]}
          allowTouchMove={windowWidth > 768 ? false : true}
          spaceBetween={16}
          draggable={false}
          scrollbar={{ draggable: false }}
          slidesPerView={windowWidth > 1440 ? 6 : 5}
          className={
            styles.welcomeContainer__content_main_whatIsNew_cardsList_swiper
          }
        >
          <ChangeSlide position={position} />
          {items.map((item) => {
            return (
              <SwiperSlide
                key={item.id}
                className={
                  styles.welcomeContainer__content_main_whatIsNew_cardItem
                }
                style={{ backgroundImage: `url(${item.img})` }}
              >
                <div
                  className={
                    styles.welcomeContainer__content_main_whatIsNew_cardItem_header
                  }
                >
                  <img src={item.imgType} alt="ere" />{" "}
                  {windowWidth > 768 && item.header}
                </div>
                <div
                  className={
                    styles.welcomeContainer__content_main_whatIsNew_cardItem_text
                  }
                >
                  {item.text}
                </div>
              </SwiperSlide>
            );
          })}
          {Array.from({ length: windowWidth < 990 ? 4 : 3 }).map(() => (
            <SwiperSlide
              key={generateUniqueId()}
              className={
                styles.welcomeContainer__content_main_whatIsNew_cardItem
              }
            ></SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div
        className={
          styles.welcomeContainer__content_main_whatIsNew_cardsList_bullets
        }
      >
        <button
          className={
            styles.welcomeContainer__content_main_whatIsNew_cardsList_bullets_back
          }
          onClick={() => position > 0 && setPosition(position - 1)}
        ></button>
        <button
          onClick={() => position < value && setPosition(position + 1)}
          className={
            styles.welcomeContainer__content_main_whatIsNew_cardsList_bullets_forward
          }
        ></button>
      </div>
    </div>
  );
};

export default WhatisNew;
