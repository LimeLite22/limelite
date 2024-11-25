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
  whiteIcon: string;
  greyIcon: string;
  greenIcon: string;
  onClick?: () => void;
};
const SideBarNavItem = ({
  selectedPage,
  setSelectedPage,
  isOpened,
  whiteIcon: WhiteIcon,
  greyIcon: GreyIcon,
  greenIcon: GreenIcon,
  value,
  onClick
}: IProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const unreadNotifications = useSelector(selectUnreadNotificationsNumber);
  return (
    <button
      className={`${styles.sideBar_navItem} ${
        selectedPage === value ? styles.sideBar_navItem_selected : ""
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
          <img
            src={
              isHovered && window.innerWidth > 768
                ? GreenIcon
                : selectedPage === value
                  ? WhiteIcon
                  : GreyIcon
            }
            alt={value}
          ></img>
          <div className={styles.sideBar_navItem_notification}>
            {String(unreadNotifications)}
          </div>
        </div>
      ) : (
        <img
          src={
            isHovered && window.innerWidth > 768
              ? GreenIcon
              : selectedPage === value
                ? WhiteIcon
                : GreyIcon
          }
          alt={value}
        ></img>
      )}

      {value}
    </button>
  );
};

export default SideBarNavItem;
