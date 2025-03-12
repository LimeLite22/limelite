import {
  APPROVED_TEXT_STATUS,
  DEFAULT,
  QUESTIONS_AUTHOR_CLIENT,
  QUESTIONS_AUTHOR_PROFESSIONAL,
} from "consts/consts";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { selectRequestInfo } from "../../../../../redux/requests/reducer";
import styles from "../../../NewRequest.module.scss";
import LearnMorePopUp from "../LearnMorePopUp";
import OwnQuestions from "./components/OwnQuestions";
import ProffessionalQuestions from "./components/ProfessionalQuestions";

const InterviewQuestionsBox = () => {
  const interviewSettings = useSelector(selectRequestInfo)?.interviewSettings;
  const [isError, setIsError] = useState({
    subject: false,
    phone: false,
    email: false,
    ownScript: false,
    status: false,
    proffessionalScript: false,
  });
  const selection = interviewSettings?.questionsAuthor;
  const profSettings = interviewSettings?.questionsAuthorProfSettings;
  const ownSettings = interviewSettings?.questionsAuthorOwnSettings;
  const subject = profSettings?.subject;
  const phone = profSettings?.phone;
  const email = profSettings?.email;
  const proffessionalText = profSettings?.backgroundInfo;
  const ownText = ownSettings?.text;
  const ownTextStatus = ownSettings?.scriptStatus;

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
      if (ownTextStatus !== APPROVED_TEXT_STATUS || (!ownText || ownText.length === 0)) {
        setIsOwnExpanded(true);
        const errors = {
          subject: false,
          phone: false,
          email: false,
          ownScript: ownTextStatus === APPROVED_TEXT_STATUS ? (!ownText || ownText.length === 0) : false,
          status: ownTextStatus === DEFAULT,
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
          status: false,
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

    if (selection === QUESTIONS_AUTHOR_CLIENT) {
      setIsProffessionalExpanded(false)
      setIsOwnExpanded(true)
    }
    if (selection === QUESTIONS_AUTHOR_PROFESSIONAL) {
      setIsOwnExpanded(false);
      setIsProffessionalExpanded(true);
      setIsError({
        subject: false,
        phone: false,
        email: false,
        ownScript: false,
        status: false,
        proffessionalScript: false,
      });
    }
  }, [selection]);
  useEffect(() => {
    if (selection === QUESTIONS_AUTHOR_CLIENT) {
      const errors = {
        subject: false,
        phone: false,
        email: false,
        ownScript: ownTextStatus === APPROVED_TEXT_STATUS ? (!ownText || ownText.length === 0) : false,
        status: ownTextStatus === DEFAULT,
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
        status: false,
        proffessionalScript:
          !proffessionalText || proffessionalText.length === 0,
      };
      setIsError(errors);
    }
  }, [subject, phone, email, ownText, proffessionalText, ownTextStatus]);

  return (
    <div ref={containerRef} tabIndex={-1} onBlur={handleBlur} >
      <div className={styles.box_question_header_text}>
        Who will write the interview questions?*
      </div>
      <LearnMorePopUp />
      <OwnQuestions
        isError={{ text: isError.ownScript, status: isError.status }}
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
