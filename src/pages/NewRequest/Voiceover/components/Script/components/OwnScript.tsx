import {
  CheckBox,
  CheckBoxSelected,
  Expand,
  StatusApproved,
  StatusApprovedBlack,
  StatusProgress,
  StatusProgressBlack,
  StatusUnavailable,
  StatusUnavailableBlack,
} from "assets/images";
import { APPROVED_TEXT_STATUS, IN_PROGRESS_TEXT_STATUS, OWN_SCRIPT, UNAVAILABLE_TEXT_STATUS } from "consts/consts";
import useWindowWidth from "hooks/useWindowWidth";
import { useDispatch, useSelector } from "react-redux";
import { wordsCalculator } from "utils/wordCalculator";

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
    status: boolean;
  };
}
const OwnQuestions = ({ isExpanded, setIsExpanded, isError }: IProps) => {
  const selectedRequest = useSelector(selectRequestInfo);
  const selection = selectedRequest?.voiceTrackSettings.scriptAuthor;
  const textStatus = selectedRequest?.voiceTrackSettings.scriptAuthorOwnSettings.scriptStatus;
  const text = selectedRequest?.voiceTrackSettings.scriptAuthorOwnSettings.text;
  const width = useWindowWidth();
  const dispatch = useDispatch();
  const handleUpdateField = (path: string, value: string) => {
    dispatch(
      updateDraftField({
        path,
        value,
      }),
    );
  };
  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    handleUpdateField("voiceTrackSettings.scriptAuthor", OWN_SCRIPT);
    setIsExpanded(!isExpanded);
  };
  const { minutes, seconds, words } = wordsCalculator(text || '');


  return (
    <div
      className={`
    ${styles.box}
    ${selection === OWN_SCRIPT ? styles.box_selected : ""} 
    ${isExpanded ? styles.box_expanded : ""}`}
      onClick={() => {
        handleUpdateField("voiceTrackSettings.scriptAuthor", OWN_SCRIPT);
        setIsExpanded(true);
      }}
    >
      <div className={styles.box_header}>
        <img
          className={styles.box_circle}
          src={selection === OWN_SCRIPT ? CheckBoxSelected : CheckBox}
          alt="CheckBox"
        />
        <span className={styles.box_title}>We'll provide the script</span>
        <div className={styles.box_title2}>
          We will provide a script that is 3 minutes for this video.
        </div>
      </div>
      <div className={styles.box_container}>
        <div className={styles.box_text}>Script Status</div>
        <div className={styles.box_statuses} style={{ border: isError.status ? "1px solid var(--red-dark)" : "" }}>
          <div
            className={`${styles.box_status} ${textStatus === APPROVED_TEXT_STATUS ? styles.box_status_approved : ""} `}
            onClick={() => handleUpdateField("voiceTrackSettings.scriptAuthorOwnSettings.scriptStatus", APPROVED_TEXT_STATUS)}
          >
            <img src={textStatus === APPROVED_TEXT_STATUS ? StatusApprovedBlack : StatusApproved} alt="status" />
            {width > 768 ? 'Approved' : textStatus === APPROVED_TEXT_STATUS ? 'Approved' : ''}
          </div>
          <div
            className={`${styles.box_status} ${textStatus === IN_PROGRESS_TEXT_STATUS ? styles.box_status_approved : ""} `}
            onClick={() => handleUpdateField("voiceTrackSettings.scriptAuthorOwnSettings.scriptStatus", IN_PROGRESS_TEXT_STATUS)}
          >
            <img src={textStatus === IN_PROGRESS_TEXT_STATUS ? StatusProgressBlack : StatusProgress} alt="status" />
            {width > 768 ? 'Work in Progress' : textStatus === IN_PROGRESS_TEXT_STATUS ? 'In Progress' : ''}
          </div>
          <div
            className={`${styles.box_status} ${textStatus === UNAVAILABLE_TEXT_STATUS ? styles.box_status_approved : ""} `}
            onClick={() => handleUpdateField("voiceTrackSettings.scriptAuthorOwnSettings.scriptStatus", UNAVAILABLE_TEXT_STATUS)}
          >
            <img src={textStatus === UNAVAILABLE_TEXT_STATUS ? StatusUnavailableBlack : StatusUnavailable} alt="status" />
            {width > 768 ? 'Unavailable' : textStatus === UNAVAILABLE_TEXT_STATUS ? 'Unavailable' : ''}
          </div>
        </div>
        <div className={styles.box_text}>Please paste your script below</div>
        <div className={styles.textareaContainer}>
          <textarea
            className={styles.textarea}
            style={{
              resize: "none",
              border: isError.text ? "1px solid var(--red-dark)" : "",
            }}
            placeholder={`Paste any details or web page URL' s with background information here...`}
            value={text}
            onChange={(e) => {
              handleUpdateField(
                `voiceTrackSettings.scriptAuthorOwnSettings.text`,
                e.target.value,
              );
            }}
          ></textarea>
          {textStatus === APPROVED_TEXT_STATUS &&
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
                    {words}
                  </span>
                  /450 words
                </div>
              </div>
              {minutes > 2 && (
                <div className={styles.box_addressContainer_input_errorText}>
                  Your text is over the suggested word limit.
                </div>
              )}
            </div>}
          {isError.text && (
            <div className={styles.box_addressContainer_input_errorText}>
              Please complete the fields before proceeding
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

export default OwnQuestions;
