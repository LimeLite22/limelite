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
                <ScriptInfoProffScript /> */}
                <InterviewOwnScript />
                <InterviewProffScript />
                ----
                <div className={styles.infoContainer}>
                    <div className={styles.infoContainer_header}>About Your Interview(s) (V1)
                        <div className={styles.infoContainer_header_edit}>
                            <img src={EditIcon} alt='' />
                            Edit</div>
                    </div>
                    <div className={styles.infoContainer_text}><p>Questions Status:</p> Approved</div>
                    <div className={styles.infoContainer_text}><p>Questions:</p>
                        1) What is your favorite color? 2) What is your favorite animal? 3) What is your favorite food?</div>
                    <div className={styles.infoContainer_text}><p>Questions Status:</p> Approved</div>
                    <div className={styles.infoContainer_text}><p>Interviewees?:</p>
                        John Doe, Managerm  Mike Smith
                    </div>
                    <div className={styles.infoContainer_text}><p>Interview conduction:</p>
                        On location
                    </div>
                    <div className={styles.infoContainer_text}><p>Full name:</p>
                        John Doe
                    </div>
                    <div className={styles.infoContainer_text}><p>Phone:</p>
                        123-456-7890
                    </div>
                    <div className={styles.infoContainer_text}><p>Email:</p>
                        4V5dX@example.com
                    </div>
                </div>
                ----
                <div className={styles.infoContainer}>
                    <div className={styles.infoContainer_header}>About Your Interview(s) (V2)
                        <div className={styles.infoContainer_header_edit}>
                            <img src={EditIcon} alt='' />
                            Edit</div>
                    </div>
                    <div className={styles.infoContainer_text}><p>Questions Status:</p> Approved</div>
                    <div className={styles.infoContainer_text}><p>Questions:</p>
                        1) What is your favorite color? 2) What is your favorite animal? 3) What is your favorite food?</div>
                    <div className={styles.infoContainer_text}><p>Questions Status:</p> Approved</div>
                    <div className={styles.infoContainer_text}><p>Interviewees?:</p>
                        John Doe, Managerm  Mike Smith
                    </div>
                    <div className={styles.infoContainer_text}><p>Interview conduction:</p>
                        Virtual
                    </div>
                    <div className={styles.infoContainer_text}><p>Full name:</p>
                        John Doe
                    </div>
                    <div className={styles.infoContainer_text}><p>Phone:</p>
                        123-456-7890
                    </div>
                    <div className={styles.infoContainer_text}><p>Email:</p>
                        4V5dX@example.com
                    </div>
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.infoContainer_header}>About Your Interview(s) (V3)
                        <div className={styles.infoContainer_header_edit}>
                            <img src={EditIcon} alt='' />
                            Edit</div>
                    </div>
                    <div className={styles.infoContainer_text}><p>Questions Status:</p> Approved</div>
                    <div className={styles.infoContainer_text}><p>Questions:</p>
                        1) What is your favorite color? 2) What is your favorite animal? 3) What is your favorite food?</div>
                    <div className={styles.infoContainer_text}><p>Questions Status:</p> Approved</div>
                    <div className={styles.infoContainer_text}><p>Interviewees?:</p>
                        John Doe, Managerm  Mike Smith
                    </div>
                    <div className={styles.infoContainer_text}><p>Interview conduction:</p>
                        Proffesional recording
                    </div>
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.infoContainer_header}>About Your Voiceover (V1)
                        <div className={styles.infoContainer_header_edit}>
                            <img src={EditIcon} alt='' />
                            Edit</div>
                    </div>
                    <div className={styles.infoContainer_text}><p>Voice Track:</p>  Track-For-Interview.mp3</div>
                    <div className={styles.infoContainer_text}><p>Script Status</p> Approved</div>
                    <div className={styles.infoContainer_text}><p>Script</p> Opening Scene:
                        Visuals: Close-up shots of employees at work, a bustling office environment, and people collaborating.

                        Narrator:
                        "Welcome to Foundations of Excellence—a program dedicated to building the skills, values, and knowledge that drive our organization forward."</div>
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.infoContainer_header}>About Your Voiceover (V2)
                        <div className={styles.infoContainer_header_edit}>
                            <img src={EditIcon} alt='' />
                            Edit</div>
                    </div>
                    <div className={styles.infoContainer_text}><p>Voice Track:</p> https://music.youtube.com</div>
                    <div className={styles.infoContainer_text}><p>Script</p> A professional scriptwriter</div>
                    <div className={styles.infoContainer_text}><p>Full name:</p>
                        John Doe
                    </div>
                    <div className={styles.infoContainer_text}><p>Phone:</p>
                        123-456-7890
                    </div>
                    <div className={styles.infoContainer_text}><p>Email:</p>
                        4V5dX@example.com
                    </div>
                    <div className={styles.infoContainer_text}><p>Background information:</p> A professional scriptwriter with a background in film and TV production. </div>
                </div>

                <div className={styles.infoContainer}>
                    <div className={styles.infoContainer_header}>About Your Video Edit (V1)
                        <div className={styles.infoContainer_header_edit}>
                            <img src={EditIcon} alt='' />
                            Edit</div>
                    </div>
                    <div className={styles.infoContainer_text}><p>Video format :</p>  Standart 16:9 </div>
                    <div className={styles.infoContainer_text}><p>Target duration :</p>  60 sec</div>
                    <div className={styles.infoContainer_text}><p>Captions :</p> No </div>
                    <div className={styles.infoContainer_text}><p>Thumbnail:</p> Basic </div>
                    <div className={styles.infoContainer_text}><p>Additional/social formats:</p>No</div>
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.infoContainer_header}>About Your Video Edit (V2)
                        <div className={styles.infoContainer_header_edit}>
                            <img src={EditIcon} alt='' />
                            Edit</div>
                    </div>
                    <div className={styles.infoContainer_text}><p>Video format :</p>  Standart 16:9 </div>
                    <div className={styles.infoContainer_text}><p>Target duration :</p>  60 sec</div>
                    <div className={styles.infoContainer_text}><p>Captions :</p> No </div>
                    <div className={styles.infoContainer_text}><p>Thumbnail:</p> Custom</div>
                    <div className={styles.infoContainer_text}><p>Additional/social formats:</p>No</div>

                </div>
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