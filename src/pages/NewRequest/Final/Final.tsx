import { SuccessGap } from "assets/images"
import styles from "../NewRequest.module.scss";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Final = () => {
    const [showConfetti, setShowConfetti] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 3300); // Hide confetti after 5 seconds

        // Clean up timeout if the component is unmounted before 5 seconds
        return () => clearTimeout(timer);
    }, []);


    return (
        <div className={styles.finalContainer}>
            <img src={SuccessGap} alt="" />
            <div className={styles.finalContainer_header} >Amazing!</div>
            <div className={styles.finalContainer_title}  > Your request has been successfully submitted!</div>
            <div className={styles.finalContainer_title2}  >We’ve received your request and will get in touch with you via email shortly. Thank you for reaching out!</div>
            <Link to="/welcome" className={styles.finalContainer_button}    >Go to Welcome page</ Link>
            {showConfetti && <Realistic style={{ position: "absolute", width: '100%', height: '100%' }} autorun={{ speed: 0.3, duration: 5000 }} />}
        </div>
    )
}

export default Final;