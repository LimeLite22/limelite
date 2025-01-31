

import { CheckBox, CheckBoxSelected, Expand } from "assets/images";
import { PROFESSIONAL_SCRIPT } from "consts/consts";
import DefaultSlider from "pages/NewRequest/components/DefaultSlider";
import { useDispatch, useSelector } from "react-redux";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../../../redux/requests/reducer";
import styles from "../../../../NewRequest.module.scss";

interface IProps {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  isError: {
    name: boolean;
    text: boolean;
    email: boolean;
    phone: boolean;
  };
}
const ProffessionalScript = ({
  isExpanded,
  setIsExpanded,
  isError,
}: IProps) => {
  const selectedRequest = useSelector(selectRequestInfo);
  const selection = selectedRequest?.scriptSettings?.scriptWriter;
  const name = selectedRequest?.scriptSettings?.name;
  const email = selectedRequest?.scriptSettings?.email;
  const phone = selectedRequest?.scriptSettings?.phone;
  const text = selectedRequest?.scriptSettings?.backgroundInfo;

  const dispatch = useDispatch();
  const handleUpdateField = (
    path: string,
    value: typeof PROFESSIONAL_SCRIPT | string,
  ) => {
    dispatch(
      updateDraftField({
        path,
        value,
      }),
    );
  };

  const handleSelect = () => {
    handleUpdateField("scriptSettings.scriptWriter", PROFESSIONAL_SCRIPT);
    setIsExpanded(true);
  };
  const handleExpand = (e: React.MouseEvent) => {
    handleUpdateField("scriptSettings.scriptWriter", PROFESSIONAL_SCRIPT);
    setIsExpanded(!isExpanded);
    e.stopPropagation();
    e.preventDefault();
  };
  const phoneRegex = /^\+?1?\s?(\d{3}|\(\d{3}\))[-.\s]?\d{3}[-.\s]?\d{4}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return (
    <div
      className={`
        ${styles.box}
        ${selection === PROFESSIONAL_SCRIPT ? styles.box_selected : ""} 
        ${isExpanded ? styles.box_expanded : ""}`}
      onClick={handleSelect}
    >
      <div className={styles.box_header}>
        <img
          className={styles.box_circle}
          src={selection === PROFESSIONAL_SCRIPT ? CheckBoxSelected : CheckBox}
          alt="CheckBox"
        />
        <span className={styles.box_title}>
          A professional scriptwriter
          <div className={styles.box_title_addOn}>Add-on</div>
        </span>
        <div className={styles.box_title2}>
          We'd like a LimeLite scriptwriter to develop this script.
        </div>
      </div>
      <div className={styles.box_container}>
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
              handleUpdateField("scriptSettings.name", e.target.value);
            }}
            placeholder="Write a full name"
            type="name"
            className={`
        ${styles.box_addressContainer_input} 
        ${isError.name ? styles.box_addressContainer_input_error : ""}
        `}
          />
          {isError.name && (
            <div className={styles.box_addressContainer_input_errorText}>
              Please complete the fields before proceeding
            </div>
          )}
        </div>
        <div className={styles.box_inputsContainer}>
          <div className={styles.box_addressContainer}>
            <div className={styles.box_addressContainer_text}>Phone</div>
            <input
              className={`
                ${styles.box_addressContainer_input} 
                ${isError.phone && (!phoneRegex.test(String(phone)) || phone === "" || phone === 0) ? styles.box_addressContainer_input_error : ""}
                `}
              value={phone}
              onChange={(e) => {
                handleUpdateField("scriptSettings.phone", e.target.value);
              }}
              placeholder="+1 123 456 7890"
              name="phone"
              type="number"
            />
            {((isError.phone && !phoneRegex.test(String(phone))) ||
              isError.email) && (
              <div className={styles.box_addressContainer_input_errorText}>
                {!phoneRegex.test(String(phone)) &&
                  phone !== "" &&
                  phone !== 0 &&
                  "Invalid phone number"}
                {!phoneRegex.test(String(phone)) &&
                  (phone === "" || phone === 0) &&
                  "Please complete number"}
              </div>
            )}
          </div>
          <div className={styles.box_addressContainer}>
            <div className={styles.box_addressContainer_text}>Email</div>
            <input
              className={`
            ${styles.box_addressContainer_input} 
            ${isError.email && !emailRegex.test(String(email)) ? styles.box_addressContainer_input_error : ""}
            `}
              value={email}
              onChange={(e) => {
                handleUpdateField("scriptSettings.email", e.target.value);
              }}
              placeholder="example@email.com"
              name="email"
              type="text"
            />
            {isError.email && !emailRegex.test(String(email)) && (
              <div className={styles.box_addressContainer_input_errorText}>
                {!emailRegex.test(String(email)) &&
                  email === "" &&
                  "Please complete email"}
                {!emailRegex.test(String(email)) &&
                  email !== "" &&
                  "Invalid email address"}
              </div>
            )}
          </div>
        </div>

        <div className={styles.box_addressContainer_text}>
          Background information for interview(s)
        </div>
        <div className={styles.textareaContainer}>
          <textarea
            className={styles.textarea}
            style={{
              border: isError.text ? "1px solid var(--red-dark)" : "",
            }}
            placeholder={`Paste any details or web page URL' s with background information here...`}
            value={text}
            onChange={(e) => {
              handleUpdateField("scriptSettings.backgroundInfo", e.target.value);
            }}
          ></textarea>
          {isError.text && (
            <div className={styles.box_addressContainer_input_errorText}>
              Please complete the fields before proceeding
            </div>
          )}
        </div>
      </div>
      <img
        onClick={(e) => handleExpand(e)}
        src={Expand}
        alt="Expand"
        className={styles.box_expand}
      />
    </div>
  );
};

export default ProffessionalScript;
