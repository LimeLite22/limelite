import { ArrowGray3, ArrowGray4 } from "assets/images";
import { CANDID_APPROACH, LOGISTICS_STEP, SCRIPTED_APPROACH, VIDEO_EDIT_STEP, VOICEOVER_APPROACH } from "consts/consts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectRequestInfo, selectSteps, updateFullEditRequest } from "../../../redux/requests/reducer";
import BackButton from "../components/BackButton";
import NextButton from "../components/NextButton"
import StepsNavigation from "../components/StepsNavigation";
import styles from "../NewRequest.module.scss";
import AddOnsContainer from "./components/AddOnsContainer";
import Interview from "./components/Interview";
import LogisticInfo from "./components/Logistic";
import ProjectInfo from "./components/ProjectInfo";
import ScriptedDeliveryInfo from "./components/ScriptedDeliveryInfo";
import ScriptInfo from "./components/ScriptInfo";
import VideoEdit from "./components/VideoEdit";
import Voiceover from "./components/Voiceover";

const Submit = () => {
    const steps = useSelector(selectSteps);
    const request = useSelector(selectRequestInfo);
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
                {request?.projectInfoSettings.approachList.includes(SCRIPTED_APPROACH) && <ScriptedDeliveryInfo />}
                {request?.projectInfoSettings.approachList.includes(VOICEOVER_APPROACH) && <ScriptInfo />}
                {request?.projectInfoSettings.approachList.includes(CANDID_APPROACH) && <Interview />}
                {request?.projectInfoSettings.approachList.includes(VOICEOVER_APPROACH) && <Voiceover />}

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