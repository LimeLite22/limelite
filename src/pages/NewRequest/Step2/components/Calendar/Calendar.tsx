import { useEffect, useState } from "react";
import { Calendar as ReactCalendar } from "react-calendar";
import { createPortal } from "react-dom";
import { Sheet } from "react-modal-sheet";
import { useDispatch, useSelector } from "react-redux";

import { format } from "date-fns";

import {
  BackCalendarArrow,
  CloseCalendar,
  ForwardCalendarArrow,
} from "assets/images";

import useWindowWidth from "hooks/useWindowWidth";

import { DEFAULT } from "consts/consts";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../../redux/requests/reducer";
import "./Calendar.scss";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
interface TileClassNameProps {
  date: Date;
  view: string;
}
interface ICalendarProps {
  onClose: () => void;
  isPreferredDate: boolean;
  isOpened: boolean;
}

const Calendar = ({ onClose, isPreferredDate, isOpened }: ICalendarProps) => {
  const selectedRequest = useSelector(selectRequestInfo);
  const preferredDate = selectedRequest?.preferredDate;
  const alternateDate = selectedRequest?.alternateDate;
  const date = isPreferredDate ? preferredDate?.date : alternateDate?.date;
  const [currentDate, setCurrentDate] = useState(date);
  const [isDateError, setIsDateError] = useState(false);
  const [addOnR, setAddOnR] = useState(0);
  const [addOnW, setAddOnW] = useState(0);
  const width = useWindowWidth();

  useEffect(() => {
    const prevButton = document.querySelector(
      ".react-calendar__navigation__prev-button",
    );
    if (prevButton) {
      prevButton.innerHTML = `<img
                                src=${BackCalendarArrow}
                                class="popUp_content_close"
                                alt="Close"
                              />`;
    }
  }, [isOpened]);
  useEffect(() => {
    const prevButton = document.querySelector(
      ".react-calendar__navigation__next-button",
    );
    if (prevButton) {
      prevButton.innerHTML = `<img
                                src=${ForwardCalendarArrow}
                                class="popUp_content_close"
                                alt="Close"
                              />`;
    }
  }, [isOpened]);
  useEffect(() => {
    if (!isOpened) {
      setCurrentDate(null);
    }
  }, [isOpened]);
  useEffect(() => {
    currentAddOn();
  }, [currentDate]);
  const dispatch = useDispatch();
  const today = new Date();
  const showCalendarError = (time: number) => {
    setIsDateError(true);
    setTimeout(() => {
      setIsDateError(false);
    }, time);
  };

  const tileClassName = ({ date, view }: TileClassNameProps): string | null => {
    if (view === "month") {
      const normalizedDate = new Date(date);
      normalizedDate.setHours(0, 0, 0, 0);

      const normalizedToday = new Date(today);
      normalizedToday.setHours(0, 0, 0, 0);
      const normalizedCPD = currentDate ? new Date(currentDate as Date) : null;
      normalizedCPD?.setHours(0, 0, 0, 0);

      const hideAfter =
        normalizedCPD && normalizedDate.getTime() === normalizedCPD.getTime();

      if (normalizedDate < normalizedToday) {
        return "pasted_day";
      }
      const threeDaysAfterToday = new Date(today);
      threeDaysAfterToday.setDate(today.getDate() + 3);
      if (normalizedDate > normalizedToday && date <= threeDaysAfterToday) {
        return `next-seven-days   ${hideAfter ? "remove_after" : ""}`;
      }
      const currentMonth = today.getMonth();
      if (date.getMonth() !== currentMonth) {
        return `notAvailable_day `;
      }
    }
    return null;
  };
  const tileDisabled = ({ date, view }: TileClassNameProps): boolean => {
    if (view === "month") {
      const normalizedDate = new Date(date);
      normalizedDate.setHours(0, 0, 0, 0);
      const normalizedToday = new Date(today);
      normalizedToday.setHours(0, 0, 0, 0);
      if (normalizedDate < normalizedToday) {
        return true;
      }
    }
    return false;
  };
  const handleUpdateField = (path: string, value: Date) => {
    dispatch(
      updateDraftField({
        path,
        value,
      }),
    );
  };
  const handleRequest = () => {
    if (!currentDate) {
      showCalendarError(2000);
      return;
    }
    if (isPreferredDate) {
      handleUpdateField("preferredDate.date", currentDate as Date);
    } else {
      handleUpdateField("alternateDate.date", currentDate as Date);
    }
    onClose();
  };
  const currentAddOn = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dates = Array.from({ length: 5 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return d;
    });

    const [tomorrow, twoDaysAfter, threeDaysAfter, fourDaysAfter] =
      dates.slice(1);

    if (!Array.isArray(currentDate)) {
      const dateValue = new Date(currentDate as Date);
      dateValue.setHours(0, 0, 0, 0);

      if (dateValue.getDay() === 6 || dateValue.getDay() === 0) {
        setAddOnW(295);
      } else {
        setAddOnW(0);
      }

      if (
        dateValue.getTime() === today.getTime() ||
        dateValue.getTime() === tomorrow.getTime()
      ) {
        setAddOnR(595);
      } else if (dateValue.getTime() === twoDaysAfter.getTime()) {
        setAddOnR(495);
      } else if (dateValue.getTime() === threeDaysAfter.getTime()) {
        setAddOnR(395);
      } else if (dateValue.getTime() === fourDaysAfter.getTime()) {
        setAddOnR(0);
      } else {
        setAddOnR(0);
      }
    }
  };

  const span1 = 588;
  if (width < 768 && isOpened) {
    return (
      <Sheet
        isOpen={isOpened}
        onClose={onClose}
        snapPoints={[span1]}
        dragVelocityThreshold={500}
        initialSnap={0}
        detent="full-height"
        style={{
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          background: "#11100E99",
        }}
        className="learnMore_sheetMain"
      >
        <div className={"learnMore_closeArea"} onClick={onClose}></div>
        <Sheet.Container className="learnMore_sheet">
          <Sheet.Content className="learnMore_sheetContainer">
            <div className={"popUp_content"}>
              <div className={"popUp_content_closeContainer"}>
                <img
                  src={CloseCalendar}
                  className={"popUp_content_close"}
                  onClick={onClose}
                  alt="Close"
                />
              </div>

              <div
                style={
                  isDateError && width < 768 ? { color: "var(--red)" } : {}
                }
                className={"popUp_content_header"}
              >
                {" "}
                {isPreferredDate
                  ? "Preferred Date Selection"
                  : "Alternative Date Selection"}
              </div>
              <div className={"popUp_content_main"}>
                <div>
                  {" "}
                  <ReactCalendar
                    calendarType="gregory"
                    onChange={(date) => {
                      setCurrentDate(date);
                    }}
                    locale="en-US"
                    value={currentDate === DEFAULT ? undefined : currentDate}
                    selectRange={false}
                    className={`react-calendar 
              ${isDateError && width > 768 ? "react-calendar-error" : ""}`}
                    tileClassName={tileClassName}
                    tileDisabled={tileDisabled}
                    minDate={new Date(Date.now() - 86400000)}
                  />
                  <div
                    className={`
              react-calendar-info-container 
              ${isDateError && width > 768 ? "react-calendar-info-container-error" : ""}`}
                  >
                    <div className="react-calendar-info-container_divider"></div>
                    <div className="react-calendar-info-container_text">
                      <div className="react-calendar-info-container_text_dollar">
                        +$
                      </div>{" "}
                      Extra fee for Weekend's Day
                    </div>
                    <div className="react-calendar-info-container_text">
                      <div className="react-calendar-info-container_text_dollar">
                        +$$
                      </div>
                      Extra fee for Rush Date
                    </div>
                  </div>
                </div>
              </div>

              <div className={"popUp_content_footer"}>
                <span className={"popUp_content_footer_container"}>
                  {addOnR + addOnW > 0 && (
                    <div className={"popUp_content_footer_price"}>
                      <div className={"popUp_content_footer_price_text"}>
                        Requested Add-ons
                      </div>
                      <div className={"popUp_content_footer_price_number"}>
                        <span>$</span>
                        {addOnR + addOnW}
                        <span>.00</span>
                      </div>
                    </div>
                  )}
                  <div
                    className={"popUp_content_footer_request"}
                    style={{
                      width: addOnW + addOnR > 0 ? "min-content" : "100%",
                    }}
                    onClick={handleRequest}
                    onTouchStart={handleRequest}
                  >
                    Request{" "}
                    {currentDate
                      ? `${format(currentDate as Date, "MMM dd, yyyy")}`
                      : "Date "}
                  </div>
                </span>
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    );
  }
  if (width > 768 && isOpened) {
    return createPortal(
      <div className={"popUp"}>
        <div className={"popUp_content"}>
          <div className={"popUp_content_closeContainer"}>
            <img
              src={CloseCalendar}
              className={"popUp_content_close"}
              onClick={onClose}
              alt="Close"
            />
          </div>

          <div className={"popUp_content_header"}>
            {" "}
            {isPreferredDate
              ? "Preferred Date Selection"
              : "Alternative Date Selection"}
          </div>
          <div className={"popUp_content_main"}>
            <div>
              {" "}
              <ReactCalendar
                calendarType="gregory"
                onChange={(date) => {
                  setCurrentDate(date);
                }}
                locale="en-US"
                value={currentDate}
                selectRange={false}
                className={`react-calendar 
              ${isDateError && width > 768 ? "react-calendar-error" : ""}`}
                tileClassName={tileClassName}
                tileDisabled={tileDisabled}
                minDate={new Date(Date.now() - 86400000)}
              />
              <div
                className={`
              react-calendar-info-container 
              ${isDateError && width > 768 ? "react-calendar-info-container-error" : ""}`}
              >
                <div className="react-calendar-info-container_divider"></div>
                <div className="react-calendar-info-container_text">
                  <div className="react-calendar-info-container_text_dollar">
                    +$
                  </div>{" "}
                  Extra fee for Weekend's Day
                </div>
                <div className="react-calendar-info-container_text">
                  <div className="react-calendar-info-container_text_dollar">
                    +$$
                  </div>
                  Extra fee for Rush Date
                </div>
              </div>
            </div>
          </div>
          <div className={"popUp_content_divider"}></div>

          <div className={"popUp_content_footer"}>
            <span className={"popUp_content_footer_container"}>
              {addOnR + addOnW > 0 && (
                <div className={"popUp_content_footer_price"}>
                  <div className={"popUp_content_footer_price_text"}>
                    Requested Add-ons
                  </div>
                  <div className={"popUp_content_footer_price_number"}>
                    <span>$</span>
                    {addOnR + addOnW}
                    <span>.00</span>
                  </div>
                </div>
              )}
              <div
                className={"popUp_content_footer_request"}
                style={{ width: addOnW + addOnR > 0 ? "min-content" : "100%" }}
                onClick={handleRequest}
              >
                Request{" "}
                {currentDate
                  ? `${format(currentDate as Date, "MMM dd, yyyy")}`
                  : "Date "}
              </div>
            </span>
          </div>
        </div>
      </div>,
      document.body,
    );
  }
  return <></>;
};

export default Calendar;
