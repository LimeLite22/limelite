import useWindowWidth from "hooks/useWindowWidth";
import { OWN_ADDRESS } from "pages/NewRequest/consts";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/pagination";

import { selectRequestInfo } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import Address from "./AddressInput";
import HomeRental from "./HomeRentalInput";
import LearnMorePopUp from "./LearnMorePopUp";
import StudioRental from "./StudioRentalInput";

const Location = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRequest = useSelector(selectRequestInfo);
  const type = selectedRequest?.location?.type;
  const city = selectedRequest?.location?.city;
  const state = selectedRequest?.location?.state;
  const street = selectedRequest?.location?.street;
  const zip = selectedRequest?.location?.zip;
  const company = selectedRequest?.location?.company;
  const [isStudioExpanded, setIsStudioExpanded] = useState(false);
  const [isHomeExpanded, setIsHomeExpanded] = useState(false);
  const [isAddressExpanded, setIsAddressExpanded] = useState(false);
  const [isError, setIsError] = useState(false);
  const windowWidth = useWindowWidth();
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      event.relatedTarget &&
      containerRef.current.contains(event.relatedTarget as Node) 
    ) {
      return;
    }
    if (
      type === OWN_ADDRESS &&
      (street?.trim() === "" ||
        city?.trim() === "" ||
        state?.trim() === "" ||
        company?.trim() === "" ||
        zip?.trim() === "")
    ) {
      setIsError(true);
      setIsHomeExpanded(false);
      setIsStudioExpanded(false);
      setIsAddressExpanded(true);
    } else {
      setIsHomeExpanded(false);
      setIsStudioExpanded(false);
      setIsAddressExpanded(false);
    }
  };
  useEffect(() => {
    if (
      type !== OWN_ADDRESS ||
      (street?.trim() !== "" &&
        city?.trim() !== "" &&
        state?.trim() !== "" &&
        company?.trim() !== "" &&
        zip?.trim() !== "")
    ) {
      setIsError(false);
    }
  }, [type, street, city, state, zip, company]);

  return (
    <div ref={containerRef} tabIndex={-1} onBlur={handleBlur}>
      <div className={styles.box_question_header_text}>
        What is the location for this shoot? <span>*</span>
      </div>
      <LearnMorePopUp smallMargin />
      <Address
        isExpanded={isAddressExpanded}
        setIsExpanded={setIsAddressExpanded}
        isError={isError}
      />
      <StudioRental
        isExpanded={isStudioExpanded}
        setIsExpanded={setIsStudioExpanded}
      />
      <HomeRental
        isExpanded={isHomeExpanded}
        setIsExpanded={setIsHomeExpanded}
      />
    </div>
  );
};

export default Location;
