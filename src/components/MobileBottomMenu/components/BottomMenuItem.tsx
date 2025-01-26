import { NOTIFICATIONS } from "consts/consts";
import { useSelector } from "react-redux";
import { TSelectedMobPages } from "types/types";

import { selectUnreadNotificationsNumber } from "../../../redux/notifications/reducer";
import styles from "../BottomMenu.module.scss";

interface IProps  {
  isPageSelected: boolean;
  value: TSelectedMobPages;
  isOpened: boolean;
  Icon: string;
};
const BottomMenuItem = ({
  isPageSelected,
  isOpened,
  Icon,
  value,
}: IProps) => {
  const unreadNotifications = useSelector(selectUnreadNotificationsNumber);
  return (
    <button
      type="button"
      className={`${styles.bottomMenu_item} ${
        isPageSelected ? styles.bottomMenu_item_selected : ""
      }
    ${isOpened ? styles.sideBar_navItem_opened : ""}
    `}
    >
      {value === NOTIFICATIONS ? (
        <div className={styles.bottomMenu_item_notificationContainer}>
          <svg
            className={styles.sideBar_navItem_svg}
            style={{
              fill: isPageSelected ? "#4dbd38" : "#323232",
            }}
          >
            <use href={Icon} />
          </svg>
          <div
            className={styles.bottomMenu_item_notification}
            style={{ outline: `2px solid var(--white)` }}
          >
            {String(unreadNotifications)}
          </div>
        </div>
      ) : (
        <svg
          className={styles.sideBar_navItem_svg}
          style={{
            fill: isPageSelected ? "#4dbd38" : "#323232",
          }}
        >
          <use href={Icon} />
        </svg>
      )}
      {value}
    </button>
  );
};

export default BottomMenuItem;
