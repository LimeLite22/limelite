import {
  ArrowGray3,
  ArrowGray4,
  DetailsGreen,
} from "assets/images";
import {
  APPROVED_TEXT_STATUS,
  DEFAULT,
  QUESTIONS_AUTHOR_CLIENT,
  QUESTIONS_AUTHOR_PROFESSIONAL,
  QUESTIONS_ON_LOCATION,
  QUESTIONS_VIRTUALLY,
} from "consts/consts";
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
import InterviewPersons from "./components/InterviewPersons";
import InterviewQuestionsBox from "./components/Questions/InterviewQuestionsBox";
import QuestionsAuthorBox from "./components/QuestionsAuthorBox";

const Interview = () => {
  const selectedRequest = useSelector(selectRequestInfo);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showBottomMessage, setShowBottomMessage] = useState(false);

  const customPadding = useCustomPadding();

  const handleNextDisabled = () => {
    let disabled = false;
    if (selectedRequest?.interviewSettings.questionsAuthor === DEFAULT) {
      disabled = true;
    }
    if (
      selectedRequest?.interviewSettings.questionsAuthor ===
      QUESTIONS_AUTHOR_CLIENT &&
      selectedRequest?.interviewSettings.questionsAuthorOwnSettings.text
        .length === 0
    ) {
      disabled = true;
    }
    if (
      selectedRequest?.interviewSettings.questionsAuthor ===
      QUESTIONS_AUTHOR_CLIENT &&
      selectedRequest?.interviewSettings.questionsAuthorOwnSettings.text
        .length === 0
      && selectedRequest?.interviewSettings.questionsAuthorOwnSettings.scriptStatus === APPROVED_TEXT_STATUS
    ) {
      disabled = true;
    }
    if (
      selectedRequest?.interviewSettings.questionsAuthor ===
      QUESTIONS_AUTHOR_CLIENT && selectedRequest?.interviewSettings.questionsAuthorOwnSettings.scriptStatus === DEFAULT) {
      disabled = true;
    }


    const profSettings =
      selectedRequest?.interviewSettings.questionsAuthorProfSettings;
    if (
      selectedRequest?.interviewSettings.questionsAuthor ===
      QUESTIONS_AUTHOR_PROFESSIONAL &&
      (profSettings?.backgroundInfo.length === 0 ||
        profSettings?.subject.length === 0 ||
        profSettings?.phone === "" ||
        profSettings?.email.length === 0)
    ) {
      disabled = true;
    }
    const persons = selectedRequest?.interviewSettings?.persons;
    persons?.forEach((person) => {
      if (person.name.length === 0 || person.title.length === 0) {
        disabled = true;
      }
    });
    const questionSettings =
      selectedRequest?.interviewSettings?.questionSettings;
    if (questionSettings?.type === DEFAULT) {
      disabled = true;
    }
    if (
      questionSettings?.type === QUESTIONS_ON_LOCATION &&
      (questionSettings?.locationSettings.name === "" ||
        questionSettings?.locationSettings.email === "" ||
        questionSettings?.locationSettings.phone === "")
    ) {
      disabled = true;
    }
    if (
      questionSettings?.type === QUESTIONS_VIRTUALLY &&
      (questionSettings?.virtualSettings.name === "" ||
        questionSettings?.virtualSettings.email === "" ||
        questionSettings?.virtualSettings.phone === "")
    ) {
      disabled = true;
    }
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
            About Your Interview(s)
          </div>
          <div className={styles.nR_header_subText}>
            Please provide important information below regarding your video
            shoot
          </div>
        </div>
        <div className={styles.nR_formContainer}>
          <InterviewQuestionsBox />
          <InterviewPersons />
          <QuestionsAuthorBox />
          {isDisabled && showBottomMessage && <StepErrorMessage />}
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

export default Interview;
