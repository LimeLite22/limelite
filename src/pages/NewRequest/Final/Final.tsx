import { SuccessGap } from "assets/images"
import styles from "../NewRequest.module.scss";
import Realistic from "react-canvas-confetti/dist/presets/realistic";


const Final = () => {

    return (
        <div className={styles.finalContainer}>
            <img src={SuccessGap} alt="" />
            <div className={styles.finalContainer_header} >Amazing!</div>
            <div  className={styles.finalContainer_title}  > Your request has been successfully submitted!</div>
            <div className={styles.finalContainer_title2}  >We’ve received your request and will get in touch with you via email shortly. Thank you for reaching out!</div>
            <div className={styles.finalContainer_button}    >Go to Welcome page</div>
            <Realistic  autorun={{speed: 0.3}} />
        </div>
    )
}

export default Final