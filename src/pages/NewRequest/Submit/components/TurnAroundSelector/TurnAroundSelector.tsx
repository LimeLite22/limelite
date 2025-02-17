
import styles from "../../../NewRequest.module.scss";

import { CheckBox, CheckBoxSelected, CloseCalendar, GrayArrow, Note } from "assets/images";
import { NO, OWN_ADDRESS, RUSH_TIME, STANDARD_TIME, YES } from "consts/consts";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestInfo, updateLogisticInfoSettings, updateVideoEditSettings } from "../../../../../redux/requests/reducer";
import { IRootState } from "redux/rootReducer";
import ReactDOM from "react-dom";
import DefaultSlider from "pages/NewRequest/components/DefaultSlider";
import { addCommas } from "utils/truncateString";
import ZoneSelector from "pages/NewRequest/components/ZoneSelector/ZoneSelector";
import RushTimeSelector from "pages/NewRequest/components/RushTimeSelector/RushTimeSelector";

const TurnAroundSelector = () => {
  const isSubmit = false;
  const dispatch = useDispatch();
  const lIS = useSelector(selectRequestInfo)!.videoSettings;
  const eLIS = useSelector((state: IRootState) => state.request.editDraft)?.videoSettings;
  const [isOpened, setOpened] = useState(false);
  const isOwnAdressNotReady = eLIS.time.name === null;
  const handleSave = () => {

    if (eLIS?.resultTime === RUSH_TIME && isOwnAdressNotReady) {
      return
    }

    dispatch(updateVideoEditSettings({
      videoSettings: eLIS,
      isEdit: false
    }))
  }
  const handleCancel = () => {
    dispatch(updateVideoEditSettings({
      videoSettings: eLIS,
      isEdit: true
    }))
  }

  return (
    <div className={`
    ${styles.dd}
    ${isSubmit ? styles.dd_submit : ""}
    `}
      tabIndex={0}
      onBlur={() => {
        setOpened(false);
      }}
    >
      <div className={styles.dd_header}>Turnaround</div>
      <div
        className={`
        ${styles.dd_selected} 
        ${isSubmit ? styles.dd_selected_submit : ""}
        `}
        onClick={() => {
          setOpened(!isOpened);
        }}
      >
        <div className={styles.dd_name}>
          {lIS?.resultTime === STANDARD_TIME && <> {STANDARD_TIME}</>}
          {eLIS?.resultTime === RUSH_TIME && <> {RUSH_TIME} <div className={styles.dd_addOn} >+ {lIS?.time.value}</div></>}
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
                  ...lIS,
                  resultTime: STANDARD_TIME
                },
                isEdit: true
              }))

            }}
          >
            <div className={styles.dd_name}>
              <img src={lIS?.resultTime === STANDARD_TIME ? CheckBoxSelected : CheckBox} alt="" />{STANDARD_TIME}</div>
          </div>
          <div
            className={styles.dd_item}
            onClick={() => {
              setOpened(false);
              dispatch(updateVideoEditSettings({
                videoSettings: {
                  ...lIS,
                  resultTime: RUSH_TIME
                },
                isEdit: true
              }))
            }}
          >
            <div className={styles.dd_name}>
              <img src={lIS?.resultTime === RUSH_TIME ? CheckBoxSelected : CheckBox} alt="" />
              {YES} {Number(lIS?.time.value) > 0 && <div className={styles.dd_addOn}>Add-on</div>}</div>
          </div>
        </div>
      )}
      {lIS?.resultTime !== eLIS?.resultTime &&
        ReactDOM.createPortal(
          <div className={styles.popUp}>
            <div className={styles.popUp_content} style={{ overflow: 'visible' }}>
              <div className={styles.popUp_header}>Modify selected Add-ons
                <div className={styles.popUp_closeContainer}>
                  <img
                    onClick={handleCancel}
                    src={CloseCalendar}
                    className={"popUp_content_close"}
                    alt="Close"
                  />
                </div></div>
              <div className={styles.popUp_text}>You're changing <span>{lIS?.resultTime}</span> to <span>{eLIS?.resultTime}</span>.
                If the new option isn't an add-on, the current one will be removed. If it has a
                different price, the estimated total will update automatically</div>
              {eLIS.resultTime === STANDARD_TIME && <div className={styles.box_title2} style={{ marginBottom: '24px' }}>
                The shoot will take place in the local area
                <span>(i.e., 50 miles)</span>
              </div>}
              {eLIS.resultTime === RUSH_TIME && <div className={`${styles.box_container} ${styles.box_containerSubmit} `}>
                <div className={styles.box_content}>
                  <DefaultSlider />
                  <div className={styles.box_content_info}>
                    <div
                      className={styles.box_content_info_header}
                    >
                      Premium Add-on:
                      <span className={styles.box_content_info_header_addOn}>
                        +$
                        {eLIS.time.value === 0
                          ? "TBD"
                          : eLIS.time.value && addCommas(eLIS.time.value)}
                      </span>
                    </div>
                    <div className={styles.box_content_info_text}>
                      "LimeLite GO"" allows you to schedule a shoot anywhere in the
                      continental US for a flat rate surcharge.
                      <br /> Zones are based on proximity to your primary place of
                      business and/or billing address. Price covers additional travel
                      and related expenses.
                    </div>
                    <div className={styles.box_zone}>
                      <RushTimeSelector
                        onChange={() => {


                        }}
                        isError={false}
                        isEdit={true}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.box_subText}>
                  <img src={Note} alt="TravelIcon" /> Note: You will have an
                  opportunity to enter a discount code for any for a Standard Add-ons
                  during check-out
                </div>
              </div>}
              <div className={styles.popUp_buttons}>
                <div className={styles.popUp_cancel} onClick={handleCancel}>Keep without changing</div>
                <div className={`${styles.popUp_save} ${(eLIS?.resultTime === RUSH_TIME && isOwnAdressNotReady) ? styles.popUp_save_disabled : ""}`} onClick={handleSave}>Save & Update</div>
              </div>
            </div>

          </div>,
          document.body,
        )}
    </div>
  );
};

export default TurnAroundSelector;
