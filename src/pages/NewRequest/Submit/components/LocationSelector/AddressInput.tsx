import {
  LocationBlack,
} from "assets/images";
import axios from "axios";
import { OWN_ADDRESS } from "consts/consts";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/rootReducer";

import {
  updateLogisticInfoSettings,
} from "../../../../../redux/requests/reducer";
import styles from "../../../NewRequest.module.scss";
interface Suggestion {
  text: string;
}

const Address = () => {
  const eLIS = useSelector((state: IRootState) => state.request.editDraft)?.logisticSettings;
  const city = eLIS?.location?.city;
  const state = eLIS?.location?.state;
  const street = eLIS?.location?.street;
  const zip = eLIS?.location?.zip;
  const company = eLIS?.location?.company;

  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      event.relatedTarget &&
      containerRef.current.contains(event.relatedTarget as Node)
    ) {
      return;
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    dispatch(updateLogisticInfoSettings(
      { logisticInfoSettings: { ...eLIS, location: { ...eLIS.location, street: value } }, isEdit: true }))
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
    console.log('elis', eLIS.location)
  }, [eLIS])
  return (
    <div
      ref={containerRef}
      className={`
      ${styles.box}
      ${styles.box_submit}
      ${styles.box_xl}
      ${styles.box_expanded}
      `}
      onClick={() => {
        dispatch(updateLogisticInfoSettings(
          { logisticInfoSettings: { ...eLIS, location: { ...eLIS.location, type: OWN_ADDRESS } }, isEdit: true }))
      }}
      tabIndex={0}
      onBlur={handleBlur}
    >
      <div className={`${styles.box_container} ${styles.box_containerSubmit} `}>
        {" "}
        <div className={styles.box_companyContainer}>
          <div className={styles.box_companyContainer_text}>Company name</div>
          <input
            value={company}
            onChange={(e) => {
              dispatch(updateLogisticInfoSettings(
                {
                  logisticInfoSettings: {
                    ...eLIS,
                    location: { ...eLIS.location, company: e.target.value }
                  }, isEdit: true
                }))
              e.stopPropagation();
              e.preventDefault();

            }}
            placeholder="Enter company name"
            type="company"
            className={`
            ${styles.box_companyContainer_input} 
            `}
          />
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
                      console.log(suggestion.street_line, suggestion.city, suggestion.state, suggestion.zipcode);
                      dispatch(updateLogisticInfoSettings(
                        {
                          logisticInfoSettings:
                          {
                            ...eLIS, location:
                            {
                              ...eLIS.location,
                              street: suggestion.street_line, city: suggestion.city,
                              state: suggestion.state, zip: suggestion.zipcode
                            }
                          },
                          isEdit: true
                        }))
                      e.stopPropagation();
                      e.preventDefault();
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
        </div>
        <div className={styles.box_inputsContainer}>
          <div className={styles.box_addressContainer}>
            <div className={styles.box_addressContainer_text}>City</div>
            <input
              className={`
                    ${styles.box_addressContainer_input} 
                    `}
              value={city}
              onChange={(e) => {
                dispatch(updateLogisticInfoSettings(
                  {
                    logisticInfoSettings:
                      { ...eLIS, location: { ...eLIS.location, city: e.target.value } }, isEdit: true
                  }))
                e.stopPropagation();
                e.preventDefault();
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
                `}
              value={state}
              onChange={(e) => {
                dispatch(updateLogisticInfoSettings(
                  {
                    logisticInfoSettings:
                      { ...eLIS, location: { ...eLIS.location, state: e.target.value } }, isEdit: true
                  }))
                e.stopPropagation();
                e.preventDefault();
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
            `}
              value={zip}
              onChange={(e) => {
                dispatch(updateLogisticInfoSettings(
                  {
                    logisticInfoSettings:
                      { ...eLIS, location: { ...eLIS.location, zip: e.target.value } }, isEdit: true
                  }))
                e.stopPropagation();
                e.preventDefault();
              }}
              placeholder="Enter zip"
              name="zip"
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
