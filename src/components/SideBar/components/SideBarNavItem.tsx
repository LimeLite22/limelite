import { useState } from "react";
import { useSelector } from "react-redux";

import { NOTIFICATIONS } from "consts/consts";

import { selectUnreadNotificationsNumber } from "../../../redux/notifications/reducer";
import styles from "../SideBar.module.scss";
import { TSelectedPages } from "types/types";

interface IProps {
  selectedPage: TSelectedPages;
  value: TSelectedPages;
  setSelectedPage: (page: TSelectedPages) => void;
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
  onClick,
}: IProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const unreadNotifications = useSelector(selectUnreadNotificationsNumber);

  const isLargeScreenHovered = isHovered && window.innerWidth > 768;

  const handleClick = () => {
    setSelectedPage(value);
    onClick && onClick();
  }
  return (
    <button
      className={`${styles.sideBar_navItem} ${selectedPage === value ? styles.sideBar_navItem_selected : ""
        }
    ${isOpened ? styles.sideBar_navItem_opened : ""}
    `}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {value === NOTIFICATIONS ? (
        <div className={styles.sideBar_navItem_notificationContainer}>
          <svg
            className={styles.sideBar_navItem_svg}
            style={{
              fill:
                isLargeScreenHovered
                  ? "#1d7b1e"
                  : selectedPage === value
                    ? "#ffffff"
                    : "#323232",
            }}
          >
            <use href={Icon} />
          </svg>
          <div
            className={styles.sideBar_navItem_notification}
            style={{
              outline: `2px solid ${isLargeScreenHovered ? "#eaf2eb" : selectedPage === value ? "var(--green)" : "var(--white)"}`,
            }}
          >
            {String(unreadNotifications)}
          </div>
        </div>
      ) : (
        <svg
          className={styles.sideBar_navItem_svg}
          style={{
            fill:
              isLargeScreenHovered
                ? "#1d7b1e"
                : selectedPage === value
                  ? "#ffffff"
                  : "#323232",
          }}
        >
          <use href={Icon} />
        </svg>
      )}

      {value}
    </button>
  );
};

export default SideBarNavItem;
