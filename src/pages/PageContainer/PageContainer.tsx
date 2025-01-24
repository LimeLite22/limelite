import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Outlet } from "react-router-dom";

import { BottomMenu, SideBar } from "components";
import Loader from "pages/Loader/Loader";
import Footer from "pages/Welcome/components/Footer/Footer";
import WelomeHeader from "pages/Welcome/components/Header/WelcomeHeader";

import useWindowWidth from "hooks/useWindowWidth";

import { useCalculateFinalPrice } from "utils/priceCalculator";

import styles from "./PageContainer.module.scss";
import { useConfigureStepsList } from "utils/configureStepsList";

const PageContainer = () => {
  // Hooks related to sidebar and burger menu states
  const [isSideBarOpened, setIsSideBarOpened] = useState(true);
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  // Window and location-related variables
  const width = useWindowWidth();
  const location = useLocation();
  const { pathname } = location;

  // Utility function for path checks
  const isPathIncluded = (paths: string[]): boolean =>
    paths.some((path) => location.pathname.includes(path));

  // Route-specific flags
  const isNewRequestSteps = isPathIncluded([
    "new-request/project",
    "new-request/logistics",
    "new-request/script",
    "new-request/interview",
    "new-request/voiceover",
    "new-request/video-edit",
    "new-request/add-ons",
    "new-request/submit",
    "new-request/final",
  ]);
  const isCreateProfilePage = isPathIncluded(["profile-create"]);
  const isLoginPage = isPathIncluded(["login"]);
  const isPasswordResetPage = isPathIncluded(["password-reset"]);
  const hideFooterForMobile = isPathIncluded(["support"]);
  const whiteBackgroundForMobile = isPathIncluded(["support"]);

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
        {!isNewRequestSteps && !isCreateProfilePage && !isLoginPage && !isPasswordResetPage && (
          <div className={styles.sideBarHideContainer}>
            <SideBar
              isOpened={isSideBarOpened}
              setIsOpened={setIsSideBarOpened}
            />
          </div>
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

          {((hideFooterForMobile && width > 768) || !hideFooterForMobile) && (
            <>
              {!location.pathname.includes("new-request/logistics") &&
                !location.pathname.includes("new-request/project") &&
                !location.pathname.includes("new-request/script") &&
                !location.pathname.includes("new-request/interview") &&
                !location.pathname.includes("new-request/voiceover") &&
                !location.pathname.includes("new-request/video-edit") &&
                !location.pathname.includes("new-request/add-ons") &&
                !location.pathname.includes("new-request/submit") &&
                !location.pathname.includes("new-request/final") &&
                !location.pathname.includes("profile-create") &&
                !isPasswordResetPage &&
                !isLoginPage
                && <Footer />}
            </>
          )}
        </div>
        {!isNewRequestSteps && !isCreateProfilePage && !isLoginPage && !isPasswordResetPage && <BottomMenu isOpened={isSideBarOpened} />}
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
