import { Add, CalendarIcon2, Close, Note, Valid } from "assets/images";
import { format } from "date-fns";
import { DEFAULT } from "interfaces/interfaces";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectRequestInfo,
  setAlternateTime,
  setIsAlternate,
  setPrefferredTime,
} from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import Calendar from "./Calendar/Calendar";
import TimeSelector from "./Calendar/TimeSelector";
import LearnMorePopUp from "./LearnMorePopUp";

const Date = () => {
  const selectedRequest = useSelector(selectRequestInfo);
  const preferredDate = selectedRequest?.preferredDate;
  const alternateDate = selectedRequest?.alternateDate;
  const isAlternate = selectedRequest?.isAlternate;

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isPrefferedCalendar, setIsPrefferedCalendar] = useState(false);
  const [isDataValid, setIsDataValid] = useState(false);
  const [isPTError, setIsPTError] = useState(false);
  const isValid = () => {
    let valid = false;
    if (!isAlternate) {
      if (preferredDate?.date !== DEFAULT && preferredDate?.time !== DEFAULT) {
        valid = true;
      }
    } else {
      if (preferredDate?.date !== DEFAULT && preferredDate?.time !== DEFAULT && alternateDate?.date !== DEFAULT && alternateDate?.time !== DEFAULT) {
        valid = true;
      }
    }
    setIsDataValid(valid);
  }

  useEffect(() => {
    isValid();
  }, [preferredDate, alternateDate, isAlternate]);
  const dispatch = useDispatch();

  const openAlternative = () => {
    dispatch(setIsAlternate((true)));
  };
  const closeAlternative = () => {
    dispatch(setIsAlternate((false)));
  };
  const span1 = window.innerHeight * 1;
  const handleClose = () => {
    setIsPopUpOpen(false);
  };
  return (
    <div>
      <Calendar
        isOpened={isPopUpOpen}
        isPreferredDate={isPrefferedCalendar}
        onClose={handleClose}
      />
          <div className={styles.box_question_header_text}>
            How soon do you want to shoot? <span>*</span>
          </div>
          <LearnMorePopUp />
      <div
        className={`${styles.box_dateBox} ${isDataValid ? styles.box_dateBox_valid : ""}`}
      >
        <div className={styles.box_dateBox_text}>Preferred Date and Time</div>
        <div className={styles.box_dateBox_container}>
          <div className={styles.box_dateBox_container_dateInput}>
            <p>Date</p>
            <div
              className={styles.box_dateBox_container_dateInput_input}
              onClick={() => {
                setIsPrefferedCalendar(true);
                setIsPopUpOpen(true);
              }}
              style={{
                color:
                  preferredDate?.date === DEFAULT ? "var(--gray-light5)" : "",
              }}
            >
              {preferredDate?.date !== DEFAULT
                ? format(preferredDate?.date as Date, "MMM dd, yyyy")
                : "00-00-0000"}
              <img
                className={styles.box_dateBox_container_dateInput_img}
                src={CalendarIcon2}
                alt="calendar"
              />
            </div>
          </div>
          <div className={styles.box_dateBox_container_dateInput}>
            <p>Time</p>
            <TimeSelector
              time={preferredDate?.time || DEFAULT}
              selectTime={(time) => dispatch(setPrefferredTime(time))}
              isError={isPTError}
            />
          </div>
        </div>
        {isAlternate && (
          <>
            <div className={styles.box_dateBox_divider}></div>
            <div className={styles.box_dateBox_text}>
              Alternative Date and Time{" "}
              <img src={Close} alt="close" onClick={closeAlternative} />
            </div>
            <div className={styles.box_dateBox_container}>
              <div className={styles.box_dateBox_container_dateInput}>
                <p>Date</p>
                <div
                  className={styles.box_dateBox_container_dateInput_input}
                  onClick={() => {
                    setIsPrefferedCalendar(false);
                    setIsPopUpOpen(true);
                  }}
                  style={{
                    color:
                      alternateDate?.date === DEFAULT
                        ? "var(--gray-light5)"
                        : "",
                  }}
                >
                  {alternateDate?.date === DEFAULT
                    ? "00-00-0000"
                    : format(alternateDate?.date as Date, "MMM dd, yyyy")}
                  <img
                    className={styles.box_dateBox_container_dateInput_img}
                    src={CalendarIcon2}
                    alt="calendar"
                  />
                </div>
              </div>
              <div className={styles.box_dateBox_container_dateInput}>
                <p>Time</p>
                <TimeSelector
                  time={alternateDate?.time || DEFAULT}
                  selectTime={(time) => dispatch(setAlternateTime(time))}
                  isError={isPTError}
                />
              </div>
            </div>
          </>
        )}
        {!isAlternate && (
          <div
            onClick={openAlternative}
            className={styles.box_dateBox_container_button}
          >
            {" "}
            <div className={styles.box_dateBox_container_button_imgContainer}>
              {" "}
              <img src={Add} alt="calendar" />
            </div>
            Add an alternative option
          </div>
        )}
        <div className={styles.box_dateBox_container_note}>
          {" "}
          <img src={Note} alt="TravelIcon" />
          Shoots scheduled within 7 days or outside 8 am - 4:30 pm are
          considered Add-ons.
        </div>
        {isDataValid && (
          <img
            className={styles.box_dateBox_container_valid}
            src={Valid}
            alt="valid"
          />
        )}
      </div>
    </div>
  );
};

export default Date;