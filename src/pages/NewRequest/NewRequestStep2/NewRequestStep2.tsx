import { useWhyDidYouUpdate } from "ahooks";
import {
  ArrowGray,
  ArrowGray3,
  ArrowGray4,
  ArrowWhite,
  DetailsGreen,
} from "assets/images";
import useWindowWidth from "hooks/useWindowWidth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectRequestInfo } from "../../../redux/requests/reducer";
import styles from "../NewRequest.module.scss";
import Date from "./components/DateBox";
import IsTravelRequired from "./components/IsTravelRequiredBox";
import Location from "./components/LocationBox";
import ShotList from "./components/ShotListBox";
import FormFooter from "../components/FormFooter";
import { DEFAULT } from "interfaces/interfaces";
import { OWN_ADDRESS, YES } from "../consts";
import { useEffect, useState } from "react";
import StepsNavigation from "../components/StepsNavigation";
import { useCalculateFinalPrice } from "utils/priceCalculator";

const NewRequestStep2 = () => {
  const selectedRequest = useSelector(selectRequestInfo);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [showBottomMessage, setShowBottomMessage] = useState(false);
  const option = selectedRequest?.option;
  const price = useCalculateFinalPrice();
  const width = useWindowWidth();
  useWhyDidYouUpdate("useWhyDidYouUpdateComponent", {
    option,
  });

  const handleNextDisabled = () => {
    let isDisabled = false;
    if (!selectedRequest?.travel?.selection || (selectedRequest?.travel?.selection === YES && !selectedRequest?.travel?.zoneCode.name)) {
      isDisabled = true;
    } else if (selectedRequest?.location?.type === DEFAULT) {
      isDisabled = true;
    } else if (selectedRequest?.location?.type === OWN_ADDRESS && (
      selectedRequest?.location?.street.length === 0 ||
      selectedRequest?.location?.city.length === 0 ||
      selectedRequest?.location?.state.length === 0 ||
      selectedRequest?.location?.zip.length === 0
    )) {
      isDisabled = true;
    }
    if (!selectedRequest?.isAlternate) {
      if (selectedRequest?.preferredDate?.date === DEFAULT || selectedRequest?.preferredDate?.time === DEFAULT) {
        isDisabled = true;
      }
    } else {
      if (selectedRequest?.preferredDate?.date === DEFAULT ||
        selectedRequest?.preferredDate?.time === DEFAULT ||
        selectedRequest?.alternateDate?.date === DEFAULT ||
        selectedRequest?.alternateDate?.time === DEFAULT) {
        isDisabled = true;
      }
    }
    setIsNextDisabled(isDisabled);
  }
  useEffect(() => {
    handleNextDisabled();
  }, [selectedRequest])

  return (
    <>
      <div className={styles.nR}>
        <div
          className={styles.nR_container}
          style={{
            paddingBottom:
              price ===
                0 && width < 768
                ? "20px"
                : "",
          }}
        >
          <Link to="/newRequest/start">
            <div className={styles.nR_backButton}>
              <img src={ArrowGray3} alt="" /> Back to New Request{" "}
            </div>
          </Link>
          <div className={styles.nR_subContainer}>
            <StepsNavigation />
            <div className={styles.nR_header}>
              <div className={styles.nR_header_text}>
                <Link to="/newRequest/step1">
                  <div className={styles.nR_header_text_button}>
                    <img src={ArrowGray4} alt="" />
                  </div>
                </Link>
                Shoot Logistics
              </div>
              <div className={styles.nR_header_subText}>
                Please provide important information below regarding your video
                shoot
              </div>
            </div>
              <div className={styles.nR_formContainer}>
                <IsTravelRequired />
                <Location />
                <Date />
                <ShotList />
                {isNextDisabled && showBottomMessage &&
                  <div className={styles.nR_formContainer_error}>
                    Please ensure all required fields are filled out before submitting the
                    form. Each section must be completed to proceed.
                  </div>
                }
                <div className={styles.nR_formContainer_buttons}>
                  <Link to="/newRequest/step1">
                    <button className={styles.nR_back}>
                      <img src={ArrowGray} alt="" />
                      Go Back
                    </button>
                  </Link>
                  <div className={styles.nR_buttons_container}>
                    <button className={styles.nR_buttons_save}>
                      <img src={DetailsGreen} alt="" />
                    </button>

                    {isNextDisabled ? (
                      <button
                        onClick={() => setShowBottomMessage(true)}
                        className={`${styles.nR_buttons_delivery} ${isNextDisabled ? styles.nR_buttons_deliveryDisabled : ""} `}
                      >
                        Next <img src={ArrowWhite} alt="" />
                      </button>
                    ) : (
                      <Link to={"/newRequest/step3"} >
                        <button
                          className={`${styles.nR_buttons_delivery}`}
                        >
                          Next <img src={ArrowWhite} alt="" />
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
          </div>
          <FormFooter />
        </div>
      </div>
    </>
  );
};

export default NewRequestStep2;
