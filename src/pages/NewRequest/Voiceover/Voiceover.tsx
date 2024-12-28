import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  ArrowGray,
  ArrowGray3,
  ArrowGray4,
  DetailsGreen,
} from "assets/images";

import {
  DEFAULT,
  OWN_SCRIPT,
  PROFESSIONAL_SCRIPT,
  TRACK_AUTHOR_CLIENT,
} from "consts/consts";

import { selectRequestVoiceSettings } from "../../../redux/requests/reducer";
import styles from "../NewRequest.module.scss";
import FormFooter from "../components/FormFooter";
import StepsNavigation from "../components/StepsNavigation";
import InterviewScriptBox from "./components/Script/InterviewScriptBox";
import VoiceTrackBox from "./components/Track/VoiceTrackBox";
import NextButton from "../components/NextButton";
import { useCustomPadding } from "utils/customPadding";

const Voiceover = () => {
  const voiceSettings = useSelector(selectRequestVoiceSettings);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showBottomMessage, setShowBottomMessage] = useState(false);
  const customPadding = useCustomPadding();

  const handleNextDisabled = () => {
    let disabled = false;
    if (voiceSettings?.trackAuthor === DEFAULT) {
      disabled = true;
    }
    if (
      voiceSettings?.trackAuthor === TRACK_AUTHOR_CLIENT &&
      voiceSettings?.track === DEFAULT
    ) {
      disabled = true;
    }
    const profSettings = voiceSettings?.scriptAuthorProfSettings;
    const ownSettings = voiceSettings?.scriptAuthorOwnSettings;
    if (
      voiceSettings?.scriptAuthor === OWN_SCRIPT && ownSettings?.text.length === 0
    ) {
      disabled = true;
    }
    if (
      voiceSettings?.scriptAuthor === PROFESSIONAL_SCRIPT &&
      (profSettings?.text.length === 0 ||
        profSettings?.subject.length === 0 ||
        profSettings?.phone === "" ||
        profSettings?.email.length === 0)
    ) {
      disabled = true;
    }
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
          {isDisabled && showBottomMessage && (
            <div className={styles.nR_formContainer_error}>
              Please ensure all required fields are filled out before
              submitting the form. Each section must be completed to
              proceed.
            </div>
          )}
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
              <NextButton isDisabled={isDisabled} onClick={() => {
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

export default Voiceover;
