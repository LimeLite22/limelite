import { QUESTIONS_VIRTUALLY } from "consts/consts";
import useWindowWidth from "hooks/useWindowWidth";
import DefaultSlider from "pages/NewRequest/components/DefaultSlider";
import { useDispatch, useSelector } from "react-redux";

import {
  selectRequestInfo, updateInterviewInfoSettings,
} from "../../../../../redux/requests/reducer";
import styles from "../../../NewRequest.module.scss";

const VirtualQuestionsInput = () => {
  const selectedRequest = useSelector(selectRequestInfo);
  const name =
    selectedRequest?.interviewSettings.questionSettings.virtualSettings.name;
  const phone =
    selectedRequest?.interviewSettings.questionSettings.virtualSettings.phone;
  const email =
    selectedRequest?.interviewSettings.questionSettings.locationSettings.email;

  const dispatch = useDispatch();
  const width = useWindowWidth();
  return (
    <div
      className={`
      ${styles.box}
      ${styles.box_submit}
      ${styles.box_xl}
      ${styles.box_expanded}
  `}
    >
      <div className={`${styles.box_container} ${styles.box_containerSubmit} `}>
        {" "}
        <div className={styles.box_content}>
          <DefaultSlider />
          <div className={styles.box_content_info}>
            <div className={styles.box_content_info_header}>
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
          <div className={styles.box_companyContainer_text}>Full name</div>
          <input
            value={name}
            onChange={(e) => {
              selectedRequest?.interviewSettings && dispatch(updateInterviewInfoSettings({
                interviewInfoSettings: {
                  ...selectedRequest?.interviewSettings,
                  questionSettings: {

                    ...selectedRequest?.interviewSettings.questionSettings,
                    type: QUESTIONS_VIRTUALLY,
                    virtualSettings: {
                      ...selectedRequest?.interviewSettings.questionSettings.virtualSettings,
                      name: e.target.value
                    }
                  }
                }, isEdit: true
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
                selectedRequest?.interviewSettings && dispatch(updateInterviewInfoSettings({
                  interviewInfoSettings: {
                    ...selectedRequest?.interviewSettings,
                    questionSettings: {

                      ...selectedRequest?.interviewSettings.questionSettings,
                      type: QUESTIONS_VIRTUALLY,
                      virtualSettings: {
                        ...selectedRequest?.interviewSettings.questionSettings.virtualSettings,
                        phone: Number(e.target.value)
                      }
                    }
                  }, isEdit: true
                }))
              }}
              placeholder="+1 123 456 7890"
              name="phone"
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
                selectedRequest?.interviewSettings && dispatch(updateInterviewInfoSettings({
                  interviewInfoSettings: {
                    ...selectedRequest?.interviewSettings,
                    questionSettings: {

                      ...selectedRequest?.interviewSettings.questionSettings,
                      type: QUESTIONS_VIRTUALLY,
                      virtualSettings: {
                        ...selectedRequest?.interviewSettings.questionSettings.virtualSettings,
                        email: e.target.value
                      }
                    }
                  }, isEdit: true
                }))
              }}
              placeholder="example@email.com"
              name="email"
              type="text"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default VirtualQuestionsInput;
