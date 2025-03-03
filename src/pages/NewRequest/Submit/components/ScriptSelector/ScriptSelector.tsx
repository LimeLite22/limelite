
import { CheckBox, CheckBoxSelected, CloseCalendar, GrayArrow } from "assets/images";
import { DEFAULT, OWN_SCRIPT, PROFESSIONAL_SCRIPT } from "consts/consts";
import { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/rootReducer";

import OwnScript from "./OwnScript";
import { selectRequestInfo, updateScriptInfoSettings } from "../../../../../redux/requests/reducer";
import styles from "../../../NewRequest.module.scss";
import ProffessionalScript from "./ProfessionalScript";
const ScriptSelector = () => {
  const dispatch = useDispatch();
  const lIS = useSelector(selectRequestInfo)?.scriptSettings;
  const eLIS = useSelector((state: IRootState) => state.request.editDraft)?.scriptSettings;
  const [isOpened, setOpened] = useState(false);
  const isOwnScriptNotReady = eLIS?.ownText.length === 0 || eLIS?.scriptStatus === DEFAULT;
  const isProffScriptNotReady = eLIS?.backgroundInfo.length === 0 || eLIS?.name.length === 0 || String(eLIS?.phone).length === 0 || eLIS?.email === "";
  const handleSave = () => {

    if (eLIS?.scriptWriter === OWN_SCRIPT && isOwnScriptNotReady) {
      return
    }
    if (eLIS?.scriptWriter === PROFESSIONAL_SCRIPT && isProffScriptNotReady) {
      return
    }

    dispatch(updateScriptInfoSettings({
      scriptInfoSettings: eLIS,
      isEdit: false
    }))
  }
  const handleCancel = () => {
    lIS && dispatch(updateScriptInfoSettings({
      scriptInfoSettings: lIS,
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
      <div className={styles.dd_header}>Who will write the script?</div>
      <div
        className={`
        ${styles.dd_selected} 
        `}
        onClick={() => {
          setOpened(!isOpened);
        }}
      >
        <div className={styles.dd_name}>
          {eLIS?.scriptWriter === OWN_SCRIPT && <> We'll write the script</>}
          {eLIS?.scriptWriter === PROFESSIONAL_SCRIPT && <>A professional scriptwriter<div className={styles.dd_addOn} >+795</div></>}
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
              dispatch(updateScriptInfoSettings({
                scriptInfoSettings: {
                  ...eLIS,
                  scriptWriter: OWN_SCRIPT
                },
                isEdit: true
              }))
            }}
          >
            <div className={styles.dd_name}>
              <img src={eLIS?.scriptWriter === OWN_SCRIPT ? CheckBoxSelected : CheckBox} alt="" />We'll write the script</div>
          </div>
          <div
            className={styles.dd_item}
            onClick={() => {
              setOpened(false);
              dispatch(updateScriptInfoSettings({
                scriptInfoSettings: {
                  ...eLIS,
                  scriptWriter: PROFESSIONAL_SCRIPT
                },
                isEdit: true
              }))
            }}
          >
            <div className={styles.dd_name}>
              <img src={eLIS?.scriptWriter === PROFESSIONAL_SCRIPT ? CheckBoxSelected : CheckBox} alt="" />
              A professional scriptwriter<div className={styles.dd_addOn} >+795</div></div>
          </div>
        </div>
      )}
      {eLIS?.scriptWriter !== lIS?.scriptWriter &&
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
              <div className={styles.popUp_text}>You're changing <span>{lIS?.scriptWriter}</span> to <span>{eLIS?.scriptWriter}</span>.
                If the new option isn't an add-on, the current one will be removed. If it has a
                different price, the estimated total will update automatically</div>
              {eLIS?.scriptWriter === OWN_SCRIPT && <OwnScript />}
              {eLIS?.scriptWriter === PROFESSIONAL_SCRIPT && <ProffessionalScript />}
              <div className={styles.popUp_buttons}>
                <div className={styles.popUp_cancel} onClick={handleCancel}>Keep without changing</div>
                <div className={`${styles.popUp_save} 
                ${(isOwnScriptNotReady && eLIS?.scriptWriter === OWN_SCRIPT) || (isProffScriptNotReady && eLIS?.scriptWriter === PROFESSIONAL_SCRIPT) ? styles.popUp_save_disabled : ""}
                `} onClick={handleSave}>Save & Update</div>
              </div>
            </div>

          </div>,
          document.body,
        )}
    </div>
  );
};

export default ScriptSelector;
