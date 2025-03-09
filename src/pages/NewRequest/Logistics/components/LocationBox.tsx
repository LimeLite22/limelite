import "swiper/css";
import "swiper/css/pagination";

import { DEFAULT, HOME_RENTAL, OWN_ADDRESS, STUDIO_RENTAL } from "consts/consts";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import styles from "../../NewRequest.module.scss";
import Address from "./AddressInput";
import HomeRental from "./HomeRentalInput";
import LearnMorePopUp from "./LearnMorePopUp";
import StudioRental from "./StudioRentalInput";
import { selectRequestInfo } from "../../../../redux/requests/reducer";

const Location = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRequest = useSelector(selectRequestInfo);;
  const logisticInfoSettings = selectedRequest?.logisticSettings;
  const type = logisticInfoSettings?.location.type;
  const city = logisticInfoSettings?.location.city;
  const state = logisticInfoSettings?.location.state;
  const street = logisticInfoSettings?.location.street;
  const zip = logisticInfoSettings?.location.zip;
  const company = logisticInfoSettings?.location.company;
  const healthCareStatus = logisticInfoSettings?.safetyEquipment;
  const healthCareText = logisticInfoSettings?.safetyEquipmentDescription;
  const [isStudioExpanded, setIsStudioExpanded] = useState(false);
  const [isHomeExpanded, setIsHomeExpanded] = useState(false);
  const [isAddressExpanded, setIsAddressExpanded] = useState(false);
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
      type === OWN_ADDRESS &&
      (street?.trim() === "" ||
        city?.trim() === "" ||
        state?.trim() === "" ||
        company?.trim() === "" ||
        zip?.trim() === "" ||
        healthCareStatus === DEFAULT ||
        (healthCareStatus === true && healthCareText?.length === 0)
      )
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
      type === OWN_ADDRESS &&
      (street?.trim() === "" ||
        city?.trim() === "" ||
        state?.trim() === "" ||
        company?.trim() === "" ||
        zip?.trim() === "" ||
        healthCareStatus === DEFAULT ||
        (healthCareStatus === true && healthCareText?.length === 0)
      )
    ) {
      setIsError(true);
      setIsHomeExpanded(false);
      setIsStudioExpanded(false);
      setIsAddressExpanded(true);
    }
    if (type === STUDIO_RENTAL) {
      setIsHomeExpanded(false);
      setIsStudioExpanded(true);
      setIsAddressExpanded(false);
    }
    if (type === HOME_RENTAL) {
      setIsHomeExpanded(true);
      setIsStudioExpanded(false);
      setIsAddressExpanded(false);
    }
  }, [type])
  useEffect(() => {
    if (
      type !== OWN_ADDRESS ||
      (street?.trim() !== "" &&
        city?.trim() !== "" &&
        state?.trim() !== "" &&
        company?.trim() !== "" &&
        zip?.trim() !== "" ||
        healthCareStatus === DEFAULT ||
        (healthCareStatus === true && healthCareText?.length === 0)
      )
    ) {
      setIsError(false);
    }
  }, [type, street, city, state, zip, company, healthCareStatus, healthCareText]);

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
