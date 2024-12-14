import { useDispatch, useSelector } from "react-redux";
import { selectRequestInfo, updateDraftField } from "../../../../redux/requests/reducer";

import styles from "../../NewRequest.module.scss";
const CaptionBox = () => {
    const dispatch = useDispatch();
    const captions = useSelector(selectRequestInfo)?.videoSettings.captions;
    const handleClick = () => {
        const value = captions ? false : true;
        dispatch(
            updateDraftField({
                path: "videoSettings.captions",
                value: value,
            })
        );
    }
    return (
        <div className={styles.captions}>
            <div>
                <div className={styles.box_question_header_text}>Captions*</div>
                <div className={styles.box_title2}>Do you need video caption files? (Included in subscription)</div>
            </div>
            <div className={styles.switcher} style={{ background: captions ? "var(--green-dark)" : "" }} onClick={handleClick}>
                <div className={`${styles.switcher_circle} ${captions ? styles.switcher_circle_active : ""}`} ></div>
            </div>
        </div>
    )
}

export default CaptionBox;