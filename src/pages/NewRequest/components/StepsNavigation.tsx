
import { ArrowLightGray, Success } from "assets/images";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import styles from "../NewRequest.module.scss";
const StepsNavigation = () => {
    const [step, setStep] = useState(1);
    const location = useLocation();
    useEffect(() => {
        if (location.pathname.includes("step1")) {
            setStep(1);
        }
        if (location.pathname.includes("step2")) {
            setStep(2);
        }
        if (location.pathname.includes("step3")) {
            setStep(3);
        }
        if (location.pathname.includes("step4")) {
            setStep(4);
        }
    }, [location])


    return (
        <div className={styles.navigation}>
            <div
                className={`${styles.navigation_item} ${step === 1 && styles.navigation_item_selected}`}
            >
                {step > 1 ? <img src={Success} alt="" /> : <span className={step === 1 ? styles.navigation_item_blackNumber : styles.navigation_item_number}>1</span>}
                <p>Project</p>
            </div>
            <img src={ArrowLightGray} alt="" />
            <div className={`${styles.navigation_item} ${step === 2 && styles.navigation_item_selected}`} >
                {step > 2 ? <img src={Success} alt="" /> : <span className={step === 2 ? styles.navigation_item_blackNumber : styles.navigation_item_number}>2</span>}
                <p> Logistics</p>
            </div>
            <img src={ArrowLightGray} alt="" />
            <div className={`${styles.navigation_item} ${step === 3 && styles.navigation_item_selected}`} >
                {step > 3 ? <img src={Success} alt="" /> : <span className={step === 3 ? styles.navigation_item_blackNumber : styles.navigation_item_number}>3</span>}
                <p>Script</p>
            </div>
            <img src={ArrowLightGray} alt="" />
            <div className={`${styles.navigation_item} ${step === 4 && styles.navigation_item_selected}`} >
                {step > 4 ? <img src={Success} alt="" /> : <span className={step === 4 ? styles.navigation_item_blackNumber : styles.navigation_item_number}>4</span>}
                <p>Interview</p>
            </div>
            <img src={ArrowLightGray} alt="" />
            <div className={styles.navigation_item}>
                <span className={styles.navigation_item_number}>5</span>{" "}
                <p>Voiceover</p>
            </div>
            <img src={ArrowLightGray} alt="" />
            <div className={styles.navigation_item}>
                <span className={styles.navigation_item_number}>6</span>{" "}
                <p>Video edit</p>
            </div>
            <img src={ArrowLightGray} alt="" />
            <div className={styles.navigation_item}>
                <span className={styles.navigation_item_number}>7</span>{" "}
                <p>Add-ons</p>
            </div>
        </div>
    );
};

export default StepsNavigation;