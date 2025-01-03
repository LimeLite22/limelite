import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  ArrowGray3,
  ArrowGray4,
  DetailsGreen,
} from "assets/images";

import { selectRequestInfo } from "../../../redux/requests/reducer";
import FormFooter from "../components/FormFooter";
import StepsNavigation from "../components/StepsNavigation";
import styles from "./ProjectInfo.module.scss";
import {
  ProjectNameBox,
  ProjectNarrationBox,
  ProjectTone,
  ProjectType,
  RequestType,
  ShotListBox,
  TargetAudienceBox,
} from "./components";
import NextButton from "../components/NextButton";
import { useCustomPadding } from "utils/customPadding";
import BackButton from "../components/BackButton";
import { OTHER, SHOOT_EDIT, SHOOT_ONLY } from "consts/consts";

const ProjectInfo = () => {
  const selectedRequest = useSelector(selectRequestInfo);
  const projectType = selectedRequest?.projectType;
  const projectTone = selectedRequest?.projectTone;
  const projectName = selectedRequest?.projectName;
  const approachList = selectedRequest?.approachList;
  const targetAudience = selectedRequest?.targetAudience;

  const isNextDisabled =
    !projectName ||
    !projectTone ||
    !projectType ||
    (approachList?.length === 0
      && (
        selectedRequest.option?.value === SHOOT_EDIT ||
        selectedRequest.option?.value === SHOOT_ONLY ||
        selectedRequest.option?.value === OTHER)) ||
    !targetAudience;
  const [showBottomMessage, setShowBottomMessage] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [isToneError, setIsToneError] = useState(false);
  const [isTypeError, setIsTypeError] = useState(false);
  const [isTargetError, setIsTargetError] = useState(false);
  const [isApproachError, setIsApproachError] = useState(false);
  const customPadding = useCustomPadding();

  const handleErrors = () => {
    if (!projectName) {
      setIsNameError(true);
    }
    if (!projectTone) {
      setIsToneError(true);
    }
    if (!projectType) {
      setIsTypeError(true);
    }
    if (approachList?.length === 0) {
      setIsApproachError(true);
    }
    if (!targetAudience) {
      setIsTargetError(true);
    }
    setShowBottomMessage(true);
  };

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
        <div className={styles.nR_content}>
          <div className={styles.nR_formContainer}>
            <RequestType />
            <ProjectNameBox
              isError={isNameError}
              setIsError={setIsNameError}
            />
            <TargetAudienceBox
              isError={isTargetError}
              setIsError={setIsTargetError}
            />
            <ProjectType
              isError={isTypeError}
              setIsError={setIsTypeError}
            />
            <ProjectTone
              isError={isToneError}
              setIsError={setIsToneError}
            />
            <ProjectNarrationBox
              isError={isApproachError}
              setIsError={setIsApproachError}
            />
            <ShotListBox />
            {isNextDisabled && showBottomMessage && (
              <div className={styles.nR_formContainer_error}>
                Please ensure all required fields are filled out before
                submitting the form. Each section must be completed to
                proceed.
              </div>
            )}
            <div className={styles.nR_formContainer_buttons}>
              <BackButton />
              <div className={styles.nR_formContainer_buttons_container}>
                <button className={styles.nR_formContainer_buttons_save}>
                  <img src={DetailsGreen} alt="" />
                </button>
                <NextButton isDisabled={isNextDisabled} onClick={() => {
                  isNextDisabled && handleErrors()
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormFooter />
    </div>
  );
};

export default ProjectInfo;
