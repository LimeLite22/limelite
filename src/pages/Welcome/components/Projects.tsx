import {
  NewRequestIcon,
  QuestionIcon,
} from "assets/images";
import useWindowWidth from "hooks/useWindowWidth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectDrafts } from "../../../redux/requests/reducer";
import {
  A11y,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import styles from "../Welcome.module.scss";
import Project from "./Project";
import { COMPLETE_REQUEST_STATUS, IN_EDITING_REQUEST_STATUS, ON_HOLD_REQUEST_STATUS, REQUESTED_REQUEST_STATUS, SCHEDULED_REQUEST_STATUS } from "consts/consts";

const Projects = () => {
  const [position, setPosition] = useState(0);
  const width = useWindowWidth();
  const requestWidth = width - 32;
  const navigate = useNavigate();
  const projects = useSelector(selectDrafts);

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
    <div className={styles.welcomeContainer__content_main_projects}>
      <div className={styles.welcomeContainer__content_main_projects_text}>
        Projects
        <img src={QuestionIcon} alt={"QuestionIconDarkGray"} />
        <div
          className={styles.welcomeContainer__content_main_projects_text_seeAll}
        >
          See All
        </div>
      </div>
      <div className={styles.welcomeContainer__content_main_projects_content}>
        <div
          className={
            styles.welcomeContainer__content_main_projects_content_projectsList
          }
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
            allowTouchMove={window.innerWidth > 768 ? false : true}
            spaceBetween={16}
            draggable={false}
            scrollbar={{ draggable: false }}
            slidesPerView={4}
            className={
              styles.welcomeContainer__content_main_projects_content_projectsList_swiper
            }
          >
            <ChangeSlide position={position} />
            {projects?.filter((item) => {
              if (item.overviewInfoSettings.status === REQUESTED_REQUEST_STATUS ||
                item.overviewInfoSettings.status === IN_EDITING_REQUEST_STATUS ||
                item.overviewInfoSettings.status === SCHEDULED_REQUEST_STATUS ||
                item.overviewInfoSettings.status === ON_HOLD_REQUEST_STATUS ||
                item.overviewInfoSettings.status === COMPLETE_REQUEST_STATUS
              ) {
                return true
              } else {
                return false
              }
            }).map((item, index) => {
              return (
                <SwiperSlide>
                  <Project key={index} project={item} />
                </SwiperSlide>
              )
            })
            }
            <SwiperSlide
              className={
                styles.welcomeContainer__content_main_projects_content_newRequest
              }
              style={
                width > 768
                  ? {}
                  : {
                    minWidth: `${requestWidth}px`,
                    width: `${requestWidth}px`,
                    maxWidth: `${requestWidth}px`,
                  }
              }
              onClick={() => {
                navigate("/new-request/start");
              }}
            >
              <img src={NewRequestIcon} alt={"NewRequestIcon"} />
              New Request
            </SwiperSlide>
            <SwiperSlide>
            </SwiperSlide>
            <SwiperSlide>
            </SwiperSlide>
            <SwiperSlide>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div
        className={
          styles.welcomeContainer__content_main_projects_content_projectsList_bullets
        }
      >
        <button
          className={
            styles.welcomeContainer__content_main_projects_content_projectsList_bullets_back
          }
          onClick={() => position > 0 && setPosition(position - 1)}
        ></button>
        <button
          onClick={() => position < 6 && setPosition(position + 1)}
          className={
            styles.welcomeContainer__content_main_projects_content_projectsList_bullets_forward
          }
        ></button>
      </div>
    </div>
  );
};
export default Projects;
