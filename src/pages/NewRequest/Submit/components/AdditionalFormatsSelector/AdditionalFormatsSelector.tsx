
import styles from "../../../NewRequest.module.scss";

import { CheckBox, CheckBoxSelected, CloseCalendar, GrayArrow } from "assets/images";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestInfo, updateVideoEditSettings } from "../../../../../redux/requests/reducer";
import { IRootState } from "redux/rootReducer";
import ReactDOM from "react-dom";
const AdditionalFormatsSelector = () => {
  const dispatch = useDispatch();
  const vIS = useSelector(selectRequestInfo)?.videoSettings;
  const eVIS = useSelector((state: IRootState) => state?.request.editDraft)?.videoSettings;
  const [isOpened, setOpened] = useState(false);
  // const isOwnScriptNotReady = eLIS?.ownText.length === 0 || eLIS?.scriptStatus === DEFAULT;
  // const isProffScriptNotReady = eLIS?.backgroundInfo.length === 0 || eLIS?.name.length === 0 || String(eLIS?.phone).length === 0 || eLIS?.email === "";
  const handleSave = () => {

    // if (eLIS?.scriptWriter === OWN_SCRIPT && isOwnScriptNotReady) {
    //   return
    // }
    // if (eLIS?.scriptWriter === PROFESSIONAL_SCRIPT && isProffScriptNotReady) {
    //   return
    // }
    dispatch(updateVideoEditSettings({
      videoSettings: eVIS,
      isEdit: false
    }))
  }
  const handleCancel = () => {
    vIS && dispatch(updateVideoEditSettings({
      videoSettings: vIS,
      isEdit: true
    })
    )
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
      <div className={styles.dd_header}>Do you need additional/social formats?*</div>
      <div
        className={`
        ${styles.dd_selected} 
        `}
        onClick={() => {
          setOpened(!isOpened);
        }}
      >
        <div className={styles.dd_name}>
          {eVIS.additionalFormats === false && <> No</>}
          {eVIS.additionalFormats === true && <>Yes<div className={styles.dd_addOn} >+95</div></>}
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
              dispatch(updateVideoEditSettings({
                videoSettings: {
                  ...eVIS,
                  additionalFormats: false
                },
                isEdit: true
              }))
            }}
          >
            <div className={styles.dd_name}>
              <img src={eVIS.additionalFormats === false ? CheckBoxSelected : CheckBox} alt="" />No</div>
          </div>
          <div
            className={styles.dd_item}
            onClick={() => {
              setOpened(false);
              dispatch(updateVideoEditSettings({
                videoSettings: {
                  ...eVIS,
                  additionalFormats: true
                },
                isEdit: true
              }))
            }}
          >
            <div className={styles.dd_name}>
              <img src={eVIS.additionalFormats === true ? CheckBoxSelected : CheckBox} alt="" />
              Yes<div className={styles.dd_addOn} >+95</div></div>
          </div>
        </div>
      )}
      {eVIS.additionalFormats !== vIS?.additionalFormats &&
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
              <div className={styles.popUp_text}>You're changing <span>{vIS?.additionalFormats ? "Yes" : "No"}</span> to <span>{eVIS.additionalFormats ? "Yes" : "No"}</span>.
                If the new option isn't an add-on, the current one will be removed. If it has a
                different price, the estimated total will update automatically</div>
              <div className={styles.popUp_buttons}>
                <div className={styles.popUp_cancel} onClick={handleCancel}>Keep without changing</div>
                <div className={`${styles.popUp_save} 
                `} onClick={handleSave}>Save & Update</div>
              </div>
            </div>

          </div>,
          document.body,
        )}
    </div>
  );
};

export default AdditionalFormatsSelector;
