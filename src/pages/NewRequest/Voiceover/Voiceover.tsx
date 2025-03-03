import { useState } from "react";
import { Link } from "react-router-dom";

import { ArrowGray, ArrowGray3, ArrowGray4, DetailsGreen } from "assets/images";
import useIsStepReady from "hooks/useCheckIsStepReady";
import { useCustomPadding } from "utils/customPadding";

import FormFooter from "../components/FormFooter";
import NextButton from "../components/NextButton";
import StepErrorMessage from "../components/StepErrorMessage";
import StepsNavigation from "../components/StepsNavigation";
import styles from "../NewRequest.module.scss";

import InterviewScriptBox from "./components/Script/InterviewScriptBox";
import VoiceTrackBox from "./components/Track/VoiceTrackBox";


const Voiceover = () => {
  const [showBottomMessage, setShowBottomMessage] = useState(false);
  const customPadding = useCustomPadding();
  const { isVoiceoverReady } = useIsStepReady();

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
            About Your Voiceover
          </div>
          <div className={styles.nR_header_subText}>
            Please provide important information below regarding your video
            shoot
          </div>
        </div>
        <div className={styles.nR_formContainer}>
          <VoiceTrackBox />
          <InterviewScriptBox />
          {!isVoiceoverReady && showBottomMessage && <StepErrorMessage />}
          <div className={styles.nR_formContainer_buttons}>
            <Link to="/new-request/interview">
              <button className={styles.nR_back}>
                <img src={ArrowGray} alt="" />
                Go Back
              </button>
            </Link>
            <div className={styles.nR_buttons_container}>
              <button className={styles.nR_buttons_save}>
                <img src={DetailsGreen} alt="" />
              </button>
              <NextButton isDisabled={!isVoiceoverReady} onClick={() => {
                !isVoiceoverReady && setShowBottomMessage(true)
              }} />
            </div>
          </div>
        </div>
      </div>
      <FormFooter />
    </div>
  );
};

export default Voiceover;
