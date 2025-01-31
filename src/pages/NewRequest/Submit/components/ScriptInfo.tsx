
import { ArrowBlue3, CloseRed, EditIcon, StatusApproved, StatusProgress, StatusUnavailable, Success2 } from "assets/images";
import { APPROVED_TEXT_STATUS, IN_PROGRESS_TEXT_STATUS, UNAVAILABLE_TEXT_STATUS } from "consts/consts";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TTextStatus } from "types/types";
import { selectRequestInfo, updateDraftField } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
const ScriptInfo = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const dispatch = useDispatch();
    const defaultState = {
        status: selectedRequest?.scriptSettings.scriptStatus,
        text: selectedRequest?.scriptSettings.ownText,
    }
    const [isEdit, setIsEdit] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [current, setCurrent] = useState(defaultState);
    const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
    const isDetailTextBig = selectedRequest?.scriptSettings.ownText
        && selectedRequest?.scriptSettings.ownText.length > 200;

    const readyToSave = () => {
        let ready = true;
        if (current.text !== selectedRequest?.scriptSettings.ownText
            || current.status !== selectedRequest?.scriptSettings.scriptStatus
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
                path: "scriptSettings.ownText",
                value: current.text,
            }),
        );

        setCurrent(defaultState);
        setIsEdit(false);
    }
    const handleUpdateField = (
        path: string,
        value: TTextStatus,
    ) => {
        dispatch(
            updateDraftField({
                path,
                value,
            }),
        );
    };
    useEffect(() => {
        readyToSave();
    }, [current])

    return (
        <div className={styles.nR_submitContainer_infoContainer}>
            <div className={styles.nR_submitContainer_infoContainer_header}>Scripted Delivery
                {!isEdit &&
                    <div className={styles.nR_submitContainer_infoContainer_header_edit} onClick={handleOnEdit}>
                        <img src={EditIcon} alt='' />
                        Edit</div>}
                {isEdit &&
                    <div className={styles.nR_submitContainer_infoContainer_header_buttons}>
                        <div
                            className={styles.nR_submitContainer_infoContainer_header_decline}
                            onClick={handleDecline}><img src={CloseRed} alt='' />Decline</div>
                        <div
                            className={`
                            ${styles.nR_submitContainer_infoContainer_header_save}
                            ${!isReady ? styles.nR_submitContainer_infoContainer_header_save_notReady : ''}
                            `}
                            onClick={handleSave}
                        ><img src={Success2} alt='' /> Save changes</div>
                    </div>}
            </div>

            <div className={styles.nR_submitContainer_infoContainer_text}><p>Script Status:</p>
                {isEdit ?
                    <div className={styles.nR_submitContainer_infoContainer_statuses}>
                        <div
                            className={`${styles.box_status} ${selectedRequest?.scriptSettings.scriptStatus === APPROVED_TEXT_STATUS ? styles.box_status_approved : ""} `}
                            onClick={() => {
                                handleUpdateField("scriptSettings.scriptStatus", APPROVED_TEXT_STATUS)
                            }}
                        >
                            <img src={StatusApproved} alt="status" />
                            {APPROVED_TEXT_STATUS}
                        </div>
                        <div
                            className={`${styles.box_status} ${selectedRequest?.scriptSettings.scriptStatus === IN_PROGRESS_TEXT_STATUS ? styles.box_status_approved : ""} `}
                            onClick={() => {
                                handleUpdateField("scriptSettings.scriptStatus", IN_PROGRESS_TEXT_STATUS)
                            }}
                        >
                            <img src={StatusProgress} alt="status" />
                            {IN_PROGRESS_TEXT_STATUS}
                        </div>
                        <div
                            className={`${styles.box_status} ${selectedRequest?.scriptSettings.scriptStatus === UNAVAILABLE_TEXT_STATUS ? styles.box_status_approved : ""} `}
                            onClick={() => {
                                handleUpdateField("scriptSettings.scriptStatus", UNAVAILABLE_TEXT_STATUS)
                            }}
                        >
                            <img src={StatusUnavailable} alt="status" />
                            {UNAVAILABLE_TEXT_STATUS}
                        </div>
                    </div> : selectedRequest?.scriptSettings.scriptStatus}
            </div>
            <div className={styles.nR_submitContainer_infoContainer_text}><p className={`
                ${styles.nR_submitContainer_infoContainer_detailsHeader}
                ${isDetailTextBig ? styles.nR_submitContainer_infoContainer_detailsHeader_big : ''}
                ${isDetailsExpanded ? styles.nR_submitContainer_infoContainer_detailsHeader_expanded : ''}
                `}
            >Script:</p>
                {isEdit ?
                    <textarea className={styles.nR_submitContainer_infoContainer_textarea}
                        onChange={(e) => setCurrent({ ...current, text: e.target.value })}
                        value={current.text} /> :
                    <div>
                        <div className={`
                   ${styles.nR_submitContainer_infoContainer_details} 
                   ${isDetailsExpanded ? styles.nR_submitContainer_infoContainer_details_expanded : ''}`}
                        >
                            {selectedRequest?.scriptSettings.ownText}
                        </div>
                        {isDetailTextBig &&
                            <>
                                <div className={`
                        ${styles.nR_submitContainer_infoContainer_details_shadow}
                        ${isDetailsExpanded ? styles.nR_submitContainer_infoContainer_details_shadow_expanded : ''}
                        `}></div>
                                <div
                                    className={`
                           ${styles.nR_submitContainer_infoContainer_details_showAll}
                           ${isDetailsExpanded ? styles.nR_submitContainer_infoContainer_details_showAll_expanded : ''}
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

export default ScriptInfo;