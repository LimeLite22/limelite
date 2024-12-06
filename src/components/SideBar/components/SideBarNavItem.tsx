import { useState } from "react";
import { useSelector } from "react-redux";

import { selectUnreadNotificationsNumber } from "../../../redux/notifications/reducer";
import styles from "../SideBar.module.scss";
import { NOTIFICATIONS, type selectedPages } from "../types";

type IProps = {
  selectedPage: selectedPages;
  value: selectedPages;
  setSelectedPage: (page: selectedPages) => void;
  isOpened: boolean;
  icon: string;
  onClick?: () => void;
};
const SideBarNavItem = ({
  selectedPage,
  setSelectedPage,
  isOpened,
  icon: Icon,
  value,
  onClick
}: IProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const unreadNotifications = useSelector(selectUnreadNotificationsNumber);
  return (
    <button
      className={`${styles.sideBar_navItem} ${selectedPage === value ? styles.sideBar_navItem_selected : ""
        }
    ${isOpened ? styles.sideBar_navItem_opened : ""}
    `}
      onClick={() => {
        setSelectedPage(value)
        onClick && onClick();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {value === NOTIFICATIONS ? (
        <div className={styles.sideBar_navItem_notificationContainer}>
      <svg className={styles.sideBar_navItem_svg} style={{
        fill: isHovered && window.innerWidth > 768 ? "#1d7b1e" : selectedPage === value ? "#ffffff" : "#323232"
      }}><use href={Icon} /></svg>
          <div className={styles.sideBar_navItem_notification} style={{ outline:`2px solid ${isHovered && window.innerWidth > 768 ? "#eaf2eb" : selectedPage === value ? "var(--green)" : "var(--white)"}`}}>
            {String(unreadNotifications)}
          </div>
        </div>
      ) : (
        <svg className={styles.sideBar_navItem_svg} style={{
          fill: isHovered && window.innerWidth > 768 ? "#1d7b1e" : selectedPage === value ? "#ffffff" : "#323232"
        }}><use href={Icon} /></svg>
      )}

      {value}
    </button>
  );
};

export default SideBarNavItem;
