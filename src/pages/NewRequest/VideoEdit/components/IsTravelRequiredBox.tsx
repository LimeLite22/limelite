import {
  CheckBox,
  CheckBoxSelected,
  Expand,
  Note,
} from "assets/images";
import { NO, YES } from "consts/consts";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LearnMorePopUp from "./LearnMorePopUp";
import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import { TSelection } from "types/types";
import DefaultSlider from "pages/NewRequest/components/DefaultSlider";
import { addCommas } from "utils/truncateString";
import ZoneSelector from "pages/NewRequest/components/ZoneSelector/ZoneSelector";

const IsTravelRequired = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isError, setIsError] = useState(false);
  const selectedRequest = useSelector(selectRequestInfo);
  const travel = selectedRequest?.logisticSettings.travel;
  const selection = travel?.selection;
  const zoneCode = travel?.zoneCode;
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selection === NO || (selection === YES && zoneCode?.name !== null)) {
      setIsError(false);
    }
  }, [selection]);
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      event.relatedTarget &&
      containerRef.current.contains(event.relatedTarget as Node)
    ) {
      return;
    }
    if (selection === YES && zoneCode?.name === null) {
      setIsError(true);
      setIsExpanded(true);
    }
    if (selection === YES && zoneCode?.name !== null) {
      setIsError(false);
      setIsExpanded(false);
    }
    if (selection === NO) {
      setIsExpanded(false);
    }
  };
  const handleSelect = (selection: TSelection) => {
    if (selection === YES) {
      !isExpanded && setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
    dispatch(
      updateDraftField({
        path: "logisticSettings.travel.selection",
        value: selection,
      }),
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
        ${selection === NO ? styles.box_selected : ""}`}
        onClick={() => {
          handleSelect(NO);
        }}
      >
        <div
          className={`
        ${styles.box_header2} 
        `}
        >
          <img
            className={styles.box_circle}
            src={selection === NO ? CheckBoxSelected : CheckBox}
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
        ${selection === YES ? styles.box_selected : ""} 
        ${isExpanded ? styles.box_expanded : ""}`}
        onClick={() => {
          handleSelect(YES);
        }}
      >
        <div
          className={`
          ${styles.box_header2} 
          ${selection === YES ? styles.box_header_selected : ""} `}
        >
          <img
            className={styles.box_circle}
            src={selection === YES ? CheckBoxSelected : CheckBox}
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
                  {zoneCode?.value === 0
                    ? "TBD"
                    : zoneCode?.value && addCommas(zoneCode?.value)}
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

export default IsTravelRequired;
