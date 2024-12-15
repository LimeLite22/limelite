import { CheckBox, CheckBoxSelected, Expand } from "assets/images";
import { PROFESSIONAL_SCRIPT } from "consts/consts";
import DefaultSlider from "pages/NewRequest/components/DefaultSlider";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestInfo, updateDraftField } from "../../../../../../redux/requests/reducer";
import styles from "../../../../NewRequest.module.scss";
interface IProps {
    isExpanded: boolean;
    setIsExpanded: (value: boolean) => void;
    isError: {
        subject: boolean,
        text: boolean,
        email: boolean,
        phone: boolean,
    },
}
const ProffessionalQuestions = ({ isExpanded, setIsExpanded, isError }: IProps) => {
    const selectedRequest = useSelector(selectRequestInfo);

    const selection = selectedRequest?.voiceTrackSettings.scriptAuthor;
    const subject = selectedRequest?.voiceTrackSettings.scriptAuthorProfSettings.subject;
    const phone = selectedRequest?.voiceTrackSettings.scriptAuthorProfSettings.phone;
    const email = selectedRequest?.voiceTrackSettings.scriptAuthorProfSettings.email;
    const text = selectedRequest?.voiceTrackSettings.scriptAuthorProfSettings.text;

    const dispatch = useDispatch();
    const handleUpdateField = (path: string, value: string) => {
        dispatch(
            updateDraftField({
                path,
                value,
            })
        );
    };

    const handleSelect = () => {
        handleUpdateField("voiceTrackSettings.scriptAuthor", PROFESSIONAL_SCRIPT)
        setIsExpanded(true);
    }
    const handleExpand = (e: React.MouseEvent) => {
        handleUpdateField("voiceTrackSettings.scriptAuthor", PROFESSIONAL_SCRIPT)
        setIsExpanded(!isExpanded);
        e.stopPropagation();
        e.preventDefault();
    }

    return <div
        className={`
        ${styles.box}
        ${selection === PROFESSIONAL_SCRIPT ? styles.box_selected : ""} 
        ${isExpanded ? styles.box_expanded : ""}`}
        onClick={handleSelect}
    >
        <div
            className={styles.box_header}
        >
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

                    <div
                        className={styles.box_content_info_header}
                    >
                        Standard Add-on:

                        <span className={styles.box_content_info_header_addOn}>
                            +$895
                        </span>
                    </div>
                    <div className={styles.box_content_info_text}>
                        Unlike other forms of writing, scripts are meant to be read aloud.
                        LimeLite Scriptwriters specialize in writing brief, conversational,
                        and persuasive scripts that inform and engage. Price includes up to three
                        interviews with SME’s, scriptwriting, and three rounds of revision.
                    </div>
                    <div className={styles.box_zone}>
                    </div>
                </div>
            </div>
            <div className={styles.box_addressContainer}>
                <div className={styles.box_addressContainer_text}>
                    Subject matter expert
                </div>
                <input
                    value={subject}
                    onChange={(e) => {
                        handleUpdateField("voiceTrackSettings.scriptAuthorProfSettings.subject", e.target.value)
                    }}
                    placeholder="Write a full subject"
                    type="subject"
                    className={`
        ${styles.box_addressContainer_input} 
        ${isError.subject ? styles.box_addressContainer_input_error : ""}
        `}
                />
                {isError.subject && (
                    <div
                        className={styles.box_addressContainer_input_errorText}
                    >
                        Please complete the fields before proceeding
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
                ${isError.phone ? styles.box_addressContainer_input_error : ""}
                `}
                        value={phone}
                        onChange={(e) => {
                            handleUpdateField("voiceTrackSettings.scriptAuthorProfSettings.phone", e.target.value)
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
            ${isError.email ? styles.box_addressContainer_input_error : ""}
            `}
                        value={email}
                        onChange={(e) => {
                            handleUpdateField("voiceTrackSettings.scriptAuthorProfSettings.email", e.target.value)
                        }}
                        placeholder="example@email.com"
                        name="email"
                        type="text"
                    />
                </div>
                {(isError.phone || isError.email) && (
                    <div
                        className={styles.box_addressContainer_input_errorText}
                    >
                        Please complete the fields before proceeding
                    </div>
                )}
            </div>

            <div className={styles.box_addressContainer_text}>
                Background information for interview(s)
            </div>
            <div className={styles.textareaContainer}>
                <textarea className={styles.textarea}
                    style={{
                        border: isError.text ? "1px solid var(--red-dark)" : ""
                    }}
                    placeholder={`Paste any details or web page URL' s with background information here...`}
                    value={text}
                    onChange={(e) => {
                        handleUpdateField("voiceTrackSettings.scriptAuthorProfSettings.text", e.target.value)
                    }}
                >


                </textarea>
                {(isError.text) && (
                    <div
                        className={styles.box_addressContainer_input_errorText}
                    >
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
    </div>;
};

export default ProffessionalQuestions;