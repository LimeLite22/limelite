import { useState } from "react";
import { useSelector } from "react-redux";
import { selectRequestInfo } from "redux/requests/reducer";

const NextButton = () => {
    const request = useSelector(selectRequestInfo);

    const [step, setStep] = useState('Project');
    // scripted delivery > interview > voiceover ;

    // SHOOT + EDIT
    // shoot+edit (approach : none) :  
    //project =>  logistics => video edit  => add ons => submit => final

    // shoot+edit ( approach : scripted delivery)  :  
    // project =>  logistics => scripted delivery => video edit  => add ons => submit => final

    // shoot+edit ( approach : candid interview)  :  
    // project =>  logistics  => interview => video edit => add ons => submit => final

    // shoot+edit ( approach : voiceover)  :  
    // project =>  logistics => voiceover => video edit => add ons => submit => final

    // shoot+edit ( approach : scripted delivery + сandid interview)  :  
    // project =>  logistics => scripted delivery => interview => video edit => add ons => submit => final  

    // shoot+edit ( approach : scripted delivery + voiceover)  :  
    // project =>  logistics => scripted delivery => voiceover => video edit => add ons => submit => final

    // shoot+edit ( approach : сandid interview + voiceover )  :  
    // project =>  logistics => interview => voiceover => video edit => add ons => submit => final


    // SHOOT ONLY
    // shoot only (approach : none) :  
    //project =>  logistics  => add ons => submit => final

    // shoot only ( approach : scripted delivery) :  
    // project =>  logistics => scripted delivery   => add ons => submit => final

    // shoot only ( approach : candid interview) :  
    // project =>  logistics  => interview  => add ons => submit => final

    // shoot only ( approach : voiceover) :  
    // project =>  logistics => voiceover => add ons => submit => final

    // shoot only ( approach : scripted delivery + сandid interview)  :  
    // project =>  logistics => scripted delivery => interview  => add ons => submit => final  

    // shoot only ( approach : scripted delivery + voiceover)  :  
    // project =>  logistics => scripted delivery => voiceover  => add ons => submit => final

    // shoot only ( approach : сandid interview + voiceover )  :  
    // project =>  logistics => interview => voiceover  => add ons => submit => final


    // EDIT ONLY

    // edit only (approach : not available) :  
    // project =>  logistics  => video edit => add ons => submit => final


    // OTHER 

    // other (approach : none) :  
    //project =>  logistics => video edit  => add ons => submit => final

    // other ( approach : scripted delivery)  :  
    // project =>  logistics => scripted delivery => video edit  => add ons => submit => final

    // other ( approach : candid interview)  :  
    // project =>  logistics  => interview => video edit => add ons => submit => final

    // other ( approach : voiceover)  :  
    // project =>  logistics => voiceover => video edit => add ons => submit => final

    // other ( approach : scripted delivery + сandid interview)  :  
    // project =>  logistics => scripted delivery => interview => video edit => add ons => submit => final  

    // other ( approach : scripted delivery + voiceover)  :  
    // project =>  logistics => scripted delivery => voiceover => video edit => add ons => submit => final

    // other ( approach : сandid interview + voiceover )  :  
    // project =>  logistics => interview => voiceover => video edit => add ons => submit => final
















    // shoot+edit :  project =>  logistics
    // shoot+edit :  project =>  logistics
    // shoot+edit :  project =>  logistics
    const handleNext = () => {

    }





    return (
        <div className="next-button-container">
            <button className="next-button">Next</button>
        </div>
    );
}

export default NextButton;