
import { CheckBox, CheckBoxSelected, CloseCalendar, GrayArrow } from "assets/images";
import { DEFAULT, TRACK_AUTHOR_CLIENT, TRACK_AUTHOR_PROFESSIONAL } from "consts/consts";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/rootReducer";

import OwnTrack from "./OwnTrack";
import { selectRequestInfo, updateVoiceoverSettings } from "../../../../../redux/requests/reducer";
import styles from "../../../NewRequest.module.scss";
import ProffTrack from "./ProffTrack";
const VoiceoverTrackSelector = () => {
  const dispatch = useDispatch();
  const vIS = useSelector(selectRequestInfo)?.voiceTrackSettings;
  const eVIS = useSelector((state: IRootState) => state?.request.editDraft)?.voiceTrackSettings;
  const [isOpened, setOpened] = useState(false);
  const isOwnTrackNotReady = eVIS?.track === DEFAULT;
  const handleSave = () => {

    if (eVIS?.trackAuthor === TRACK_AUTHOR_CLIENT && isOwnTrackNotReady) {
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
  useEffect(() => {
  }
    , [])

  return (
    <div className={`
    ${styles.dd}
    `}
      tabIndex={0}
      onBlur={() => {
        setOpened(false);
      }}
    >
      <div className={styles.dd_header}>Who will provide the voice track?*</div>
      <div
        className={`
        ${styles.dd_selected} 
        `}
        onClick={() => {
          setOpened(!isOpened);
        }}
      >
        <div className={styles.dd_name}>
          {eVIS?.trackAuthor === TRACK_AUTHOR_CLIENT && <> We'll provide the voice track</>}
          {eVIS?.trackAuthor === TRACK_AUTHOR_PROFESSIONAL && <>A professional voice artist<div className={styles.dd_addOn} >+795</div></>}
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
                  trackAuthor: TRACK_AUTHOR_CLIENT
                },
                isEdit: true
              }))
            }}
          >
            <div className={styles.dd_name}>
              <img src={eVIS?.trackAuthor === TRACK_AUTHOR_CLIENT ? CheckBoxSelected : CheckBox} alt="" />We'll provide the voice track</div>
          </div>
          <div
            className={styles.dd_item}
            onClick={() => {
              setOpened(false);
              dispatch(updateVoiceoverSettings({
                voiceTrackSettings: {
                  ...eVIS,
                  trackAuthor: TRACK_AUTHOR_PROFESSIONAL
                },
                isEdit: true
              }))
            }}
          >
            <div className={styles.dd_name}>
              <img src={eVIS?.trackAuthor === TRACK_AUTHOR_PROFESSIONAL ? CheckBoxSelected : CheckBox} alt="" />
              A professional voice artist<div className={styles.dd_addOn} >+795</div></div>
          </div>
        </div>
      )}
      {vIS?.trackAuthor !== eVIS?.trackAuthor &&
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
              <div className={styles.popUp_text}>You're changing <span>{vIS?.trackAuthor}</span> to <span>{eVIS?.trackAuthor}</span>.
                If the new option isn't an add-on, the current one will be removed. If it has a
                different price, the estimated total will update automatically</div>
              {eVIS?.trackAuthor === TRACK_AUTHOR_CLIENT && <OwnTrack />}
              {eVIS?.trackAuthor === TRACK_AUTHOR_PROFESSIONAL && <ProffTrack />}
              <div className={styles.popUp_buttons}>
                <div className={styles.popUp_cancel} onClick={handleCancel}>Keep without changing</div>
                <div className={`${styles.popUp_save} 
                ${(isOwnTrackNotReady && eVIS?.trackAuthor === TRACK_AUTHOR_CLIENT) ? styles.popUp_save_disabled : ""}
                `} onClick={handleSave}>Save & Update</div>
              </div>
            </div>

          </div>,
          document.body,
        )}
    </div>
  );
};

export default VoiceoverTrackSelector;
