import { useDispatch, useSelector } from "react-redux";

import { CheckBox, CheckBoxSelected } from "assets/images";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../../../redux/requests/reducer";
import styles from "../../../../NewRequest.module.scss";

const NoAdditionalAssets = () => {
  const selectedRequest = useSelector(selectRequestInfo);
  const selection = selectedRequest?.videoSettings.additionalVisualAssets;
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
        handleUpdateField("videoSettings.additionalVisualAssets", false);
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
          We don't have any additional visual assets to share.
        </div>
      </div>
    </div>
  );
};

export default NoAdditionalAssets;
