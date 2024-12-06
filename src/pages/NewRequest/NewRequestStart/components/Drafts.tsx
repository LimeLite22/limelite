import { QuestionLightGray } from "assets/images";
import useWindowWidth from "hooks/useWindowWidth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { generateUniqueId } from "utils/generateId";

import {
  selectDrafts,
  updateDraftField,
} from "../../../../redux/requests/reducer";
import styles from "../NewRequestStart.module.scss";
import DraftItem from "./DraftItem";

const Drafts = () => {
  const [position, setPosition] = useState(0);
  const width = useWindowWidth();
  const drafts = useSelector(selectDrafts);
  const dispatch = useDispatch();
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
    <div className={styles.nR_content_projects}>
      <div className={styles.nR_content_projects_text}>
        Saved requests <img src={QuestionLightGray} alt={"Question"} />
      </div>
      <div className={styles.nR_content_projects_content}>
        <div className={styles.nR_content_projects_content_projectsList}>
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
            spaceBetween={width > 768 ? 16 : 8}
            draggable={false}
            scrollbar={{ draggable: false }}
            slidesPerView={2}
            className={styles.nR_content_projects_content_projectsList_swiper}
          >
            <ChangeSlide position={position} />
            {drafts.map((draft, index) => {

              return <SwiperSlide
                key={generateUniqueId()}
                onClick={() => {
                  dispatch(
                    updateDraftField({
                      path: "selectedRequest",
                      value: draft.id,
                    })
                  );
                  navigate("/newRequest/step1");
                }}>
                <DraftItem draft={draft} index={index} key={generateUniqueId()} />
              </SwiperSlide>

            }
            )}
            <SwiperSlide
              className={styles.nR_content_projects_content_projectSpaceItem}
            ></SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className={styles.nR_content_projects_content_projectsList_bullets}>
        <button
          className={
            styles.nR_content_projects_content_projectsList_bullets_back
          }
          onClick={() => position > 0 && setPosition(position - 1)}
        ></button>
        <button
          onClick={() => position < drafts.length - 1 && setPosition(position + 1)}
          className={
            styles.nR_content_projects_content_projectsList_bullets_forward
          }
        ></button>
      </div>
    </div>
  );
};
export default Drafts;
