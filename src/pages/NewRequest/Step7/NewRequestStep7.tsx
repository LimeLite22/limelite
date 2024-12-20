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

import { selectRequestVoiceSettings } from "../../../redux/requests/reducer";
import styles from "../NewRequest.module.scss";
import FormFooter from "../components/FormFooter";
import StepsNavigation from "../components/StepsNavigation";
import { ADD_ONS_LIST } from "consts/consts";
import AddOnBox from "./components/AddOnBox";

const NewRequestStep7 = () => {
  const voiceSettings = useSelector(selectRequestVoiceSettings);
  const price = useCalculateFinalPrice();
  const [isDisabled, setIsDisabled] = useState(true);
  const [showBottomMessage, setShowBottomMessage] = useState(false);
  const width = useWindowWidth();

  const handleNextDisabled = () => {
    let disabled = false;

    console.log("disabled", disabled);
    setIsDisabled(disabled);
  };
  useEffect(() => {
    handleNextDisabled();
  }, [voiceSettings]);

  return (
    <>
      <div className={styles.nR}>
        <div
          className={styles.nR_container}
          style={{
            paddingBottom: price === 0 && width < 768 ? "20px" : "",
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
              <div className={styles.nR_header_text + " " + styles.nR_header_text_mobPadding} >
                <Link to="/newRequest/step6">
                  <div className={styles.nR_header_text_button}>
                    <img src={ArrowGray4} alt="" />
                  </div>
                </Link>
                What additional Add-ons are needed?
              </div>
            </div>

            <div className={styles.nR_formContainer}>
              <div >
                {
                  ADD_ONS_LIST.map((item, index) => (
                    <AddOnBox key={index} item={item} />
                  ))
                }
              </div>
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
                    <Link to={"/newRequest/step6"}>
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

export default NewRequestStep7;
