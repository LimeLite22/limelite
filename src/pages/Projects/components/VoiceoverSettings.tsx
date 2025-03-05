
import { Audio } from "assets/images";
import { DEFAULT, OWN_SCRIPT, PROFESSIONAL_SCRIPT, TRACK_AUTHOR_CLIENT } from "consts/consts";
import DivRowCount from "pages/NewRequest/components/TextArea";

import { testRequest } from "../../../redux/requests/consts";
import styles from "../ProjectsPage.module.scss";
const VoiceoverSettings = () => {
    const selectedRequest = testRequest;
    const voiceTrackSettings = selectedRequest?.voiceTrackSettings;
    const scriptSettings = selectedRequest?.script;

    return (
        <div className={styles.infoContainer}>
            <div className={styles.infoContainer_header}>About Your Voiceover
            </div>
            <div className={styles.infoContainer_text}><p>Track Author:</p> {voiceTrackSettings?.trackAuthor}</div>
            {voiceTrackSettings.trackAuthor === TRACK_AUTHOR_CLIENT &&
                <div className={styles.infoContainer_text}>
                    <p>Track:</p>
                    {<div className={styles.box_audioFileSubmit}>
                        <img src={Audio} alt="" />
                        <div>
                            <div className={styles.box_audioFileSubmit_text}>{voiceTrackSettings.track !== DEFAULT && voiceTrackSettings.track?.name}</div>
                            <div className={styles.box_audioFileSubmit_text}>{voiceTrackSettings.track !== DEFAULT && voiceTrackSettings.track?.size && Number(voiceTrackSettings.track?.size / 1000000).toFixed(2)} mb</div>
                        </div>
                    </div>
                    }

                </div>}


            <div className={styles.infoContainer_text}><p>Script Author:</p> {scriptSettings.scriptWriter}</div>
            {scriptSettings.scriptWriter === PROFESSIONAL_SCRIPT &&
                <div>
                    <div className={styles.infoContainer_text}><p>Subject matter expert:</p>
                        {scriptSettings?.name}
                    </div>
                    <div>
                        <div className={styles.infoContainer_text}><p>Phone:</p>
                            {scriptSettings?.phone}
                        </div>
                        <div className={styles.infoContainer_text}><p>Email:</p>
                            {scriptSettings?.email}
                        </div>
                    </div>

                </div>
            }
            {scriptSettings?.scriptWriter === OWN_SCRIPT &&
                <>
                    <div className={styles.infoContainer_text}><p>Script Status:</p>
                        {selectedRequest.script.scriptStatus}
                    </div>
                    <div className={styles.infoContainer_text}><p className={`
                ${styles.infoContainer_detailsHeader}
                `}
                    >Script:</p>
                        <DivRowCount text={selectedRequest.script.scriptText} />
                    </div>
                </>}

        </div>
    )

}


export default VoiceoverSettings;