import { ArrowGray } from "assets/images";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

import { selectSteps } from "../../../redux/requests/reducer";
import styles from "../NewRequest.module.scss";

const BackButton = () => {

    const stepsList = useSelector(selectSteps);
    const navigate = useNavigate();
    const location = useLocation();


    const handleNext = () => {
        const currentStep = location.pathname.slice(1);
        const nextStepIndex = stepsList?.findIndex(step => step === currentStep);
        navigate(nextStepIndex === 0 ? '/new-request/start' : `/${stepsList[nextStepIndex - 1]}`);
    }

    return (
        <button onClick={handleNext} className={styles.nR_back}>
            <img src={ArrowGray} alt="" />
            Go Back
        </button>
    );
}

export default BackButton;
