import {
  VIDEO_SQUARE,
  VIDEO_STANDARD,
  VIDEO_STORY,
  VIDEO_VERTICAL,
} from "consts/consts";
import { useDispatch, useSelector } from "react-redux";
import { TVideo } from "types/types";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import LearnMorePopUp from "./LearnMorePopUp";

const FormatBox = () => {
  const requestInfo = useSelector(selectRequestInfo);
  const dispatch = useDispatch();
  const format = requestInfo?.videoSettings.format;
  const handleClick = (
    value: TVideo,
  ) => {
    dispatch(
      updateDraftField({
        path: "videoSettings.format",
        value: value,
      }),
    );
  };
  return (
    <div>
      <div className={styles.box_question_header_text}>
        Choose the final format for this video*
      </div>
      <LearnMorePopUp />
      <div className={styles.box_videTypes}>
        <div
          onClick={() => handleClick(VIDEO_STANDARD)}
          className={`
                    ${format === VIDEO_STANDARD ? styles.box_videoTypeSelected : ""} 
                    ${styles.box_videoType}`}
        >
          {VIDEO_STANDARD} <div className={styles.box_videoType_dot}></div> 16:9
        </div>
        <div
          onClick={() => handleClick(VIDEO_STORY)}
          className={`
                    ${format === VIDEO_STORY ? styles.box_videoTypeSelected : ""}  
                    ${styles.box_videoType}`}
        >
          {VIDEO_STORY} <div className={styles.box_videoType_dot}></div> 9:16
        </div>
        <div
          onClick={() => handleClick(VIDEO_SQUARE)}
          className={`
                    ${format === VIDEO_SQUARE ? styles.box_videoTypeSelected : ""}  
                    ${styles.box_videoType}`}
        >
          {VIDEO_SQUARE}<div className={styles.box_videoType_dot}></div> 1:1
        </div>
        <div
          onClick={() => handleClick(VIDEO_VERTICAL)}
          className={`    
                    ${format === VIDEO_VERTICAL ? styles.box_videoTypeSelected : ""}  
                    ${styles.box_videoType}`}
        >
          {VIDEO_VERTICAL}<div className={styles.box_videoType_dot}></div> 4:5
        </div>
      </div>
    </div>
  );
};

export default FormatBox;
