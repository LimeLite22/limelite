import { DEFAULT, OWN_SCRIPT, PROFESSIONAL_SCRIPT } from "consts/consts";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { selectRequestInfo } from "../../../../../redux/requests/reducer";
import styles from "../../../NewRequest.module.scss";
import LearnMorePopUp from "../LearnMorePopUp";
import OwnScript from "./components/OwnScript";
import ProffessionalScript from "./components/ProfessionalScript";
// додати статуси вв  ерор hanndlinggg error
const InterviewScriptBox = () => {
  const selectedRequest = useSelector(selectRequestInfo);
  const [isError, setIsError] = useState({
    subject: false,
    phone: false,
    email: false,
    ownScript: false,
    proffessionalScript: false,
  });
  const selection = selectedRequest?.voiceTrackSettings.scriptAuthor;
  const profSettings = selectedRequest?.voiceTrackSettings.scriptAuthorProfSettings;
  const ownSettings = selectedRequest?.voiceTrackSettings.scriptAuthorOwnSettings;
  const subject = profSettings?.subject;
  const phone = profSettings?.phone;
  const email = profSettings?.email;
  const profText = profSettings?.backgroundInfo;
  const ownText = ownSettings?.text;

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
    if (selection === OWN_SCRIPT) {
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
    if (selection === PROFESSIONAL_SCRIPT) {
      if (
        !email ||
        email.length === 0 ||
        !profText ||
        profText.length === 0 ||
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
            !profText || profText.length === 0,
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
    if (selection === OWN_SCRIPT) setIsOwnExpanded(true);
    if (selection === PROFESSIONAL_SCRIPT) setIsProffessionalExpanded(true);
    setIsError({
      subject: false,
      phone: false,
      email: false,
      ownScript: false,
      proffessionalScript: false,
    });
  }, [selection]);
  useEffect(() => {
    if (selection === OWN_SCRIPT) {
      const errors = {
        subject: false,
        phone: false,
        email: false,
        ownScript: !ownText || ownText.length === 0,
        proffessionalScript: false,
      };
      setIsError(errors);
    }
    if (selection === PROFESSIONAL_SCRIPT) {
      const errors = {
        subject: !subject || subject.length === 0,
        phone: phone === "",
        email: !email || email.length === 0,
        ownScript: false,
        proffessionalScript:
          !profText || profText.length === 0,
      };
      setIsError(errors);
    }
  }, [subject, phone, email, ownText, profText]);

  return (
    <div ref={containerRef} tabIndex={-1} onBlur={handleBlur}>
      <div className={styles.box_question_header_text}>
        Who will write the script?*
      </div>
      <LearnMorePopUp />
      <OwnScript
        isError={{ text: isError.ownScript }}
        isExpanded={isOwnExpanded}
        setIsExpanded={setIsOwnExpanded}
      />
      <ProffessionalScript
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

export default InterviewScriptBox;
