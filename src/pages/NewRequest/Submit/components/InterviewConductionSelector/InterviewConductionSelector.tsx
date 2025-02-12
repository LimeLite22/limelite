
import styles from "../../../NewRequest.module.scss";

import { CheckBox, CheckBoxSelected, CloseCalendar, GrayArrow } from "assets/images";
import { QUESTIONS_ON_LOCATION, QUESTIONS_VIRTUALLY, VIRTUAL_INTERVIEW } from "consts/consts";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestInfo, updateInterviewInfoSettings } from "../../../../../redux/requests/reducer";
import { IRootState } from "redux/rootReducer";
import ReactDOM from "react-dom";
import QuestionsOnLocation from "./InterviewOnLocation";
import VirtualInterview from "./VirtualInterview";
import VirtualQuestionsInput from "./VirtualQuestionsInput";
const InterviewConductionSelector = () => {
  const dispatch = useDispatch();
  const iIS = useSelector(selectRequestInfo)?.interviewSettings;
  const eiIS = useSelector((state: IRootState) => state.request.editDraft)?.interviewSettings;
  const [isOpened, setOpened] = useState(false);
  const isLocationNotReady =
    eiIS?.questionSettings.locationSettings.name.length === 0 ||
    eiIS?.questionSettings.locationSettings.phone === "" ||
    eiIS?.questionSettings.locationSettings.email.length === 0;
  const isVirtualNotReady =
    eiIS?.questionSettings.virtualSettings.name.length === 0 ||
    eiIS?.questionSettings.virtualSettings.phone === "" ||
    eiIS?.questionSettings.virtualSettings.email.length === 0;
  const handleSave = () => {

    if (eiIS?.questionSettings.type === QUESTIONS_ON_LOCATION && isLocationNotReady) {
      return
    }
    if (eiIS?.questionSettings.type === QUESTIONS_VIRTUALLY && isVirtualNotReady) {
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
      <div className={styles.dd_header}>Who will conduct the interview(s)?</div>
      <div
        className={`
        ${styles.dd_selected} 
        `}
        onClick={() => {
          setOpened(!isOpened);
        }}
      >
        <div className={styles.dd_name}>
          {eiIS?.questionSettings.type === QUESTIONS_ON_LOCATION && <> We'll do it on location</>}
          {eiIS?.questionSettings.type === QUESTIONS_VIRTUALLY && <>We'll do it virtually<div className={styles.dd_addOn} >+695</div></>}
          {eiIS?.questionSettings.type === VIRTUAL_INTERVIEW && <>A proffessional interview<div className={styles.dd_addOn} >+695</div></>}
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
                  questionSettings: {
                    ...eiIS?.questionSettings,
                    type: QUESTIONS_ON_LOCATION
                  }

                },
                isEdit: true
              }))
            }}
          >
            <div className={styles.dd_name}>
              <img src={eiIS?.questionSettings.type === QUESTIONS_ON_LOCATION ? CheckBoxSelected : CheckBox} alt="" />We'll do it on location</div>
          </div>
          <div
            className={styles.dd_item}
            onClick={() => {
              setOpened(false);
              dispatch(updateInterviewInfoSettings({
                interviewInfoSettings: {
                  ...eiIS,
                  questionSettings: {
                    ...eiIS?.questionSettings,
                    type: QUESTIONS_VIRTUALLY
                  }
                },
                isEdit: true
              }))
            }}
          >
            <div className={styles.dd_name}>
              <img src={eiIS?.questionSettings.type === QUESTIONS_VIRTUALLY ? CheckBoxSelected : CheckBox} alt="" />
              We'll do it virtually<div className={styles.dd_addOn} >+695</div></div>
          </div>
          <div
            className={styles.dd_item}
            onClick={() => {
              setOpened(false);
              dispatch(updateInterviewInfoSettings({
                interviewInfoSettings: {
                  ...eiIS,
                  questionSettings: {
                    ...eiIS?.questionSettings,
                    type: VIRTUAL_INTERVIEW
                  }
                },
                isEdit: true
              }))
            }}
          >
            <div className={styles.dd_name}>
              <img src={eiIS?.questionSettings.type === VIRTUAL_INTERVIEW ? CheckBoxSelected : CheckBox} alt="" />
              A proffessional interview<div className={styles.dd_addOn} >+695</div></div>
          </div>
        </div>
      )}
      {iIS?.questionSettings.type !== eiIS?.questionSettings.type &&
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
              <div className={styles.popUp_text}>You're changing <span>{iIS?.questionSettings.type}</span> to <span>{eiIS?.questionSettings.type}</span>.
                If the new option isn't an add-on, the current one will be removed. If it has a
                different price, the estimated total will update automatically</div>
              {eiIS?.questionSettings.type === QUESTIONS_ON_LOCATION && <QuestionsOnLocation />}
              {eiIS?.questionSettings.type === QUESTIONS_VIRTUALLY && <VirtualQuestionsInput />}
              {eiIS?.questionSettings.type === VIRTUAL_INTERVIEW && <VirtualInterview />}

              <div className={styles.popUp_buttons}>
                <div className={styles.popUp_cancel} onClick={handleCancel}>Keep without changing</div>
                <div className={`${styles.popUp_save} 
                ${(isLocationNotReady && eiIS?.questionSettings.type === QUESTIONS_ON_LOCATION)
                    || (isVirtualNotReady && eiIS?.questionSettings.type === QUESTIONS_VIRTUALLY)
                    ? styles.popUp_save_disabled : ""}
                `} onClick={handleSave}>Save & Update</div>
              </div>
            </div>

          </div>,
          document.body,
        )}
    </div>
  );
};

export default InterviewConductionSelector;
