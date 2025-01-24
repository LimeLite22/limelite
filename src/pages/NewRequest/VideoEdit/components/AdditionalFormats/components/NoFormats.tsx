import { CheckBox, CheckBoxSelected } from "assets/images";
import { useDispatch, useSelector } from "react-redux";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../../../redux/requests/reducer";
import styles from "../../../../NewRequest.module.scss";
const NoFormats = () => {
  const selectedRequest = useSelector(selectRequestInfo);
  const selection = selectedRequest?.videoSettings.additionalFormats;
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
    <div
      className={`
    ${styles.box}
    ${selection === false ? styles.box_selected : ""} `}
      onClick={() => {
        handleUpdateField("videoSettings.additionalFormats", false);
      }}
    >
      <div className={styles.box_header}>
        <img
          className={styles.box_circle}
          src={selection === false ? CheckBoxSelected : CheckBox}
          alt="CheckBox"
        />
        <span className={styles.box_title}>No</span>
        <div className={styles.box_title2}>
          We don't need any additional formats of this video.
        </div>
      </div>
    </div>
  );
};

export default NoFormats;
