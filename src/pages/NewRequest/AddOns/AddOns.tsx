import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  ArrowGray,
  ArrowGray3,
  ArrowGray4,
  DetailsGreen,
} from "assets/images";


import { selectRequestVoiceSettings } from "../../../redux/requests/reducer";
import styles from "../NewRequest.module.scss";
import FormFooter from "../components/FormFooter";
import StepsNavigation from "../components/StepsNavigation";
import { ADD_ONS_LIST } from "consts/consts";
import AddOnBox from "./components/AddOnBox";
import NextButton from "../components/NextButton";
import { useCustomPadding } from "utils/customPadding";

const AddOns = () => {
  const voiceSettings = useSelector(selectRequestVoiceSettings);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showBottomMessage, setShowBottomMessage] = useState(false);
  const customPadding = useCustomPadding();

  const handleNextDisabled = () => {
    let disabled = false;

    console.log("disabled", disabled);
    setIsDisabled(disabled);
  };
  useEffect(() => {
    handleNextDisabled();
  }, [voiceSettings]);

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
              <div className={styles.nR_header_text + " " + styles.nR_header_text_mobPadding} >
                <Link to="/new-request/video-edit">
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
                <Link to="/new-request/logistics">
                  <button className={styles.nR_back}>
                    <img src={ArrowGray} alt="" />
                    Go Back
                  </button>
                </Link>
                <div className={styles.nR_buttons_container}>
                  <button className={styles.nR_buttons_save}>
                    <img src={DetailsGreen} alt="" />
                  </button>
                  <NextButton isDisabled={isDisabled} onClick={()=>{
                    isDisabled && setShowBottomMessage(true)
                  }} />
                </div>
              </div>
            </div>
          </div>
          <FormFooter />
        </div>
  );
};

export default AddOns;
