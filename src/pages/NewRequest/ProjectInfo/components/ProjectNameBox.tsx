import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../redux/requests/reducer";
import styles from "../ProjectInfo.module.scss";

const ProjectNameBox = () => {
  const dispatch = useDispatch();
  const selectedRequest = useSelector(selectRequestInfo);
  const name = selectedRequest?.projectInfoSettings?.name;
  const [isError, setIsError] = useState(false);
  return (
    <div
      className={styles.nR_inputContainer}
      id="nameInput"
      tabIndex={0}
      onBlur={() => {
        if (!name) {
          setIsError(true);
        }
      }}
    >
      <div className={styles.nR_inputContainer_header}>
        {" "}
        What is the name of this project?*
      </div>
      <input
        style={{ borderColor: isError ? "var(--red-dark)" : "" }}
        value={name}
        onChange={(e) => {
          setIsError(false);
          dispatch(
            updateDraftField({
              path: "projectInfoSettings.name",
              value: e.target.value,
            }),
          );
        }}
        className={styles.nR_inputContainer_input}
        placeholder="Please provide the project name..."
        type="text"
      />
      {isError && (
        <div className={styles.nR_inputContainer_error}>
          Please fill out all required fields to submit the form
        </div>
      )}
    </div>
  );
};

export default ProjectNameBox;
