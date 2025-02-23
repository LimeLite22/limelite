import {
  CheckBox,
  CheckBoxSelected,
  Expand,
  LocationBlack,
  NoNeed,
  NoNeedBlack,
  StatusApproved,
  StatusApprovedBlack,
} from "assets/images";
import axios from "axios";
import { DEFAULT, OWN_ADDRESS } from "consts/consts";
import useWindowWidth from "hooks/useWindowWidth";
import { IAddressProps } from "interfaces/interfaces";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectRequestInfo,
  updateLogisticInfoSettings,
} from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";

interface Suggestion {
  text: string;
}

const Address = ({ isExpanded, setIsExpanded, isError }: IAddressProps) => {
  const lIS = useSelector(selectRequestInfo)?.logisticSettings;
  const type = lIS?.location.type;
  const city = lIS?.location.city;
  const state = lIS?.location.state;
  const street = lIS?.location.street;
  const zip = lIS?.location.zip;
  const company = lIS?.location.company;

  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const width = useWindowWidth();
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      event.relatedTarget &&
      containerRef.current.contains(event.relatedTarget as Node)
    ) {
      return;
    }
    setIsExpanded(false);
  };
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    lIS && dispatch(updateLogisticInfoSettings(
      { logisticInfoSettings: { ...lIS, location: { ...lIS.location, street: value } }, isEdit: false }));
    if (value?.length > 1) {
      try {
        const response = await axios.get<{ suggestions: Suggestion[] }>(
          `https://us-autocomplete-pro.api.smarty.com/lookup?key=214096593787107506&search=${value}`,
        );

        const results = response.data.suggestions.map(
          (suggestion: any) => suggestion,
        );
        setSuggestions(results);
      } catch (error) {
        console.error("Помилка при запиті до Smarty API", error);
      }
    } else {
      setSuggestions([]);
    }
  };
  useEffect(() => {
    !isExpanded && setSuggestions([]);
  }, [isExpanded]);
  return (
    <div
      ref={containerRef}
      className={`
      ${styles.box}
      ${type === OWN_ADDRESS ? styles.box_selected : ""}
      ${isExpanded ? styles.box_expanded : ""}
      `}
      onClick={() => {
        console.log(';;www')
        lIS && dispatch(updateLogisticInfoSettings(
          { logisticInfoSettings: { ...lIS, location: { ...lIS.location, type: OWN_ADDRESS } }, isEdit: false }));

        !isExpanded && setIsExpanded(true);
      }}
      tabIndex={0}
      onBlur={handleBlur}
    >
      <div
        className={`
        ${styles.box_header2} 
        ${type === OWN_ADDRESS ? styles.box_header_selected : ""} `}
      >
        <img
          className={styles.box_circle}
          src={type === OWN_ADDRESS ? CheckBoxSelected : CheckBox}
          alt="CheckBox"
        />
        <div className={styles.box_title}>We'll provide the address</div>
        <div className={styles.box_title2}>
          We already have an approved address/
          <br /> location for this shoot.
        </div>
      </div>
      <div className={styles.box_container}>
        {" "}
        <div className={styles.box_companyContainer}>
          <div className={styles.box_companyContainer_text}>Company name</div>
          <input
            value={company}
            onChange={(e) => {
              e.stopPropagation();
              lIS && dispatch(updateLogisticInfoSettings(
                { logisticInfoSettings: { ...lIS, location: { ...lIS.location, company: e.target.value } }, isEdit: false }));
            }}
            placeholder="Enter company name"
            type="company"
            className={`
            ${styles.box_companyContainer_input} 
            ${isError && company?.trim() === "" ? styles.box_companyContainer_input_error : ""}
            `}
          />
          {isError && width > 768 && company?.trim() === "" && (
            <div className={styles.box_companyContainer_input_errorText}>
              Kindly complete the address fields before moving to the next step
            </div>
          )}
        </div>
        <div className={styles.box_addressContainer}>
          <div className={styles.box_addressContainer_text}>Address</div>
          <input
            value={street}
            onChange={handleChange}
            placeholder="Enter street address"
            type="street"
            className={`
            ${styles.box_addressContainer_input} 
            ${isError && street?.trim() === "" ? styles.box_addressContainer_input_error : ""}
            `}
          />
          {suggestions?.length > 0 && (
            <div className={styles.box_addressContainer_suggestions}>
              {suggestions.map((suggestion: any, index) => {
                const regex = new RegExp(`(${street})`, "gi");
                const highlightedText = suggestion?.street_line?.replace(
                  regex,
                  `<span style="color: var(--black); font-weight: 700">$1</span>`,
                );

                return (
                  <div
                    className={styles.box_addressContainer_suggestion}
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      lIS && dispatch(updateLogisticInfoSettings(
                        {
                          logisticInfoSettings: {
                            ...lIS, location: {
                              ...lIS.location,
                              street: suggestion.street_line,
                              city: suggestion.city,
                              state: suggestion.state,
                              zip: suggestion.zipcode
                            }
                          }, isEdit: false
                        }));
                      setSuggestions([]);
                    }}
                  >
                    <img src={LocationBlack} alt="location" />
                    <span
                      className={styles.box_addressContainer_street}
                      dangerouslySetInnerHTML={{ __html: highlightedText }}
                    />
                    <div className={styles.box_addressContainer_city}>
                      {suggestion.city}
                    </div>
                    <div className={styles.box_addressContainer_state}>
                      {suggestion.state}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {isError && width > 768 && street?.trim() === "" && (
            <div className={styles.box_addressContainer_input_errorText}>
              Kindly complete the address fields before moving to the next step
            </div>
          )}
        </div>
        <div className={styles.box_inputsContainer}>
          <div className={styles.box_addressContainer}>
            <div className={styles.box_addressContainer_text}>City</div>
            <input
              className={`
                    ${styles.box_addressContainer_input} 
                    ${isError && city?.trim() === "" ? styles.box_addressContainer_input_error : ""}
                    `}
              value={city}
              onChange={(e) => {
                e.stopPropagation();
                lIS && dispatch(updateLogisticInfoSettings(
                  { logisticInfoSettings: { ...lIS, location: { ...lIS.location, city: e.target.value } }, isEdit: false }));
              }}
              placeholder="Enter city"
              name="city"
              type="text"
            />
          </div>
          <div className={styles.box_addressContainer}>
            <div className={styles.box_addressContainer_text}>State</div>
            <input
              className={`
                ${styles.box_addressContainer_input} 
                ${isError && isError && state?.trim() === "" ? styles.box_addressContainer_input_error : ""}
                `}
              value={state}
              onChange={(e) => {
                e.stopPropagation();
                lIS && dispatch(updateLogisticInfoSettings(
                  { logisticInfoSettings: { ...lIS, location: { ...lIS.location, state: e.target.value } }, isEdit: false }));
              }}
              placeholder="Enter state"
              name="state"
              type="text"
            />
          </div>
          <div className={styles.box_addressContainer}>
            <div className={styles.box_addressContainer_text}>Zip</div>
            <input
              className={`
            ${styles.box_addressContainer_input} 
            ${isError && zip?.trim() === "" ? styles.box_addressContainer_input_error : ""}
            `}
              value={zip}
              onChange={(e) => {
                e.stopPropagation();
                lIS && dispatch(updateLogisticInfoSettings(
                  { logisticInfoSettings: { ...lIS, location: { ...lIS.location, zip: e.target.value } }, isEdit: false }));
              }}
              placeholder="Enter zip"
              name="zip"
              type="text"
            />
          </div>
          {isError &&
            width > 768 &&
            (city?.trim() === "" ||
              state?.trim() === "" ||
              zip?.trim() === ""

            ) && (
              <div className={styles.box_addressContainer_input_errorText}>
                Kindly complete the fields before moving to the next step
              </div>
            )}
        </div>
        <div className={styles.box_title}>Health & Safety</div>
        <div className={styles.box_title3}>Is personal protective equipment (PPE) and/or safety training required at this shoot
          location? If so, you agree to provide the appropriate PPE and/or safety training to the Video
          Creator, based on the nature of the work and the associated risks.</div>
        <div className={`${styles.box_statuses} ${styles.box_statuses_health} `}
          style={{ border: isError && lIS?.safetyEquipment === DEFAULT ? '1px solid var(--red-dark)' : '' }}
        >
          <div className={`${styles.box_status} ${lIS?.safetyEquipment === true ? styles.box_status_approved : ""} `}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              lIS && dispatch(updateLogisticInfoSettings(
                { logisticInfoSettings: { ...lIS, safetyEquipment: true }, isEdit: false }));
            }}>
            <img src={lIS?.safetyEquipment === true ? StatusApprovedBlack : StatusApproved} alt="status" />
            Required</div>
          <div className={`${styles.box_status} ${lIS?.safetyEquipment === false ? styles.box_status_approved : ""} `}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              lIS && dispatch(updateLogisticInfoSettings(
                { logisticInfoSettings: { ...lIS, safetyEquipment: false }, isEdit: false }));
            }}>
            <img src={lIS?.safetyEquipment === false ? NoNeedBlack : NoNeed} alt="status" />
            Not Required</div>
        </div>
        {lIS?.safetyEquipment === true &&
          <>
            <div className={styles.box_title3}>If "Yes", please describe the required safety training and/or PPE requirements for
              the filming site/location. Please note, all LimeLite Video Creators are required to follow
              all applicable federal, state, and local laws, regulations, ordinances, policies, and procedures
              related to safety and health at work while on assignment at customer locations.</div>
            <textarea className={styles.textarea}
              value={lIS?.safetyEquipmentDescription}
              onChange={(e) => {
                lIS && dispatch(updateLogisticInfoSettings(
                  { logisticInfoSettings: { ...lIS, safetyEquipmentDescription: e.target.value }, isEdit: false }));
              }}
              style={{ border: isError && lIS?.safetyEquipmentDescription.length === 0 ? '1px solid var(--red-dark)' : '' }}
              placeholder='Write here...'></textarea>
          </>
        }


      </div>

      <img
        onClick={() => setIsExpanded(!isExpanded)}
        src={Expand}
        alt="Expand"
        className={styles.box_expand}
      />
      {isError &&
        width < 768 &&
        (city?.trim() === "" ||
          state?.trim() === "" ||
          zip?.trim() === "" ||
          street?.trim() === "" ||
          company?.trim() === "") && (
          <div
            style={{ left: "8px", bottom: "10px" }}
            className={styles.box_addressContainer_input_errorText}
          >
            Kindly complete the fields before moving to the next step
          </div>
        )}
    </div>
  );
};

export default Address;
