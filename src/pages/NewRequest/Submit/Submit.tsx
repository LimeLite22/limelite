import { ArrowGray3, ArrowGray4 } from "assets/images";
import { Link } from "react-router-dom";

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
                <StepsNavigation />
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
                <LogisticInfo />
                <ScriptInfo />
                <InterviewProffScript />
                <VoiceoverOwnScript />
                <VoiceoverProfScript />
                <VideoEdit />
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