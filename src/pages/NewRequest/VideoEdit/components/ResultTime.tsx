import {
  CheckBox,
  CheckBoxSelected,
  Expand,
  Note,
} from "assets/images";
import { NO, RUSH_TIME, STANDARD_TIME, YES } from "consts/consts";
import DefaultSlider from "pages/NewRequest/components/DefaultSlider";
import RushTimeSelector from "pages/NewRequest/components/RushTimeSelector/RushTimeSelector";
import ZoneSelector from "pages/NewRequest/components/ZoneSelector/ZoneSelector";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TRush } from "types/types";
import { addCommas } from "utils/truncateString";

import LearnMorePopUp from "./LearnMorePopUp";
import {
  selectRequestInfo,
  updateVideoEditSettings,
} from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";

const ResultTime = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isError, setIsError] = useState(false);
  const selectedRequest = useSelector(selectRequestInfo);
  const resultTime = selectedRequest?.videoSettings.resultTime;
  const time = selectedRequest?.videoSettings.time;
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (resultTime === STANDARD_TIME || (resultTime === RUSH_TIME && time?.name !== null)) {
      setIsError(false);
    }
  }, [resultTime]);
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      event.relatedTarget &&
      containerRef.current.contains(event.relatedTarget as Node)
    ) {
      return;
    }
    if (resultTime === RUSH_TIME && time?.name === null) {
      setIsError(true);
      setIsExpanded(true);
    }
    if (resultTime === RUSH_TIME && time?.name !== null) {
      setIsError(false);
      setIsExpanded(false);
    }
    if (resultTime === STANDARD_TIME) {
      setIsExpanded(false);
    }
  };
  const handleSelect = (selection: TRush) => {
    if (selection === RUSH_TIME) {
      !isExpanded && setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
    selectedRequest?.videoSettings && dispatch(
      updateVideoEditSettings({
        videoSettings: {
          ...selectedRequest?.videoSettings,
          resultTime: selection
        },
        isEdit: false
      })
    );
  };
  const handleZoneCode = () => {
    setIsError(false);
  };
  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={styles.boxContainer}
      ref={containerRef}
      tabIndex={-1}
      onBlur={handleBlur}
    >
      <div className={styles.box_question_header_text}>
        How quickly do you need this video? <span>*</span>
      </div>
      <LearnMorePopUp />

      <div
        className={`
        ${styles.box} 
        ${resultTime === STANDARD_TIME ? styles.box_selected : ""}`}
        onClick={() => {
          handleSelect(STANDARD_TIME);
        }}
      >
        <div
          className={`
        ${styles.box_header2} 
        `}
        >
          <img
            className={styles.box_circle}
            src={resultTime === STANDARD_TIME ? CheckBoxSelected : CheckBox}
            alt="CheckBox"
          />
          <div className={styles.box_title}>Lightning Fast (Standard)</div>
          <div className={styles.box_title2}>
            The standard turnaround of 7-10 business days is perfeot.
          </div>
        </div>
      </div>
      <div
        className={`
        ${styles.box}
        ${styles.box_xl}
        ${resultTime === RUSH_TIME ? styles.box_selected : ""} 
        ${isExpanded ? styles.box_expanded : ""}`}
        onClick={() => {
          handleSelect(RUSH_TIME);
        }}
      >
        <div
          className={`
          ${styles.box_header2} 
          ${resultTime === RUSH_TIME ? styles.box_header_selected : ""} `}
        >
          <img
            className={styles.box_circle}
            src={resultTime === RUSH_TIME ? CheckBoxSelected : CheckBox}
            alt="CheckBox"
          />
          <span className={styles.box_title}>
            Warp Speed (Rush)
            <div className={styles.box_title_addOn}>Add-on</div>
          </span>
          <div className={styles.box_title2}>
            We need this in less than 7-10 business days after the shoot.
          </div>
        </div>
        <div className={styles.box_container}>
          <div className={styles.box_content}>
            <DefaultSlider />
            <div className={styles.box_content_info}>
              <div
                className={styles.box_content_info_header}
              >
                Premium Add-on:
                <span className={styles.box_content_info_header_addOn}>
                  +$
                  {time?.value === 0
                    ? "TBD"
                    : time?.value && addCommas(time?.value)}
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
                  onChange={handleZoneCode}
                  isError={isError}
                  isEdit={false}
                />
              </div>
            </div>
          </div>

          <div className={styles.box_subText}>
            <img src={Note} alt="TravelIcon" /> Note: You will have an
            opportunity to enter a discount code for any for a Standard Add-ons
            during check-out
          </div>
        </div>
        <img
          onClick={handleToggleExpanded}
          src={Expand}
          alt="Expand"
          className={styles.box_expand}
        />
      </div>
    </div>
  );
};

export default ResultTime;
