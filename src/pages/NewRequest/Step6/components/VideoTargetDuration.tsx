
import styles from "../../NewRequest.module.scss";
import DurationSelector from "./DurationSelector/DurationSelector";
const VideoTargetDurationBox = () => {
    return <div>
        <div className={styles.box_question_header_text}>What is the target duration? (Seconds)*</div>
        <DurationSelector onChange={() => { }} />
    </div>;
};

export default VideoTargetDurationBox;