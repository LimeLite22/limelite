
import { Audio } from "assets/images";
import { DEFAULT, OWN_SCRIPT, PROFESSIONAL_SCRIPT, TRACK_AUTHOR_CLIENT } from "consts/consts";
import DivRowCount from "pages/NewRequest/components/TextArea";

import { testRequest } from "../../../redux/requests/consts";
import styles from "../ProjectsPage.module.scss";
const VoiceoverSettings = () => {
    const selectedRequest = testRequest;
    const current = selectedRequest?.voiceTrackSettings

    return (
        <div className={styles.infoContainer}>
            <div className={styles.infoContainer_header}>About Your Voiceover
            </div>
            <div className={styles.infoContainer_text}><p>Track Author:</p> {current?.trackAuthor}</div>
            {current.trackAuthor === TRACK_AUTHOR_CLIENT &&
                <div className={styles.infoContainer_text}>
                    <p>Track:</p>
                    {<div className={styles.box_audioFileSubmit}>
                        <img src={Audio} alt="" />
                        <div>
                            <div className={styles.box_audioFileSubmit_text}>{current.track !== DEFAULT && current.track?.name}</div>
                            <div className={styles.box_audioFileSubmit_text}>{current.track !== DEFAULT && current.track?.size && Number(current.track?.size / 1000000).toFixed(2)} mb</div>
                        </div>
                    </div>
                    }

                </div>}


            <div className={styles.infoContainer_text}><p>Script Author:</p> {current?.scriptAuthor}</div>
            {current.scriptAuthor === PROFESSIONAL_SCRIPT &&
                <div>
                    <div className={styles.infoContainer_text}><p>Subject matter expert:</p>
                        {current.scriptAuthorProfSettings.subject}
                    </div>
                    <div>
                        <div className={styles.infoContainer_text}><p>Phone:</p>
                            {current.scriptAuthorProfSettings.phone}
                        </div>
                        <div className={styles.infoContainer_text}><p>Email:</p>
                            {current.scriptAuthorProfSettings.email}
                        </div>
                    </div>

                </div>
            }
            {current.scriptAuthor === OWN_SCRIPT &&
                <>
                    <div className={styles.infoContainer_text}><p>Script Status:</p>
                        {current.scriptAuthorOwnSettings.scriptStatus}
                    </div>
                    <div className={styles.infoContainer_text}><p className={`
                ${styles.infoContainer_detailsHeader}
                `}
                    >Script:</p>
                        <DivRowCount text={current.scriptAuthorOwnSettings.text} />
                    </div>
                </>}

        </div>
    )

}


export default VoiceoverSettings;