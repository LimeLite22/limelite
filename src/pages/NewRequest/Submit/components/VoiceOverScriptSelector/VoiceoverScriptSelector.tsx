
import { CheckBox, CheckBoxSelected, CloseCalendar, GrayArrow } from "assets/images";
import { DEFAULT, OWN_SCRIPT, PROFESSIONAL_SCRIPT } from "consts/consts";
import { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/rootReducer";

import OwnScript from "./OwnScript";
import { selectRequestInfo, updateVoiceoverSettings } from "../../../../../redux/requests/reducer";
import styles from "../../../NewRequest.module.scss";
import ProffessionalScript from "./ProfessionalScript";
const VoiceoverScriptSelector = () => {
  const dispatch = useDispatch();
  const vIS = useSelector(selectRequestInfo)?.voiceTrackSettings;
  const eVIS = useSelector((state: IRootState) => state.request.editDraft)?.voiceTrackSettings;
  const [isOpened, setOpened] = useState(false);
  const isOwnScriptNotReady = eVIS?.scriptAuthorOwnSettings.text.length === 0 || eVIS?.scriptAuthorOwnSettings.scriptStatus === DEFAULT;
  const isProffScriptNotReady = eVIS?.scriptAuthorProfSettings.subject.length === 0 ||
    String(eVIS?.scriptAuthorProfSettings.phone).length === 0 ||
    eVIS?.scriptAuthorProfSettings.email.length === 0 ||
    eVIS?.scriptAuthorProfSettings.backgroundInfo.length === 0;
  ;
  const handleSave = () => {

    if (eVIS?.scriptAuthor === OWN_SCRIPT && isOwnScriptNotReady) {
      return
    }
    if (eVIS?.scriptAuthor === PROFESSIONAL_SCRIPT && isProffScriptNotReady) {
      return
    }

    dispatch(updateVoiceoverSettings({
      voiceTrackSettings: eVIS,
      isEdit: false
    }))
  }
  const handleCancel = () => {
    vIS && dispatch(updateVoiceoverSettings({
      voiceTrackSettings: vIS,
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
      <div className={styles.dd_header}>Who will write the voiceover script?</div>
      <div
        className={`
        ${styles.dd_selected} 
        `}
        onClick={() => {
          setOpened(!isOpened);
        }}
      >
        <div className={styles.dd_name}>
          {eVIS?.scriptAuthor === OWN_SCRIPT && <> We'll write the script</>}
          {eVIS?.scriptAuthor === PROFESSIONAL_SCRIPT && <>A professional scriptwriter<div className={styles.dd_addOn} >+895</div></>}
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
              dispatch(updateVoiceoverSettings({
                voiceTrackSettings: {
                  ...eVIS,
                  scriptAuthor: OWN_SCRIPT
                },
                isEdit: true
              }))
            }}
          >
            <div className={styles.dd_name}>
              <img src={eVIS?.scriptAuthor === OWN_SCRIPT ? CheckBoxSelected : CheckBox} alt="" />We'll write the script</div>
          </div>
          <div
            className={styles.dd_item}
            onClick={() => {
              setOpened(false);
              dispatch(updateVoiceoverSettings({
                voiceTrackSettings: {
                  ...eVIS,
                  scriptAuthor: PROFESSIONAL_SCRIPT
                },
                isEdit: true
              }))
            }}
          >
            <div className={styles.dd_name}>
              <img src={eVIS?.scriptAuthor === PROFESSIONAL_SCRIPT ? CheckBoxSelected : CheckBox} alt="" />
              A professional scriptwriter<div className={styles.dd_addOn} >+895</div></div>
          </div>
        </div>
      )}
      {eVIS?.scriptAuthor !== vIS?.scriptAuthor &&
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
              <div className={styles.popUp_text}>You're changing <span>{vIS?.scriptAuthor}</span> to <span>{eVIS?.scriptAuthor}</span>.
                If the new option isn't an add-on, the current one will be removed. If it has a
                different price, the estimated total will update automatically</div>
              {eVIS?.scriptAuthor === OWN_SCRIPT && <OwnScript />}
              {eVIS?.scriptAuthor === PROFESSIONAL_SCRIPT && <ProffessionalScript />}
              <div className={styles.popUp_buttons}>
                <div className={styles.popUp_cancel} onClick={handleCancel}>Keep without changing</div>
                <div className={`${styles.popUp_save} 
                ${(isOwnScriptNotReady && eVIS?.scriptAuthor === OWN_SCRIPT) || (isProffScriptNotReady && eVIS?.scriptAuthor === PROFESSIONAL_SCRIPT) ? styles.popUp_save_disabled : ""}
                `} onClick={handleSave}>Save & Update</div>
              </div>
            </div>

          </div>,
          document.body,
        )}
    </div>
  );
};

export default VoiceoverScriptSelector;
