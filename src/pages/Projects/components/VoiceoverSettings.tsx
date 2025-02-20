
import { Audio } from "assets/images";
import { DEFAULT, TRACK_AUTHOR_CLIENT, TRACK_AUTHOR_PROFESSIONAL } from "consts/consts";
import DivRowCount from "pages/NewRequest/components/TextArea";
import { testRequest } from "redux/requests/consts";
import styles from "../../NewRequest.module.scss";
const VoiceoverOwnScript = () => {
    const selectedRequest = testRequest;
    const current = selectedRequest?.voiceTrackSettings



    return (
        <>
            {current?.trackAuthor !== TRACK_AUTHOR_PROFESSIONAL
                &&
                <div className={styles.infoContainer}>
                    <div className={styles.infoContainer_header}>About Your Voiceover
                    </div>
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

                </div >
            }
        </>

    )
}

export default VoiceoverOwnScript;