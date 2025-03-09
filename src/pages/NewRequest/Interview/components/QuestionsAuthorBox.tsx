import "swiper/css";
import "swiper/css/pagination";

import {
  QUESTIONS_ON_LOCATION,
  QUESTIONS_VIRTUALLY,
  VIRTUAL_INTERVIEW,
} from "consts/consts";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import styles from "../../NewRequest.module.scss";
import LearnMorePopUp from "./LearnMorePopUp";
import QuestionsOnLocationInput from "./QuestionsOnLocationInput";
import VirtualInterview from "./VirtualInterview";
import VirtualQuestionsInput from "./VirtualQuestionsInput";
import { selectRequestInfo } from "../../../../redux/requests/reducer";

const QuestionsAuthorBox = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRequest = useSelector(selectRequestInfo);
  const type = selectedRequest?.interviewSettings.questionSettings.type;
  const settings = selectedRequest?.interviewSettings.questionSettings;
  const locationName = settings?.locationSettings.name;
  const locationPhone = settings?.locationSettings.phone;
  const locationEmail = settings?.locationSettings.email;
  const virtualName = settings?.virtualSettings.name;
  const virtualPhone = settings?.virtualSettings.phone;
  const virtualEmail = settings?.virtualSettings.email;

  const [isLocationQuestionExpanded, setIsLocationQuestionExpanded] =
    useState(false);
  const [isVirtualQuestionsExpanded, setIsVirtualQuestionsExpanded] =
    useState(false);
  const [isVirtualInterviewExpanded, setIsVirtulalInterviewExpanded] =
    useState(false);
  const [isError, setIsError] = useState(false);
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      event.relatedTarget &&
      containerRef.current.contains(event.relatedTarget as Node)
    ) {
      return;
    }
    if (
      type === QUESTIONS_ON_LOCATION &&
      (locationName?.trim() === "" ||
        locationEmail?.trim() === "" ||
        locationPhone === "")
    ) {
      setIsError(true);
      setIsLocationQuestionExpanded(true);
      setIsVirtualQuestionsExpanded(false);
      setIsVirtulalInterviewExpanded(false);
    }
    if (
      type === QUESTIONS_VIRTUALLY &&
      (virtualName?.trim() === "" ||
        virtualEmail?.trim() === "" ||
        virtualPhone === "")
    ) {
      setIsError(true);
      setIsLocationQuestionExpanded(false);
      setIsVirtualQuestionsExpanded(true);
      setIsVirtulalInterviewExpanded(false);
    }
    if (type === VIRTUAL_INTERVIEW) {
      setIsError(true);
      setIsLocationQuestionExpanded(false);
      setIsVirtualQuestionsExpanded(false);
      setIsVirtulalInterviewExpanded(false);
    }
  };
  useEffect(() => {
    if (
      type === QUESTIONS_ON_LOCATION &&
      locationName?.trim() !== "" &&
      locationEmail?.trim() !== "" &&
      locationPhone !== ""
    ) {
      setIsError(false);
    }
    if (
      type === QUESTIONS_VIRTUALLY &&
      virtualName?.trim() !== "" &&
      virtualEmail?.trim() !== "" &&
      virtualPhone !== ""
    ) {
      setIsError(false);
    }
    if (type === VIRTUAL_INTERVIEW) {
      setIsError(false);
    }
  }, [
    type,
    locationName,
    locationEmail,
    locationPhone,
    virtualName,
    virtualEmail,
    virtualPhone,
  ]);
  useEffect(() => {
    if (
      type === QUESTIONS_ON_LOCATION &&
      (locationName?.trim() === "" ||
        locationEmail?.trim() === "" ||
        locationPhone === "")
    ) {
      setIsError(true);
      setIsLocationQuestionExpanded(true);
      setIsVirtualQuestionsExpanded(false);
      setIsVirtulalInterviewExpanded(false);
    }
    if (
      type === QUESTIONS_VIRTUALLY &&
      (virtualName?.trim() === "" ||
        virtualEmail?.trim() === "" ||
        virtualPhone === "")
    ) {
      setIsError(true);
      setIsLocationQuestionExpanded(false);
      setIsVirtualQuestionsExpanded(true);
      setIsVirtulalInterviewExpanded(false);
    }
    if (type === VIRTUAL_INTERVIEW) {
      setIsError(true);
      setIsLocationQuestionExpanded(false);
      setIsVirtualQuestionsExpanded(false);
      setIsVirtulalInterviewExpanded(true);
    }
  }, [type])

  return (
    <div ref={containerRef} tabIndex={-1} onBlur={handleBlur}>
      <div className={styles.box_question_header_text}>
        Who will conduct the interview(s)?
      </div>
      <LearnMorePopUp smallMargin />
      <QuestionsOnLocationInput
        isExpanded={isLocationQuestionExpanded}
        setIsExpanded={setIsLocationQuestionExpanded}
        isError={isError && type === QUESTIONS_ON_LOCATION}
      />
      <VirtualQuestionsInput
        isExpanded={isVirtualQuestionsExpanded}
        setIsExpanded={setIsVirtualQuestionsExpanded}
        isError={isError && type === QUESTIONS_VIRTUALLY}
      />
      <VirtualInterview
        isExpanded={isVirtualInterviewExpanded}
        setIsExpanded={setIsVirtulalInterviewExpanded}
      />
    </div>
  );
};

export default QuestionsAuthorBox;
