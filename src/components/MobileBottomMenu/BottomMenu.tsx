import { useEffect, useState } from "react";
// import { Sheet } from "react-modal-sheet";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

// import { IRequest } from "interfaces/interfaces";
import { selectedMobPages } from "types/types";

import { HOME, LEARN, NOTIFICATIONS, PROJECTS } from "consts/consts";
// import { optionsList } from "consts/consts";

import {
  BottomNewRequestIcon,
  // EditOnlyIcon,
  Home,
  Learn,
  Notifications,
  // OtherIcon,
  Projects,
  // ShootEditIcon,
  // ShootOnlyIcon,
} from "../../assets/images";
// import { createDraft } from "../../redux/requests/reducer";
import styles from "./BottomMenu.module.scss";
import BottomMenuItem from "./components/BottomMenuItem";

type IProps = {
  isOpened: boolean;
};

const BottomMenu = ({ isOpened }: IProps) => {
  const [selectedPage, setSelectedPage] = useState<selectedMobPages>(HOME);
  const location = useLocation();
  // const [isOpen, setIsOpen] = useState(false);
  // const closeBottomSheet = () => setIsOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const handleCardClick = (option: IRequest["option"]) => {
  //   dispatch(createDraft(option));
  //   navigate("/new-request/start");
  // };

  useEffect(() => {
    if (location?.pathname.includes("learn")) {
      setSelectedPage(LEARN);
    }
    if (location?.pathname.includes("welcome")) {
      setSelectedPage(HOME);
    }
    if (location?.pathname.includes("notifications")) {
      setSelectedPage(NOTIFICATIONS);
    }
  }, [location]);
  if (location?.pathname.includes("new-request/start")) {
    return null;
  }

  return (
    <div className={styles.bottomMenu} onClick={(e) => e.stopPropagation()}>
      <Link style={{ textDecoration: "none" }} to="/welcome">
        <BottomMenuItem
          isPageSelected={selectedPage === HOME}
          setSelectedPage={setSelectedPage}
          value="Home"
          Icon={`${Home}#Home`}
          isOpened={isOpened}
        />
      </Link>
      <BottomMenuItem
        isPageSelected={selectedPage === PROJECTS}
        setSelectedPage={setSelectedPage}
        value="Projects"
        Icon={`${Projects}#Projects`}
        isOpened={isOpened}
      />
      <Link style={{ textDecoration: "none" }} to="/new-request/start">
        <div className={styles.bottomMenu_item}>
          <img src={BottomNewRequestIcon} alt={" NewRequestIcon"} />
          New Request
        </div>
      </Link>
      <Link style={{ textDecoration: "none" }} to="/learn/faqs">
        <BottomMenuItem
          isPageSelected={selectedPage === LEARN}
          setSelectedPage={setSelectedPage}
          value="Learn"
          Icon={`${Learn}#Learn`}
          isOpened={isOpened}
        />
      </Link>
      <Link style={{ textDecoration: "none" }} to="/notifications">
        <BottomMenuItem
          isPageSelected={selectedPage === NOTIFICATIONS}
          setSelectedPage={setSelectedPage}
          value="Notifications"
          Icon={`${Notifications}#Notifications`}
          isOpened={isOpened}
        />
      </Link>
      {/* {isOpen && (
        <Sheet
          isOpen={isOpen}
          onClose={closeBottomSheet}
          dragVelocityThreshold={500}
          initialSnap={1}
          detent="full-height"
          style={{
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
            background: "#11100E99",
          }}
          className={styles.bottomMenu_tips_sheet}
        >
          <div
            className={styles.bottomMenu_tips_closeArea}
            onClick={closeBottomSheet}
          ></div>
          <Sheet.Container className={styles.bottomMenu_tips_sheetContainer}>
            <Sheet.Content className={styles.learnMore_sheetContent}>
              <div
                className={`${styles.newRequestMenuContainer_newRequestMenu} 
        `}
              >
                <div
                  className={styles.newRequestMenuContainer_newRequestMenu_line}
                />
                <div
                  className={
                    styles.newRequestMenuContainer_newRequestMenu_title
                  }
                >
                  Choose an option to get started:
                </div>
                <div
                  className={styles.newRequestMenuContainer_newRequestMenu_item}
                  onClick={() => handleCardClick(optionsList[0])}
                >
                  <img src={ShootEditIcon} alt={"ShootEditIcon"} /> Shoot + Edit{" "}
                  <div
                    className={
                      styles.newRequestMenuContainer_newRequestMenu_item_title
                    }
                  >
                    2 credits
                  </div>
                </div>
                <div
                  className={styles.newRequestMenuContainer_newRequestMenu_item}
                  onClick={() => handleCardClick(optionsList[1])}
                >
                  <img src={ShootOnlyIcon} alt={"ShootOnlyIcon"} /> Shoot Only
                  <div
                    className={
                      styles.newRequestMenuContainer_newRequestMenu_item_title
                    }
                  >
                    1 credit
                  </div>
                </div>
                <div
                  className={styles.newRequestMenuContainer_newRequestMenu_item}
                  onClick={() => handleCardClick(optionsList[2])}
                >
                  <img src={EditOnlyIcon} alt={"EditOnlyIcon"} /> Edit Only
                  <div
                    className={
                      styles.newRequestMenuContainer_newRequestMenu_item_title
                    }
                  >
                    1 credit
                  </div>
                </div>
                <div
                  className={styles.newRequestMenuContainer_newRequestMenu_item}
                  onClick={() => handleCardClick(optionsList[3])}
                >
                  <img src={OtherIcon} alt={"OtherIcon"} /> Other
                </div>
              </div>
            </Sheet.Content>
          </Sheet.Container>
        </Sheet>
      )} */}
    </div>
  );
};

export default BottomMenu;
