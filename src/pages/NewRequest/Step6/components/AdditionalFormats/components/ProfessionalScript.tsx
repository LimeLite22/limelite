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
    const handleExpand = (e: any) => {
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
                Yes
                <div className={styles.box_title_addOn}>Add-on</div>
            </span>
            <div className={styles.box_title2}>
                We'd like LimeLite to create additional/social formats of this video.
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
                            +$75
                        </span>
                    </div>
                    <div className={styles.box_content_info_text}>
                        Diam fringilla et nisi enim sed enim cum. Est lacus commodo egestas
                        tortor sit tempus aenean sollicitudin. Ornare rhoncus tortor tincidunt
                        pharetra ut dapibus id aliquam in.
                    </div>
                    <div className={styles.box_zone}>
                    </div>
                </div>
            </div>
            <div>Video format</div>
            <div>Video format</div>
            <div>Add an additional format</div>

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