import { useDispatch, useSelector } from "react-redux";

import { IVideoDuration } from "interfaces/interfaces";

import { DEFAULT } from "consts/consts";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";

const VideoTargetDurationBox = () => {
  const value = useSelector(selectRequestInfo)?.videoSettings?.targetDuration;
  const dispatch = useDispatch();
  const handleChange = (value: IVideoDuration) => {
    dispatch(
      updateDraftField({
        path: "videoSettings.targetDuration",
        value,
      }),
    );
  };
  return (
    <div>
      <div className={styles.box_question_header_text}>
        What is the target duration? (Seconds)*
      </div>
    </div>
  );
};

export default VideoTargetDurationBox;
