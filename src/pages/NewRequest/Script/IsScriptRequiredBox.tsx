import { APPROVED_TEXT_STATUS, DEFAULT, OWN_SCRIPT, PROFESSIONAL_SCRIPT } from "consts/consts";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { selectRequestInfo } from "../../../redux/requests/reducer";
import styles from "../NewRequest.module.scss";
import LearnMorePopUp from "../ScriptedDelivery/components/LearnMorePopUp";
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
  const { script } = selectedRequest ?? {};
  const {
    scriptWriter,
    name,
    phone,
    email,
    scriptText,
    scriptStatus,
    backgroundInfo
  } = script ?? {};

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
    if (scriptWriter === OWN_SCRIPT) {
      if (scriptStatus !== APPROVED_TEXT_STATUS || (!scriptText || scriptText.length === 0)) {
        setIsOwnExpanded(true);
        const errors = {
          name: false,
          phone: false,
          email: false,
          ownScript: scriptStatus === APPROVED_TEXT_STATUS ? (!scriptText || scriptText.length === 0) : false,
          ownScriptStatus: scriptStatus === DEFAULT,
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
    if (scriptWriter === PROFESSIONAL_SCRIPT) {
      if (
        !emailRegex.test(String(email)) ||
        email?.length === 0 ||
        !backgroundInfo ||
        backgroundInfo.length === 0 ||
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
            !backgroundInfo || backgroundInfo.length === 0,
        };
        setIsError(errors);
      } else {
        setIsOwnExpanded(false);
        setIsProffessionalExpanded(false);
      }
    }
  };

  useEffect(() => {
    if (scriptWriter === DEFAULT) return;
    if (scriptWriter === OWN_SCRIPT) {
      setIsOwnExpanded(true);
      setIsProffessionalExpanded(false);
    }
    if (scriptWriter === PROFESSIONAL_SCRIPT) {
      setIsOwnExpanded(false);
      setIsProffessionalExpanded(true);
      setIsError({
        name: false,
        phone: false,
        email: false,
        ownScript: false,
        ownScriptStatus: false,
        proffessionalScript: false,
      });
    }
  }, [scriptWriter]);
  useEffect(() => {
    if (scriptWriter === OWN_SCRIPT) {
      const errors = {
        name: false,
        phone: false,
        email: false,
        ownScript: scriptStatus === APPROVED_TEXT_STATUS ? (!scriptText || scriptText.length === 0) : false,
        ownScriptStatus: scriptStatus === DEFAULT,
        proffessionalScript: false,
      };
      setIsError(errors);
    }
    if (scriptWriter === PROFESSIONAL_SCRIPT) {
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
  }, [name, phone, email, scriptText, backgroundInfo, scriptStatus]);

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
