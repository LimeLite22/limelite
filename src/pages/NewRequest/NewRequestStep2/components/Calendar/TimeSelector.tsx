import { ArrowGray2 } from "assets/images";
import { DEFAULT } from "interfaces/interfaces";
import { TimeValue } from "interfaces/interfaces";
import { hoursList } from "pages/NewRequest/consts";
import { useState } from "react";

import "./Calendar.scss";

interface IProps {
  time: TimeValue;
  selectTime: (time: TimeValue) => void;
  isError: boolean;
}

const TimeSelector = ({ time, selectTime, isError }: IProps) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div
      className={"popUp_content_selectionBox_timeContainer"}
      tabIndex={0}
      onBlur={() => setIsOpened(false)}
    >
      <div
        className={"popUp_content_selectionBox_timeContainer_time"}
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
