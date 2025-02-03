
import { ArrowBlue3, CloseRed, EditIcon, StatusApproved, StatusProgress, StatusUnavailable, Success2 } from "assets/images";
import { APPROVED_TEXT_STATUS, IN_PROGRESS_TEXT_STATUS, QUESTIONS_ON_LOCATION, UNAVAILABLE_TEXT_STATUS, VIRTUAL_INTERVIEW } from "consts/consts";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectRequestInfo, updateDraftField } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
const VoiceoverOwnScript = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const dispatch = useDispatch();
    const text = selectedRequest?.voiceTrackSettings.scriptAuthorOwnSettings.text;
    const status = selectedRequest?.voiceTrackSettings.scriptAuthorOwnSettings.scriptStatus;
    const defaultState = {
        status,
        text,
    }
    const [isEdit, setIsEdit] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [current, setCurrent] = useState(defaultState);
    const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
    const isDetailTextBig = text
        && text.length > 200;

    const readyToSave = () => {
        let ready = true;
        if (current.text !== text
            || current.status !== status
        ) {
            if (current.text?.length !== 0) {
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
                path: "interviewSettings.questionsAuthorOwnSettings.scriptAuthorOwnSettings.text",
                value: current.text,
            }),
        );
        dispatch(
            updateDraftField({
                path: "interviewSettings.questionsAuthorOwnSettings.scriptAuthorOwnSettings.scriptStatus",
                value: current.status,
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
    // if (selectedRequest?.interviewSettings.scriptWriter !== OWN_SCRIPT) return null
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

            <div className={styles.infoContainer_text}><p>Script Status:</p>
                {isEdit ?
                    <div className={styles.infoContainer_statuses}>
                        <div
                            className={`${styles.box_status} ${current.status === APPROVED_TEXT_STATUS ? styles.box_status_approved : ""} `}
                            onClick={() => {
                                setCurrent((prev) => ({ ...prev, status: APPROVED_TEXT_STATUS }))
                            }}
                        >
                            <img src={StatusApproved} alt="status" />
                            {APPROVED_TEXT_STATUS}
                        </div>
                        <div
                            className={`${styles.box_status} ${current.status === IN_PROGRESS_TEXT_STATUS ? styles.box_status_approved : ""} `}
                            onClick={() => {
                                setCurrent((prev) => ({ ...prev, status: IN_PROGRESS_TEXT_STATUS }))
                            }}
                        >
                            <img src={StatusProgress} alt="status" />
                            {IN_PROGRESS_TEXT_STATUS}
                        </div>
                        <div
                            className={`${styles.box_status} ${current.status === UNAVAILABLE_TEXT_STATUS ? styles.box_status_approved : ""} `}
                            onClick={() => {
                                setCurrent((prev) => ({ ...prev, status: UNAVAILABLE_TEXT_STATUS }))
                            }}
                        >
                            <img src={StatusUnavailable} alt="status" />
                            {UNAVAILABLE_TEXT_STATUS}
                        </div>
                    </div> : selectedRequest?.interviewSettings.questionsAuthorOwnSettings.scriptStatus}
            </div>
            <div className={styles.infoContainer_text}><p className={`
                ${styles.infoContainer_detailsHeader}
                ${isDetailTextBig ? styles.infoContainer_detailsHeader_big : ''}
                ${isDetailsExpanded ? styles.infoContainer_detailsHeader_expanded : ''}
                `}
            >Script:</p>
                {isEdit ?
                    <textarea className={styles.infoContainer_textarea}
                        onChange={(e) => setCurrent({ ...current, text: e.target.value })}
                        value={current.text} /> :
                    <div>
                        <div className={`
                   ${styles.infoContainer_details} 
                   ${isDetailsExpanded ? styles.infoContainer_details_expanded : ''}`}
                        >
                            {text}
                        </div>
                        {isDetailTextBig &&
                            <>
                                <div className={`
                        ${styles.infoContainer_details_shadow}
                        ${isDetailsExpanded ? styles.infoContainer_details_shadow_expanded : ''}
                        `}></div>
                                <div
                                    className={`
                           ${styles.infoContainer_details_showAll}
                           ${isDetailsExpanded ? styles.infoContainer_details_showAll_expanded : ''}
                               `
                                    }
                                    onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
                                >
                                    <>{isDetailsExpanded ? "Show less" : "Show all text"}<img src={ArrowBlue3} alt='' /></>

                                </div>
                            </>
                        }
                    </div>}
            </div>

        </div >
    )
}

export default VoiceoverOwnScript;