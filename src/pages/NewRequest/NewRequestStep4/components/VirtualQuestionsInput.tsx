

import {
  CheckBox,
  CheckBoxSelected,
  Expand,
} from "assets/images";
import useWindowWidth from "hooks/useWindowWidth";
import { QUESTIONS_VIRTUALLY } from "consts/consts";

import DefaultSlider from "pages/NewRequest/components/DefaultSlider";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import { IAddressProps } from "interfaces/interfaces";


const VirtualQuestionsInput = ({ isExpanded, setIsExpanded, isError }: IAddressProps) => {
  const selectedRequest = useSelector(selectRequestInfo);
  const type = selectedRequest?.interviewSettings.questionSettings.type;
  const name = selectedRequest?.interviewSettings.questionSettings.virtualSettings.name;
  const phone = selectedRequest?.interviewSettings.questionSettings.virtualSettings.phone;
  const email = selectedRequest?.interviewSettings.questionSettings.locationSettings.email;

  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const width = useWindowWidth();
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (
      (containerRef.current &&
        event.relatedTarget &&
        containerRef.current.contains(event.relatedTarget as Node))
    ) {
      return;
    }
    setIsExpanded(false);
  };
  const handleUpdateField = (path: string, value: string) => {
    dispatch(
      updateDraftField({
        path,
        value,
      })
    );
  };
  return (
    <div
      ref={containerRef}
      className={`
      ${styles.box}
      ${type === QUESTIONS_VIRTUALLY ? styles.box_selected : ""}
      ${isExpanded ? styles.box_expanded : ""}
      `}
      onClick={() => {
        handleUpdateField("interviewSettings.questionSettings.type", QUESTIONS_VIRTUALLY);
        !isExpanded && setIsExpanded(true);
      }}
      tabIndex={0}
      onBlur={handleBlur}
    >
      <div
        className={`
        ${styles.box_header2} 
        ${type === QUESTIONS_VIRTUALLY ? styles.box_header_selected : ""} `}
      >
        <img
          className={styles.box_circle}
          src={type === QUESTIONS_VIRTUALLY ? CheckBoxSelected : CheckBox}
          alt="CheckBox"
        />
        <span className={styles.box_title}>
          We'll do it virtually
          <div className={styles.box_title_addOn}>Add-on</div>
        </span>
        <div className={styles.box_title2}>
          With LimeLite's help, our team will lead the interview virtually.
        </div>
      </div>
      <div className={styles.box_container}>
        {" "}
        <div className={styles.box_content}>
          <DefaultSlider />
          <div className={styles.box_content_info}>
            <div
              className={styles.box_content_info_header}
            >
              Premium Add-on:
              <span className={styles.box_content_info_header_addOn}>
                +$695
              </span>
            </div>
            <div className={styles.box_content_info_text}>
              If you want a unique, unintrusive location for your LimeLite
              shoot, a one-day Home Rental is the way to go. We'll manage
              everything from scouting, booking, and deposits to contracts,
              insurance and cleanup. Price includes a one-day home rental.
            </div>
          </div>
        </div>
        <div className={styles.box_companyContainer}>
          <div className={styles.box_companyContainer_text}>
            Full name
          </div>
          <input
            value={name}
            onChange={(e) => {
              handleUpdateField("interviewSettings.questionSettings.virtualSettings.name", e.target?.value);
            }}
            placeholder="Full name"
            type="company"
            className={`
            ${styles.box_companyContainer_input} 
            ${isError && name?.trim() === "" ? styles.box_companyContainer_input_error : ""}
            `}
          />
          {isError && width > 768 && name?.trim() === "" && (
            <div
              className={styles.box_companyContainer_input_errorText}
            >
              Kindly complete the address fields before moving to the next step
            </div>
          )}
        </div>
        <div className={styles.box_inputsContainer}>
          <div className={styles.box_addressContainer}>
            <div className={styles.box_addressContainer_text}>
              Phone
            </div>
            <input
              className={`
                    ${styles.box_addressContainer_input} 
                    ${isError && (phone === '') ? styles.box_addressContainer_input_error : ""}
                    `}
              value={phone}
              onChange={(e) => {
                handleUpdateField("interviewSettings.questionSettings.virtualSettings.phone", e.target?.value);
              }}
              placeholder="+1 123 456 7890"
              name="phone"
              type="number"
            />
          </div>
          <div className={styles.box_addressContainer}>
            <div className={styles.box_addressContainer_text}>
              Email
            </div>
            <input
              className={`
                ${styles.box_addressContainer_input} 
                ${isError && isError && email?.trim() === "" ? styles.box_addressContainer_input_error : ""}
                `}
              value={email}
              onChange={(e) => {
                handleUpdateField("interviewSettings.questionSettings.locationSettings.email", e.target?.value);
              }}
              placeholder="example@email.com"
              name="email"
              type="text"
            />
          </div>
          {isError && width > 768 &&
            (phone === '' || email?.trim() === "" || name?.trim() === "") && (
              <div
                className={styles.box_addressContainer_input_errorText}
              >
                Kindly complete the fields before moving to the next step
              </div>
            )}
        </div>

      </div>

      <img
        onClick={() => setIsExpanded(!isExpanded)}
        src={Expand}
        alt="Expand"
        className={styles.box_expand}
      />
      {isError && width < 768 && isExpanded &&
        (phone === '' || email?.trim() === "" || name?.trim() === "") && (
          <div
            style={{ left: '8px', bottom: '10px' }}
            className={styles.box_addressContainer_input_errorText}
          >
            Kindly complete the fields before moving to the next step
          </div>
        )}
    </div>
  );
};

export default VirtualQuestionsInput;

