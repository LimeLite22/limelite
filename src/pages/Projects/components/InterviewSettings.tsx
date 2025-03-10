
import { QUESTIONS_AUTHOR_CLIENT, QUESTIONS_AUTHOR_PROFESSIONAL, QUESTIONS_ON_LOCATION, QUESTIONS_VIRTUALLY } from "consts/consts";
import DivRowCount from "pages/NewRequest/components/TextArea";

import { testRequest } from "../../../redux/requests/consts";
import styles from "../ProjectsPage.module.scss";
const InterviewSettings = () => {
    const selectedRequest = testRequest;
    const interviewSettings = { ...selectedRequest!.interviewSettings };
    const proffSettings = { ...interviewSettings?.questionsAuthorProfSettings };
    const ownSettings = { ...interviewSettings?.questionsAuthorOwnSettings };

    return (
        <>
            <div className={styles.infoContainer_header}>About Your Interview(s)
            </div>
            <div className={styles.infoContainer_text}>
                <p>Questions Author:</p>{interviewSettings?.questionsAuthor}
            </div>
            {interviewSettings?.questionsAuthor === QUESTIONS_AUTHOR_CLIENT &&
                <>
                    <div className={styles.infoContainer_text}><p>Script Status:</p>
                        {ownSettings.scriptStatus}
                    </div>
                    <div className={styles.infoContainer_text}><p className={`
                `}
                    >Script:</p>
                        <DivRowCount text={ownSettings.text} />
                    </div>
                </>
            }
            {interviewSettings?.questionsAuthor === QUESTIONS_AUTHOR_PROFESSIONAL &&
                <>
                    <div className={styles.infoContainer_text}><p>Subject matter expert:</p>
                        {proffSettings.subject}

                    </div>

                    <div className={styles.infoContainer_text}><p>Phone:</p>
                        {proffSettings.phone}
                    </div>

                    <div className={styles.infoContainer_text}><p>Email:</p>
                        {proffSettings.email}
                    </div>

                    <div className={styles.infoContainer_text}><p>Background information for interview(s):</p>
                        <DivRowCount text={proffSettings.backgroundInfo} />
                    </div>
                </>
            }
            <div className={styles.infoContainer_text}><p>Persons:</p>

                <div>{selectedRequest?.interviewSettings.persons.map((person) => `${person.name}( ${person.title})`).join(", ")}</div>
            </div>
            <div className={styles.infoContainer_text}>
                <p>Interview conduction:</p>{interviewSettings?.questionSettings.type}
            </div>
            {interviewSettings?.questionSettings?.type === QUESTIONS_ON_LOCATION &&
                <>
                    <div className={styles.infoContainer_text}><p>Name(Location):</p>
                        {interviewSettings?.questionSettings?.locationSettings?.name}

                    </div>

                    <div className={styles.infoContainer_text}><p>Phone(Location):</p>
                        {interviewSettings?.questionSettings?.locationSettings?.phone}
                    </div>

                    <div className={styles.infoContainer_text}><p>Email(Location):</p>
                        {interviewSettings?.questionSettings?.locationSettings?.email}
                    </div>
                </>
            }
            {interviewSettings?.questionSettings?.type === QUESTIONS_VIRTUALLY &&
                <>
                    <div className={styles.infoContainer_text}><p>Name:</p>
                        {interviewSettings?.questionSettings?.virtualSettings?.name}

                    </div>

                    <div className={styles.infoContainer_text}><p>Phone:</p>
                        {interviewSettings?.questionSettings?.virtualSettings?.phone}
                    </div>

                    <div className={styles.infoContainer_text}><p>Email:</p>
                        {interviewSettings?.questionSettings?.virtualSettings?.email}
                    </div>
                </>
            }



        </>
    )
}

export default InterviewSettings;