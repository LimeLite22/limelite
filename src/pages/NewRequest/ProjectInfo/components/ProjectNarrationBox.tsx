import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useWindowWidth from "hooks/useWindowWidth";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../redux/requests/reducer";
import styles from "../ProjectInfo.module.scss";
import { CANDID_APPROACH, EDIT_ONLY, NO_APPROACH, SCRIPTED_APPROACH, VOICEOVER_APPROACH } from "consts/consts";
import { TApproachValue } from "types/types";

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

  const handleItemClick = (item: TApproachValue) => {
    let list = [...(approachList || [])];
    if (item === NO_APPROACH) {
      setIsError(false);
      dispatch(
        updateDraftField({
          path: "approachList",
          value: [NO_APPROACH],
        }),
      );
      return;
    }
    if (list?.length === 2 && !list?.includes(item)) {
      handleWarning();
      return;
    }
    if (list.includes(item)) {
      list = list.filter((i) => i !== item);
    } else if (list.length < 2) {
      list.push(item);
    }

    list = list.filter((i) => i !== NO_APPROACH);
    setIsError(false);
    dispatch(
      updateDraftField({
        path: "approachList",
        value: list,
      }),
    );
  };
  if (selectedRequest?.option?.value === EDIT_ONLY) {
    return <></>
  }

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
          className={styles.requestTypeContainer_item}
          style={{
            order: width < 768 ? 2 : "unset",
            border: approachList?.includes(CANDID_APPROACH) ? '1px solid var(--green-dark2)' : '',
            boxShadow: approachList?.includes(CANDID_APPROACH) ? "0 0 0 1px var(--green-dark2) " : '',
          }}
          onClick={() => {
            handleItemClick(CANDID_APPROACH);
          }}
        >
          Candid Interview
        </div>
        <div
          className={styles.requestTypeContainer_item}
          style={{
            order: width < 768 ? 3 : "unset",
            border: approachList?.includes(SCRIPTED_APPROACH) ? '1px solid var(--green-dark2)' : '',
            boxShadow: approachList?.includes(SCRIPTED_APPROACH) ? "0 0 0 1px var(--green-dark2) " : '',
          }}
          onClick={() => {
            handleItemClick(SCRIPTED_APPROACH);
          }}
        >
          Scripted Delivery
        </div>
        <div
          className={styles.requestTypeContainer_item}
          style={{
            order: width < 768 ? 1 : "unset",
            border: approachList?.includes(VOICEOVER_APPROACH) ? '1px solid var(--green-dark2)' : '',
            boxShadow: approachList?.includes(VOICEOVER_APPROACH) ? "0 0 0 1px var(--green-dark2) " : '',
          }}
          onClick={() => {
            handleItemClick(VOICEOVER_APPROACH);
          }}
        >
          Voiceover
        </div>
        <div
          className={styles.requestTypeContainer_item}
          style={{
            order: width < 768 ? 4 : "unset",
            border: approachList?.includes(NO_APPROACH) ? '1px solid var(--green-dark2)' : '',
            boxShadow: approachList?.includes(NO_APPROACH) ? "0 0 0 1px var(--green-dark2) " : '',
          }}
          onClick={() => {
            handleItemClick(NO_APPROACH);
          }}
        >
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
