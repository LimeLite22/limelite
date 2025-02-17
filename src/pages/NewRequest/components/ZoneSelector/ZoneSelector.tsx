import styles from "../../NewRequest.module.scss";

import { GrayArrow } from "assets/images";
import { YES, zonesList } from "consts/consts";
import { type FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectRequestInfo,
  updateLogisticInfoSettings,
} from "../../../../redux/requests/reducer";
import { IRootState } from "redux/rootReducer";

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
    <div className={`${styles.zoneDropdown} ${showError ? styles.zoneDropdown_error : ""}`}>
      <div className={styles.zoneDropdown_header}>Zone</div>
      <div
        className={`${styles.zoneDropdown__selected} ${showError ? styles.zoneDropdown__selected_error : ""}`}
        onClick={() => {
          setOpened(!isOpened);
        }}
      >
        <div className={styles.zoneDropdown__selected_name}>
          {travel?.zoneCode?.value > 0 ? <>{travel?.zoneCode?.name} :${travel?.zoneCode?.value}</> : <span>Select</span>}{" "}
        </div>
        {isError && !isOpened && (
          <div className={styles.zoneDropdown__selected_errorMessage}>
            Select a zone to continue
          </div>
        )}
        <img
          className={`${styles.zoneDropdown__selected_collapseIcon} ${isOpened ? styles.zoneDropdown__selected_collapseIcon_opened : ""}`}
          src={GrayArrow}
          alt="collapse"
        />
      </div>

      {isOpened && (
        <div className={styles.zoneDropdown__itemsContainer}>
          {zonesList.map((option, index) => (
            <div
              style={{
                borderTopLeftRadius: index === 0 ? "4px" : "",
                borderTopRightRadius: index === 0 ? "4px" : "",
              }}
              className={styles.zoneDropdown__item}
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
              <div className={styles.zoneDropdown__item_name}>{option?.name} :${option.value}</div>
            </div>
          ))}{" "}
        </div>
      )}
    </div>
  );
};

export default ZoneSelector;
