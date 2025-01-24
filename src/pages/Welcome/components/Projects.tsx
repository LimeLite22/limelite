import {
  NewRequestIcon,
  QuestionIcon,
  SettingsMenu,
  User1Foto,
} from "assets/images";
import useWindowWidth from "hooks/useWindowWidth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
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

const Projects = () => {
  const [position, setPosition] = useState(0);
  const text = "Maecenas egestas est eget cras sed morbi est";
  const width = useWindowWidth();
  const requestWidth = width - 32;
  const isTablet = width < 1024;
  const navigate = useNavigate();

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
            <SwiperSlide
              className={
                styles.welcomeContainer__content_main_projects_content_projectItem
              }
            >
              <div
                className={
                  styles.welcomeContainer__content_main_projects_content_projectItem_header
                }
              >
                Aerial Perspectives
                <div
                  className={
                    styles.welcomeContainer__content_main_projects_content_projectItem_header_status
                  }
                >
                  {" "}
                  <div
                    className={
                      styles.welcomeContainer__content_main_projects_content_projectItem_header_status_scheduled
                    }
                  >
                    {" "}
                  </div>
                  Scheduled
                  <img src={SettingsMenu} alt="" />
                </div>
              </div>
              <div
                className={
                  styles.welcomeContainer__content_main_projects_content_projectItem_type
                }
              >
                Testimonial Video
              </div>
              <div
                className={
                  styles.welcomeContainer__content_main_projects_content_projectItem_subText
                }
              >
                Shoot+Edit{" "}
                <div
                  className={
                    styles.welcomeContainer__content_main_projects_content_projectItem_dot
                  }
                ></div>
                Shoot: 11/12/2024
              </div>
              <div
                className={
                  styles.welcomeContainer__content_main_projects_content_projectItem_credit
                }
              >
                1 Credit
              </div>
              <img
                className={
                  styles.welcomeContainer__content_main_projects_content_projectItem_userIcon
                }
                src={User1Foto}
                alt={"Account"}
              />
            </SwiperSlide>
            <SwiperSlide
              className={
                styles.welcomeContainer__content_main_projects_content_projectItem
              }
            >
              <div
                className={
                  styles.welcomeContainer__content_main_projects_content_projectItem_header
                }
              >
                {text.length > 30 && isTablet
                  ? text.substring(0, 30) + "..."
                  : text}
                <div
                  className={
                    styles.welcomeContainer__content_main_projects_content_projectItem_header_status
                  }
                >
                  {" "}
                  <div
                    className={
                      styles.welcomeContainer__content_main_projects_content_projectItem_header_status_pending
                    }
                  >
                    {" "}
                  </div>
                  In Editing
                  <img src={SettingsMenu} alt="" />
                </div>
              </div>
              <div
                className={
                  styles.welcomeContainer__content_main_projects_content_projectItem_type
                }
              >
                Testimonial Video
              </div>
              <div
                className={
                  styles.welcomeContainer__content_main_projects_content_projectItem_subText
                }
              >
                Shoot+Edit{" "}
                <div
                  className={
                    styles.welcomeContainer__content_main_projects_content_projectItem_dot
                  }
                ></div>
                Shoot: 11/12/2024
              </div>
              <div
                className={
                  styles.welcomeContainer__content_main_projects_content_projectItem_credit
                }
              >
                1 Credit
              </div>
              <img
                className={
                  styles.welcomeContainer__content_main_projects_content_projectItem_userIcon
                }
                src={User1Foto}
                alt={"Account"}
              />
            </SwiperSlide>
            <SwiperSlide
              className={
                styles.welcomeContainer__content_main_projects_content_projectItem
              }
            >
              <div
                className={
                  styles.welcomeContainer__content_main_projects_content_projectItem_header
                }
              >
                Aerial Perspectives
                <div
                  className={
                    styles.welcomeContainer__content_main_projects_content_projectItem_header_status
                  }
                >
                  {" "}
                  <div
                    className={
                      styles.welcomeContainer__content_main_projects_content_projectItem_header_status_pending
                    }
                  >
                    {" "}
                  </div>
                  In Editing
                  <img src={SettingsMenu} alt="" />
                </div>
              </div>
              <div
                className={
                  styles.welcomeContainer__content_main_projects_content_projectItem_type
                }
              >
                Testimonial Video
              </div>
              <div
                className={
                  styles.welcomeContainer__content_main_projects_content_projectItem_subText
                }
              >
                Shoot+Edit{" "}
                <div
                  className={
                    styles.welcomeContainer__content_main_projects_content_projectItem_dot
                  }
                ></div>
                Shoot: 11/12/2024
              </div>
              <div
                className={
                  styles.welcomeContainer__content_main_projects_content_projectItem_credit
                }
              >
                2 Credits
              </div>
              <img
                className={
                  styles.welcomeContainer__content_main_projects_content_projectItem_userIcon
                }
                src={User1Foto}
                alt={"Account"}
              />
            </SwiperSlide>
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
            <SwiperSlide
              className={
                styles.welcomeContainer__content_main_projects_content_projectSpaceItem
              }
            ></SwiperSlide>
            <SwiperSlide
              className={
                styles.welcomeContainer__content_main_projects_content_projectSpaceItem
              }
            ></SwiperSlide>
            <SwiperSlide
              className={
                styles.welcomeContainer__content_main_projects_content_projectSpaceItem
              }
            ></SwiperSlide>
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
          onClick={() => position < 3 && setPosition(position + 1)}
          className={
            styles.welcomeContainer__content_main_projects_content_projectsList_bullets_forward
          }
        ></button>
      </div>
    </div>
  );
};
export default Projects;
