import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { ArrowLightGray, Success } from "assets/images";

import styles from "../NewRequest.module.scss";
import { useSelector } from "react-redux";
import { selectRequestInfo } from "../../../redux/requests/reducer";
import { ADD_ONS_STEP, CANDID_APPROACH, EDIT_ONLY, INTERVIEW_STEP, LOGISTICS_STEP, PROJECT_STEP, SCRIPTED_APPROACH, SCRIPT_STEP, SHOOT_EDIT, SHOOT_ONLY, VIDEO_EDIT_STEP, VOICEOVER_APPROACH, VOICEOVER_STEP } from "consts/consts";

const StepsNavigation = () => {
  const [step, setStep] = useState(1);
  const location = useLocation();
  const request = useSelector(selectRequestInfo);
  useEffect(() => {
    if (location.pathname.includes("step1")) {
      setStep(1);
    }
    if (location.pathname.includes("step2")) {
      setStep(2);
    }
    if (location.pathname.includes("step3")) {
      setStep(3);
    }
    if (location.pathname.includes("step4")) {
      setStep(4);
    }
    if (location.pathname.includes("step5")) {
      setStep(5);
    }
    if (location.pathname.includes("step6")) {
      setStep(6);
    }
    if (location.pathname.includes("step7")) {
      setStep(7);
    }
  }, [location]);
  const [steps, setSteps] = useState<string[]>([]);
  useEffect(() => {
    let updatedSteps = []
    if (request?.option?.value === SHOOT_EDIT) {
      updatedSteps.push(PROJECT_STEP);
      updatedSteps.push(LOGISTICS_STEP);
      if (request?.approachList?.includes(SCRIPTED_APPROACH)) {
        updatedSteps.push(SCRIPT_STEP);
      }
      if (request?.approachList?.includes(CANDID_APPROACH)) {
        updatedSteps.push(INTERVIEW_STEP);
      }
      if (request?.approachList?.includes(VOICEOVER_APPROACH)) {
        updatedSteps.push(VOICEOVER_STEP);
      }
      updatedSteps.push(VIDEO_EDIT_STEP);
      updatedSteps.push(ADD_ONS_STEP);
      console.log("updatedSteps", updatedSteps);
      setSteps(updatedSteps);
    }
    if (request?.option?.value === SHOOT_ONLY) {
      updatedSteps.push(PROJECT_STEP);
      updatedSteps.push(LOGISTICS_STEP);
      if (request?.approachList?.includes(SCRIPTED_APPROACH)) {
        updatedSteps.push(SCRIPT_STEP);
      }
      if (request?.approachList?.includes(CANDID_APPROACH)) {
        updatedSteps.push(INTERVIEW_STEP);
      }
      if (request?.approachList?.includes(VOICEOVER_APPROACH)) {
        updatedSteps.push(VOICEOVER_STEP);
      }
      updatedSteps.push(VIDEO_EDIT_STEP);
      updatedSteps.push(ADD_ONS_STEP);
      console.log("updatedSteps", updatedSteps);
      setSteps(updatedSteps);
    }
    if (request?.option?.value === EDIT_ONLY) {
      updatedSteps.push(PROJECT_STEP);
      updatedSteps.push(LOGISTICS_STEP);
      updatedSteps.push(VIDEO_EDIT_STEP);
      console.log("updatedSteps", updatedSteps);
      setSteps(updatedSteps);
    }
  }, [request])

  return (
    <>
      <div className={styles.navigation} >
        {steps.map((stepItem, index) => (
          <>
            <div
              className={`${styles.navigation_item} ${index + 1 === Number(step) && styles.navigation_item_selected}`}
            >
              {Number(step) > index + 1 ? (
                <img src={Success} alt="" />
              ) : (
                <span
                  className={
                    index + 1 === Number(step)
                      ? styles.navigation_item_blackNumber
                      : styles.navigation_item_number
                  }
                >
                  {index + 1}
                </span>
              )}
              <p>{stepItem}</p>
            </div>
            {index !== steps.length - 1 && <img src={ArrowLightGray} alt="" />}
          </>
        ))}

      </div>
      {/* <div className={styles.navigation}>
        <div
          className={`${styles.navigation_item} ${step === 1 && styles.navigation_item_selected}`}
        >
          {step > 1 ? (
            <img src={Success} alt="" />
          ) : (
            <span
              className={
                step === 1
                  ? styles.navigation_item_blackNumber
                  : styles.navigation_item_number
              }
            >
              1
            </span>
          )}
          <p>Project</p>
        </div>
        <img src={ArrowLightGray} alt="" />
        <div
          className={`${styles.navigation_item} ${step === 2 && styles.navigation_item_selected}`}
        >
          {step > 2 ? (
            <img src={Success} alt="" />
          ) : (
            <span
              className={
                step === 2
                  ? styles.navigation_item_blackNumber
                  : styles.navigation_item_number
              }
            >
              2
            </span>
          )}
          <p> Logistics</p>
        </div>
        <img src={ArrowLightGray} alt="" />
        <div
          className={`${styles.navigation_item} ${step === 3 && styles.navigation_item_selected}`}
        >
          {step > 3 ? (
            <img src={Success} alt="" />
          ) : (
            <span
              className={
                step === 3
                  ? styles.navigation_item_blackNumber
                  : styles.navigation_item_number
              }
            >
              3
            </span>
          )}
          <p>Script</p>
        </div>
        <img src={ArrowLightGray} alt="" />
        <div
          className={`${styles.navigation_item} ${step === 4 && styles.navigation_item_selected}`}
        >
          {step > 4 ? (
            <img src={Success} alt="" />
          ) : (
            <span
              className={
                step === 4
                  ? styles.navigation_item_blackNumber
                  : styles.navigation_item_number
              }
            >
              4
            </span>
          )}
          <p>Interview</p>
        </div>
        <img src={ArrowLightGray} alt="" />
        <div
          className={`${styles.navigation_item} ${step === 5 && styles.navigation_item_selected}`}
        >
          {step > 5 ? (
            <img src={Success} alt="" />
          ) : (
            <span
              className={
                step === 5
                  ? styles.navigation_item_blackNumber
                  : styles.navigation_item_number
              }
            >
              5
            </span>
          )}
          <p>Voiceover</p>
        </div>
        <img src={ArrowLightGray} alt="" />
        <div
          className={`${styles.navigation_item} ${step === 6 && styles.navigation_item_selected}`}
        >
          {step > 6 ? (
            <img src={Success} alt="" />
          ) : (
            <span
              className={
                step === 6
                  ? styles.navigation_item_blackNumber
                  : styles.navigation_item_number
              }
            >
              6
            </span>
          )}
          <p>Video edit</p>
        </div>
        <img src={ArrowLightGray} alt="" />
        <div
          className={`${styles.navigation_item} ${step === 6 && styles.navigation_item_selected}`}
        >
          {step > 7 ? (
            <img src={Success} alt="" />
          ) : (
            <span
              className={
                step === 7
                  ? styles.navigation_item_blackNumber
                  : styles.navigation_item_number
              }
            >
              7
            </span>
          )}
          <p>Add-ons</p>
        </div>
      </div> */}
    </>
  );
};

export default StepsNavigation;
