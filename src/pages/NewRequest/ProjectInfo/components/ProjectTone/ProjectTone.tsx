import "./ProjectTone.scss";

import { GrayArrow } from "assets/images";
import { projectTones } from "consts/consts";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../../redux/requests/reducer";

interface IProps {
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitMode?: boolean;
}

const ToneSelector = ({ isError, setIsError, isSubmitMode }: IProps) => {
  const [isOpened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const showError = isError && !isOpened;
  const selectedRequest = useSelector(selectRequestInfo);
  const projectTone = selectedRequest?.projectTone;
  return (
    <div
      className={`
      typeDropdown 
      ${showError ? "typeDropdown_error" : ""}
      ${isSubmitMode ? "typeDropdown_submit" : ""}
      `}
      tabIndex={0}
      onBlur={() => {
        if (!projectTone) {
          setOpened(false);
          setIsError(true);
        }
      }}
    >
      {!isSubmitMode && <div className="typeDropdown_header">
        {" "}
        What is the tone for this project?*
      </div>}
      <div
        className={`
        typeDropdown__selected 
        ${showError ? "typeDropdown__selected_error" : ""}
        ${isSubmitMode ? "typeDropdown__selected_submit" : ""}
        `}
        onClick={() => {
          setOpened(!isOpened);
        }}
      >
        <div
          className={`typeDropdown__selected_name ${isSubmitMode ? "typeDropdown__item_name_submit" : ""}`}
          style={{ borderColor: isError ? "var(--red-dark)" : "" }}
        >
          {projectTone || <span>Select your project type...</span>}{" "}
        </div>
        {isError && !isOpened && (
          <div className="typeDropdown__selected_errorMessage">
            Please fill out all required fields to submit the form
          </div>
        )}
        <img
          className={`typeDropdown__selected_collapseIcon ${isOpened ? "typeDropdown__selected_collapseIcon_opened" : ""}`}
          src={GrayArrow}
          alt="collapse"
        />
      </div>

      {isOpened && (
        <div className="typeDropdown__itemsContainer">
          {projectTones.map((option, index) => (
            <div
              style={{
                borderTopLeftRadius: index === 0 ? "4px" : "",
                borderTopRightRadius: index === 0 ? "4px" : "",
              }}
              className="typeDropdown__item"
              key={index}
              onClick={() => {
                dispatch(
                  updateDraftField({
                    path: "projectTone",
                    value: option,
                  }),
                );
                setIsError(false);
                setOpened(false);
              }}
            >
              <div className={`typeDropdown__item_name`}>{option}</div>
            </div>
          ))}{" "}
        </div>
      )}
    </div>
  );
};

export default ToneSelector;
