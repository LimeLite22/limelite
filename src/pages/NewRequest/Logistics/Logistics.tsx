import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  ArrowGray,
  ArrowGray3,
  ArrowGray4,
  DetailsGreen,
} from "assets/images";


import { DEFAULT, OWN_ADDRESS, YES } from "consts/consts";

import { selectRequestInfo } from "../../../redux/requests/reducer";
import styles from "../NewRequest.module.scss";
import FormFooter from "../components/FormFooter";
import StepsNavigation from "../components/StepsNavigation";
import Date from "./components/DateBox";
import IsTravelRequired from "./components/IsTravelRequiredBox";
import Location from "./components/LocationBox";
import ShotList from "./components/ShotListBox";
import NextButton from "../components/NextButton";
import { useCustomPadding } from "utils/customPadding";

const Logistics = () => {
  const selectedRequest = useSelector(selectRequestInfo);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [showBottomMessage, setShowBottomMessage] = useState(false);
  const customPadding = useCustomPadding();

  const handleNextDisabled = () => {
    let isDisabled = false;
    if (
      !selectedRequest?.travel?.selection ||
      (selectedRequest?.travel?.selection === YES &&
        !selectedRequest?.travel?.zoneCode.name)
    ) {
      isDisabled = true;
    } else if (selectedRequest?.location?.type === DEFAULT) {
      isDisabled = true;
    } else if (
      selectedRequest?.location?.type === OWN_ADDRESS &&
      (selectedRequest?.location?.street.length === 0 ||
        selectedRequest?.location?.city.length === 0 ||
        selectedRequest?.location?.state.length === 0 ||
        selectedRequest?.location?.zip.length === 0)
    ) {
      isDisabled = true;
    }
    if (!selectedRequest?.isAlternate) {
      if (
        selectedRequest?.preferredDate?.date === DEFAULT ||
        selectedRequest?.preferredDate?.time === DEFAULT
      ) {
        isDisabled = true;
      }
    } else {
      if (
        selectedRequest?.preferredDate?.date === DEFAULT ||
        selectedRequest?.preferredDate?.time === DEFAULT ||
        selectedRequest?.alternateDate?.date === DEFAULT ||
        selectedRequest?.alternateDate?.time === DEFAULT
      ) {
        isDisabled = true;
      }
    }
    setIsNextDisabled(isDisabled);
  };
  useEffect(() => {
    handleNextDisabled();
  }, [selectedRequest]);

  return (
        <div
          className={styles.nR_container}
          style={{
            paddingBottom: customPadding,
          }}
        >
          <Link to="/new-request/start">
            <div className={styles.nR_backButton}>
              <img src={ArrowGray3} alt="" /> Back to New Request{" "}
            </div>
          </Link>
          <div className={styles.nR_subContainer}>
            <StepsNavigation />
            <div className={styles.nR_header}>
              <div className={styles.nR_header_text}>
                <Link to="/new-request/project">
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
              {isNextDisabled && showBottomMessage && (
                <div className={styles.nR_formContainer_error}>
                  Please ensure all required fields are filled out before
                  submitting the form. Each section must be completed to
                  proceed.
                </div>
              )}
              <div className={styles.nR_formContainer_buttons}>
                <Link to="/new-request/project">
                  <button className={styles.nR_back}>
                    <img src={ArrowGray} alt="" />
                    Go Back
                  </button>
                </Link>
                <div className={styles.nR_buttons_container}>
                  <button className={styles.nR_buttons_save}>
                    <img src={DetailsGreen} alt="" />
                  </button>
                  <NextButton isDisabled={isNextDisabled} onClick={()=>{
                    isNextDisabled && setShowBottomMessage(true);
                  }} />
                </div>
              </div>
            </div>
          </div>
          <FormFooter />
        </div>
  );
};

export default Logistics;