
import styles from "../../../NewRequest.module.scss";

import { CheckBox, CheckBoxSelected, CloseCalendar, GrayArrow, Note } from "assets/images";
import { BASIC_THUMBNAIL, CUSTOM_THUMBNAIL, NO_THUMBNAIL } from "consts/consts";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestInfo, updateVideoEditSettings } from "../../../../../redux/requests/reducer";
import { IRootState } from "redux/rootReducer";
import ReactDOM from "react-dom";
import DefaultSlider from "pages/NewRequest/components/DefaultSlider";
const ThumbnailSelector = () => {
  const dispatch = useDispatch();
  const vIS = useSelector(selectRequestInfo)?.videoSettings;
  const eVIS = useSelector((state: IRootState) => state?.request.editDraft)?.videoSettings;
  const [isOpened, setOpened] = useState(false);
  const handleSave = () => {
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
      <div className={styles.dd_header}>Do you need a thumbnail?*</div>
      <div
        className={`
        ${styles.dd_selected} 
        `}
        onClick={() => {
          setOpened(!isOpened);
        }}
      >
        <div className={styles.dd_name}>
          {eVIS?.thumbnail === NO_THUMBNAIL && <> No</>}
          {eVIS?.thumbnail === BASIC_THUMBNAIL && <>Yes,a basic thumbnail</>}
          {eVIS?.thumbnail === CUSTOM_THUMBNAIL && <>Yes, a custom thumbnail<div className={styles.dd_addOn} >+95</div></>}
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
                  thumbnail: NO_THUMBNAIL
                },
                isEdit: true
              }))
            }}
          >
            <div className={styles.dd_name}>
              <img src={eVIS?.thumbnail === NO_THUMBNAIL ? CheckBoxSelected : CheckBox} alt="" />No</div>
          </div>
          <div
            className={styles.dd_item}
            onClick={() => {
              setOpened(false);
              dispatch(updateVideoEditSettings({
                videoSettings: {
                  ...eVIS,
                  thumbnail: BASIC_THUMBNAIL
                },
                isEdit: true
              }))
            }}
          >
            <div className={styles.dd_name}>
              <img src={eVIS?.thumbnail === BASIC_THUMBNAIL ? CheckBoxSelected : CheckBox} alt="" />
              Yes,a basic thumbnail</div>
          </div>
          <div
            className={styles.dd_item}
            onClick={() => {
              setOpened(false);
              dispatch(updateVideoEditSettings({
                videoSettings: {
                  ...eVIS,
                  thumbnail: CUSTOM_THUMBNAIL
                },
                isEdit: true
              }))
            }}
          >
            <div className={styles.dd_name}>
              <img src={eVIS?.thumbnail === CUSTOM_THUMBNAIL ? CheckBoxSelected : CheckBox} alt="" />
              Yes, a custom thumbnail<div className={styles.dd_addOn} >+95</div></div>
          </div>
        </div>
      )}
      {vIS?.thumbnail !== eVIS?.thumbnail &&
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
              <div className={styles.popUp_text}>You're changing <span>{vIS?.thumbnail}</span> to <span>{eVIS?.thumbnail}</span>.
                If the new option isn't an add-on, the current one will be removed. If it has a
                different price, the estimated total will update automatically</div>
              {eVIS?.thumbnail === CUSTOM_THUMBNAIL &&
                <div className={`${styles.box_container} ${styles.box_containerSubmit} `}>
                  <div className={styles.box_content}>
                    <DefaultSlider />
                    <div className={styles.box_content_info}>
                      <div className={styles.box_content_info_header}>
                        Standart Add-on:
                        <span className={styles.box_content_info_header_addOn}>+$95</span>
                      </div>
                      <div className={styles.box_content_info_text}>
                        Your thumbnail is your video's first impression, and you want to
                        make a good one. A custom thumbnail can include graphic elements,
                        text, and/or branding that entices viewers to click. Price
                        includes design and delivery of custom thumbnail.
                      </div>
                    </div>
                  </div>
                  <div className={styles.box_subText}>
                    <img src={Note} alt="locationIcon" /> Note: You will have an
                    opportunity to enter a discount code for any for a Standard Add-ons
                    during check-out
                  </div>
                </div>}
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

export default ThumbnailSelector;
