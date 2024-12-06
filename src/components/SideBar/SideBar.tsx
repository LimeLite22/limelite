import useWindowWidth from "hooks/useWindowWidth";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  AddOns,
  NewRequest,
  Settings2,
  Home,
  Learn,
  Notifications,
  Projects,
  Support,
  Inspiration,
} from "../../assets/images";
import styles from "./SideBar.module.scss";
import SideBarNavItem from "./components/SideBarNavItem";
import {
  ADD_ONS,
  INSPIRATION,
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
      location.pathname.includes("newRequest/step2") ||
      location.pathname.includes("newRequest/step3") ||
      location.pathname.includes("newRequest/step4")
    ) {
      setSelectedPage(NEW_REQUEST);
    }
  }, [location]);

  const handleLinkClick = () => {
    windowWidth < 768 && setIsOpened(false)
  }
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
              icon={`${Home}#Home`}
              value={WELCOME}
              onClick={handleLinkClick}
            />
          </Link>

          <div
            className={`${styles.sideBar_navItemContainer_switchArrow} ${isOpened ? styles.sideBar_navItemContainer_switchArrow_opened : ""
              }`}
            onClick={() => setIsOpened(!isOpened)}
          />
        </div>
        <Link to="/newRequest/start" style={{ textDecoration: "none" }}>
          <SideBarNavItem
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            isOpened={isOpened}
            icon={`${NewRequest}#NewRequest`}
            value={NEW_REQUEST}
            onClick={handleLinkClick}
          />
        </Link>
        <Link to="" style={{ textDecoration: "none" }}>
          <SideBarNavItem
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            isOpened={isOpened}
            icon={`${Projects}#Projects`}
            value={PROJECTS}
            onClick={handleLinkClick}
          />
        </Link>
        <Link to="/learn/faqs" style={{ textDecoration: "none" }}>
          <SideBarNavItem
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            isOpened={isOpened}
            icon={`${Learn}#Learn`}
            value={LEARN}
            onClick={handleLinkClick}
          />
        </Link>
        <Link to="" style={{ textDecoration: "none" }}>
          <SideBarNavItem
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            isOpened={isOpened}
            icon={`${AddOns}#AddOns`}
            value={ADD_ONS}
            onClick={handleLinkClick}
          />
        </Link>
        <Link to="" style={{ textDecoration: "none" }}>
          <SideBarNavItem
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            isOpened={isOpened}
            icon={`${Inspiration}#Inspiration`}
            value={INSPIRATION}
            onClick={handleLinkClick}
          />
        </Link>
        <div className={styles.sideBar_divider}></div>

        <Link to="/notifications" style={{ textDecoration: "none" }}>
          <SideBarNavItem
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            isOpened={isOpened}
            icon={`${Notifications}#Notifications`}
            value={NOTIFICATIONS}
            onClick={handleLinkClick}
          />
        </Link>
        <Link to="" style={{ textDecoration: "none" }}>
          <SideBarNavItem
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            isOpened={isOpened}
            icon={`${Settings2}#Settings`}
            value={SETTINGS}
            onClick={handleLinkClick}
          />
        </Link>
        <Link to="/support" style={{ textDecoration: "none" }}>
          <SideBarNavItem
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            isOpened={isOpened}
            icon={`${Support}#Support`}
            value={SUPPORT}
            onClick={handleLinkClick}
          />
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
