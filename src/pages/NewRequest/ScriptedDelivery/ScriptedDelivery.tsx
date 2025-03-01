import {
  ArrowGray3,
  ArrowGray4,
  DetailsGreen,
} from "assets/images";
import { APPROVED_TEXT_STATUS, DEFAULT, OWN_SCRIPT, PROFESSIONAL_SCRIPT } from "consts/consts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useCustomPadding } from "utils/customPadding";

import { selectRequestInfo } from "../../../redux/requests/reducer";
import BackButton from "../components/BackButton";
import FormFooter from "../components/FormFooter";
import NextButton from "../components/NextButton";
import StepErrorMessage from "../components/StepErrorMessage";
import StepsNavigation from "../components/StepsNavigation";
import styles from "../NewRequest.module.scss";
import IsScriptRequired from "./components/Script/IsScriptRequiredBox";
import ScriptPersons from "./components/ScriptPersons";
import Teleprompter from "./components/Teleprompter";

const ScriptedDelivery = () => {
  const selectedRequest = useSelector(selectRequestInfo);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showBottomMessage, setShowBottomMessage] = useState(false);
  const customPadding = useCustomPadding();

  const handleNextDisabled = () => {
    let disabled = false;
    if (selectedRequest?.scriptSettings?.scriptWriter === DEFAULT) {
      disabled = true;
    }
    if (
      selectedRequest?.scriptSettings?.scriptWriter === OWN_SCRIPT &&
      (selectedRequest?.scriptSettings?.ownText.length === 0
        && selectedRequest?.scriptSettings?.scriptStatus === APPROVED_TEXT_STATUS)
    ) {
      disabled = true;
    }
    if (
      selectedRequest?.scriptSettings?.scriptWriter === OWN_SCRIPT &&
      selectedRequest?.scriptSettings?.scriptStatus === DEFAULT) {
      disabled = true;
    }
    if (
      selectedRequest?.scriptSettings?.scriptWriter === PROFESSIONAL_SCRIPT &&
      (selectedRequest?.scriptSettings?.backgroundInfo.length === 0 ||
        selectedRequest?.scriptSettings?.name.length === 0 ||
        selectedRequest?.scriptSettings?.phone === 0 ||
        selectedRequest?.scriptSettings?.phone === "")
    ) {
      disabled = true;
    }
    if (selectedRequest?.scriptSettings?.teleprompter === DEFAULT) {
      disabled = true;
    }
    const persons = selectedRequest?.scriptSettings?.persons;
    persons?.forEach((person) => {
      if (person.name.length === 0 || person.title.length === 0) {
        disabled = true;
      }
    });
    setIsDisabled(disabled);
  };
  useEffect(() => {
    handleNextDisabled();
  }, [selectedRequest]);

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
          {isDisabled && showBottomMessage && (
            <StepErrorMessage />
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

export default ScriptedDelivery;
