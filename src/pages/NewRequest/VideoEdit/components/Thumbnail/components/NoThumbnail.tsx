import { useDispatch, useSelector } from "react-redux";

import { CheckBox, CheckBoxSelected } from "assets/images";

import { DEFAULT, N0_THUMBNAIL } from "consts/consts";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../../../redux/requests/reducer";
import styles from "../../../../NewRequest.module.scss";

const NoThumbnail = () => {
  const selectedRequest = useSelector(selectRequestInfo);
  const selection = selectedRequest?.videoSettings.thumbnail;
  const handleUpdateField = (
    path: string,
    value: string | File | typeof DEFAULT,
  ) => {
    dispatch(
      updateDraftField({
        path,
        value,
      }),
    );
  };

  const dispatch = useDispatch();

  return (
    <div
      className={`
    ${styles.box}
    ${selection === N0_THUMBNAIL ? styles.box_selected : ""} `}
      onClick={() => {
        handleUpdateField("videoSettings.thumbnail", N0_THUMBNAIL);
      }}
    >
      <div className={styles.box_header}>
        <img
          className={styles.box_circle}
          src={selection === N0_THUMBNAIL ? CheckBoxSelected : CheckBox}
          alt="CheckBox"
        />
        <span className={styles.box_title}>No</span>
        <div className={styles.box_title2}>
          Thank you, but this video does not require a thumbnail.
        </div>
      </div>
    </div>
  );
};

export default NoThumbnail;
