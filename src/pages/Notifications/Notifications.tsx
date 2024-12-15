import { DoubleGap, DoubleGapGray } from "assets/images";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateUniqueId } from "utils/generateId";
import { isWithinLast10Hours } from "utils/notifications";

import {
  markAllAsRead,
  selectNotifications,
  selectUnreadNotificationsNumber,
} from "../../redux/notifications/reducer";
import Notification from "./Notification";
import styles from "./Notifications.module.scss";
import type { INotification } from "./interfaces";

const Notifications = (): JSX.Element => {
  const notificationsList = useSelector(selectNotifications);
  const unreadNotifications = useSelector(selectUnreadNotificationsNumber);
  const dispatch = useDispatch();
  const [searchValue] = useState("");
  const areAllRead = notificationsList.every(
    (notification: INotification) => notification.isRead,
  );
  return (
    <>
      <div className={styles.notifications_header}>
        <div className={styles.notifications_header_text}>
          Notifications <span>({String(unreadNotifications)} new)</span>
        </div>

        <div className={styles.notifications_header_subText}>
          Rhoncus aliquet ipsum interdum bibendum. Tempor ac enim.
        </div>
      </div>
      <div className={styles.notifications_recentHeader}>
        <div className={styles.notifications_recentHeader_text}>
          Most Recent
        </div>
        <span
          style={{ color: areAllRead ? "var(--gray)" : "" }}
          onClick={() => dispatch(markAllAsRead())}
        >
          {" "}
          <img
            src={areAllRead ? DoubleGapGray : DoubleGap}
            alt="DoubleGap"
          />{" "}
          Mark all as read
        </span>
      </div>
      {notificationsList
        .filter(() => isWithinLast10Hours(1721754478259))
        .filter(
          (item: INotification) =>
            searchValue.length === 0 ||
            item.text.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
            item.sender.toLowerCase().includes(searchValue.toLowerCase()),
        )
        .map((item: INotification) => (
          <Notification key={generateUniqueId()} notification={item} />
        ))}

      <div className={styles.notifications_earlierHeader}>Earlier</div>
      {notificationsList
        .filter(() => !isWithinLast10Hours(1721754478259))
        .filter(
          (item: INotification) =>
            searchValue.length === 0 ||
            item.text.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
            item.sender.toLowerCase().includes(searchValue.toLowerCase()),
        )
        .map((item: INotification) => (
          <Notification key={item.id} notification={item} />
        ))}
    </>
  );
};
export default Notifications;
