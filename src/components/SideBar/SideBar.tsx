import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import useWindowWidth from "hooks/useWindowWidth";

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
} from "consts/consts";

import {
  AddOns,
  Home,
  Inspiration,
  Learn,
  NewRequest,
  Notifications,
  Projects,
  Settings2,
  Support,
} from "../../assets/images";
import styles from "./SideBar.module.scss";
import SideBarNavItem from "./components/SideBarNavItem";
import { TSelectedPages } from "types/types";

interface IProps  {
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
};
const SideBar = ({ isOpened, setIsOpened }: IProps) => {
  const [selectedPage, setSelectedPage] = useState<TSelectedPages>(WELCOME);
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
    if (location.pathname.includes("settings")) {
      setSelectedPage(SETTINGS);
    }
    if (
      location.pathname.includes("new-request/start")
    ) {
      setSelectedPage(NEW_REQUEST);
    }
  }, [location]);

  const handleLinkClick = () => {
    windowWidth < 768 && setIsOpened(false);
  };
  const handleToggleIsOpened = () => {
    setIsOpened(!isOpened);
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
            onClick={handleToggleIsOpened}
          />
        </div>
        <Link to="/new-request/start" style={{ textDecoration: "none" }}>
          <SideBarNavItem
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            isOpened={isOpened}
            icon={`${NewRequest}#NewRequest`}
            value={NEW_REQUEST}
            onClick={handleLinkClick}
          />
        </Link>
        <Link to="/projects" style={{ textDecoration: "none" }}>
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
        <Link to="/settings" style={{ textDecoration: "none" }}>
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
