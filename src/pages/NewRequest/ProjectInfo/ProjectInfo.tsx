import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  ArrowGray,
  ArrowGray3,
  ArrowGray4,
  ArrowWhite,
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
    approachList?.length === 0 ||
    !targetAudience;
  const [showBottomMessage, setShowBottomMessage] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [isToneError, setIsToneError] = useState(false);
  const [isTypeError, setIsTypeError] = useState(false);
  const [isTargetError, setIsTargetError] = useState(false);
  const [isApproachError, setIsApproachError] = useState(false);

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
    <>
      <div className={styles.nR}>
        <div className={styles.nR_container}>
          <Link to="/newRequest/start">
            <div className={styles.nR_backButton}>
              <img src={ArrowGray3} alt="" /> Back to New Request{" "}
            </div>
          </Link>
          <div className={styles.nR_subContainer}>
            <StepsNavigation />
            <div className={styles.nR_header}>
              <div className={styles.nR_header_text}>
                <Link to="/newRequest/start">
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
                  <Link to="/newRequest/start">
                    <button className={styles.nR_formContainer_back}>
                      <img src={ArrowGray} alt="" />
                      Go Back
                    </button>
                  </Link>
                  <div className={styles.nR_formContainer_buttons_container}>
                    <button className={styles.nR_formContainer_buttons_save}>
                      <img src={DetailsGreen} alt="" />
                    </button>
                    {isNextDisabled ? (
                      <button
                        onClick={handleErrors}
                        className={`${styles.nR_formContainer_buttons_delivery} ${isNextDisabled ? styles.nR_formContainer_buttons_deliveryDisabled : ""} `}
                      >
                        Next <img src={ArrowWhite} alt="" />
                      </button>
                    ) : (
                      <Link to={"/newRequest/step2"} onClick={handleErrors}>
                        <button
                          className={`${styles.nR_formContainer_buttons_delivery}`}
                        >
                          Next <img src={ArrowWhite} alt="" />
                        </button>
                      </Link>
                    )}
                  </div>
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

export default ProjectInfo;
