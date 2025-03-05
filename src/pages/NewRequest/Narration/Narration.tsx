import StepsNavigation from "../components/StepsNavigation";
import Interview from "../Interview/Interview";
import ScriptedDelivery from "../ScriptedDelivery/ScriptedDelivery";
import Voiceover from "../Voiceover/Voiceover";
import styles from "../NewRequest.module.scss";
import BackButton from "../components/BackButton";
import { DetailsGreen } from "assets/images";
import NextButton from "../components/NextButton";
import { useSelector } from "react-redux";
import { selectRequestInfo } from "../../../redux/requests/reducer";
import { CANDID_APPROACH, SCRIPTED_APPROACH, VOICEOVER_APPROACH } from "consts/consts";
import useIsStepReady from "hooks/useCheckIsStepReady";
import { useState } from "react";
import StepErrorMessage from "../components/StepErrorMessage";


const Narration = () => {
    const narrationList = useSelector(selectRequestInfo)?.projectInfoSettings.approachList;
    const [showBottomMessage, setShowBottomMessage] = useState(false);
    const { isInterviewReady, isScriptReady, isVoiceoverReady, isScriptedDeliveryReady } = useIsStepReady();
    const isStepReady =
        (!narrationList?.includes(CANDID_APPROACH) || isInterviewReady)
        && (!narrationList?.includes(SCRIPTED_APPROACH) || (isScriptedDeliveryReady && isScriptReady))
        && (!narrationList?.includes(VOICEOVER_APPROACH) || isVoiceoverReady);
    return (
        <>
            <StepsNavigation />
            {narrationList?.includes(SCRIPTED_APPROACH) && <ScriptedDelivery />}
            {narrationList?.includes(CANDID_APPROACH) && <Interview />}
            {narrationList?.includes(VOICEOVER_APPROACH) && <Voiceover />}
            {!isStepReady && showBottomMessage && (
                <StepErrorMessage />
            )}
            <div className={styles.nR_formContainer_buttons} style={{ marginBottom: '160px', marginTop: '48px' }}>
                <BackButton />
                <div className={styles.nR_buttons_container}>
                    <button className={styles.nR_buttons_save}>
                        <img src={DetailsGreen} alt="" />
                    </button>
                    <NextButton isDisabled={!isStepReady} onClick={() => {
                        !isStepReady && setShowBottomMessage(true)
                    }} />
                </div>
            </div>
        </>
    )
}


export default Narration;