import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  ArrowGray,
  ArrowGray3,
  ArrowGray4,
  ArrowWhite,
  DetailsGreen,
} from "assets/images";

import useWindowWidth from "hooks/useWindowWidth";

import { useCalculateFinalPrice } from "utils/priceCalculator";

import { DEFAULT, OWN_SCRIPT, PROFESSIONAL_SCRIPT } from "consts/consts";

import { selectRequestInfo } from "../../../redux/requests/reducer";
import styles from "../NewRequest.module.scss";
import FormFooter from "../components/FormFooter";
import StepsNavigation from "../components/StepsNavigation";
import IsScriptRequired from "./components/Script/IsScriptRequiredBox";
import ScriptPersons from "./components/ScriptPersons";
import Teleprompter from "./components/Teleprompter";

const NewRequestStep3 = () => {
  const selectedRequest = useSelector(selectRequestInfo);
  const price = useCalculateFinalPrice();
  const [isDisabled, setIsDisabled] = useState(true);
  const [showBottomMessage, setShowBottomMessage] = useState(false);
  const width = useWindowWidth();

  const handleNextDisabled = () => {
    let disabled = false;
    if (selectedRequest?.scriptSettings?.scriptWriter === DEFAULT) {
      disabled = true;
    }
    if (
      selectedRequest?.scriptSettings?.scriptWriter === OWN_SCRIPT &&
      selectedRequest?.scriptSettings?.ownText.length === 0
    ) {
      disabled = true;
    }
    if (
      selectedRequest?.scriptSettings?.scriptWriter === PROFESSIONAL_SCRIPT &&
      (selectedRequest?.scriptSettings?.profText.length === 0 ||
        selectedRequest?.scriptSettings?.name.length === 0 ||
        selectedRequest?.scriptSettings?.phone === 0 ||
        selectedRequest?.scriptSettings?.phone === "")
    ) {
      disabled = true;
    }
    if (selectedRequest?.scriptSettings?.teleprompter === DEFAULT) {
      disabled = true;
    }
    const persons = selectedRequest?.scriptSettings?.persons;
    persons?.forEach((person) => {
      if (person.name.length === 0 || person.title.length === 0) {
        disabled = true;
      }
    });
    setIsDisabled(disabled);
  };
  useEffect(() => {
    handleNextDisabled();
  }, [selectedRequest]);

  return (
    <>
      <div className={styles.nR}>
        <div
          className={styles.nR_container}
          style={{
            paddingBottom: price === 0 && width < 768 ? "20px" : "",
          }}
        >
          <Link to="/newRequest/step2">
            <div className={styles.nR_backButton}>
              <img src={ArrowGray3} alt="" /> Back to New Request{" "}
            </div>
          </Link>
          <div className={styles.nR_subContainer}>
            <StepsNavigation />
            <div className={styles.nR_header}>
              <div className={styles.nR_header_text}>
                <Link to="/newRequest/step2">
                  <div className={styles.nR_header_text_button}>
                    <img src={ArrowGray4} alt="" />
                  </div>
                </Link>
                Scripted Delivery
              </div>
              <div className={styles.nR_header_subText}>
                Please provide important information below regarding your video
                script
              </div>
            </div>
            <div className={styles.nR_formContainer}>
              <IsScriptRequired />
              <Teleprompter />
              <ScriptPersons />
              {isDisabled && showBottomMessage && (
                <div className={styles.nR_formContainer_error}>
                  Please ensure all required fields are filled out before
                  submitting the form. Each section must be completed to
                  proceed.
                </div>
              )}
              <div className={styles.nR_formContainer_buttons}>
                <Link to="/newRequest/step2">
                  <button className={styles.nR_back}>
                    <img src={ArrowGray} alt="" />
                    Go Back
                  </button>
                </Link>
                <div className={styles.nR_buttons_container}>
                  <button className={styles.nR_buttons_save}>
                    <img src={DetailsGreen} alt="" />
                  </button>
                  {isDisabled ? (
                    <button
                      onClick={() => setShowBottomMessage(true)}
                      className={`${styles.nR_buttons_delivery} ${isDisabled ? styles.nR_buttons_deliveryDisabled : ""} `}
                    >
                      Next <img src={ArrowWhite} alt="" />
                    </button>
                  ) : (
                    <Link to={"/newRequest/step4"}>
                      <button className={`${styles.nR_buttons_delivery}`}>
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

export default NewRequestStep3;