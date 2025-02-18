
import { CloseRed, EditIcon, Success2 } from "assets/images";
import { OWN_SCRIPT } from "consts/consts";
import DivRowCount from "pages/NewRequest/components/TextArea";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectRequestInfo, updateVoiceoverSettings } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
const VoiceoverProfScript = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const dispatch = useDispatch();
    const voiceTrackSettings = selectedRequest!.voiceTrackSettings;
    const [isEdit, setIsEdit] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [current, setCurrent] = useState(selectedRequest!.voiceTrackSettings);

    const readyToSave = () => {
        let ready = true;
        if (current?.scriptAuthorProfSettings.subject !== voiceTrackSettings?.scriptAuthorProfSettings.subject
            || current?.scriptAuthorProfSettings.phone !== voiceTrackSettings?.scriptAuthorProfSettings.phone
            || current?.scriptAuthorProfSettings.email !== voiceTrackSettings?.scriptAuthorProfSettings.email
            || current?.scriptAuthorProfSettings.backgroundInfo !== voiceTrackSettings?.scriptAuthorProfSettings.backgroundInfo
        ) {
            if (current?.scriptAuthorProfSettings.subject?.length !== 0 && current?.scriptAuthorProfSettings.email?.length !== 0) {
                ready = true
            } else {
                ready = false
            }

        } else {
            ready = false
        }
        setIsReady(ready);
    }
    const handleOnEdit = () => {
        setIsEdit(true);
    }
    const handleDecline = () => {
        setIsEdit(false);
        setCurrent(selectedRequest!.voiceTrackSettings);
    }
    const handleSave = () => {
        if (!isReady) return

        dispatch(
            updateVoiceoverSettings({
                voiceTrackSettings: current,
                isEdit: false
            }
            )
        )
        setIsEdit(false);
    }

    useEffect(() => {
        readyToSave();
    }, [current])

    if (selectedRequest?.voiceTrackSettings.scriptAuthor !== OWN_SCRIPT) return null
    return (
        <div className={styles.infoContainer}>
            <div className={styles.infoContainer_header}>About Your Voiceover

                {!isEdit &&
                    <div className={styles.infoContainer_header_edit} onClick={handleOnEdit}>
                        <img src={EditIcon} alt='' />
                        Edit</div>}
                {isEdit &&
                    <div className={styles.infoContainer_header_buttons}>
                        <div
                            className={styles.infoContainer_header_decline}
                            onClick={handleDecline}><img src={CloseRed} alt='' /><div>Decline</div></div>
                        <div
                            className={`
                            ${styles.infoContainer_header_save}
                            ${!isReady ? styles.infoContainer_header_save_notReady : ''}
                            `}
                            onClick={handleSave}
                        ><img src={Success2} alt='' /><div>Save changes</div></div>
                    </div>}
            </div>


            <div className={styles.infoContainer_text}><p>Subject matter expert :</p>
                {isEdit ?
                    <input
                        className={styles.infoContainer_input}
                        value={current.scriptAuthorProfSettings.subject}
                        onChange={(e) => setCurrent({ ...current, scriptAuthorProfSettings: { ...current.scriptAuthorProfSettings, subject: e.target.value } })}
                        type="text" /> : voiceTrackSettings?.scriptAuthorProfSettings.subject}

            </div>

            <div className={styles.infoContainer_text}><p>Phone:</p>
                {isEdit ?
                    <input
                        className={styles.infoContainer_input}
                        value={current.scriptAuthorProfSettings.phone}

                        onChange={(e) => setCurrent({ ...current, scriptAuthorProfSettings: { ...current.scriptAuthorProfSettings, phone: Number(e.target.value) } })}
                        type="text" /> : voiceTrackSettings?.scriptAuthorProfSettings.phone}
            </div>

            <div className={styles.infoContainer_text}><p>Email:</p>
                {isEdit ?
                    <input
                        className={styles.infoContainer_input}
                        value={current.scriptAuthorProfSettings.email}
                        onChange={(e) => setCurrent({ ...current, scriptAuthorProfSettings: { ...current.scriptAuthorProfSettings, email: e.target.value } })}
                        type="text" /> : voiceTrackSettings?.scriptAuthorProfSettings.email}
            </div>

            <div className={styles.infoContainer_text}><p>Background information for interview(s):</p>
                {isEdit ?
                    <input
                        className={styles.infoContainer_input}
                        value={current.scriptAuthorProfSettings.backgroundInfo}
                        onChange={(e) => setCurrent({ ...current, scriptAuthorProfSettings: { ...current.scriptAuthorProfSettings, backgroundInfo: e.target.value } })}
                        type="text" /> : <DivRowCount text={voiceTrackSettings?.scriptAuthorProfSettings.backgroundInfo} />}
            </div>
        </div >
    )
}

export default VoiceoverProfScript;