import { useState } from "react";
import { useDispatch } from "react-redux";

import { updateDraftField } from "../../../../redux/requests/reducer";
import styles from "../ProjectInfo.module.scss";

const ShotList = () => {
  const [text, setText] = useState<string>("");
  const dispatch = useDispatch();
  const handleUpdateField = (path: string, value: string) => {
    dispatch(
      updateDraftField({
        path,
        value,
      }),
    );
  };
  return (
    <div>
      <div className={styles.nR_shotList_header}>Project overview / Details*</div>
      <textarea
        className={styles.nR_shotList_textArea}
        placeholder="Add a brief overview of the project here..."
        value={text}
        onChange={(e) => {
          handleUpdateField("projectInfoSettings.details", e.target.value);
          setText(e.target.value)
        }}
      />
    </div>
  );
};

export default ShotList;
