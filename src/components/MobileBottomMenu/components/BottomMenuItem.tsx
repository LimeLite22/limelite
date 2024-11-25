import { useSelector } from "react-redux";

import { selectUnreadNotificationsNumber } from "../../../redux/notifications/reducer";
import styles from "../BottomMenu.module.scss";
import { NOTIFICATIONS, type selectedPages } from "../types";

type IProps = {
  isPageSelected: boolean;
  value: selectedPages;
  setSelectedPage: (page: selectedPages) => void;
  isOpened: boolean;
  whiteIcon: string;
  greyIcon: string;
};
const BottomMenuItem = ({
  isPageSelected,
  setSelectedPage,
  isOpened,
  whiteIcon: WhiteIcon,
  greyIcon: GreyIcon,
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
      onClick={() => setSelectedPage(value)}
    >
      {value === NOTIFICATIONS ? (
        <div className={styles.bottomMenu_item_notificationContainer}>
          <img src={isPageSelected ? WhiteIcon : GreyIcon} alt={value} />
          <div className={styles.bottomMenu_item_notification}>
            {String(unreadNotifications)}
          </div>
        </div>
      ) : (
        <img src={isPageSelected ? WhiteIcon : GreyIcon} alt={value} />
      )}

      {value}
    </button>
  );
};

export default BottomMenuItem;
