import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import {
  DEFAULT,
  QUESTIONS_AUTHOR_CLIENT,
  QUESTIONS_AUTHOR_PROFESSIONAL,
} from "consts/consts";

import { selectRequestInfo } from "../../../../../redux/requests/reducer";
import styles from "../../../NewRequest.module.scss";
import LearnMorePopUp from "../LearnMorePopUp";
import OwnQuestions from "./components/OwnQuestions";
import ProffessionalQuestions from "./components/ProfessionalQuestions";

const InterviewQuestionsBox = () => {
  const selectedRequest = useSelector(selectRequestInfo);
  const [isError, setIsError] = useState({
    subject: false,
    phone: false,
    email: false,
    ownScript: false,
    proffessionalScript: false,
  });
  const selection = selectedRequest?.interviewSettings.questionsAuthor;
  const subject =
    selectedRequest?.interviewSettings.questionsAuthorProfSettings?.subject;
  const phone =
    selectedRequest?.interviewSettings.questionsAuthorProfSettings?.phone;
  const email =
    selectedRequest?.interviewSettings.questionsAuthorProfSettings?.email;
  const ownText =
    selectedRequest?.interviewSettings.questionsAuthorOwnSettings?.text;
  const proffessionalText =
    selectedRequest?.interviewSettings.questionsAuthorProfSettings?.text;
  const [isOwnExpanded, setIsOwnExpanded] = useState(false);
  const [isProffessionalExpanded, setIsProffessionalExpanded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      event.relatedTarget &&
      containerRef.current.contains(event.relatedTarget as Node)
    ) {
      return;
    }
    if (selection === QUESTIONS_AUTHOR_CLIENT) {
      if (!ownText || ownText.length === 0) {
        setIsOwnExpanded(true);
        const errors = {
          subject: false,
          phone: false,
          email: false,
          ownScript: !ownText || ownText.length === 0,
          proffessionalScript: false,
        };
        setIsError(errors);
      } else {
        setIsProffessionalExpanded(false);
        setIsOwnExpanded(false);
      }
    }
    if (selection === QUESTIONS_AUTHOR_PROFESSIONAL) {
      if (
        !email ||
        email.length === 0 ||
        !proffessionalText ||
        proffessionalText.length === 0 ||
        !subject ||
        subject.length === 0 ||
        phone === ""
      ) {
        setIsProffessionalExpanded(true);
        const errors = {
          subject: !subject || subject.length === 0,
          phone: phone === "",
          email: !email || email.length === 0,
          ownScript: false,
          proffessionalScript:
            !proffessionalText || proffessionalText.length === 0,
        };
        setIsError(errors);
      } else {
        setIsProffessionalExpanded(false);
        setIsOwnExpanded(false);
      }
    }
  };

  useEffect(() => {
    if (selection === DEFAULT) return;
    if (selection === QUESTIONS_AUTHOR_CLIENT) setIsOwnExpanded(true);
    if (selection === QUESTIONS_AUTHOR_PROFESSIONAL)
      setIsProffessionalExpanded(true);
    setIsError({
      subject: false,
      phone: false,
      email: false,
      ownScript: false,
      proffessionalScript: false,
    });
  }, [selection]);
  useEffect(() => {
    if (selection === QUESTIONS_AUTHOR_CLIENT) {
      const errors = {
        subject: false,
        phone: false,
        email: false,
        ownScript: !ownText || ownText.length === 0,
        proffessionalScript: false,
      };
      setIsError(errors);
    }
    if (selection === QUESTIONS_AUTHOR_PROFESSIONAL) {
      const errors = {
        subject: !subject || subject.length === 0,
        phone: phone === "",
        email: !email || email.length === 0,
        ownScript: false,
        proffessionalScript:
          !proffessionalText || proffessionalText.length === 0,
      };
      setIsError(errors);
    }
  }, [subject, phone, email, ownText, proffessionalText]);

  return (
    <div ref={containerRef} tabIndex={-1} onBlur={handleBlur}>
      <div className={styles.box_question_header_text}>
        Who will write the interview questions?*
      </div>
      <LearnMorePopUp />
      <OwnQuestions
        isError={{ text: isError.ownScript }}
        isExpanded={isOwnExpanded}
        setIsExpanded={setIsOwnExpanded}
      />
      <ProffessionalQuestions
        isError={{
          subject: isError.subject,
          email: isError.email,
          phone: isError.phone,
          text: isError.proffessionalScript,
        }}
        isExpanded={isProffessionalExpanded}
        setIsExpanded={setIsProffessionalExpanded}
      />
    </div>
  );
};

export default InterviewQuestionsBox;
