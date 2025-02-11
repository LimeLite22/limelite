import { QUESTIONS_ON_LOCATION } from "consts/consts";
import useWindowWidth from "hooks/useWindowWidth";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectRequestInfo,
  updateInterviewInfoSettings,
} from "../../../../../redux/requests/reducer";
import styles from "../../../NewRequest.module.scss";

const QuestionsOnLocation = () => {
  const selectedRequest = useSelector(selectRequestInfo);
  const name =
    selectedRequest?.interviewSettings.questionSettings.locationSettings.name;
  const phone =
    selectedRequest?.interviewSettings.questionSettings.locationSettings.phone;
  const email =
    selectedRequest?.interviewSettings.questionSettings.locationSettings.email;

  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const width = useWindowWidth();

  return (
    <div
      ref={containerRef}
      className={`
      ${styles.box}
      ${styles.box_submit}
      ${styles.box_xl}
      ${styles.box_expanded}
  `}
    >
      <div className={`${styles.box_container} ${styles.box_containerSubmit} `}>
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
              selectedRequest?.interviewSettings.questionSettings.locationSettings && dispatch(updateInterviewInfoSettings({
                interviewInfoSettings: {
                  ...selectedRequest?.interviewSettings,
                  questionSettings: {
                    ...selectedRequest?.interviewSettings.questionSettings,
                    type: QUESTIONS_ON_LOCATION,
                    locationSettings: {
                      ...selectedRequest?.interviewSettings.questionSettings.locationSettings,
                      name: e.target.value,

                    }
                  }
                },
                isEdit: true
              }))
            }}
            placeholder="Full name"
            type="company"
            className={`
            ${styles.box_companyContainer_input} 
            `}
          />
        </div>
        <div className={styles.box_inputsContainer}>
          <div className={styles.box_addressContainer}>
            <div className={styles.box_addressContainer_text}>Phone</div>
            <input
              className={`
                    ${styles.box_addressContainer_input} 
                    `}
              value={phone}
              onChange={(e) => {
                selectedRequest?.interviewSettings.questionSettings.locationSettings && dispatch(updateInterviewInfoSettings({
                  interviewInfoSettings: {
                    ...selectedRequest?.interviewSettings,
                    questionSettings: {
                      ...selectedRequest?.interviewSettings.questionSettings,
                      type: QUESTIONS_ON_LOCATION,
                      locationSettings: {
                        ...selectedRequest?.interviewSettings.questionSettings.locationSettings,
                        phone: Number(e.target.value)

                      }
                    }
                  },
                  isEdit: true
                }))
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
                `}
              value={email}
              onChange={(e) => {
                selectedRequest?.interviewSettings.questionSettings.locationSettings && dispatch(updateInterviewInfoSettings({
                  interviewInfoSettings: {
                    ...selectedRequest?.interviewSettings,
                    questionSettings: {
                      ...selectedRequest?.interviewSettings.questionSettings,
                      type: QUESTIONS_ON_LOCATION,
                      locationSettings: {
                        ...selectedRequest?.interviewSettings.questionSettings.locationSettings,
                        email: e.target.value
                      }
                    }
                  },
                  isEdit: true
                }))
              }}
              placeholder="example@email.com"
              name="state"
              type="text"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default QuestionsOnLocation;
