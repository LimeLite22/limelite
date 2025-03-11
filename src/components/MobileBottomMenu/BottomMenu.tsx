import { HOME, LEARN, NOTIFICATIONS, PROJECTS } from "consts/consts";
import { Link, useLocation } from "react-router-dom";
import { TSelectedMobPages } from "types/types";

import {
  BottomNewRequestIcon,
  Home,
  Learn,
  Notifications,
  Projects,
} from "../../assets/images";
import styles from "./BottomMenu.module.scss";
import BottomMenuItem from "./components/BottomMenuItem";

interface IProps {
  isOpened: boolean;
}

const BottomMenu = ({ isOpened }: IProps) => {
  const location = useLocation();
  const getPageFromPath = (pathname: string): TSelectedMobPages => {
    if (pathname.includes("learn")) return LEARN;
    if (pathname.includes("welcome")) return HOME;
    if (pathname.includes("notifications")) return NOTIFICATIONS;
    if (pathname.includes("projects")) return PROJECTS;
    return HOME; // Default fallback
  };

  const selectedPage = getPageFromPath(location.pathname);

  if (location?.pathname.includes("new-request/start")) {
    return null;
  }

  return (
    <div className={styles.bottomMenu} onClick={(e) => e.stopPropagation()}>
      <Link to="/welcome">
        <BottomMenuItem
          isPageSelected={selectedPage === HOME}
          value="Home"
          Icon={`${Home}#Home`}
          isOpened={isOpened}
        />
      </Link>
      <Link to="/projects">
        <BottomMenuItem
          isPageSelected={selectedPage === PROJECTS}
          value="Projects"
          Icon={`${Projects}#Projects`}
          isOpened={isOpened}
        />
      </Link>
      <Link to="/new-request/start">
        <div className={styles.bottomMenu_item}>
          <img src={BottomNewRequestIcon} alt="NewRequestIcon" />
          New Request
        </div>
      </Link>
      <Link to="/learn/faqs">
        <BottomMenuItem
          isPageSelected={selectedPage === LEARN}
          value="Learn"
          Icon={`${Learn}#Learn`}
          isOpened={isOpened}
        />
      </Link>
      <Link to="/notifications">
        <BottomMenuItem
          isPageSelected={selectedPage === NOTIFICATIONS}
          value="Notifications"
          Icon={`${Notifications}#Notifications`}
          isOpened={isOpened}
        />
      </Link>
    </div>
  );
};

export default BottomMenu;

