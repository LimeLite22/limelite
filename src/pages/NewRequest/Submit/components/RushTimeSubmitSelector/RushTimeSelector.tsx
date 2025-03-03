import { GrayArrow } from "assets/images";
import { rushTimeList, YES, } from "consts/consts";
import { type FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/rootReducer";

import {
  selectRequestInfo,
  updateVideoEditSettings,
} from "../../../../../redux/requests/reducer";
import styles from "../../../NewRequest.module.scss";

interface IProps {
  onChange: (zone: { name: string; value: number }) => void;
  isError?: boolean;
  isEdit: boolean
}
const RushTimeSelector: FC<IProps> = ({ onChange, isError, isEdit }) => {
  const vIS = useSelector(selectRequestInfo)?.videoSettings
  const evIS = useSelector((state: IRootState) => state.request.editDraft)?.videoSettings
  const rushTurnaround = isEdit ? evIS : vIS;
  const [isOpened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const showError = isError && !isOpened;
  return (
    <div className={`${styles.rushDropdown} ${showError ? styles.rushDropdown_error : ""}`}>
      <div className={styles.rushDropdown_header}>Rush Turnaround</div>
      <div
        className={`${styles.rushDropdown__selected} ${showError ? styles.rushDropdown__selected_error : ""}`}
        onClick={() => {
          setOpened(!isOpened);
        }}
      >
        <div className={styles.rushDropdown__selected_name}>
          {rushTurnaround?.time?.value || 0 > 0 ? <>{rushTurnaround?.time?.name} :${rushTurnaround?.time?.value}</> : <span>Rush Turnaround</span>}{" "}
        </div>
        {isError && !isOpened && (
          <div className={styles.rushDropdown__selected_errorMessage}>
            Select  to continue
          </div>
        )}
        <img
          className={`${styles.rushDropdown__selected_collapseIcon} ${isOpened ? styles.rushDropdown__selected_collapseIcon_opened : ""}`}
          src={GrayArrow}
          alt="collapse"
        />
      </div>

      {isOpened && (
        <div className={styles.rushDropdown__itemsContainer}>
          {rushTimeList.map((option, index) => (
            <div
              style={{
                borderTopLeftRadius: index === 0 ? "4px" : "",
                borderTopRightRadius: index === 0 ? "4px" : "",
              }}
              className={styles.rushDropdown__item}
              key={index}
              onClick={(e) => {
                onChange({ name: option?.name, value: option?.value });
                console.log('1111');
                e.stopPropagation();
                e.preventDefault();
                rushTurnaround && dispatch(updateVideoEditSettings(
                  {
                    videoSettings: {
                      ...rushTurnaround,
                      time: {
                        name: option?.name,
                        value: option?.value
                      }

                    },
                    isEdit: isEdit
                  }
                ))
                setOpened(false);
              }}
            >
              <div className={styles.rushDropdown__item_name}>{option?.name} :${option.value}</div>
            </div>
          ))}{" "}
        </div>
      )}
    </div>
  );
};

export default RushTimeSelector;
