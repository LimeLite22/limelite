import { ArrowGray3, ArrowGray4, DetailsGreen } from "assets/images";
import useIsStepReady from "hooks/useCheckIsStepReady";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCustomPadding } from "utils/customPadding";

import BackButton from "../components/BackButton";
import FormFooter from "../components/FormFooter";
import NextButton from "../components/NextButton";
import StepErrorMessage from "../components/StepErrorMessage";
import StepsNavigation from "../components/StepsNavigation";
import styles from "../NewRequest.module.scss";
import IsScriptRequired from "./components/Script/IsScriptRequiredBox";
import ScriptPersons from "./components/ScriptPersons";
import Teleprompter from "./components/Teleprompter";

// Now your code logic should begin


const ScriptedDelivery = () => {
  const [showBottomMessage, setShowBottomMessage] = useState(false);
  const customPadding = useCustomPadding();

  const { isScriptReady } = useIsStepReady();

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
            <Link to="/new-request/start">
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
          {!isScriptReady && showBottomMessage && (
            <StepErrorMessage />
          )}
          <div className={styles.nR_formContainer_buttons}>
            <BackButton />
            <div className={styles.nR_buttons_container}>
              <button className={styles.nR_buttons_save}>
                <img src={DetailsGreen} alt="" />
              </button>
              <NextButton isDisabled={!isScriptReady} onClick={() => {
                !isScriptReady && setShowBottomMessage(true)
              }} />
            </div>
          </div>
        </div>
      </div>
      <FormFooter />
    </div>
  );
};

export default ScriptedDelivery;
