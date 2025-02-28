import {
  ArrowGray3,
  ArrowGray4,
  DetailsGreen,
} from "assets/images";
import { OTHER, SHOOT_EDIT, SHOOT_ONLY } from "consts/consts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useCustomPadding } from "utils/customPadding";

import { selectRequestInfo } from "../../../redux/requests/reducer";
import BackButton from "../components/BackButton";
import FormFooter from "../components/FormFooter";
import NextButton from "../components/NextButton";
import StepsNavigation from "../components/StepsNavigation";
import {
  ProjectNameBox,
  ProjectNarrationBox,
  ProjectTone,
  ProjectType,
  RequestType,
  ShotListBox,
  TargetAudienceBox,
} from "./components";
import styles from "./ProjectInfo.module.scss";

const ProjectInfo = () => {
  const selectedRequest = useSelector(selectRequestInfo)?.projectInfoSettings;
  const customPadding = useCustomPadding();
  const type = selectedRequest?.type;
  const projectTone = selectedRequest?.projectTone;
  const name = selectedRequest?.name;
  const approachList = selectedRequest?.approachList;
  const targetAudience = selectedRequest?.targetAudience;

  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [showBottomMessage, setShowBottomMessage] = useState(false);

  const handleNextDisabled = () => {
    let isDisabled = false;
    if (name?.length === 0 || !projectTone || !type || !targetAudience) {
      isDisabled = true;
    }
    if ((approachList?.length === 0
      && (
        selectedRequest?.option?.value === SHOOT_EDIT ||
        selectedRequest?.option?.value === SHOOT_ONLY ||
        selectedRequest?.option?.value === OTHER))) {
      isDisabled = true;

    }
    setIsNextDisabled(isDisabled);
  };

  useEffect(() => {
    handleNextDisabled();
  }, [selectedRequest]);

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
            <ProjectNameBox />
            <TargetAudienceBox />
            <ProjectType />
            <ProjectTone />
            <ProjectNarrationBox />
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
                  isNextDisabled && setShowBottomMessage(true);
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
