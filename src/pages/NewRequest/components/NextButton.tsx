import { useSelector } from "react-redux";
import { selectSteps } from "../../../redux/requests/reducer";

import { ADD_ONS_STEP, INTERVIEW_STEP, LOGISTICS_STEP, PROJECT_STEP, SCRIPT_STEP, VIDEO_EDIT_STEP, VOICEOVER_STEP, SUBMIT_STEP, FINAL_STEP } from "consts/consts";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import styles from "../NewRequest.module.scss";
import { ArrowWhite } from "assets/images";

interface IProps {
    isDisabled: boolean
    onClick: () => void
}
const NextButton = ({ isDisabled, onClick }: IProps) => {

    const stepsList = useSelector(selectSteps);
    const [nextStepLink, setNextStepLink] = useState('');
    const navigate = useNavigate();

    const location = useLocation();

    useEffect((
    ) => {
        const currentStep = location.pathname.slice(1);
        const nextStepIndex = stepsList?.findIndex(step => step === currentStep);
        setNextStepLink(stepsList[nextStepIndex + 1]);
    }, [stepsList])


    const handleNext = () => {
        onClick();
        if (isDisabled) return

        const currentStep = location.pathname.slice(1);
        console.log(currentStep, stepsList);
        const nextStepIndex = stepsList?.findIndex(step => step === currentStep);
        console.log(nextStepIndex, stepsList[nextStepIndex + 1]);
        setNextStepLink(stepsList[nextStepIndex + 1]);
        navigate(`/${stepsList[nextStepIndex + 1]}`);
    }

    return (
        <div className={`${styles.nR_buttons_delivery} ${isDisabled ? styles.nR_buttons_deliveryDisabled : ""}`} onClick={handleNext} >Next <img src={ArrowWhite} alt="" /></div>
    );
}

export default NextButton;



// scripted delivery > interview > voiceover ;

// SHOOT + EDIT
// shoot+edit (approach : none) :  
//project =>  logistics => video edit  => add ons => submit => final

// const steps1 = [PROJECT_STEP, LOGISTICS_STEP, VIDEO_EDIT_STEP, ADD_ONS_STEP, SUBMIT_STEP, FINAL_STEP]

// shoot+edit ( approach : scripted delivery)  :  
// project =>  logistics => scripted delivery => video edit  => add ons => submit => final

// const steps2 = [PROJECT_STEP, LOGISTICS_STEP, SCRIPT_STEP, VIDEO_EDIT_STEP, ADD_ONS_STEP, SUBMIT_STEP, FINAL_STEP]

// shoot+edit ( approach : candid interview)  :  
// project =>  logistics  => interview => video edit => add ons => submit => final

// const steps3 = [PROJECT_STEP, LOGISTICS_STEP, INTERVIEW_STEP, VIDEO_EDIT_STEP, ADD_ONS_STEP, SUBMIT_STEP, FINAL_STEP]

// shoot+edit ( approach : voiceover)  :  
// project =>  logistics => voiceover => video edit => add ons => submit => final

// const steps4 = [PROJECT_STEP, LOGISTICS_STEP, VOICEOVER_STEP, VIDEO_EDIT_STEP, ADD_ONS_STEP, SUBMIT_STEP, FINAL_STEP]

// shoot+edit ( approach : scripted delivery + сandid interview)  :  
// project =>  logistics => scripted delivery => interview => video edit => add ons => submit => final  

// const steps5 = [PROJECT_STEP, LOGISTICS_STEP, SCRIPT_STEP, INTERVIEW_STEP, VIDEO_EDIT_STEP, ADD_ONS_STEP, SUBMIT_STEP, FINAL_STEP]

// shoot+edit ( approach : scripted delivery + voiceover)  :  
// project =>  logistics => scripted delivery => voiceover => video edit => add ons => submit => final

// const steps6 = [PROJECT_STEP, LOGISTICS_STEP, SCRIPT_STEP, VOICEOVER_STEP, VIDEO_EDIT_STEP, ADD_ONS_STEP, SUBMIT_STEP, FINAL_STEP]

// shoot+edit ( approach : сandid interview + voiceover )  :  
// project =>  logistics => interview => voiceover => video edit => add ons => submit => final

// const steps7 = [PROJECT_STEP, LOGISTICS_STEP, INTERVIEW_STEP, VOICEOVER_STEP, VIDEO_EDIT_STEP, ADD_ONS_STEP, SUBMIT_STEP, FINAL_STEP]


// SHOOT ONLY
// shoot only (approach : none) :  
//project =>  logistics  => add ons => submit => final

// const steps8 = [PROJECT_STEP, LOGISTICS_STEP, ADD_ONS_STEP, SUBMIT_STEP, FINAL_STEP]

// shoot only ( approach : scripted delivery) :  
// project =>  logistics => scripted delivery   => add ons => submit => final

const steps9 = [PROJECT_STEP, LOGISTICS_STEP, SCRIPT_STEP, ADD_ONS_STEP, SUBMIT_STEP, FINAL_STEP]

// shoot only ( approach : candid interview) :  
// project =>  logistics  => interview  => add ons => submit => final

const steps10 = [PROJECT_STEP, LOGISTICS_STEP, INTERVIEW_STEP, ADD_ONS_STEP, SUBMIT_STEP, FINAL_STEP]

// shoot only ( approach : voiceover) :  
// project =>  logistics => voiceover => add ons => submit => final

const steps11 = [PROJECT_STEP, LOGISTICS_STEP, VOICEOVER_STEP, ADD_ONS_STEP, SUBMIT_STEP, FINAL_STEP]

// shoot only ( approach : scripted delivery + сandid interview)  :  
// project =>  logistics => scripted delivery => interview  => add ons => submit => final  

const steps12 = [PROJECT_STEP, LOGISTICS_STEP, SCRIPT_STEP, INTERVIEW_STEP, ADD_ONS_STEP, SUBMIT_STEP, FINAL_STEP]

// shoot only ( approach : scripted delivery + voiceover)  :  
// project =>  logistics => scripted delivery => voiceover  => add ons => submit => final

const steps13 = [PROJECT_STEP, LOGISTICS_STEP, SCRIPT_STEP, VOICEOVER_STEP, ADD_ONS_STEP, SUBMIT_STEP, FINAL_STEP]

// shoot only ( approach : сandid interview + voiceover )  :  
// project =>  logistics => interview => voiceover  => add ons => submit => final

const steps14 = [PROJECT_STEP, LOGISTICS_STEP, INTERVIEW_STEP, VOICEOVER_STEP, ADD_ONS_STEP, SUBMIT_STEP, FINAL_STEP]


// EDIT ONLY

// edit only (approach : not available) :  
// project =>  logistics  => video edit => add ons => submit => final

const steps15 = [PROJECT_STEP, LOGISTICS_STEP, VIDEO_EDIT_STEP, ADD_ONS_STEP, SUBMIT_STEP, FINAL_STEP]


// OTHER 

// other (approach : none) :  
//project =>  logistics => video edit  => add ons => submit => final

const steps16 = [PROJECT_STEP, LOGISTICS_STEP, VIDEO_EDIT_STEP, ADD_ONS_STEP, SUBMIT_STEP, FINAL_STEP]

// other ( approach : scripted delivery)  :  
// project =>  logistics => scripted delivery => video edit  => add ons => submit => final

const steps17 = [PROJECT_STEP, LOGISTICS_STEP, SCRIPT_STEP, VIDEO_EDIT_STEP, ADD_ONS_STEP, SUBMIT_STEP, FINAL_STEP]

// other ( approach : candid interview)  :  
// project =>  logistics  => interview => video edit => add ons => submit => final

const steps18 = [PROJECT_STEP, LOGISTICS_STEP, INTERVIEW_STEP, VIDEO_EDIT_STEP, ADD_ONS_STEP, SUBMIT_STEP, FINAL_STEP]

// other ( approach : voiceover)  :  
// project =>  logistics => voiceover => video edit => add ons => submit => final

const steps19 = [PROJECT_STEP, LOGISTICS_STEP, VOICEOVER_STEP, VIDEO_EDIT_STEP, ADD_ONS_STEP, SUBMIT_STEP, FINAL_STEP]

// other ( approach : scripted delivery + сandid interview)  :  
// project =>  logistics => scripted delivery => interview => video edit => add ons => submit => final  

const steps20 = [PROJECT_STEP, LOGISTICS_STEP, SCRIPT_STEP, INTERVIEW_STEP, VIDEO_EDIT_STEP, ADD_ONS_STEP, SUBMIT_STEP, FINAL_STEP]

// other ( approach : scripted delivery + voiceover)  :  
// project =>  logistics => scripted delivery => voiceover => video edit => add ons => submit => final

const steps21 = [PROJECT_STEP, LOGISTICS_STEP, SCRIPT_STEP, VOICEOVER_STEP, VIDEO_EDIT_STEP, ADD_ONS_STEP, SUBMIT_STEP, FINAL_STEP]

// other ( approach : сandid interview + voiceover )  :  
// project =>  logistics => interview => voiceover => video edit => add ons => submit => final

const steps22 = [PROJECT_STEP, LOGISTICS_STEP, INTERVIEW_STEP, VOICEOVER_STEP, VIDEO_EDIT_STEP, ADD_ONS_STEP, SUBMIT_STEP, FINAL_STEP]
















    // shoot+edit :  project =>  logistics
    // shoot+edit :  project =>  logistics
    // shoot+edit :  project =>  logistics