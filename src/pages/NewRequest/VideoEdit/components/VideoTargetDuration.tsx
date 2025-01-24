import { DEFAULT } from "consts/consts";
import { useDispatch, useSelector } from "react-redux";
import { TVideoDuration } from "types/types";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import DurationSelector from "./DurationSelector/DurationSelector";

const VideoTargetDurationBox = () => {
  const value = useSelector(selectRequestInfo)?.videoSettings?.targetDuration;
  const dispatch = useDispatch();
  const handleChange = (value: TVideoDuration) => {
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
      <DurationSelector value={value || DEFAULT} onChange={handleChange} />
    </div>
  );
};

export default VideoTargetDurationBox;
