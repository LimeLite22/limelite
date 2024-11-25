
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/pagination";
import { selectRequestInfo } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import LearnMorePopUp from "./LearnMorePopUp";
import QuestionsOnLocationInput from "./QuestionsOnLocationInput";
import VirtualQuestionsInput from "./VirtualQuestionsInput";
import VirtualInterview from "./VirtualInterview";
import { DEFAULT, QUESTIONS_ON_LOCATION, QUESTIONS_VIRTUALLY, VIRTUAL_INTERVIEW } from "interfaces/interfaces";

const QuestionsAuthorBox = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRequest = useSelector(selectRequestInfo);
  const type = selectedRequest?.interviewSettings.questionSettings.type;
  const locationName = selectedRequest?.interviewSettings.questionSettings.locationSettings.name;
  const locationPhone = selectedRequest?.interviewSettings.questionSettings.locationSettings.phone;
  const locationEmail = selectedRequest?.interviewSettings.questionSettings.locationSettings.email;
  const virtualName = selectedRequest?.interviewSettings.questionSettings.virtualSettings.name;
  const virtualPhone = selectedRequest?.interviewSettings.questionSettings.virtualSettings.phone;
  const virtualEmail = selectedRequest?.interviewSettings.questionSettings.virtualSettings.email;

  const [isLocationQuestionExpanded, setIsLocationQuestionExpanded] = useState(false);
  const [isVirtualQuestionsExpanded, setIsVirtualQuestionsExpanded] = useState(false);
  const [isVirtualInterviewExpanded, setIsVirtulalInterviewExpanded] = useState(false);
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
      type === QUESTIONS_ON_LOCATION
      && (locationName?.trim() === "" || locationEmail?.trim() === "" || locationPhone === '')
    ) {
      setIsError(true);
      setIsLocationQuestionExpanded(true);
      setIsVirtualQuestionsExpanded(false);
      setIsVirtulalInterviewExpanded(false);
    }
    if (
      type === QUESTIONS_VIRTUALLY
      && (virtualName?.trim() === "" || virtualEmail?.trim() === "" || virtualPhone === '')
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
      type === QUESTIONS_ON_LOCATION
      && locationName?.trim() !== ""
      && locationEmail?.trim() !== ""
      && locationPhone !== '') {
      setIsError(false);
    }
    if (
      type === QUESTIONS_VIRTUALLY
      && virtualName?.trim() !== ""
      && virtualEmail?.trim() !== ""
      && virtualPhone !== '') {
      setIsError(false);
    }
    if (type === VIRTUAL_INTERVIEW) {
      setIsError(false);
    }
  }, [type, locationName, locationEmail, locationPhone, virtualName, virtualEmail, virtualPhone]);

  return (
    <div ref={containerRef} tabIndex={-1} onBlur={handleBlur}>
          <div className={styles.box_question_header_text}>
            Who will write the interview questions?*
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
