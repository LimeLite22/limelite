import { ArrowGray3, ArrowGray4 } from "assets/images";
import { INTERVIEW_STEP, LOGISTICS_STEP, SCRIPT_STEP, VIDEO_EDIT_STEP, VOICEOVER_STEP } from "consts/consts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectRequestInfo, selectSteps, updateFullEditRequest, updateInterviewInfoSettings, updateLogisticInfoSettings } from "../../../redux/requests/reducer";

import BackButton from "../components/BackButton";
import NextButton from "../components/NextButton"
import StepsNavigation from "../components/StepsNavigation";
import styles from "../NewRequest.module.scss";
import AddOnsContainer from "./components/AddOnsContainer";
import InterviewProffScript from "./components/Interview";
import LogisticInfo from "./components/Logistic";
import ProjectInfo from "./components/ProjectInfo";
import ScriptInfo from "./components/ScriptInfo";
import VideoEdit from "./components/VideoEdit";
import VoiceoverProfScript from "./components/VoiceoverProfScript";
import VoiceoverOwnScript from "./components/VoiceverOwnScript";

const Submit = () => {
    const steps = useSelector(selectSteps);
    const selectedRequest = useSelector(selectRequestInfo);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateFullEditRequest())
    }, [])
    return (
        <>
            <StepsNavigation />
            <Link to="/new-request/start">
                <div className={styles.nR_backButton}>
                    <img src={ArrowGray3} alt="" /> Back to New Request{" "}
                </div>
            </Link>
            <div
                className={styles.nR_submitContainer}
            >
                <div className={styles.nR_header_text}>
                    <Link to="/new-request/start">
                        <div className={styles.nR_header_text_button}>
                            <img src={ArrowGray4} alt="" />
                        </div>
                    </Link>
                    Review and Submit request
                </div>
                <div className={styles.nR_submitContainer_text}>
                    Your request will not be submitted until you click ‘Submit’. To make edits,
                    click ‘Go back’ or ‘Edit’ below.
                </div>
                <ProjectInfo />
                {steps.includes(LOGISTICS_STEP) && <LogisticInfo />}
                {steps.includes(SCRIPT_STEP) && <ScriptInfo />}
                {steps.includes(INTERVIEW_STEP) && <InterviewProffScript />}
                {steps.includes(VOICEOVER_STEP) && <VoiceoverOwnScript />}
                {steps.includes(VOICEOVER_STEP) && <VoiceoverProfScript />}
                {steps.includes(VIDEO_EDIT_STEP) && <VideoEdit />}
                <AddOnsContainer />
                <div className={styles.nR_submitContainer_agreement} >

                    <div className={styles.nR_submitContainer_text2}>Agreement </div>
                    <div className={styles.nR_submitContainer_text3}>Mauris ipsum maecenas nunc risus. Adipiscing suscipit massa amet nulla arcu sed. Commodo
                        massa commodo et consequat. Mauris neque sed consectetur porta. Tempor tristique malesuada
                        fringilla pulvinar sagittis neque elit sed mus. Lobortis.Mauris ipsum maecenas nunc risus. Adipiscing suscipit massa amet nulla arcu sed. Commodo
                        massa commodo et consequat. Mauris neque sed consectetur porta. Tempor tristique malesuada
                        fringilla pulvinar sagittis neque elit sed mus. Lobortis.Mauris ipsum maecenas nunc risus. Adipiscing suscipit massa amet nulla arcu sed. Commodo
                        massa commodo et consequat. Mauris neque sed consectetur porta. Tempor tristique malesuada
                        fringilla pulvinar sagittis neque elit sed mus. Lobortis.Mauris ipsum maecenas nunc risus. Adipiscing suscipit massa amet nulla arcu sed. Commodo
                        massa commodo et consequat. Mauris neque sed consectetur porta. Tempor tristique malesuada
                        fringilla pulvinar sagittis neque elit sed mus. Lobortis.
                    </div>
                </div>


                <div className={styles.nR_submitContainer_buttons}>
                    <BackButton />
                    <NextButton isDisabled={false} onClick={() => { }} />
                </div>

            </div>
        </>
    )
}

export default Submit;