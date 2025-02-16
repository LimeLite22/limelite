import {
  ArrowGray,
  ArrowGray3,
  ArrowGray4,
  DetailsGreen,
} from "assets/images";
import { DEFAULT } from "consts/consts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useCustomPadding } from "utils/customPadding";

import { selectRequestInfo } from "../../../redux/requests/reducer";
import BackButton from "../components/BackButton";
import FormFooter from "../components/FormFooter";
import NextButton from "../components/NextButton";
import StepsNavigation from "../components/StepsNavigation";
import styles from "../NewRequest.module.scss";
import AdditionalFormatsBox from "./components/AdditionalFormats/AdditionalFormatsBox";
import AdditionalVisualAssetsBox from "./components/AdditionalVisualAssets/AdditionalVisualAssets";
import CaptionBox from "./components/CaptionBox";
import FormatBox from "./components/FormatBox";
import IsTravelRequired from "./components/IsTravelRequiredBox";
import ThumbnailBox from "./components/Thumbnail/ThumbnailBox";
import VideoTargetDurationBox from "./components/VideoTargetDuration";

const VideoEdit = () => {
  const videoSettings = useSelector(selectRequestInfo)?.videoSettings;
  const [isDisabled, setIsDisabled] = useState(true);
  const [showBottomMessage, setShowBottomMessage] = useState(false);
  const customPadding = useCustomPadding();

  const handleNextDisabled = () => {
    let disabled = false;
    if (videoSettings?.format === DEFAULT) {
      disabled = true
    }
    if (videoSettings?.targetDuration === DEFAULT) {
      disabled = true
    }
    if (videoSettings?.additionalVisualAssets === DEFAULT) {
      disabled = true
    }
    if (videoSettings?.additionalVisualAssets === true
      && videoSettings?.additionalVisualAssetFile === DEFAULT
      && videoSettings?.additionalVisualAssetUrl.length === 0) {
      disabled = true
    }
    if (videoSettings?.thumbnail === DEFAULT) {
      disabled = true
    }
    if (videoSettings?.additionalFormats === true) {
      const formats = videoSettings?.selectedAdditionalFormats;
      formats?.forEach((item) => {
        if (item.format === DEFAULT || item.duration === DEFAULT) {
          disabled = true
        }
      });
    }
    setIsDisabled(disabled);
  };
  useEffect(() => {
    handleNextDisabled();
  }, [videoSettings]);

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
            About Your Video Edit
          </div>
          <div className={styles.nR_header_subText}>
            Please provide important information below regarding your
            completed video
          </div>
        </div>
        <div className={styles.nR_formContainer}>
          <FormatBox />
          <VideoTargetDurationBox />
          <CaptionBox />
          <ThumbnailBox />
          <AdditionalFormatsBox />
          <AdditionalVisualAssetsBox />
          <IsTravelRequired />
          {isDisabled && showBottomMessage && (
            <div className={styles.nR_formContainer_error}>
              Please ensure all required fields are filled out before
              submitting the form. Each section must be completed to
              proceed.
            </div>
          )}
          <div className={styles.nR_formContainer_buttons}>
            <BackButton />
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

export default VideoEdit;
