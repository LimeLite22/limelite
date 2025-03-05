import { BottomMenu, SideBar } from "components";
import useWindowWidth from "hooks/useWindowWidth";
import Loader from "pages/Loader/Loader";
import Footer from "pages/Welcome/components/Footer/Footer";
import WelomeHeader from "pages/Welcome/components/Header/WelcomeHeader";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Outlet } from "react-router-dom";
import { useConfigureStepsList } from "utils/configureStepsList";
import { useIsPathIncluded } from "utils/pathChecker";
import { useCalculateFinalPrice } from "utils/priceCalculator";

import styles from "./PageContainer.module.scss";

const PageContainer = () => {
  // Hooks related to sidebar and burger menu states
  const [isSideBarOpened, setIsSideBarOpened] = useState(true);
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  // Window and location-related variables
  const width = useWindowWidth();
  const location = useLocation();
  const { pathname } = location;


  // Route-specific flags
  const isNewRequestSteps = useIsPathIncluded([
    "new-request/project",
    "new-request/logistics",
    "new-request/narration",
    "new-request/video-edit",
    "new-request/add-ons",
    "new-request/submit",
    "new-request/final",
  ]);
  const isLoginPages = useIsPathIncluded(["login", "password-reset", "password-new"]);
  const isCreateProfilePage = useIsPathIncluded(["profile-create"]);
  const isSupportPage = useIsPathIncluded(["support"]);

  const notPrivatePage = !isLoginPages && !isCreateProfilePage && !isNewRequestSteps;
  const whiteBackgroundForMobile = useIsPathIncluded(["support"]);

  // Hooks for additional functionalities
  useCalculateFinalPrice();
  useConfigureStepsList();

  // LocalStorage-related state
  const notFirst = localStorage.getItem("notFirstVisit") === "true";
  const [notFirstVisit, setNotFirstVisit] = useState(notFirst);

  useEffect(() => {
    document?.getElementById("pageContainer")?.scrollTo(0, 34);
  }, [pathname]);

  useEffect(() => {
    if (!notFirst) {
      setTimeout(() => {
        setNotFirstVisit(true);
        localStorage.setItem("notFirstVisit", "true");
      }, 6000);
    }
  }, []);
  if (!notFirstVisit) {
    return <Loader isWelcome={true} />;
  }

  return (
    <div
      id="pageContainer"
      className={` 
      ${styles.pageContainer} 
      ${whiteBackgroundForMobile ? styles.whiteBackgroundForMobile : ""}
      ${isNewRequestSteps ? styles.newRequestStep2Container : ""}
      `}
    >
      <WelomeHeader
        isOpened={isSideBarOpened}
        isBurgerOpened={isBurgerOpened}
        setIsBurgerOpened={setIsBurgerOpened}
      />
      <div
        id="mainContent"
        className={`
          ${styles.pageContainer__content}
          `}
        style={{ overflow: isBurgerOpened ? "hidden" : "" }}
      >
        {notPrivatePage && (
          <>
            <div className={styles.sideBarHideContainer}>
              <SideBar
                isOpened={isSideBarOpened}
                setIsOpened={setIsSideBarOpened}
              />
            </div>
            <BottomMenu isOpened={isSideBarOpened} />
          </>
        )}
        <div
          className={`
          ${styles.pageContainer__content_main} 
          ${isCreateProfilePage ? styles.pageContainer__content_noPaddingForMobile : ""}
          ${isNewRequestSteps ? styles.newRequestStep2Container : ""}           
          ${width < 768 && location.pathname.includes("new-request/start") ? styles.newRequestStep1MobContainer : ""}`}
        >
          <div className={styles.pageContainer__content_main_content}>
            <Outlet />
          </div>

          {((isSupportPage && width > 768) || !isSupportPage) && (
            <>
              {notPrivatePage
                && <Footer />}
            </>
          )}
        </div>
        {isBurgerOpened && (
          <div
            className={styles.mobileSideMenuContainer}
            onClick={() => setIsBurgerOpened(false)}
          >
            <SideBar isOpened={true} setIsOpened={setIsBurgerOpened} />
          </div>
        )}
      </div>
    </div>
  );
};
export default PageContainer;
