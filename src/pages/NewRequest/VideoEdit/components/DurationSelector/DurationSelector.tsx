import { type FC, useState } from "react";

import { IVideoDuration } from "interfaces/interfaces";

import { GrayArrow } from "assets/images";

import { DEFAULT, videoDurationsList } from "consts/consts";

import "./DurationSelector.scss";

interface IProps {
  value: IVideoDuration;
  onChange: (value: IVideoDuration) => void;
  isError?: boolean;
}
const DurationSelector: FC<IProps> = ({ isError, value, onChange }) => {
  const duration = value;
  const [isOpened, setOpened] = useState(false);
  const showError = isError && !isOpened;

  return (
    <div className={`duration_dropdown ${showError ? "duration_dropdown_error" : ""}`}>
      <div
        className={`duration_dropdown__selected ${showError ? "duration_dropdown__selected_error" : ""}`}
        onClick={() => {
          setOpened(!isOpened);
        }}
      >
        <div className="duration_dropdown__selected_name">
          {duration !== DEFAULT ? duration : <span>Select</span>}
        </div>
        {isError && !isOpened && (
          <div className="duration_dropdown__selected_errorMessage">
            Select a zone to continue
          </div>
        )}
        <img
          className={`duration_dropdown__selected_collapseIcon ${isOpened ? "duration_dropdown__selected_collapseIcon_opened" : ""}`}
          src={GrayArrow}
          alt="collapse"
        />
      </div>

      {isOpened && (
        <div className="duration_dropdown__itemsContainer">
          {videoDurationsList.map((option, index) => (
            <div
              style={{
                borderTopLeftRadius: index === 0 ? "4px" : "",
                borderTopRightRadius: index === 0 ? "4px" : "",
              }}
              className="duration_dropdown__item"
              key={index}
              onClick={() => {
                onChange(option?.value);
                setOpened(false);
              }}
            >
              <div className="duration_dropdown__item_name">{option?.value}</div>
            </div>
          ))}{" "}
        </div>
      )}
    </div>
  );
};

export default DurationSelector;
