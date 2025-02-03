
import { CloseRed, EditIcon, Success2 } from "assets/images";
import { TRACK_AUTHOR_CLIENT } from "consts/consts";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectRequestInfo, updateDraftField } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
const VoiceoverProfScript = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const dispatch = useDispatch();
    const voiceTrackSettings = selectedRequest?.voiceTrackSettings.scriptAuthorProfSettings
    const defaultState = {
        expert: voiceTrackSettings?.subject,
        phone: voiceTrackSettings?.phone,
        email: voiceTrackSettings?.email,
        backgroundInfo: voiceTrackSettings?.backgroundInfo,
    }
    const [isEdit, setIsEdit] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [current, setCurrent] = useState(defaultState);

    const readyToSave = () => {
        let ready = true;
        if (current.expert !== voiceTrackSettings?.subject
            || current.phone !== voiceTrackSettings?.phone
            || current.email !== voiceTrackSettings?.email
            || current.backgroundInfo !== voiceTrackSettings?.backgroundInfo
        ) {
            if (current.expert?.length !== 0 && current.email?.length !== 0) {
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
        setCurrent(defaultState);
    }
    const handleSave = () => {
        if (!isReady) return
        dispatch(
            updateDraftField({
                path: "voiceTrackSettings.scriptAuthorProfSettings.subject",
                value: current.expert,
            }),
        );
        dispatch(
            updateDraftField({
                path: "voiceTrackSettings.scriptAuthorProfSettings.phone",
                value: current.phone,
            })
        )
        dispatch(
            updateDraftField({
                path: "voiceTrackSettings.scriptAuthorProfSettings.email",
                value: current.email,
            })
        )
        dispatch(
            updateDraftField({
                path: "voiceTrackSettings.scriptAuthorProfSettings.backgroundInfo",
                value: current.backgroundInfo,
            })
        )
        setCurrent(defaultState);
        setIsEdit(false);
    }
    useEffect(() => {
        readyToSave();
    }, [current])
    useEffect(() => {
        setCurrent(defaultState);
    }, [selectedRequest])
    // if (selectedRequest?.voiceTrackSettings.trackAuthor !== TRACK_AUTHOR_CLIENT) return null
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
                            onClick={handleDecline}><img src={CloseRed} alt='' />Decline</div>
                        <div
                            className={`
                            ${styles.infoContainer_header_save}
                            ${!isReady ? styles.infoContainer_header_save_notReady : ''}
                            `}
                            onClick={handleSave}
                        ><img src={Success2} alt='' /> Save changes</div>
                    </div>}
            </div>


            <div className={styles.infoContainer_text}><p>Subject matter expert :</p>
                {isEdit ?
                    <input
                        className={styles.infoContainer_input}
                        value={current.expert}
                        onChange={(e) => setCurrent({ ...current, expert: e.target.value })}
                        type="text" /> : voiceTrackSettings?.subject}

            </div>

            <div className={styles.infoContainer_text}><p>Phone:</p>
                {isEdit ?
                    <input
                        className={styles.infoContainer_input}
                        value={current.phone}

                        onChange={(e) => setCurrent({ ...current, phone: Number(e.target.value) })}
                        type="text" /> : voiceTrackSettings?.phone}
            </div>

            <div className={styles.infoContainer_text}><p>Email:</p>
                {isEdit ?
                    <input
                        className={styles.infoContainer_input}
                        value={current.email}
                        onChange={(e) => setCurrent({ ...current, email: e.target.value })}
                        type="text" /> : voiceTrackSettings?.email}
            </div>

            <div className={styles.infoContainer_text}><p>Background information for interview(s):</p>
                {isEdit ?
                    <input
                        className={styles.infoContainer_input}
                        value={current.backgroundInfo}
                        onChange={(e) => setCurrent({ ...current, backgroundInfo: e.target.value })}
                        type="text" /> : voiceTrackSettings?.backgroundInfo}
            </div>
        </div >
    )
}

export default VoiceoverProfScript;