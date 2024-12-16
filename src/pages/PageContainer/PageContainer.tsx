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

const PageContainer = () => {
  const [isSideBarOpened, setIsSideBarOpened] = useState(true);
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const width = useWindowWidth();
  const location = useLocation();
  const hideFooterForMobile = location.pathname.includes("support");
  const whiteBackgroundForMobile = location.pathname.includes("support");
  const isNewRequestSteps =
    location.pathname.includes("newRequest/step1") ||
    location.pathname.includes("newRequest/step2") ||
    location.pathname.includes("newRequest/step3") ||
    location.pathname.includes("newRequest/step4") ||
    location.pathname.includes("newRequest/step5") ||
    location.pathname.includes("newRequest/step6");
  const { pathname } = useLocation();
  useEffect(() => {
    document?.getElementById("pageContainer")?.scrollTo(0, 34);
  }, [pathname]);
  useCalculateFinalPrice();
  const notFirst = localStorage.getItem("notFirstVisit") === "true";
  const [notFirstVisit, setNotFirstVisit] = useState(notFirst);
  useEffect(() => {
    if (!notFirst) {
      setTimeout(() => {
        setNotFirstVisit(true);
        localStorage.setItem("notFirstVisit", "true");
      }, 6000);
    }
  }, []);
  if (!notFirstVisit) {
    // localStorage.setItem("isFirstVisit", "false");
    return <Loader isWelcome={true} />;
  }

  return (
    <div
      id="pageContainer"
      className={` ${styles.pageContainer} ${
        whiteBackgroundForMobile ? styles.whiteBackgroundForMobile : ""
      }
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
        {!isNewRequestSteps && (
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
          ${isNewRequestSteps ? styles.newRequestStep2Container : ""}           
          ${width < 768 && location.pathname.includes("newRequest/start") ? styles.newRequestStep1MobContainer : ""}`}
        >
          <div className={styles.pageContainer__content_main_content}>
            <Outlet />
          </div>

          {((hideFooterForMobile && width > 768) || !hideFooterForMobile) && (
            <>
              {!location.pathname.includes("newRequest/step2") &&
                !location.pathname.includes("newRequest/step1") &&
                !location.pathname.includes("newRequest/step3") &&
                !location.pathname.includes("newRequest/step4") &&
                !location.pathname.includes("newRequest/step5") &&
                !location.pathname.includes("newRequest/step6") && <Footer />}
            </>
          )}
        </div>
        {!isNewRequestSteps && <BottomMenu isOpened={isSideBarOpened} />}
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
