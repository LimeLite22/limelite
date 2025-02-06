import { GrayArrow } from "assets/images";
import { projectTypes } from "consts/consts";
import { IProjectTypeInfo } from "interfaces/interfaces";
import { type FC, useState } from "react";
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
  onChange?: (value: IProjectTypeInfo) => void;
}

const ProjectType: FC<IProps> = ({ isError, setIsError, isSubmitMode, onChange }) => {
  const [isOpened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const showError = isError && !isOpened;

  const selectedRequest = useSelector(selectRequestInfo);
  const projectType = selectedRequest?.projectInfoSettings?.projectType;
  const [currentType, setCurrentType] = useState(projectType);
  const handleType = (option: IProjectTypeInfo) => {
    if (isSubmitMode) {
      setCurrentType(option);
      onChange && onChange(option);
    } else {
      dispatch(
        updateDraftField({
          path: "projectInfoSettings.projectType",
          value: option,
        }),
      );
    }

    setIsError(false);
    setOpened(false);
  }
  const handleBlur = () => {
    if (!projectType) {
      setOpened(false);
      setIsError(true);
    }
  }
  const handleToggler = () => {
    setOpened(!isOpened);
  }
  return (
    <div
      className={`
      ${styles.typeDropdown} 
      ${showError ? styles.typeDropdown_error : ""}
      ${isSubmitMode ? styles.typeDropdown_submit : ""}
       `}
      tabIndex={0}
      onBlur={handleBlur}
    >
      {!isSubmitMode && <div className={styles.typeDropdown_header}>
        {" "}
        What type of project do you need?*
      </div>}
      <div
        className={`
        ${styles.typeDropdown__selected}
        ${isSubmitMode ? styles.typeDropdown__selected_submit : ""}
         ${showError ? styles.typeDropdown__selected_error : ""}`}
        onClick={handleToggler}
      >
        <div
          className={`
          ${styles.typeDropdown__selected_name}
          ${isSubmitMode ? styles.typeDropdown__selected_name_submit : ''}
          `}
          style={{ borderColor: isError ? "var(--red-dark)" : "" }}
        >
          {isSubmitMode ? currentType?.header : projectType?.header !== '' ? projectType?.header : <span>Select your project type...</span>}{" "}
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
              onClick={() => handleType(option)}
            >
              <div className={styles.typeDropdown__item_name}>{option.header}</div>
            </div>
          ))}{" "}
        </div>
      )}
    </div>
  );
};

export default ProjectType;
