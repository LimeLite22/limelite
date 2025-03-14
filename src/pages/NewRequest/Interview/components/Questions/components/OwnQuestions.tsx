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
import { APPROVED_TEXT_STATUS, IN_PROGRESS_TEXT_STATUS, QUESTIONS_AUTHOR_CLIENT, UNAVAILABLE_TEXT_STATUS } from "consts/consts";
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
  const interviewSettings = useSelector(selectRequestInfo)?.interviewSettings;
  const selection = interviewSettings?.questionsAuthor;
  const ownSettings = interviewSettings?.questionsAuthorOwnSettings;
  const text = ownSettings?.text;
  const status = ownSettings?.scriptStatus;
  const dispatch = useDispatch();
  const width = useWindowWidth();
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
    handleUpdateField(
      "interviewSettings.questionsAuthor",
      QUESTIONS_AUTHOR_CLIENT,
    );
    setIsExpanded(!isExpanded);
  };
  const { minutes, seconds, words } = wordsCalculator(text || '');

  return (
    <div
      className={`
    ${styles.box}
    ${selection === QUESTIONS_AUTHOR_CLIENT ? styles.box_selected : ""} 
    ${isExpanded ? styles.box_expanded : ""}`}
      onClick={() => {
        handleUpdateField(
          "interviewSettings.questionsAuthor",
          QUESTIONS_AUTHOR_CLIENT,
        );
        setIsExpanded(true);
      }}
    >
      <div className={styles.box_header}>
        <img
          className={styles.box_circle}
          src={
            selection === QUESTIONS_AUTHOR_CLIENT ? CheckBoxSelected : CheckBox
          }
          alt="CheckBox"
        />
        <span className={styles.box_title}>We'll write the questions</span>
        <div className={styles.box_title2}>
          We will write/provide the interview questions and talking points.
        </div>
      </div>
      <div className={styles.box_container}>
        <div className={styles.box_text}>Script Status</div>
        <div className={styles.box_statuses} style={{ border: isError.status ? "1px solid var(--red-dark)" : "" }}>
          <div
            className={`${styles.box_status} ${status === APPROVED_TEXT_STATUS ? styles.box_status_approved : ""} `}
            onClick={() => {
              handleUpdateField(
                `interviewSettings.questionsAuthorOwnSettings.scriptStatus`,
                APPROVED_TEXT_STATUS
              )
            }}
          >
            <img src={status === APPROVED_TEXT_STATUS ? StatusApprovedBlack : StatusApproved} alt="status" />
            {width > 768 ? 'Approved' : status === APPROVED_TEXT_STATUS ? 'Approved' : ''}
          </div>
          <div
            className={`${styles.box_status} ${status === IN_PROGRESS_TEXT_STATUS ? styles.box_status_approved : ""} `}
            onClick={() => {
              handleUpdateField(
                `interviewSettings.questionsAuthorOwnSettings.scriptStatus`,
                IN_PROGRESS_TEXT_STATUS
              )
            }}
          >
            <img src={status === IN_PROGRESS_TEXT_STATUS ? StatusProgressBlack : StatusProgress} alt="status" />
            {width > 768 ? 'Work in Progress' : status === IN_PROGRESS_TEXT_STATUS ? 'In Progress' : ''}
          </div>
          <div
            className={`${styles.box_status} ${status === UNAVAILABLE_TEXT_STATUS ? styles.box_status_approved : ""} `}
            onClick={() => {
              handleUpdateField(
                `interviewSettings.questionsAuthorOwnSettings.scriptStatus`,
                UNAVAILABLE_TEXT_STATUS
              )
            }}
          >
            <img src={status === UNAVAILABLE_TEXT_STATUS ? StatusUnavailableBlack : StatusUnavailable} alt="status" />
            {width > 768 ? 'Unavailable' : status === UNAVAILABLE_TEXT_STATUS ? 'Unavailable' : ''}
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
                `interviewSettings.questionsAuthorOwnSettings.text`,
                e.target.value,
              );
            }}
          ></textarea>
          {status === APPROVED_TEXT_STATUS &&
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
