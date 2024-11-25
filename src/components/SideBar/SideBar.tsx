import useWindowWidth from "hooks/useWindowWidth";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  AddOnsGreenIcon,
  AddOnsGreyIcon,
  AddOnsWhiteIcon,
  HomeWhiteIcon,
  NewRequestGreenIcon,
  NewRequestGreyIcon,
  NewRequestWhiteIcon,
  NotificationsWhiteIcon,
  ProjectsWhiteIcon,
  SettingsGreenIcon,
  SettingsGreyIcon,
  SettingsWhiteIcon,
  SideBarHomeGreenIcon,
  SideBarHomeGreyIcon,
  SideBarLearnGreenIcon,
  SideBarLearnGreyIcon,
  SideBarLearnWhiteIcon,
  SideBarNotificationsGreenIcon,
  SideBarNotificationsGreyIcon,
  SideBarProjectsGreenIcon,
  SideBarProjectsGreyIcon,
  SupportGreenIcon,
  SupportGreyIcon,
  SupportWhiteIcon,
} from "../../assets/images";
import styles from "./SideBar.module.scss";
import SideBarNavItem from "./components/SideBarNavItem";
import {
  ADD_ONS,
  LEARN,
  NEW_REQUEST,
  NOTIFICATIONS,
  PROJECTS,
  SETTINGS,
  SUPPORT,
  WELCOME,
  type selectedPages,
} from "./types";

type IProps = {
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
};
const SideBar = ({ isOpened, setIsOpened }: IProps) => {
  const [selectedPage, setSelectedPage] = useState<selectedPages>(WELCOME);
  const location = useLocation();
  const windowWidth = useWindowWidth();
  useEffect(() => {
    if (location.pathname.includes("learn")) {
      setSelectedPage(LEARN);
    }
    if (location.pathname.includes("welcome")) {
      setSelectedPage(WELCOME);
    }
    if (location.pathname.includes("notifications")) {
      setSelectedPage(NOTIFICATIONS);
    }
    if (
      location.pathname.includes("newRequest/start") ||
      location.pathname.includes("newRequest/step1") ||
      location.pathname.includes("newRequest/step2")
    ) {
      setSelectedPage(NEW_REQUEST);
    }
  }, [location]);
  return (
    <div
      className={`${styles.sideBar} ${isOpened ? styles.sideBar_opened : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.sideBar_navItems}>
        <div className={styles.sideBar_navItemContainer}>
          <Link to="/welcome" style={{ textDecoration: "none" }}>
            <SideBarNavItem
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              isOpened={isOpened}
              whiteIcon={HomeWhiteIcon}
              greyIcon={SideBarHomeGreyIcon}
              greenIcon={SideBarHomeGreenIcon}
              value={WELCOME}
              onClick={() => windowWidth < 768 && setIsOpened(false)}
            />
          </Link>

          <div
            className={`${styles.sideBar_navItemContainer_switchArrow} ${
              isOpened ? styles.sideBar_navItemContainer_switchArrow_opened : ""
            }`}
            onClick={() => setIsOpened(!isOpened)}
          />
        </div>
        <Link to="/newRequest/start" style={{ textDecoration: "none" }}>
          <SideBarNavItem
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            isOpened={isOpened}
            whiteIcon={NewRequestWhiteIcon}
            greyIcon={NewRequestGreyIcon}
            greenIcon={NewRequestGreenIcon}
            value={NEW_REQUEST}
            onClick={() => windowWidth < 768 && setIsOpened(false)}
          />
        </Link>
        <Link to="" style={{ textDecoration: "none" }}>
          <SideBarNavItem
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            isOpened={isOpened}
            whiteIcon={ProjectsWhiteIcon}
            greyIcon={SideBarProjectsGreyIcon}
            greenIcon={SideBarProjectsGreenIcon}
            value={PROJECTS}
            onClick={() => windowWidth < 768 && setIsOpened(false)}
          />
        </Link>
        <Link to="/learn/faqs" style={{ textDecoration: "none" }}>
          <SideBarNavItem
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            isOpened={isOpened}
            whiteIcon={SideBarLearnWhiteIcon}
            greyIcon={SideBarLearnGreyIcon}
            greenIcon={SideBarLearnGreenIcon}
            value={LEARN}
            onClick={() => windowWidth < 768 && setIsOpened(false)}
          />
        </Link>
        <Link to="" style={{ textDecoration: "none" }}>
          <SideBarNavItem
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            isOpened={isOpened}
            whiteIcon={AddOnsWhiteIcon}
            greyIcon={AddOnsGreyIcon}
            greenIcon={AddOnsGreenIcon}
            value={ADD_ONS}
            onClick={() => windowWidth < 768 && setIsOpened(false)}
          />
        </Link>
        <div className={styles.sideBar_divider}></div>

        <Link to="/notifications" style={{ textDecoration: "none" }}>
          <SideBarNavItem
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            isOpened={isOpened}
            whiteIcon={NotificationsWhiteIcon}
            greyIcon={SideBarNotificationsGreyIcon}
            greenIcon={SideBarNotificationsGreenIcon}
            value={NOTIFICATIONS}
            onClick={() => windowWidth < 768 && setIsOpened(false)}
          />
        </Link>
        <Link to="" style={{ textDecoration: "none" }}>
          <SideBarNavItem
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            isOpened={isOpened}
            whiteIcon={SettingsWhiteIcon}
            greyIcon={SettingsGreyIcon}
            greenIcon={SettingsGreenIcon}
            value={SETTINGS}
            onClick={() => windowWidth < 768 && setIsOpened(false)}
          />
        </Link>
        <Link to="/support" style={{ textDecoration: "none" }}>
          <SideBarNavItem
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            isOpened={isOpened}
            whiteIcon={SupportWhiteIcon}
            greyIcon={SupportGreyIcon}
            greenIcon={SupportGreenIcon}
            value={SUPPORT}
            onClick={() => windowWidth < 768 && setIsOpened(false)}
          />
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
