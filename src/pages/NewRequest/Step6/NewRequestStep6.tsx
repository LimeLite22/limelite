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

import { selectRequestVoiceSettings } from "../../../redux/requests/reducer";
import styles from "../NewRequest.module.scss";
import FormFooter from "../components/FormFooter";
import { DEFAULT, OWN_SCRIPT, PROFESSIONAL_SCRIPT, TRACK_AUTHOR_CLIENT } from "consts/consts";
import { useEffect, useState } from "react";
import StepsNavigation from "../components/StepsNavigation";
import { useCalculateFinalPrice } from "utils/priceCalculator";
import InterviewScriptBox from "./components/AdditionalFormats/AdditionalFormatsBox";
import FormatBox from "./components/FormatBox";
import ThumbnailBox from "./components/Thumbnail/ThumbnailBox";
import VideoTargetDurationBox from "./components/VideoTargetDuration";
import CaptionBox from "./components/CaptionBox";
import AdditionalFormatsBox from "./components/AdditionalFormats/AdditionalFormatsBox";

const NewRequestStep6 = () => {
  const voiceSettings = useSelector(selectRequestVoiceSettings);
  const price = useCalculateFinalPrice();
  const [isDisabled, setIsDisabled] = useState(true);
  const [showBottomMessage, setShowBottomMessage] = useState(false);
  const width = useWindowWidth();

  const handleNextDisabled = () => {
    let disabled = false;
    if (voiceSettings?.trackAuthor === DEFAULT) {
      disabled = true;
    }
    if (voiceSettings?.trackAuthor === TRACK_AUTHOR_CLIENT
      && voiceSettings?.track === DEFAULT) {
      disabled = true;
    }
    const profSettings = voiceSettings?.scriptAuthorProfSettings;
    if (voiceSettings?.scriptAuthor === OWN_SCRIPT
      && (profSettings?.text.length === 0
        || profSettings?.subject.length === 0 ||
        profSettings?.phone === '' ||
        profSettings?.email.length === 0)) {
      disabled = true;
    }
    if (voiceSettings?.scriptAuthor === PROFESSIONAL_SCRIPT
      && (profSettings?.text.length === 0
        || profSettings?.subject.length === 0 ||
        profSettings?.phone === '' ||
        profSettings?.email.length === 0)) {
      disabled = true;
    }
    console.log("disabled", disabled);
    setIsDisabled(disabled);

  }
  useEffect(() => {
    handleNextDisabled();
  }, [voiceSettings]);

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
          <Link to="/newRequest/step3">
            <div className={styles.nR_backButton}>
              <img src={ArrowGray3} alt="" /> Back to New Request{" "}
            </div>
          </Link>
          <div className={styles.nR_subContainer}>
            <StepsNavigation />
            <div className={styles.nR_header}>
              <div className={styles.nR_header_text}>
                <Link to="/newRequest/step5">
                  <div className={styles.nR_header_text_button}>
                    <img src={ArrowGray4} alt="" />
                  </div>
                </Link>
                About Your Video Edit
              </div>
              <div className={styles.nR_header_subText}>
                Please provide important information below regarding your completed video
              </div>
            </div>
            <div className={styles.nR_formContainer}>
              <FormatBox />
              <VideoTargetDurationBox />
              <CaptionBox />
              <ThumbnailBox/>
              <AdditionalFormatsBox />
              {isDisabled && showBottomMessage &&
                <div className={styles.nR_formContainer_error}>
                  Please ensure all required fields are filled out before submitting the
                  form. Each section must be completed to proceed.
                </div>
              }
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
                    <Link to={"/newRequest/step6"} >
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

export default NewRequestStep6;
