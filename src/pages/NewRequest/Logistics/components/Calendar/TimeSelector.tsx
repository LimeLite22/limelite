
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
  darkBorder?: boolean;
}

const TimeSelector = ({ time, selectTime, isError, isSubmit, darkBorder }: IProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const getBorderRadiusStyles = (index: number) => ({
    borderTopLeftRadius: index === 0 || index === 11 ? "4px" : "",
    borderTopRightRadius: index === 0 || index === 11 ? "4px" : "",
    borderBottomLeftRadius: index === 2 || index === 15 ? "4px" : "",
    borderBottomRightRadius: index === 2 || index === 15 ? "4px" : "",
  });
  const getTimeContainerStyles = {
    color: isError
      ? "var(--red)"
      : time === DEFAULT
        ? "var(--gray-light5)"
        : "",
    border: isError
      ? "1px solid var(--red)"
      : darkBorder
        ? "1px solid var(--gray-light3)"
        : "",
    height: darkBorder ? '41px' : ''
  }
    ;
  return (
    <div
      className={`timeContainer
      `}
      tabIndex={0}
      onBlur={() => setIsOpened(false)}
    >
      <div
        className={`timeContainer_time
        ${isSubmit ? "timeContainer_time_submit" : ""}
        `}
        style={getTimeContainerStyles}
        onClick={() => setIsOpened(!isOpened)}
      >
        {" "}
        {time !== DEFAULT ? `${time?.hour}:00 ${time?.type}` : "00:00"}
        <img
          className="timeContainer_arrow"
          style={{ transform: isOpened ? "rotate(180deg)" : "" }}
          src={ArrowGray2}
          alt={"ArrowGray2"}
        />
      </div>
      {isOpened && (
        <div className="timeContainer_dropDown scrollbar">
          {hoursList.map((hour, index) => {
            return (
              <div
                onClick={() => {
                  selectTime(hour);
                  setIsOpened(false);
                }}
                style={getBorderRadiusStyles(index)}
                key={generateUniqueId()}
                className={`
              timeContainer_item 
              ${hour.isAddon ? "timeContainer_itemAddOn" : ""}`}
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
