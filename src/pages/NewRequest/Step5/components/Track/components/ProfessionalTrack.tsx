import { CheckBox, CheckBoxSelected, Expand, Note } from "assets/images";
import { TRACK_AUTHOR_PROFESSIONAL } from "consts/consts";
import DefaultSlider from "pages/NewRequest/components/DefaultSlider";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestInfo, updateDraftField } from "../../../../../../redux/requests/reducer";
import styles from "../../../../NewRequest.module.scss";
interface IProps {
    isExpanded: boolean;
    setIsExpanded: (value: boolean) => void;
}
const ProffessionalTrack = ({ isExpanded, setIsExpanded }: IProps) => {
    const selectedRequest = useSelector(selectRequestInfo);

    const selection = selectedRequest?.voiceTrackSettings.trackAuthor;

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
        handleUpdateField("voiceTrackSettings.trackAuthor", TRACK_AUTHOR_PROFESSIONAL)
        setIsExpanded(true);
    }
    const handleExpand = (e: React.MouseEvent) => {
        handleUpdateField("voiceTrackSettings.trackAuthor", TRACK_AUTHOR_PROFESSIONAL)
        setIsExpanded(!isExpanded);
        e.stopPropagation();
        e.preventDefault();
    }

    return <div
        className={`
        ${styles.box}
        ${selection === TRACK_AUTHOR_PROFESSIONAL ? styles.box_selected : ""} 
        ${isExpanded ? styles.box_expanded : ""}`}
        onClick={handleSelect}
    >
        <div
            className={styles.box_header}
        >
            <img
                className={styles.box_circle}
                src={selection === TRACK_AUTHOR_PROFESSIONAL ? CheckBoxSelected : CheckBox}
                alt="CheckBox"
            />
            <span className={styles.box_title}>
                A professional voice artist
                <div className={styles.box_title_addOn}>Add-on</div>
            </span>
            <div className={styles.box_title2}>
                We'd like LimeLite to book a professional voiceover artist.
            </div>
        </div>
        <div className={styles.box_container}>
            <div className={styles.box_content}>
                <DefaultSlider />
                <div className={styles.box_content_info}>

                    <div
                        className={styles.box_content_info_header}
                    >
                        Standart Add-on:

                        <span className={styles.box_content_info_header_addOn}>
                            +$895
                        </span>
                    </div>
                    <div className={styles.box_content_info_text}>
                        Add some polish to your LimeLite Video! For videos without on-camera talent (customers, employees, actors, etc.), a professional Voiceover Artist is an excellent option. Price includes casting, auditions, recording session, and all usage rights (for web/social media usage only).
                    </div>
                </div>

            </div>
            <div className={styles.box_subText}>
                <img src={Note} alt="locationIcon" /> Note: You will have an
                opportunity to enter a discount code for any for a Standard Add-ons
                during check-out
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

export default ProffessionalTrack;