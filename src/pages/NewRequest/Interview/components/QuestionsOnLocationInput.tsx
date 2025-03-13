import { CheckBox, CheckBoxSelected, Expand } from "assets/images";
import { QUESTIONS_ON_LOCATION } from "consts/consts";
import useWindowWidth from "hooks/useWindowWidth";
import { IAddressProps } from "interfaces/interfaces";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";

const QuestionsOnLocationInput = ({
  isExpanded,
  setIsExpanded,
  isError,
}: IAddressProps) => {
  const interviewSettings = useSelector(selectRequestInfo)?.interviewSettings.questionSettings;
  const type = interviewSettings?.type;
  const name = interviewSettings?.locationSettings.name;
  const phone = interviewSettings?.locationSettings.phone;
  const email = interviewSettings?.locationSettings.email;

  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
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

  const handleUpdateField = (path: string, value: string) => {
    dispatch(
      updateDraftField({
        path,
        value,
      }),
    );
  };
  return (
    <div
      ref={containerRef}
      className={`
      ${styles.box}
      ${type === QUESTIONS_ON_LOCATION ? styles.box_selected : ""}
      ${isExpanded ? styles.box_expanded : ""}
      `}
      onClick={() => {
        handleUpdateField(
          "interviewSettings.questionSettings.type",
          QUESTIONS_ON_LOCATION,
        );
        !isExpanded && setIsExpanded(true);
      }}
      tabIndex={0}
      onBlur={handleBlur}
    >
      <div
        className={`
        ${styles.box_header2} 
        ${type === QUESTIONS_ON_LOCATION ? styles.box_header_selected : ""} `}
      >
        <img
          className={styles.box_circle}
          src={type === QUESTIONS_ON_LOCATION ? CheckBoxSelected : CheckBox}
          alt="CheckBox"
        />
        <div className={styles.box_title}>We'll do it on location</div>
        <div className={styles.box_title2}>
          We've got this! A team member will lead the interview in person.
        </div>
      </div>
      <div className={styles.box_container}>
        {" "}
        <div className={styles.box_title2}>Interviewer</div>
        <div className={styles.box_title2} style={{ whiteSpace: "unset" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut.
        </div>
        <div className={styles.box_companyContainer}>
          <div className={styles.box_companyContainer_text}>Full name</div>
          <input
            value={name}
            onChange={(e) => {
              handleUpdateField(
                "interviewSettings.questionSettings.locationSettings.name",
                e.target.value,
              );
            }}
            placeholder="Full name"
            type="company"
            className={`
            ${styles.box_companyContainer_input} 
            ${isError && name?.trim() === "" ? styles.box_companyContainer_input_error : ""}
            `}
          />
          {isError && width > 768 && name?.trim() === "" && (
            <div className={styles.box_companyContainer_input_errorText}>
              Kindly complete the address fields before moving to the next step
            </div>
          )}
        </div>
        <div className={styles.box_inputsContainer}>
          <div className={styles.box_addressContainer}>
            <div className={styles.box_addressContainer_text}>Phone</div>
            <input
              className={`
                    ${styles.box_addressContainer_input} 
                    ${isError && phone === "" ? styles.box_addressContainer_input_error : ""}
                    `}
              value={phone}
              onChange={(e) => {
                handleUpdateField(
                  "interviewSettings.questionSettings.locationSettings.phone",
                  e.target.value,
                );
              }}
              placeholder="+1 123 456 7890"
              name="city"
              type="number"
            />
          </div>
          <div className={styles.box_addressContainer}>
            <div className={styles.box_addressContainer_text}>Email</div>
            <input
              className={`
                ${styles.box_addressContainer_input} 
                ${isError && isError && email?.trim() === "" ? styles.box_addressContainer_input_error : ""}
                `}
              value={email}
              onChange={(e) => {
                handleUpdateField(
                  "interviewSettings.questionSettings.locationSettings.email",
                  e.target.value,
                );
              }}
              placeholder="example@email.com"
              name="state"
              type="text"
            />
          </div>
          {isError &&
            width > 768 &&
            (name?.trim() === "" || phone === "" || email?.trim() === "") && (
              <div className={styles.box_addressContainer_input_errorText}>
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
      {isError &&
        width < 768 &&
        isExpanded &&
        (name?.trim() === "" || phone === "" || email?.trim() === "") && (
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

export default QuestionsOnLocationInput;
