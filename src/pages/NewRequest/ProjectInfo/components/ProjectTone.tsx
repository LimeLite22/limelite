import { GrayArrow } from "assets/images";
import { projectTones } from "consts/consts";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";

interface IProps {
  isSubmitMode?: boolean;
  onChange?: (value: string) => void;
}

const ToneSelector = ({ isSubmitMode, onChange }: IProps) => {
  const [isOpened, setOpened] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const showError = isError && !isOpened;
  const selectedRequest = useSelector(selectRequestInfo);
  const projectTone = selectedRequest?.projectInfoSettings.projectTone;
  const [currentTone, setCurrentTone] = useState(projectTone);
  return (
    <div
      className={`
      ${styles.dropdownType5}
      ${showError ? styles.dropdownType5_error : ""}
      ${isSubmitMode ? styles.dropdownType5_submit : ""}
      `}
      tabIndex={0}
      onBlur={() => {
        setOpened(false);
        if (!projectTone) {
          setIsError(true);
        }
      }}
    >
      {!isSubmitMode && <div className={styles.dropdownType5_header}>
        {" "}
        What is the tone for this project?*
      </div>}
      <div
        className={`
         ${styles.dropdownType5__selected} 
        ${showError ? styles.dropdownType5__selected_error : ""}
        ${isSubmitMode ? styles.dropdownType5__selected_submit : ""}
        `}
        onClick={() => {
          setOpened(!isOpened);
        }}
      >
        <div
          className={`
          ${styles.dropdownType5__selected_name}
          ${isSubmitMode ? styles.dropdownType5__item_name_submit : ""}`}
          style={{ borderColor: isError ? "var(--red-dark)" : "" }}
        >
          {isSubmitMode ? currentTone : projectTone || <span>Select your project type...</span>}{" "}
        </div>
        {isError && !isOpened && (
          <div className={styles.dropdownType5__selected_errorMessage}>
            Please fill out all required fields to submit the form
          </div>
        )}
        <img
          className={`
            ${styles.dropdownType5__selected_collapseIcon} 
            ${isOpened ? styles.dropdownType5__selected_collapseIcon_opened : ""}`}
          src={GrayArrow}
          alt="collapse"
        />
      </div>

      {isOpened && (
        <div className={styles.dropdownType5__itemsContainer}>
          {projectTones.map((option, index) => (
            <div
              style={{
                borderTopLeftRadius: index === 0 ? "4px" : "",
                borderTopRightRadius: index === 0 ? "4px" : "",
              }}
              className={styles.dropdownType5__item}
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
              <div className={styles.dropdownType5__item_name}>{option}</div>
            </div>
          ))}{" "}
        </div>
      )}
    </div>
  );
};

export default ToneSelector;
