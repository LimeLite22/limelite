import { EditIcon } from "assets/images";

import BackButton from "../components/BackButton";
import NextButton from "../components/NextButton"
import StepsNavigation from "../components/StepsNavigation";
import styles from "../NewRequest.module.scss";
import AddOnsContainer from "./components/AddOnsContainer";
import InterviewOwnScript from "./components/InterviewOwnScript";
import InterviewProffScript from "./components/InterviewProffScript";
import LogisticInfo from "./components/Logistic";
import ProjectInfo from "./components/ProjectInfo";
import ScriptInfoOwnScript from "./components/ScriptInfoOwnScript";
import ScriptInfoProffScript from "./components/ScriptInfoProffScript";
import VideoEdit from "./components/VideoEdit";
import VoiceoverProfScript from "./components/VoiceoverProfScript";
import VoiceoverOwnScript from "./components/VoiceverOwnScript";

const Submit = () => {
    return (
        <>
            <StepsNavigation />
            <div
                className={styles.nR_submitContainer}
            >
                <StepsNavigation />
                <div className={styles.nR_header_text}>
                    Review and Submit request
                </div>
                <div className={styles.nR_submitContainer_text}>
                    Your request will not be submitted until you click ‘Submit’. To make edits,
                    click ‘Go back’ or ‘Edit’ below.
                </div>
                {/* <ProjectInfo />
                <LogisticInfo />
                <ScriptInfoOwnScript />
                <ScriptInfoProffScript />
                <InterviewOwnScript />
                <InterviewProffScript />
                <VoiceoverOwnScript />
                <VoiceoverProfScript /> */}
                <VideoEdit />
                <AddOnsContainer />

                <div className={styles.nR_submitContainer_text2}>Agreement </div>
                <div className={styles.nR_submitContainer_text3}>Mauris ipsum maecenas nunc risus. Adipiscing suscipit massa amet nulla arcu sed. Commodo
                    massa commodo et consequat. Mauris neque sed consectetur porta. Tempor tristique malesuada
                    fringilla pulvinar sagittis neque elit sed mus. Lobortis.</div>
                <div className={styles.nR_submitContainer_buttons}>
                    <BackButton />
                    <NextButton isDisabled={false} onClick={() => { }} />
                </div>

            </div>
        </>
    )
}

export default Submit;