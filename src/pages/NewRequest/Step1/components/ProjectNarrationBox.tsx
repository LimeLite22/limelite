import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SquareCheckbox, SquareCheckboxSelected } from "assets/images";

import useWindowWidth from "hooks/useWindowWidth";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../redux/requests/reducer";
import styles from "../NewRequestStep1.module.scss";

interface IProps {
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectNarrationBox = ({ isError, setIsError }: IProps) => {
  const selectedRequest = useSelector(selectRequestInfo);
  const approachList = selectedRequest?.approachList;
  const dispatch = useDispatch();
  const width = useWindowWidth();
  const [isWarning, setIsWarning] = useState(false);
  const handleWarning = () => {
    setIsWarning(true);
    setTimeout(() => {
      setIsWarning(false);
    }, 1500);
  };

  const handleItemClick = (item: string) => {
    let list = [...(approachList || [])];
    if (item === "None") {
      setIsError(false);
      dispatch(
        updateDraftField({
          path: "approachList",
          value: ["None"],
        }),
      );
      return;
    }
    if (list?.length === 2 && !list?.includes(item)) {
      handleWarning();
      return;
    }
    if (item !== "None") {
      if (list.includes(item)) {
        list = list.filter((i) => i !== item);
      } else if (list.length < 2) {
        list.push(item);
      }

      list = list.filter((i) => i !== "None");
      setIsError(false);
      dispatch(
        updateDraftField({
          path: "approachList",
          value: list,
        }),
      );
    }
  };

  return (
    <div
      className={styles.nR_inputContainer}
      tabIndex={0}
      onBlur={() => {
        if (approachList?.length === 0) {
          setIsError(true);
        }
      }}
    >
      <div className={styles.nR_inputContainer_header}>
        {" "}
        Narration approach
        <span style={{ color: isWarning ? "red" : "" }}>
          {" "}
          {"(Maximum of Two)*"}
        </span>
      </div>
      <div className={styles.nR_inputContainer_checkboxes}>
        <div
          className={styles.nR_inputContainer_checkbox}
          style={{ order: width < 768 ? 2 : "unset" }}
          onClick={() => {
            handleItemClick("Candid Interview");
          }}
        >
          <img
            src={
              approachList?.includes("Candid Interview")
                ? SquareCheckboxSelected
                : SquareCheckbox
            }
            alt="CheckBox"
          />
          Candid Interview
        </div>
        <div
          className={styles.nR_inputContainer_checkbox}
          style={{ order: width < 768 ? 3 : "unset" }}
          onClick={() => {
            handleItemClick("Scripted Delivery");
          }}
        >
          <img
            src={
              approachList?.includes("Scripted Delivery")
                ? SquareCheckboxSelected
                : SquareCheckbox
            }
            alt="CheckBox"
          />
          Scripted Delivery
        </div>
        <div
          className={styles.nR_inputContainer_checkbox}
          style={{ order: width < 768 ? 1 : "unset" }}
          onClick={() => {
            handleItemClick("Voiceover");
          }}
        >
          <img
            src={
              approachList?.includes("Voiceover")
                ? SquareCheckboxSelected
                : SquareCheckbox
            }
            alt="CheckBox"
          />
          Voiceover
        </div>
        <div
          className={styles.nR_inputContainer_checkbox}
          style={{ order: width < 768 ? 4 : "unset" }}
          onClick={() => {
            handleItemClick("None");
          }}
        >
          <img
            src={
              approachList?.includes("None")
                ? SquareCheckboxSelected
                : SquareCheckbox
            }
            alt="CheckBox"
          />
          None
        </div>
      </div>
      {isError && (
        <div className="typeDropdown__selected_errorMessage">
          Please fill out all required fields to submit the form
        </div>
      )}
    </div>
  );
};

export default ProjectNarrationBox;
