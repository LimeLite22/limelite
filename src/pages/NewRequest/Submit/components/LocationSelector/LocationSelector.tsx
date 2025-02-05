
import "./LocationSelector.scss";

import { GrayArrow } from "assets/images";
import { DEFAULT, videoDurationsList } from "consts/consts";
import { type FC, useState } from "react";
import { TVideoDuration } from "types/types";

interface IProps {
  value: TVideoDuration;
  onChange: (value: TVideoDuration) => void;
  isError?: boolean;
  isSubmit?: boolean;
}
// dd = duration dropdown
const LocationSelector: FC<IProps> = ({ isError, value, onChange, isSubmit }) => {
  const duration = value;
  const [isOpened, setOpened] = useState(false);
  const showError = isError && !isOpened;

  return (
    <div className={`
    dd 
    ${showError ? "dd_error" : ""}
    ${isSubmit ? "dd_submit" : ""}
    `}>
      <div
        className={`
        dd_selected 
        ${showError ? "dd_selected_error" : ""}
        ${isSubmit ? "dd_selected_submit" : ""}
        `}
        onClick={() => {
          setOpened(!isOpened);
        }}
      >
        <div className="dd_selected_name">
          {duration !== DEFAULT ? duration : <span>Select</span>}
        </div>
        {isError && !isOpened && (
          <div className="dd_selected_errorMessage">
            Select a zone to continue
          </div>
        )}
        <img
          className={`dd_selected_collapseIcon ${isOpened ? "dd_selected_collapseIcon_opened" : ""}`}
          src={GrayArrow}
          alt="collapse"
        />
      </div>

      {isOpened && (
        <div className="dd_itemsContainer">
          {videoDurationsList.map((option, index) => (
            <div
              style={{
                borderTopLeftRadius: index === 0 ? "4px" : "",
                borderTopRightRadius: index === 0 ? "4px" : "",
              }}
              className="dd_item"
              key={index}
              onClick={() => {
                onChange(option?.value);
                setOpened(false);
              }}
            >
              <div className="dd_item_name">{option?.value}</div>
            </div>
          ))}{" "}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
