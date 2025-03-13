
import { CloseRed, EditIcon, StatusApproved, StatusApprovedBlack, StatusProgress, StatusProgressBlack, StatusUnavailable, StatusUnavailableBlack, Success2 } from "assets/images";
import { APPROVED_TEXT_STATUS, IN_PROGRESS_TEXT_STATUS, OWN_SCRIPT, PROFESSIONAL_SCRIPT, UNAVAILABLE_TEXT_STATUS } from "consts/consts";
import useWindowWidth from "hooks/useWindowWidth";
import { IScriptSettings } from "interfaces/interfaces";
import DivRowCount from "pages/NewRequest/components/TextArea";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wordsCalculator } from "utils/wordCalculator";

import { selectRequestInfo, updateScriptInfoSettings } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
const ScriptInfo = () => {
    const requestSriptSettings = useSelector(selectRequestInfo)?.script;
    const dispatch = useDispatch();
    const width = useWindowWidth();
    const [isEdit, setIsEdit] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [scriptSettings, setScriptSettings] = useState(requestSriptSettings);

    const readyToSave = () => {
        let ready = true;
        if (
            scriptSettings?.scriptText !== requestSriptSettings?.scriptText
            || scriptSettings?.scriptStatus !== requestSriptSettings?.scriptStatus
            || scriptSettings?.name !== requestSriptSettings?.name
            || scriptSettings?.phone !== requestSriptSettings?.phone
            || scriptSettings?.email !== requestSriptSettings?.email
            || scriptSettings?.backgroundInfo !== requestSriptSettings?.backgroundInfo
        ) {

            if (scriptSettings?.scriptWriter === PROFESSIONAL_SCRIPT) {
                if (scriptSettings?.name?.length !== 0 && scriptSettings?.email?.length && String(scriptSettings?.phone).length !== 0 && scriptSettings?.backgroundInfo?.length !== 0) {
                    ready = true
                } else {
                    ready = false
                }
            }
            if (scriptSettings?.scriptWriter === OWN_SCRIPT) {
                if (scriptSettings?.scriptText?.length !== 0) {
                    ready = true
                } else {
                    ready = false
                }

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
        setScriptSettings(scriptSettings);
    }
    const handleSave = () => {
        if (!isReady) return
        dispatch(
            updateScriptInfoSettings({
                scriptInfoSettings: scriptSettings as IScriptSettings,
                isEdit: false
            }),
        )
        setScriptSettings(scriptSettings);
        setIsEdit(false);
    }
    useEffect(() => {
        readyToSave();
    }, [scriptSettings])
    useEffect(() => {
        setScriptSettings(scriptSettings);
    }, [requestSriptSettings])
    const { minutes, seconds, words } = wordsCalculator(requestSriptSettings?.scriptText || '');
    return (
        <div className={styles.infoContainer}>
            <div className={styles.infoContainer_header}>Scripted Delivery
                {!isEdit ?
                    <div className={styles.infoContainer_header_edit} onClick={handleOnEdit}>
                        <img src={EditIcon} alt='' />
                        Edit</div> : <div className={styles.infoContainer_header_editMode}>edit mode</div>}
            </div>
            {requestSriptSettings?.scriptWriter === OWN_SCRIPT &&
                <>
                    <div className={styles.infoContainer_text}><p>Script Status:</p>
                        {isEdit ?
                            <div className={styles.infoContainer_statuses}>
                                <div
                                    className={`${styles.box_status} ${scriptSettings?.scriptStatus === APPROVED_TEXT_STATUS ? styles.box_status_approved : ""} `}
                                    onClick={() => {
                                        scriptSettings && setScriptSettings({ ...scriptSettings, scriptStatus: APPROVED_TEXT_STATUS })
                                    }}
                                >
                                    <img src={scriptSettings?.scriptStatus === APPROVED_TEXT_STATUS ? StatusApprovedBlack : StatusApproved} alt="status" />
                                    {width > 768 ? 'Approved' : scriptSettings?.scriptStatus === APPROVED_TEXT_STATUS ? 'Approved' : ''}
                                </div>
                                <div
                                    className={`${styles.box_status} ${scriptSettings?.scriptStatus === IN_PROGRESS_TEXT_STATUS ? styles.box_status_approved : ""} `}
                                    onClick={() => {
                                        scriptSettings && setScriptSettings({ ...scriptSettings, scriptStatus: IN_PROGRESS_TEXT_STATUS })
                                    }}
                                >
                                    <img src={scriptSettings?.scriptStatus === IN_PROGRESS_TEXT_STATUS ? StatusProgressBlack : StatusProgress} alt="status" />
                                    {width > 768 ? 'In Progress' : scriptSettings?.scriptStatus === IN_PROGRESS_TEXT_STATUS ? 'In Progress' : ''}
                                </div>
                                <div
                                    className={`${styles.box_status} ${scriptSettings?.scriptStatus === UNAVAILABLE_TEXT_STATUS ? styles.box_status_approved : ""} `}
                                    onClick={() => {
                                        scriptSettings && setScriptSettings({ ...scriptSettings, scriptStatus: UNAVAILABLE_TEXT_STATUS })
                                    }}
                                >
                                    <img src={scriptSettings?.scriptStatus === UNAVAILABLE_TEXT_STATUS ? StatusUnavailableBlack : StatusUnavailable} alt="status" />
                                    {width > 768 ? 'Unavailable' : scriptSettings?.scriptStatus === UNAVAILABLE_TEXT_STATUS ? 'Unavailable' : ''}
                                </div>
                            </div> : requestSriptSettings?.scriptStatus}
                    </div>
                    <div className={styles.infoContainer_text}><p className={`
                ${styles.infoContainer_detailsHeader}
                `}
                    >Script:</p>
                        {isEdit ?
                            <textarea className={styles.infoContainer_textarea}
                                onChange={(e) => scriptSettings && setScriptSettings({ ...scriptSettings, scriptText: e.target.value })}
                                value={scriptSettings?.scriptText} /> :
                            <DivRowCount text={requestSriptSettings?.scriptText} />
                        }
                    </div>
                    {scriptSettings?.scriptStatus === APPROVED_TEXT_STATUS && isEdit &&
                        <div className={styles.textareaContainer}>
                            <div className={styles.textarea_estimate}>
                                <div>
                                    Estimated narration time:
                                    <span style={{ color: minutes > 2 ? "var(--red-dark)" : "" }}>
                                        <span className={styles.textarea_estimate_number}>
                                            {" "}
                                            {minutes}{" "}
                                        </span>{" "}
                                        Min and
                                        <span className={styles.textarea_estimate_number}>
                                            {" "}
                                            {seconds}{" "}
                                        </span>{" "}
                                        Sec
                                    </span>
                                </div>
                                <div className={styles.textarea_estimate_words}>
                                    <span style={{ color: minutes > 2 ? "var(--red-dark)" : "" }}>
                                        {words}
                                    </span>
                                    /450 words
                                </div>
                            </div>
                            {minutes > 2 && (
                                <div className={styles.box_addressContainer_input_errorText}>
                                    Your text is over the suggested word limit.
                                </div>
                            )}
                        </div>}
                </>
            }


            {requestSriptSettings?.scriptWriter === PROFESSIONAL_SCRIPT &&
                <>
                    <div className={styles.infoContainer_text}><p>Subject matter expert :</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={scriptSettings?.name}
                                onChange={(e) => scriptSettings && setScriptSettings({ ...scriptSettings, name: e.target.value })}
                                type="text" /> : scriptSettings?.name}

                    </div>

                    <div className={styles.infoContainer_text}><p>Phone:</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={scriptSettings?.phone}

                                onChange={(e) => scriptSettings && setScriptSettings({ ...scriptSettings, phone: Number(e.target.value) })}
                                type="text" /> : scriptSettings?.phone}
                    </div>

                    <div className={styles.infoContainer_text}><p>Email:</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={scriptSettings?.email}
                                onChange={(e) => scriptSettings && setScriptSettings({ ...scriptSettings, email: e.target.value })}
                                type="text" /> : scriptSettings?.email}
                    </div>
                    <div className={styles.infoContainer_text}><p>Background information for interview(s):</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={scriptSettings?.backgroundInfo}
                                onChange={(e) => scriptSettings && setScriptSettings({ ...scriptSettings, backgroundInfo: e.target.value })}
                                type="text" /> : <DivRowCount text={scriptSettings?.backgroundInfo ? scriptSettings?.backgroundInfo : ''} />}
                    </div>
                </>
            }
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


        </div >
    )
}

export default ScriptInfo;