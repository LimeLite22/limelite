import { GrayArrow } from "assets/images";
import { options } from "consts/consts";
import { type FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../../redux/requests/reducer";
import "./Zone.scss";

interface IProps {
  onChange: (zone: { name: string; value: number }) => void;
  isError?: boolean;
}
const ZoneSelector: FC<IProps> = ({ onChange, isError }) => {
  const selectedRequest = useSelector(selectRequestInfo);
  const travel = selectedRequest?.travel;
  const zoneCode = travel?.zoneCode;
  const [isOpened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const showError = isError && !isOpened;

  return (
    <div className={`dropdown ${showError ? "dropdown_error" : ""}`}>
      <div className="dropdown_header">Zone</div>
      <div
        className={`dropdown__selected ${showError ? "dropdown__selected_error" : ""}`}
        onClick={() => {
          setOpened(!isOpened);
        }}
      >
        <div className="dropdown__selected_name">
          {zoneCode?.name || <span>Select</span>}{" "}
        </div>
        {isError && !isOpened && (
          <div className="dropdown__selected_errorMessage">
            Select a zone to continue
          </div>
        )}
        <img
          className={`dropdown__selected_collapseIcon ${isOpened ? "dropdown__selected_collapseIcon_opened" : ""}`}
          src={GrayArrow}
          alt="collapse"
        />
      </div>

      {isOpened && (
        <div className="dropdown__itemsContainer">
          {options.map((option, index) => (
            <div
              style={{
                borderTopLeftRadius: index === 0 ? "4px" : "",
                borderTopRightRadius: index === 0 ? "4px" : "",
              }}
              className="dropdown__item"
              key={index}
              onClick={() => {
                onChange({ name: option?.name, value: option?.value });
                  dispatch(
                    updateDraftField({
                      path: "travel.zoneCode",
                      value:{
                        name: option?.name,
                        value: option?.value
                      },
                    })
                  );
                setOpened(false);
              }}
            >
              <div className="dropdown__item_name">{option?.name}</div>
            </div>
          ))}{" "}
        </div>
      )}
    </div>
  );
};

export default ZoneSelector;
