import { CheckBox, CheckBoxSelected, FaceBook, Instagram, Linkedin, Twitter, Youtube } from "assets/images";
import { VIDEO_SQUARE, VIDEO_STANDARD, VIDEO_STORY, VIDEO_VERTICAL } from "consts/consts";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestInfo, updateDraftField } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
const FormatBox = () => {

    const requestInfo = useSelector(selectRequestInfo);
    const dispatch = useDispatch();
    const format = requestInfo?.videoSettings.format
    const mediaList =
        <div className={styles.box_socialMediaList}>
            <img src={Youtube} alt="Youtube" />
            <img src={FaceBook} alt="FaceBook" />
            <img src={Instagram} alt="Instagram" />
            <img src={Linkedin} alt="Linkedin" />
            <img src={Twitter} alt="Twitter" />
        </div>;
    const mediaListShort =
        <div className={styles.box_socialMediaList}>
            <img src={Youtube} alt="Youtube" />
            <img src={FaceBook} alt="FaceBook" />
            <img src={Instagram} alt="Instagram" />
            <img src={Linkedin} alt="Linkedin" />
        </div>;

    const handleClick = (value: typeof VIDEO_STANDARD | typeof VIDEO_STORY | typeof VIDEO_SQUARE | typeof VIDEO_VERTICAL) => {
        dispatch(
            updateDraftField({
                path: "videoSettings.format",
                value: value,
            })
        );
    }
    return (
        <div className="formatBox">
            <p>Choose the final format for this video*</p>
            <div className={styles.box_videTypes}>
                <div className={styles.box_videoTypeContainer} onClick={() => handleClick(VIDEO_STANDARD)}>
                    <div className={`
                    ${styles.box_videoTypeStrandart} 
                    ${format === VIDEO_STANDARD ? styles.box_videoTypeSelected : ""} 
                    ${styles.box_videoType}`}  >16:9
                        {mediaList}
                    </div>
                    <div><img src={format === VIDEO_STANDARD ? CheckBoxSelected : CheckBox} alt="CheckBoxSelected" /> Standart</div>
                </div>
                <div className={styles.box_videoTypeContainer} onClick={() => handleClick(VIDEO_STORY)}>
                    <div className={`
                    ${styles.box_videoTypeStory}   
                    ${format === VIDEO_STORY ? styles.box_videoTypeSelected : ""}  
                    ${styles.box_videoType}`} >9:16
                        {mediaListShort}</div>
                    <div><img src={format === VIDEO_STORY ? CheckBoxSelected : CheckBox} alt="CheckBoxSelected" /> Story</div>
                </div>
                <div className={styles.box_videoTypeContainer} onClick={() => handleClick(VIDEO_SQUARE)}>
                    <div className={`
                    ${styles.box_videoTypeSquare}       
                    ${format === VIDEO_SQUARE ? styles.box_videoTypeSelected : ""}  
                    ${styles.box_videoType}`} >1:1
                        {mediaListShort}</div>
                    <div><img src={format === VIDEO_SQUARE ? CheckBoxSelected : CheckBox} alt="CheckBoxSelected" /> Square</div>
                </div>
                <div className={styles.box_videoTypeContainer} onClick={() => handleClick(VIDEO_VERTICAL)}>
                    <div className={`
                    ${styles.box_videoTypeVertical}       
                    ${format === VIDEO_VERTICAL ? styles.box_videoTypeSelected : ""}  
                    ${styles.box_videoType}`} >4:5
                        {mediaListShort}</div>
                    <div><img src={format === VIDEO_VERTICAL ? CheckBoxSelected : CheckBox} alt="CheckBoxSelected" /> Vertical</div>
                </div>
            </div>
        </div>
    );
}

export default FormatBox;