
import styles from "../../../NewRequest.module.scss";

import { CheckBox, CheckBoxSelected, CloseCalendar, GrayArrow } from "assets/images";
import { DEFAULT, QUESTIONS_AUTHOR_CLIENT, QUESTIONS_AUTHOR_PROFESSIONAL } from "consts/consts";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestInfo, updateInterviewInfoSettings } from "../../../../../redux/requests/reducer";
import { IRootState } from "redux/rootReducer";
import ReactDOM from "react-dom";
import OwnInterviewQuestions from "./OwnInterviewQuestions";
import ProffInterviewQuestion from "./ProffInterviewQuestions";
const InterviewQuestionsSelector = () => {
  const dispatch = useDispatch();
  const iIS = useSelector(selectRequestInfo)?.interviewSettings;
  const eiIS = useSelector((state: IRootState) => state.request.editDraft)?.interviewSettings;
  const [isOpened, setOpened] = useState(false);
  const isOwnQuestionsNotReady = eiIS?.questionsAuthorOwnSettings.text.length === 0 || eiIS?.questionsAuthorOwnSettings.scriptStatus === DEFAULT;
  const isProffQuestionsNotReady =
    eiIS?.questionsAuthorProfSettings.backgroundInfo.length === 0 ||
    eiIS?.questionsAuthorProfSettings.subject.length === 0 ||
    String(eiIS?.questionsAuthorProfSettings.phone).length === 0 ||
    eiIS?.questionsAuthorProfSettings.email.length === 0;
  const handleSave = () => {

    if (eiIS?.questionsAuthor === QUESTIONS_AUTHOR_CLIENT && isOwnQuestionsNotReady) {
      return
    }
    if (eiIS?.questionsAuthor === QUESTIONS_AUTHOR_PROFESSIONAL && isProffQuestionsNotReady) {
      return
    }

    dispatch(updateInterviewInfoSettings({
      interviewInfoSettings: eiIS,
      isEdit: false
    }))
  }
  const handleCancel = () => {
    iIS && dispatch(updateInterviewInfoSettings({
      interviewInfoSettings: iIS,
      isEdit: true
    }))

  }

  return (
    <div className={`
    ${styles.dd}
    
    `}
      tabIndex={0}
      onBlur={() => {
        setOpened(false);
      }}
    >
      <div className={styles.dd_header}>Who will write the interview questions?*</div>
      <div
        className={`
        ${styles.dd_selected} 
        `}
        onClick={() => {
          setOpened(!isOpened);
        }}
      >
        <div className={styles.dd_name}>
          {eiIS?.questionsAuthor === QUESTIONS_AUTHOR_CLIENT && <> We'll write the questions</>}
          {eiIS?.questionsAuthor === QUESTIONS_AUTHOR_PROFESSIONAL && <>A professional interviewer<div className={styles.dd_addOn} >+795</div></>}
        </div>
        <img
          className={`${styles.dd_selected_collapseIcon} ${isOpened ? styles.dd_selected_collapseIcon_opened : ""}`}
          src={GrayArrow}
          alt="collapse"
        />
      </div>

      {isOpened && (
        <div className={styles.dd_itemsContainer}>
          <div
            className={styles.dd_item}
            onClick={() => {
              setOpened(false);
              dispatch(updateInterviewInfoSettings({
                interviewInfoSettings: {
                  ...eiIS,
                  questionsAuthor: QUESTIONS_AUTHOR_CLIENT
                },
                isEdit: true
              }))
            }}
          >
            <div className={styles.dd_name}>
              <img src={eiIS?.questionsAuthor === QUESTIONS_AUTHOR_CLIENT ? CheckBoxSelected : CheckBox} alt="" />We'll write the questions</div>
          </div>
          <div
            className={styles.dd_item}
            onClick={() => {
              setOpened(false);
              dispatch(updateInterviewInfoSettings({
                interviewInfoSettings: {
                  ...eiIS,
                  questionsAuthor: QUESTIONS_AUTHOR_PROFESSIONAL
                },
                isEdit: true
              }))
            }}
          >
            <div className={styles.dd_name}>
              <img src={eiIS?.questionsAuthor === QUESTIONS_AUTHOR_PROFESSIONAL ? CheckBoxSelected : CheckBox} alt="" />
              A professional interviewer<div className={styles.dd_addOn} >+795</div></div>
          </div>
        </div>
      )}
      {eiIS?.questionsAuthor !== iIS?.questionsAuthor &&
        ReactDOM.createPortal(
          <div className={styles.popUp}>
            <div className={styles.popUp_content}>
              <div className={styles.popUp_header}>Modify selected Add-ons
                <div className={styles.popUp_closeContainer}>
                  <img
                    onClick={handleCancel}
                    src={CloseCalendar}
                    className={"popUp_content_close"}
                    alt="Close"
                  />
                </div></div>
              <div className={styles.popUp_text}>You're changing <span>{iIS?.questionsAuthor}</span> to <span>{eiIS?.questionsAuthor}</span>.
                If the new option isn't an add-on, the current one will be removed. If it has a
                different price, the estimated total will update automatically</div>
              {eiIS?.questionsAuthor === QUESTIONS_AUTHOR_CLIENT && <OwnInterviewQuestions />}
              {eiIS?.questionsAuthor === QUESTIONS_AUTHOR_PROFESSIONAL && <ProffInterviewQuestion />}
              <div className={styles.popUp_buttons}>
                <div className={styles.popUp_cancel} onClick={handleCancel}>Keep without changing</div>
                <div className={`${styles.popUp_save} 
                ${(isOwnQuestionsNotReady && eiIS?.questionsAuthor === QUESTIONS_AUTHOR_CLIENT) || (isProffQuestionsNotReady && eiIS?.questionsAuthor === QUESTIONS_AUTHOR_PROFESSIONAL) ? styles.popUp_save_disabled : ""}
                `} onClick={handleSave}>Save & Update</div>
              </div>
            </div>

          </div>,
          document.body,
        )}
    </div>
  );
};

export default InterviewQuestionsSelector;
