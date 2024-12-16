import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CheckBox,
  CheckBoxSelected,
  Expand,
  StatusApproved,
  StatusProgress,
  StatusUnavailable,
} from "assets/images";

import { OWN_SCRIPT } from "consts/consts";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../../../redux/requests/reducer";
import styles from "../../../../NewRequest.module.scss";

interface IProps {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  isError: {
    text: boolean;
  };
}
const OwnScript = ({ isExpanded, setIsExpanded, isError }: IProps) => {
  const selectedRequest = useSelector(selectRequestInfo);
  const selection = selectedRequest?.scriptSettings?.scriptWriter;
  const [textStatus, setTextStatus] = useState(0);
  const text = selectedRequest?.scriptSettings?.ownText;
  const dispatch = useDispatch();
  const [wordCount, setWordCount] = useState(0);
  const handleUpdateField = (
    path: string,
    value: typeof OWN_SCRIPT | string,
  ) => {
    dispatch(
      updateDraftField({
        path,
        value,
      }),
    );
  };

  const handleSelect = () => {
    handleUpdateField("scriptSettings.scriptWriter", OWN_SCRIPT);
    setIsExpanded(true);
  };
  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    handleUpdateField("scriptSettings.scriptWriter", OWN_SCRIPT);
    setIsExpanded(!isExpanded);
  };

  const calculateTime = (wordCount: number) => {
    const minutes = Math.floor(wordCount / 150);
    const seconds = Math.floor(((wordCount % 150) * 60) / 150);
    return { minutes, seconds };
  };
  const { minutes, seconds } = calculateTime(wordCount);
  useEffect(() => {
    const words = text
      ?.trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    setWordCount(words || 0);
  }, [text]);

  return (
    <div
      className={`
    ${styles.box}
    ${selection === OWN_SCRIPT ? styles.box_selected : ""} 
    ${isExpanded ? styles.box_expanded : ""}`}
      onClick={handleSelect}
    >
      <div className={styles.box_header}>
        <img
          className={styles.box_circle}
          src={selection === OWN_SCRIPT ? CheckBoxSelected : CheckBox}
          alt="CheckBox"
        />
        <span className={styles.box_title}>We'll write the script</span>
        <div className={styles.box_title2}>
          We will provide a script for this video that is 3 minutes
        </div>
      </div>
      <div className={styles.box_container}>
        <div className={styles.box_text}>Script Status</div>
        <div className={styles.box_statuses}>
          <div
            className={`${styles.box_status} ${textStatus === 0 ? styles.box_status_approved : ""} `}
            onClick={() => setTextStatus(0)}
          >
            <img src={StatusApproved} alt="status" />
            Approved
          </div>
          <div
            className={`${styles.box_status} ${textStatus === 1 ? styles.box_status_approved : ""} `}
            onClick={() => setTextStatus(1)}
          >
            <img src={StatusProgress} alt="status" />
            In Progress
          </div>
          <div
            className={`${styles.box_status} ${textStatus === 2 ? styles.box_status_approved : ""} `}
            onClick={() => setTextStatus(2)}
          >
            <img src={StatusUnavailable} alt="status" />
            Unavailable
          </div>
        </div>
        <div className={styles.box_text}>Please paste your script below</div>

        <textarea
          className={styles.textarea}
          style={{
            resize: "none",
            border: isError.text ? "1px solid var(--red-dark)" : "",
          }}
          placeholder={`Paste any details or web page URL' s with background information here...`}
          value={text}
          onChange={(e) => {
            handleUpdateField("scriptSettings.ownText", e.target.value);
          }}
        ></textarea>

        <div className={styles.textareaContainer}>
          <div className={styles.textarea_estimate}>
            <div>
              Estimated narration time:
              <span style={{ color: minutes > 2 ? "var(--red-dark)" : "" }}>
                <span className={styles.textarea_estimate_number}>
                  {" "}
                  {minutes}{" "}
                </span>{" "}
                Min and
                <span className={styles.textarea_estimate_number}>
                  {" "}
                  {seconds}{" "}
                </span>{" "}
                Sec
              </span>
            </div>
            <div className={styles.textarea_estimate_words}>
              <span style={{ color: minutes > 2 ? "var(--red-dark)" : "" }}>
                {wordCount}
              </span>
              /450 words
            </div>
          </div>
          {isError.text && (
            <div className={styles.box_addressContainer_input_errorText}>
              Please complete the fields before proceeding
            </div>
          )}
          {minutes > 2 && (
            <div className={styles.box_addressContainer_input_errorText}>
              Your text is over the suggested word limit.
            </div>
          )}
        </div>
      </div>
      <img
        onClick={(e) => handleExpand(e)}
        src={Expand}
        alt="Expand"
        className={styles.box_expand}
      />
    </div>
  );
};

export default OwnScript;
