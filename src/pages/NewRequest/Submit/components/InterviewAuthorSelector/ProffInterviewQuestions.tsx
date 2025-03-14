
import DefaultSlider from "pages/NewRequest/components/DefaultSlider";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/rootReducer";

import {
  updateInterviewInfoSettings,
} from "../../../../../redux/requests/reducer";
import styles from "../../../NewRequest.module.scss";
const ProffessionalScript = () => {
  const selectedRequest = useSelector((state: IRootState) => state.request.editDraft).interviewSettings;
  const name = selectedRequest?.questionsAuthorProfSettings.subject;
  const email = selectedRequest?.questionsAuthorProfSettings.email;
  const phone = selectedRequest?.questionsAuthorProfSettings.phone;
  const text = selectedRequest?.questionsAuthorProfSettings.backgroundInfo;

  const dispatch = useDispatch();

  return (
    <div
      className={`
      ${styles.box}
      ${styles.box_submit}
      ${styles.box_xl}
      ${styles.box_expanded}`}
    >
      <div className={`${styles.box_container} ${styles.box_containerSubmit} `}>
        <div className={styles.box_content}>
          <DefaultSlider />
          <div className={styles.box_content_info}>
            <div className={styles.box_content_info_header}>
              Premium Add-on:
              <span className={styles.box_content_info_header_addOn}>
                +$895
              </span>
            </div>
            <div className={styles.box_content_info_text}>
              Scriptwriting is the ideal solution for voiceover-driven LimeLite
              videos. The average adult can read ~300 words per minute, but can
              only follow speech at around 150 words per minute. Our
              scriptwriters know this, and they specialize in writing brief,
              conversational, and persuasive scripts. Price includes up to three
              telephone interviews with key stakeholders or subject-matter
              experts scriptwriting with up to three rounds of revisions, and
              all usage rights (for web/social media usage only)
            </div>
            <div className={styles.box_zone}></div>
          </div>
        </div>
        <div className={styles.box_addressContainer}>
          <div className={styles.box_addressContainer_text}>
            Subject matter expert
          </div>
          <input
            value={name}
            onChange={(e) => {
              selectedRequest && dispatch(updateInterviewInfoSettings({
                interviewInfoSettings: {
                  ...selectedRequest,
                  questionsAuthorProfSettings: {
                    ...selectedRequest.questionsAuthorProfSettings,
                    subject: e.target.value
                  }
                },
                isEdit: true
              })
              )
            }}
            placeholder="Write a full name"
            type="name"
            className={`
        ${styles.box_addressContainer_input} 
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
                selectedRequest && dispatch(updateInterviewInfoSettings({
                  interviewInfoSettings: {
                    ...selectedRequest,
                    questionsAuthorProfSettings: {
                      ...selectedRequest.questionsAuthorProfSettings,
                      phone: Number(e.target.value)
                    }
                  },
                  isEdit: true
                })
                )
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
                selectedRequest && dispatch(updateInterviewInfoSettings({
                  interviewInfoSettings: {
                    ...selectedRequest,
                    questionsAuthorProfSettings: {
                      ...selectedRequest.questionsAuthorProfSettings,
                      email: e.target.value
                    }
                  },
                  isEdit: true
                })
                )
              }}
              placeholder="example@email.com"
              name="email"
              type="text"
            />
          </div>
        </div>

        <div className={styles.box_addressContainer_text}>
          Background information for interview(s)
        </div>
        <div className={styles.textareaContainer}>
          <textarea
            className={styles.textarea}
            style={{
            }}
            placeholder={`Paste any details or web page URL' s with background information here...`}
            value={text}
            onChange={(e) => {
              selectedRequest && dispatch(updateInterviewInfoSettings({
                interviewInfoSettings: {
                  ...selectedRequest,
                  questionsAuthorProfSettings: {
                    ...selectedRequest.questionsAuthorProfSettings,
                    backgroundInfo: e.target.value
                  }
                },
                isEdit: true
              })
              )
            }}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ProffessionalScript;
