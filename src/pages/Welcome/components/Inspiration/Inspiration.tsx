import "swiper/css";
import "swiper/css/pagination";

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

import { inspirationsList } from "./data";
import InspirationItem from "./InspirationItem";
import styles from "../../Welcome.module.scss";
import InspirationItem2 from "./InspirationItem2";


const Inspiration = (): JSX.Element => {
  const [position, setPosition] = useState(0);
  const windowWidth = useWindowWidth();
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
    <div className={styles.welcomeContainer__content_main_inspiration}>
      <div className={styles.welcomeContainer__content_main_inspiration_text}>
        Inspiration
      </div>
      <div
        className={styles.welcomeContainer__content_main_inspiration_cardsList}
      >
        {windowWidth > 768 ?
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
            slidesPerView={windowWidth > 1440 ? 9 : 7}
            className={
              styles.welcomeContainer__content_main_inspiration_cardsList_swiper
            }
          >
            <ChangeSlide position={position} />
            <SwiperSlide
              key={generateUniqueId()}
            >
              {/* <InspirationItem2 item={inspirationsList[0]} /> */}
            </SwiperSlide>
            {inspirationsList.map((item) => (
              <SwiperSlide
                key={generateUniqueId()}
              >
                <InspirationItem item={item} />
              </SwiperSlide>
            ))}
            {Array.from({ length: 5 }).map(() => (
              <SwiperSlide key={generateUniqueId()}></SwiperSlide>
            ))}
          </Swiper> :
          <>

            {/* <InspirationItem2 item={inspirationsList[0]} /> */}

            {
              inspirationsList.map((item) => (
                <InspirationItem item={item} />
              ))
            }
          </>
        }
      </div>
      <div
        className={
          styles.welcomeContainer__content_main_inspiration_cardsList_bullets
        }
      >
        <button
          className={
            styles.welcomeContainer__content_main_inspiration_cardsList_bullets_back
          }
          onClick={() => {
            position > 2 && setPosition(position - 3);
          }}
        ></button>
        <button
          onClick={() => {
            position < inspirationsList.length - 3 && setPosition(position + 3);
          }}
          className={
            styles.welcomeContainer__content_main_inspiration_cardsList_bullets_forward
          }
        ></button>
      </div>
    </div>
  );
};

export default Inspiration;
