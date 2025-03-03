
import { CheckBox, CheckBoxSelected, CloseCalendar, GrayArrow, Note } from "assets/images";
import { NO, OWN_ADDRESS, YES } from "consts/consts";
import DefaultSlider from "pages/NewRequest/components/DefaultSlider";
import ZoneSelector from "pages/NewRequest/components/ZoneSelector/ZoneSelector";
import { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/rootReducer";
import { addCommas } from "utils/truncateString";

import { selectRequestInfo, updateLogisticInfoSettings } from "../../../../../redux/requests/reducer";
import styles from "../../../NewRequest.module.scss";

const ZoneSubmitSelector = () => {
  const isSubmit = false;
  const dispatch = useDispatch();
  const lIS = useSelector(selectRequestInfo)?.logisticSettings;
  const eLIS = useSelector((state: IRootState) => state.request.editDraft)?.logisticSettings;
  const [isOpened, setOpened] = useState(false);
  const isOwnAdressNotReady = eLIS.travel.zoneCode.name === null;
  const handleSave = () => {

    if (eLIS?.travel.selection === YES && isOwnAdressNotReady) {
      return
    }

    dispatch(updateLogisticInfoSettings({
      logisticInfoSettings: eLIS,
      isEdit: false
    }))
  }
  const handleCancel = () => {
    lIS && dispatch(updateLogisticInfoSettings({
      logisticInfoSettings: lIS,
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
      <div className={styles.dd_header}>Is travel required for this shoot?</div>
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
          {lIS?.travel.selection === NO && <> {NO}</>}
          {lIS?.travel.selection === YES && <> {YES} <div className={styles.dd_addOn} >+ {lIS?.travel.zoneCode.value}</div></>}
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
              dispatch(updateLogisticInfoSettings({
                logisticInfoSettings: {
                  ...eLIS,
                  travel: {
                    ...eLIS.travel,
                    selection: NO
                  }
                },
                isEdit: true
              }))
            }}
          >
            <div className={styles.dd_name}>
              <img src={lIS?.travel.selection === NO ? CheckBoxSelected : CheckBox} alt="" />No</div>
          </div>
          <div
            className={styles.dd_item}
            onClick={() => {
              setOpened(false);
              dispatch(updateLogisticInfoSettings({
                logisticInfoSettings: {
                  ...eLIS,
                  travel: {
                    ...eLIS.travel,
                    selection: YES
                  }
                },
                isEdit: true
              }))
            }}
          >
            <div className={styles.dd_name}>
              <img src={lIS?.travel.selection === YES ? CheckBoxSelected : CheckBox} alt="" />
              {YES} {Number(lIS?.travel?.zoneCode?.value) > 0 && <div className={styles.dd_addOn}>Add-on</div>}</div>
          </div>
        </div>
      )}
      {lIS?.travel.selection !== eLIS?.travel.selection &&
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
              <div className={styles.popUp_text}>You're changing <span>{lIS?.travel.selection}</span> to <span>{eLIS?.travel.selection}</span>.
                If the new option isn't an add-on, the current one will be removed. If it has a
                different price, the estimated total will update automatically</div>
              {eLIS.travel.selection === NO && <div className={styles.box_title2} style={{ marginBottom: '24px' }}>
                The shoot will take place in the local area
                <span>(i.e., 50 miles)</span>
              </div>}
              {eLIS.travel.selection === YES && <div className={`${styles.box_container} ${styles.box_containerSubmit} `}>
                <div className={styles.box_content}>
                  <DefaultSlider />
                  <div className={styles.box_content_info}>
                    <div
                      className={styles.box_content_info_header}
                    >
                      Premium Add-on:
                      <span className={styles.box_content_info_header_addOn}>
                        +$
                        {eLIS.travel.zoneCode?.value === 0
                          ? "TBD"
                          : eLIS.travel.zoneCode?.value && addCommas(eLIS.travel.zoneCode?.value)}
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
                      <ZoneSelector
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
                <div className={`${styles.popUp_save} ${(eLIS?.location?.type === OWN_ADDRESS && isOwnAdressNotReady) ? styles.popUp_save_disabled : ""}`} onClick={handleSave}>Save & Update</div>
              </div>
            </div>

          </div>,
          document.body,
        )}
    </div>
  );
};

export default ZoneSubmitSelector;
