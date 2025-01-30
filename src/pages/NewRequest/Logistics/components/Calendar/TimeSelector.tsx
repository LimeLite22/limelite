
import "./Calendar.scss";

import { ArrowGray2 } from "assets/images";
import { DEFAULT } from "consts/consts";
import { hoursList } from "consts/consts";
import { useState } from "react";
import { TTimeValue } from "types/types";
import { generateUniqueId } from "utils/generateId";

interface IProps {
  time: TTimeValue;
  selectTime: (time: TTimeValue) => void;
  isError: boolean;
  isSubmit?: boolean;
}

const TimeSelector = ({ time, selectTime, isError, isSubmit }: IProps) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div
      className={`popUp_content_selectionBox_timeContainer
      `}
      tabIndex={0}
      onBlur={() => setIsOpened(false)}
    >
      <div
        className={`popUp_content_selectionBox_timeContainer_time
        ${isSubmit ? "popUp_content_selectionBox_timeContainer_time_submit" : ""}
        `}
        style={{
          color: isError
            ? "var(--red)"
            : time === DEFAULT
              ? "var(--gray-light5)"
              : "",
          border: isError ? "1px solid var(--red)" : "",
        }}
        onClick={() => setIsOpened(!isOpened)}
      >
        {" "}
        {time !== DEFAULT ? `${time?.hour}:00 ${time?.type}` : "00:00"}
        <img
          className="popUp_content_selectionBox_timeContainer_arrow"
          style={{ transform: isOpened ? "rotate(180deg)" : "" }}
          src={ArrowGray2}
          alt={"ArrowGray2"}
        />
      </div>
      {isOpened && (
        <div className="popUp_content_selectionBox_timeContainer_dropDown scrollbar">
          {hoursList.map((hour, index) => {
            return (
              <div
                onClick={() => {
                  selectTime(hour);
                  setIsOpened(false);
                }}
                style={{
                  borderTopLeftRadius: index === 0 || index === 11 ? "4px" : "",
                  borderTopRightRadius:
                    index === 0 || index === 11 ? "4px" : "",
                  borderBottomLeftRadius:
                    index === 2 || index === 15 ? "4px" : "",
                  borderBottomRightRadius:
                    index === 2 || index === 15 ? "4px" : "",
                }}
                key={generateUniqueId()}
                className={`
              popUp_content_selectionBox_timeContainer_item 
              ${hour.isAddon ? "popUp_content_selectionBox_timeContainer_itemAddOn" : ""}`}
              >
                {hour.hour}:00 {hour.type}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TimeSelector;
