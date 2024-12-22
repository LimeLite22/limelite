import { useDispatch, useSelector } from "react-redux";

import { CheckBox, CheckBoxSelected, Note } from "assets/images";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";

const Teleprompter = () => {
  const isTeleprompter =
    useSelector(selectRequestInfo)?.scriptSettings?.teleprompter;
  const dispatch = useDispatch();
  const handleUpdateField = (path: string, value: boolean) => {
    dispatch(
      updateDraftField({
        path,
        value,
      }),
    );
  };
  return (
    <div className={styles.teleprompter}>
      <div className={styles.teleprompter_header}>
        Do you need a teleprompter?*
      </div>
      <div className={styles.teleprompter_options}>
        <div
          className={styles.teleprompter_option}
          onClick={() => handleUpdateField("scriptSettings.teleprompter", true)}
        >
          <img
            src={isTeleprompter === true ? CheckBoxSelected : CheckBox}
            alt="locationIcon"
          />
          Yes
        </div>
        <div
          className={styles.teleprompter_option}
          onClick={() =>
            handleUpdateField("scriptSettings.teleprompter", false)
          }
        >
          <img
            src={isTeleprompter === false ? CheckBoxSelected : CheckBox}
            alt="locationIcon"
          />
          No
        </div>
      </div>
      <div className={styles.teleprompter_subText}>
        <img src={Note} alt="locationIcon" />A teleprompter is included and
        available for any LimeLite shoot; however, it does take 10-15 minutes to
        load the script into the teleprompter. If the script is provided in
        advance, your video creator will load it prior to the shoot (and save
        valuable time on set).
      </div>
    </div>
  );
};

export default Teleprompter;
