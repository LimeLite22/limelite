import {
  StatusApproved,
  StatusApprovedBlack,
  StatusProgress,
  StatusProgressBlack,
  StatusUnavailable,
  StatusUnavailableBlack,
} from "assets/images";
import { APPROVED_TEXT_STATUS, IN_PROGRESS_TEXT_STATUS, UNAVAILABLE_TEXT_STATUS } from "consts/consts";
import useWindowWidth from "hooks/useWindowWidth";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/rootReducer";
import { wordsCalculator } from "utils/wordCalculator";

import {
  updateInterviewInfoSettings,
} from "../../../../../redux/requests/reducer";
import styles from "../../../NewRequest.module.scss";


const OwnScript = () => {
  const selectedRequest = useSelector((state: IRootState) => state.request.editDraft);
  const text = selectedRequest?.interviewSettings.questionsAuthorOwnSettings?.text;
  const status = selectedRequest?.interviewSettings.questionsAuthorOwnSettings?.scriptStatus;
  const dispatch = useDispatch();
  const width = useWindowWidth();
  const { minutes, seconds, words } = wordsCalculator(text || '');


  return (
    <div
      className={`
      ${styles.box}
      ${styles.box_submit}
      ${styles.box_xl}
      ${styles.box_expanded}
  `}
    >
      <div className={`${styles.box_container} ${styles.box_containerSubmit} `}>
        <div className={styles.box_text}>Script Status</div>
        <div className={styles.box_statuses}>
          <div
            className={`${styles.box_status} ${status === APPROVED_TEXT_STATUS ? styles.box_status_approved : ""} `}
            onClick={() => {
              selectedRequest?.interviewSettings && dispatch(updateInterviewInfoSettings({
                interviewInfoSettings: {
                  ...selectedRequest?.interviewSettings,
                  questionsAuthorOwnSettings: {
                    ...selectedRequest?.interviewSettings.questionsAuthorOwnSettings,
                    scriptStatus: APPROVED_TEXT_STATUS
                  }
                },
                isEdit: true
              })
              )
            }}
          >
            <img src={status === APPROVED_TEXT_STATUS ? StatusApprovedBlack : StatusApproved} alt="status" />
            {width > 768 ? 'Approved' : status === APPROVED_TEXT_STATUS ? 'Approved' : ''}
          </div>
          <div
            className={`${styles.box_status} ${status === IN_PROGRESS_TEXT_STATUS ? styles.box_status_approved : ""} `}
            onClick={() => {
              selectedRequest?.interviewSettings && dispatch(updateInterviewInfoSettings({
                interviewInfoSettings: {
                  ...selectedRequest?.interviewSettings,
                  questionsAuthorOwnSettings: {
                    ...selectedRequest?.interviewSettings.questionsAuthorOwnSettings,
                    scriptStatus: IN_PROGRESS_TEXT_STATUS
                  }
                },
                isEdit: true
              })
              )
            }}
          >
            <img src={status === IN_PROGRESS_TEXT_STATUS ? StatusProgressBlack : StatusProgress} alt="status" />
            {width > 768 ? 'Work in Progress' : status === IN_PROGRESS_TEXT_STATUS ? 'In Progress' : ''}
          </div>
          <div
            className={`${styles.box_status} ${status === UNAVAILABLE_TEXT_STATUS ? styles.box_status_approved : ""} `}
            onClick={() => {
              selectedRequest?.interviewSettings && dispatch(updateInterviewInfoSettings({
                interviewInfoSettings: {
                  ...selectedRequest?.interviewSettings,
                  questionsAuthorOwnSettings: {
                    ...selectedRequest?.interviewSettings.questionsAuthorOwnSettings,
                    scriptStatus: IN_PROGRESS_TEXT_STATUS
                  }
                },
                isEdit: true
              })
              )
            }}
          >
            <img src={status === UNAVAILABLE_TEXT_STATUS ? StatusUnavailableBlack : StatusUnavailable} alt="status" />
            {width > 768 ? 'Unavailable' : status === UNAVAILABLE_TEXT_STATUS ? 'Unavailable' : ''}
          </div>
        </div>
        <div className={styles.box_text}>Please paste your script below</div>

        <textarea
          className={styles.textarea}
          style={{
            resize: "none",
          }}
          placeholder={`Paste any details or web page URL' s with background information here...`}
          value={text}
          onChange={(e) => {
            selectedRequest?.interviewSettings && dispatch(updateInterviewInfoSettings({
              interviewInfoSettings: {
                ...selectedRequest?.interviewSettings,
                questionsAuthorOwnSettings: {
                  ...selectedRequest?.interviewSettings.questionsAuthorOwnSettings,
                  text: e.target.value
                }
              },
              isEdit: true
            })


            )
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
            {minutes > 2 && (
              <div className={styles.box_addressContainer_input_errorText}>
                Your text is over the suggested word limit.
              </div>
            )}
          </div>}
      </div>
    </div>
  );
};

export default OwnScript;
