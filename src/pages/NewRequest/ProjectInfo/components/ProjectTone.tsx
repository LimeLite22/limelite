import { GrayArrow } from "assets/images";
import { projectTones } from "consts/consts";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../redux/requests/reducer";
import styles from "../ProjectInfo.module.scss";

interface IProps {
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitMode?: boolean;
  onChange?: (value: string) => void;
}

const ToneSelector = ({ isError, setIsError, isSubmitMode, onChange }: IProps) => {
  const [isOpened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const showError = isError && !isOpened;
  const selectedRequest = useSelector(selectRequestInfo);
  const projectTone = selectedRequest?.projectInfoSettings.projectTone;
  const [currentTone, setCurrentTone] = useState(projectTone);
  return (
    <div
      className={`
      ${styles.toneDropdown}
      ${showError ? styles.toneDropdown_error : ""}
      ${isSubmitMode ? styles.toneDropdown_submit : ""}
      `}
      tabIndex={0}
      onBlur={() => {
        if (!projectTone) {
          setOpened(false);
          setIsError(true);
        }
      }}
    >
      {!isSubmitMode && <div className={styles.toneDropdown_header}>
        {" "}
        What is the tone for this project?*
      </div>}
      <div
        className={`
         ${styles.toneDropdown__selected} 
        ${showError ? styles.toneDropdown__selected_error : ""}
        ${isSubmitMode ? styles.toneDropdown__selected_submit : ""}
        `}
        onClick={() => {
          setOpened(!isOpened);
        }}
      >
        <div
          className={`
          ${styles.toneDropdown__selected_name}
          ${isSubmitMode ? styles.toneDropdown__item_name_submit : ""}`}
          style={{ borderColor: isError ? "var(--red-dark)" : "" }}
        >
          {isSubmitMode ? currentTone : projectTone || <span>Select your project type...</span>}{" "}
        </div>
        {isError && !isOpened && (
          <div className={styles.toneDropdown__selected_errorMessage}>
            Please fill out all required fields to submit the form
          </div>
        )}
        <img
          className={`
            ${styles.toneDropdown__selected_collapseIcon} 
            ${isOpened ? styles.toneDropdown__selected_collapseIcon_opened : ""}`}
          src={GrayArrow}
          alt="collapse"
        />
      </div>

      {isOpened && (
        <div className={styles.toneDropdown__itemsContainer}>
          {projectTones.map((option, index) => (
            <div
              style={{
                borderTopLeftRadius: index === 0 ? "4px" : "",
                borderTopRightRadius: index === 0 ? "4px" : "",
              }}
              className={styles.toneDropdown__item}
              key={index}
              onClick={() => {
                if (!isSubmitMode) {
                  dispatch(
                    updateDraftField({
                      path: "projectInfoSettings.projectTone",
                      value: option,
                    }),
                  );
                } else {
                  onChange && onChange(option);
                  setCurrentTone(option);
                }

                setIsError(false);
                setOpened(false);
              }}
            >
              <div className={styles.toneDropdown__item_name}>{option}</div>
            </div>
          ))}{" "}
        </div>
      )}
    </div>
  );
};

export default ToneSelector;
