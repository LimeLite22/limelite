import {
  ArrowGray3,
  ArrowGray4,
  DetailsGreen,
} from "assets/images";
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
import {
  ProjectNameBox,
  ProjectNarrationBox,
  ProjectTone,
  ProjectType,
  RequestType,
  ShotListBox,
  TargetAudienceBox,
} from "./components";

const ProjectInfo = () => {
  const customPadding = useCustomPadding();
  const [showBottomMessage, setShowBottomMessage] = useState(false);
  const { isProjectInfoReady } = useIsStepReady();

  return (
    <div className={styles.nR_container}
      style={{
        paddingBottom: customPadding,
      }}>
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
            Your Project
          </div>
          <div className={styles.nR_header_subText}>
            Please provide important information below regarding your video
            shoot
          </div>
        </div>
        <div className={styles.nR_formContainer}>
          <RequestType />
          <ProjectNameBox />
          <TargetAudienceBox />
          <ProjectType />
          <ProjectTone />
          <ProjectNarrationBox />
          <ShotListBox />
          {!isProjectInfoReady && showBottomMessage && (
            <StepErrorMessage />
          )}
          <div className={styles.nR_formContainer_buttons}>
            <BackButton />
            <div className={styles.nR_buttons_container}>
              <button className={styles.nR_buttons_save}>
                <img src={DetailsGreen} alt="" />
              </button>
              <NextButton isDisabled={!isProjectInfoReady} onClick={() => {
                !isProjectInfoReady && setShowBottomMessage(true);
              }} />
            </div>
          </div>
        </div>
      </div>
      <FormFooter />
    </div>
  );
};

export default ProjectInfo;
