import { GrayArrow } from "assets/images";
import { zonesList } from "consts/consts";
import { type FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  selectRequestInfo,
} from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";

interface IProps {
  onChange: (zone: { name: string; value: number }) => void;
}
const ZoneDropdown: FC<IProps> = ({ onChange }) => {
  const logisticSettings = useSelector(selectRequestInfo)?.logisticSettings;
  const [current, setCurrent] = useState(logisticSettings?.travel.zoneCode);
  const [isOpened, setOpened] = useState(false);
  useEffect(() => {
    setCurrent(logisticSettings?.travel.zoneCode);
  }, [logisticSettings])
  return (
    <div className={`${styles.dropdownType4}`}>
      <div
        className={`${styles.dropdownType4__selected} ${styles.dropdownType4__selected_submit}`}
        onClick={() => {
          setOpened(!isOpened);
        }}
      >
        <div className={`${styles.dropdownType4__selected_name} ${styles.dropdownType4__selected_name_submit}`}>
          {<>{current?.name} :${current?.value}</> || <span>Select</span>}{" "}
        </div>
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
                setCurrent({ name: option?.name, value: option?.value });
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

export default ZoneDropdown;
