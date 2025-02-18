import { APPROVED_TEXT_STATUS, DEFAULT, OWN_SCRIPT, PROFESSIONAL_SCRIPT } from "consts/consts";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { selectRequestInfo } from "../../../../../redux/requests/reducer";
import styles from "../../../NewRequest.module.scss";
import LearnMorePopUp from "../LearnMorePopUp";
import OwnScript from "./components/OwnScript";
import ProffessionalScript from "./components/ProfessionalScript";

const IsScriptRequired = () => {
  const selectedRequest = useSelector(selectRequestInfo);
  const [isError, setIsError] = useState({
    name: false,
    phone: false,
    email: false,
    ownScript: false,
    ownScriptStatus: false,
    proffessionalScript: false,
  });
  const selection = selectedRequest?.scriptSettings.scriptWriter;
  const name = selectedRequest?.scriptSettings?.name;
  const phone = selectedRequest?.scriptSettings?.phone;
  const email = selectedRequest?.scriptSettings?.email;
  const ownText = selectedRequest?.scriptSettings?.ownText;
  const ownTextStatus = selectedRequest?.scriptSettings?.scriptStatus;
  const proffessionalText = selectedRequest?.scriptSettings?.backgroundInfo;
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
      if (ownTextStatus === APPROVED_TEXT_STATUS && (!ownText || ownText.length === 0)) {
        setIsOwnExpanded(true);
        const errors = {
          name: false,
          phone: false,
          email: false,
          ownScript: ownTextStatus === APPROVED_TEXT_STATUS ? (!ownText || ownText.length === 0) : false,
          ownScriptStatus: false,
          proffessionalScript: false,
        };
        setIsError(errors);
      } else {
        setIsOwnExpanded(false);
        setIsProffessionalExpanded(false);
      }
    }
    const phoneRegex = /^\+?1?\s?(\d{3}|\(\d{3}\))[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (selection === PROFESSIONAL_SCRIPT) {
      if (
        !emailRegex.test(String(email)) ||
        email?.length === 0 ||
        !proffessionalText ||
        proffessionalText.length === 0 ||
        !name ||
        name.length === 0 ||
        phone === "" ||
        phone === 0 ||
        (phone && !phoneRegex.test(String(phone)) ? true : false)
      ) {
        setIsProffessionalExpanded(true);
        const errors = {
          name: !name || name.length === 0,
          phone:
            phone === "" ||
            phone === 0 ||
            (phone && !phoneRegex.test(String(phone)) ? true : false),
          email: email?.length === 0 || !emailRegex.test(String(email)),
          ownScript: false,
          ownScriptStatus: false,
          proffessionalScript:
            !proffessionalText || proffessionalText.length === 0,
        };
        setIsError(errors);
      } else {
        setIsOwnExpanded(false);
        setIsProffessionalExpanded(false);
      }
    }
  };

  useEffect(() => {
    if (selection === DEFAULT) return;
    if (selection === OWN_SCRIPT) setIsOwnExpanded(true);
    if (selection === PROFESSIONAL_SCRIPT) setIsProffessionalExpanded(true);
    setIsError({
      name: false,
      phone: false,
      email: false,
      ownScript: false,
      ownScriptStatus: false,
      proffessionalScript: false,
    });
  }, [selection]);
  useEffect(() => {
    if (selection === OWN_SCRIPT) {
      const errors = {
        name: false,
        phone: false,
        email: false,
        ownScript: ownTextStatus === APPROVED_TEXT_STATUS ? (!ownText || ownText.length === 0) : false,
        ownScriptStatus: ownTextStatus === DEFAULT,
        proffessionalScript: false,
      };
      setIsError(errors);
    }
    if (selection === PROFESSIONAL_SCRIPT) {
      const errors = {
        name: false,
        phone: false,
        email: false,
        ownScript: false,
        ownScriptStatus: false,
        proffessionalScript: false,
      };
      setIsError(errors);
    }
  }, [name, phone, email, ownText, proffessionalText]);

  return (
    <div ref={containerRef} tabIndex={-1} onBlur={handleBlur}>
      <div className={styles.box_question_header_text}>
        Who will write the script?*
      </div>
      <LearnMorePopUp />
      <OwnScript
        isError={{ text: isError.ownScript, status: isError.ownScriptStatus }}
        isExpanded={isOwnExpanded}
        setIsExpanded={setIsOwnExpanded}
      />
      <ProffessionalScript
        isError={{
          name: isError.name,
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

export default IsScriptRequired;
