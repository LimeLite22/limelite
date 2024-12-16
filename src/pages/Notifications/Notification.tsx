import { useDispatch } from "react-redux";

import {
  extractFormattedTime,
  getDayOfWeek,
  timeAgo,
} from "utils/notifications";

import { readNotification } from "../../redux/notifications/reducer";
import styles from "./Notifications.module.scss";
import type { INotification } from "./interfaces";

interface IProps {
  notification: INotification;
}
const Notification = ({ notification }: IProps) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(readNotification(notification.id))}
      className={`${styles.notification} ${
        notification.isRead && styles.notification_read
      }`}
    >
      <div className={styles.notification_header}>
        <div className={styles.notification_header_sender}>
          {notification.sender}
        </div>
        <div className={styles.notification_header_dot}></div>
        <div className={styles.notification_header_sender}>
          {getDayOfWeek(1721754478259)}
        </div>
        <div className={styles.notification_header_time}>
          {extractFormattedTime(1721754478259)}
        </div>
      </div>{" "}
      {notification.hyperlink ? (
        <div className={styles.notification_text}>
          <span> Video </span> added successfully
        </div>
      ) : (
        <div className={styles.notification_text}>{notification.text}</div>
      )}
      <div className={styles.notification_timeAgo}>
        {" "}
        {timeAgo(1721754478259)}
      </div>
    </div>
  );
};
export default Notification;
