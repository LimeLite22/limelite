import { GrayArrow } from "assets/images";
import { YES, zonesList } from "consts/consts";
import { type FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/rootReducer";

import {
  selectRequestInfo,
  updateLogisticInfoSettings,
} from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";

interface IProps {
  onChange: (zone: { name: string; value: number }) => void;
  isError?: boolean;
  isEdit: boolean
}
const ZoneSelector: FC<IProps> = ({ onChange, isError, isEdit }) => {
  const lIS = useSelector(selectRequestInfo)!.logisticSettings
  const eLIS = useSelector((state: IRootState) => state.request.editDraft)?.logisticSettings;
  const travel = isEdit ? eLIS.travel : lIS?.travel;
  const [isOpened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const showError = isError && !isOpened;
  return (
    <div className={`${styles.dropdownType4} ${showError ? styles.dropdownType4_error : ""}`}>
      <div className={styles.dropdownType4_header}>Zone</div>
      <div
        className={`${styles.dropdownType4__selected} ${showError ? styles.dropdownType4__selected_error : ""}`}
        onClick={() => {
          setOpened(!isOpened);
        }}
      >
        <div className={styles.dropdownType4__selected_name}>
          {travel?.zoneCode?.name !== null ? <>{travel?.zoneCode?.name} :${travel?.zoneCode?.value}</> : <span>Select</span>}{" "}
        </div>
        {isError && !isOpened && (
          <div className={styles.dropdownType4__selected_errorMessage}>
            Select a zone to continue
          </div>
        )}
        <img
          className={`${styles.dropdownType4__selected_collapseIcon} ${isOpened ? styles.dropdownType4__selected_collapseIcon_opened : ""}`}
          src={GrayArrow}
          alt="collapse"
        />
      </div>

      {isOpened && (
        <div className={styles.dropdownType4__itemsContainer}>
          {zonesList.map((option, index) => (
            <div
              style={{
                borderTopLeftRadius: index === 0 ? "4px" : "",
                borderTopRightRadius: index === 0 ? "4px" : "",
              }}
              className={styles.dropdownType4__item}
              key={index}
              onClick={() => {
                onChange({ name: option?.name, value: option?.value });
                lIS && dispatch(updateLogisticInfoSettings(
                  {
                    logisticInfoSettings: {
                      ...lIS, travel: {
                        ...travel,
                        selection: YES,
                        zoneCode: { name: option?.name, value: option?.value }
                      }
                    },
                    isEdit: isEdit
                  }
                ))
                setOpened(false);
              }}
            >
              <div className={styles.dropdownType4__item_name}>{option?.name} :${option.value}</div>
            </div>
          ))}{" "}
        </div>
      )}
    </div>
  );
};

export default ZoneSelector;
