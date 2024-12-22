import { type FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GrayArrow } from "assets/images";

import { projectTypes } from "consts/consts";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../redux/requests/reducer";
import styles from "../ProjectInfo.module.scss";

interface IProps {
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectType: FC<IProps> = ({ isError, setIsError }) => {
  const [isOpened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const showError = isError && !isOpened;

  const selectedRequest = useSelector(selectRequestInfo);
  const projectType = selectedRequest?.projectType;
  return (
    <div
      className={`${styles.typeDropdown} ${showError ? styles.typeDropdown_error : ""}`}
      tabIndex={0}
      onBlur={() => {
        if (!projectType) {
          setOpened(false);
          setIsError(true);
        }
      }}
    >
      <div className={styles.typeDropdown_header}>
        {" "}
        What type of project do you need?*
      </div>
      <div
        className={`${styles.typeDropdown__selected} ${showError ? styles.typeDropdown__selected_error : ""}`}
        onClick={() => {
          setOpened(!isOpened);
        }}
      >
        <div
          className={`${styles.typeDropdown__selected_name}`}
          style={{ borderColor: isError ? "var(--red-dark)" : "" }}
        >
          {projectType || <span>Select your project type...</span>}{" "}
        </div>
        {isError && !isOpened && (
          <div className={`${styles.typeDropdown__selected_errorMessage}`}>
            Please fill out all required fields to submit the form
          </div>
        )}
        <img
          className={`
          ${styles.typeDropdown__selected_collapseIcon} 
          ${isOpened ? styles.typeDropdown__selected_collapseIcon_opened : ""} `}
          src={GrayArrow}
          alt="collapse"
        />
      </div>

      {isOpened && (
        <div className={styles.typeDropdown__itemsContainer}>
          {projectTypes.map((option, index) => (
            <div
              style={{
                borderTopLeftRadius: index === 0 ? "4px" : "",
                borderTopRightRadius: index === 0 ? "4px" : "",
              }}
              className={styles.typeDropdown__item}
              key={index}
              onClick={() => {
                dispatch(
                  updateDraftField({
                    path: "projectType",
                    value: option,
                  }),
                );
                setIsError(false);
                setOpened(false);
              }}
            >
              <div className={styles.typeDropdown__item_name}>{option}</div>
            </div>
          ))}{" "}
        </div>
      )}
    </div>
  );
};

export default ProjectType;
