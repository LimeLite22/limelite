
import { CheckBox, CheckBoxSelected, CloseCalendar, GrayArrow } from "assets/images";
import { HOME_RENTAL, OWN_ADDRESS, STUDIO_RENTAL } from "consts/consts";
import { type FC, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/rootReducer";

import styles from "../../../NewRequest.module.scss";
import Address from "./AddressInput";
import HomeRental from "./HomeRentalInput";
import StudioRental from "./StudioRentalInput";
import { selectRequestInfo, updateLogisticInfoSettings } from "../../../../../redux/requests/reducer";

interface IProps {
  // value: TVideoDuration;
  // onChange: (value: TVideoDuration) => void;
  // isError?: boolean;
  // isSubmit?: boolean;
}
// dd = duration dropdown
const ZoneSelector: FC<IProps> = () => {
  const isSubmit = false;
  const dispatch = useDispatch();
  const lIS = useSelector(selectRequestInfo)?.logisticSettings;
  const eLIS = useSelector((state: IRootState) => state.request.editDraft)?.logisticSettings;
  const type = eLIS.location.type;
  const [isOpened, setOpened] = useState(false);
  const isOwnAdressNotReady = eLIS?.location?.street?.length === 0 || eLIS?.location?.city?.length === 0 || eLIS?.location?.state?.length === 0 || eLIS?.location?.zip?.length === 0 || eLIS?.location?.company?.length === 0;
  console.log('isOwnAdressNotReady', isOwnAdressNotReady);
  const handleSave = () => {

    if (eLIS?.location?.type === OWN_ADDRESS && isOwnAdressNotReady) {
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
      <div className={styles.dd_header}>What is the location for this shoot?</div>
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
          {type === OWN_ADDRESS && <> We'll provide the address</>}
          {type === STUDIO_RENTAL && <>We'd like a studio rental<div className={styles.dd_addOn} >+795</div></>}
          {type === HOME_RENTAL && <>We'd like a home rental<div className={styles.dd_addOn} >+695</div></>}
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
            className={`${styles.dd_item} ${lIS?.location?.type === OWN_ADDRESS ? styles.dd_item_selected : ''}`}
            onClick={() => {
              setOpened(false);
              dispatch(updateLogisticInfoSettings({
                logisticInfoSettings: {
                  ...eLIS,
                  location: {
                    ...eLIS.location,
                    type: OWN_ADDRESS
                  }
                },
                isEdit: true
              }))
            }}
          >
            <div className={styles.dd_name}>
              <img src={lIS?.location?.type === OWN_ADDRESS ? CheckBoxSelected : CheckBox} alt="" /> We'll provide the address</div>
          </div>
          <div
            className={`${styles.dd_item} ${lIS?.location?.type === STUDIO_RENTAL ? styles.dd_item_selected : ''}`}
            onClick={() => {
              setOpened(false);
              dispatch(updateLogisticInfoSettings({
                logisticInfoSettings: {
                  ...eLIS,
                  location: {
                    ...eLIS.location,
                    type: STUDIO_RENTAL
                  }
                },
                isEdit: true
              }))
            }}
          >
            <div className={styles.dd_name}>
              <img src={lIS?.location?.type === STUDIO_RENTAL ? CheckBoxSelected : CheckBox} alt="" />
              We'd like a studio rental<div className={styles.dd_addOn} >+795</div></div>
          </div>
          <div
            className={`${styles.dd_item} ${lIS?.location?.type === HOME_RENTAL ? styles.dd_item_selected : ''}`}
            onClick={() => {
              setOpened(false);
              dispatch(updateLogisticInfoSettings({
                logisticInfoSettings: {
                  ...eLIS,
                  location: {
                    ...eLIS.location,
                    type: HOME_RENTAL
                  }
                },
                isEdit: true
              }))
            }}
          >
            <div className={styles.dd_name}>
              <img src={lIS?.location?.type === HOME_RENTAL ? CheckBoxSelected : CheckBox} alt="" />
              We'd like a home rental<div className={styles.dd_addOn}>+695</div></div>
          </div>
        </div>
      )}
      {lIS?.location.type !== type &&
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
              <div className={styles.popUp_text}>You're changing <span>{lIS?.location.type}</span> to <span>{type}</span>.
                If the new option isn't an add-on, the current one will be removed. If it has a
                different price, the estimated total will update automatically</div>
              {eLIS.location.type === STUDIO_RENTAL && <StudioRental />}
              {eLIS.location.type === HOME_RENTAL && <HomeRental />}
              {eLIS.location.type === OWN_ADDRESS && <Address />}
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

export default ZoneSelector;
