import { GrayArrow } from "assets/images";
import { projectTypes } from "consts/consts";
import { IProjectTypeInfo } from "interfaces/interfaces";
import { type FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";

interface IProps {
  isSubmitMode?: boolean;
  onChange?: (value: IProjectTypeInfo) => void;
}

const ProjectType: FC<IProps> = ({ isSubmitMode, onChange }) => {
  const [isOpened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const showError = isError && !isOpened;

  const selectedRequest = useSelector(selectRequestInfo);
  const type = selectedRequest?.projectInfoSettings?.type;
  const [currentType, setCurrentType] = useState(type);
  const handleType = (option: IProjectTypeInfo) => {
    if (isSubmitMode) {
      setCurrentType(option);
      onChange && onChange(option);
    } else {
      dispatch(
        updateDraftField({
          path: "projectInfoSettings.type",
          value: option,
        }),
      );
    }

    setIsError(false);
    setOpened(false);
  }
  const handleBlur = () => {
    setOpened(false);
    if (!type) {
      setIsError(true);
    }
  }
  const handleToggler = () => {
    setOpened(!isOpened);
  }
  return (
    <div
      className={`
      ${styles.dropdownType5} 
      ${showError ? styles.dropdownType5_error : ""}
      ${isSubmitMode ? styles.dropdownType5_submit : ""}
       `}
      tabIndex={0}
      onBlur={handleBlur}
    >
      {!isSubmitMode && <div className={styles.dropdownType5_header}>
        {" "}
        What type of project do you need?*
      </div>}
      <div
        className={`
        ${styles.dropdownType5__selected}
        ${isSubmitMode ? styles.dropdownType5__selected_submit : ""}
         ${showError ? styles.dropdownType5__selected_error : ""}`}
        onClick={handleToggler}
      >
        <div
          className={`
          ${styles.dropdownType5__selected_name}
          ${isSubmitMode ? styles.dropdownType5__selected_name_submit : ''}
          `}
          style={{ borderColor: isError ? "var(--red-dark)" : "" }}
        >
          {isSubmitMode ? currentType?.header : type?.header !== '' ? type?.header : <span>Select your project type...</span>}{" "}
        </div>
        {isError && !isOpened && (
          <div className={`${styles.dropdownType5__selected_errorMessage}`}>
            Please fill out all required fields to submit the form
          </div>
        )}
        <img
          className={`
          ${styles.dropdownType5__selected_collapseIcon} 
          ${isOpened ? styles.dropdownType5__selected_collapseIcon_opened : ""} `}
          src={GrayArrow}
          alt="collapse"
        />
      </div>

      {isOpened && (
        <div className={styles.dropdownType5__itemsContainer}>
          {projectTypes.map((option, index) => (
            <div
              style={{
                borderTopLeftRadius: index === 0 ? "4px" : "",
                borderTopRightRadius: index === 0 ? "4px" : "",
              }}
              className={styles.dropdownType5__item}
              key={index}
              onClick={() => handleType(option)}
            >
              <div className={styles.dropdownType5__item_name}>{option.header}</div>
            </div>
          ))}{" "}
        </div>
      )}
    </div>
  );
};

export default ProjectType;
