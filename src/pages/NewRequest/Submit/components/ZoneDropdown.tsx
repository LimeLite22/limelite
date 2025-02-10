import styles from "../../NewRequest.module.scss";

import { GrayArrow } from "assets/images";
import { zonesList } from "consts/consts";
import { type FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  selectRequestInfo,
} from "../../../../redux/requests/reducer";

interface IProps {
  onChange: (zone: { name: string; value: number }) => void;
}
const ZoneDropdown: FC<IProps> = ({ onChange }) => {
  const lIS = useSelector(selectRequestInfo)?.logisticSettings;
  const [current, setCurrent] = useState(lIS?.travel.zoneCode);
  const [isOpened, setOpened] = useState(false);
  useEffect(() => {
    setCurrent(lIS?.travel.zoneCode);
  }, [lIS])
  return (
    <div className={`${styles.zoneDropdown}`}>
      <div
        className={`${styles.zoneDropdown__selected} ${styles.zoneDropdown__selected_submit}`}
        onClick={() => {
          setOpened(!isOpened);
        }}
      >
        <div className={`${styles.zoneDropdown__selected_name} ${styles.zoneDropdown__selected_name_submit}`}>
          {<>{current?.name} :${current?.value}</> || <span>Select</span>}{" "}
        </div>
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
                setCurrent({ name: option?.name, value: option?.value });
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

export default ZoneDropdown;
