
import { CheckBox, CheckBoxSelected, CloseRed, EditIcon, StatusApproved, StatusApprovedBlack, StatusProgress, StatusProgressBlack, StatusUnavailable, StatusUnavailableBlack, Success2 } from "assets/images";
import { APPROVED_TEXT_STATUS, IN_PROGRESS_TEXT_STATUS, OWN_SCRIPT, PROFESSIONAL_SCRIPT, UNAVAILABLE_TEXT_STATUS } from "consts/consts";
import useWindowWidth from "hooks/useWindowWidth";
import { IScriptSettings } from "interfaces/interfaces";
import DivRowCount from "pages/NewRequest/components/TextArea";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wordsCalculator } from "utils/wordCalculator";

import ScriptPersons from "./ScriptPersons";
import { selectRequestInfo, updateScriptInfoSettings } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
const ScriptInfo = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const dispatch = useDispatch();
    const scriptSettings = { ...selectedRequest?.scriptSettings }
    const width = useWindowWidth();
    const [isEdit, setIsEdit] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [current, setCurrent] = useState(scriptSettings);

    const readyToSave = () => {
        let ready = true;
        if (
            current?.ownText !== selectedRequest?.scriptSettings.ownText
            || current?.scriptStatus !== selectedRequest?.scriptSettings.scriptStatus
            || current?.name !== scriptSettings?.name
            || current?.phone !== scriptSettings?.phone
            || current?.email !== scriptSettings?.email
            || current?.teleprompter !== scriptSettings?.teleprompter
            || current?.backgroundInfo !== scriptSettings?.backgroundInfo
            || current?.persons !== scriptSettings?.persons
        ) {

            if (scriptSettings.scriptWriter === PROFESSIONAL_SCRIPT) {
                if (current?.name?.length !== 0 && current?.email?.length && String(current?.phone).length !== 0 && current?.backgroundInfo?.length !== 0) {
                    ready = true
                } else {
                    ready = false
                }
            }
            if (scriptSettings.scriptWriter === OWN_SCRIPT) {
                if (current?.ownText?.length !== 0) {
                    ready = true
                } else {
                    ready = false
                }

            }
            current?.persons?.forEach((item) => {
                if (item.name.length === 0 || item.title.length === 0) {
                    ready = false
                }
            })

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
        setCurrent(scriptSettings);
    }
    const handleSave = () => {
        if (!isReady) return
        dispatch(
            updateScriptInfoSettings({
                scriptInfoSettings: current as IScriptSettings,
                isEdit: false
            }),
        )
        setCurrent(scriptSettings);
        setIsEdit(false);
    }
    useEffect(() => {
        readyToSave();
    }, [current])
    useEffect(() => {
        setCurrent(scriptSettings);
    }, [selectedRequest])
    const { minutes, seconds, words } = wordsCalculator(selectedRequest?.scriptSettings.ownText || '');
    return (
        <div className={styles.infoContainer}>
            <div className={styles.infoContainer_header}>Scripted Delivery
                {!isEdit ?
                    <div className={styles.infoContainer_header_edit} onClick={handleOnEdit}>
                        <img src={EditIcon} alt='' />
                        Edit</div> : <div className={styles.infoContainer_header_editMode}>edit mode</div>}
            </div>
            {selectedRequest?.scriptSettings.scriptWriter === OWN_SCRIPT &&
                <>
                    <div className={styles.infoContainer_text}><p>Script Status:</p>
                        {isEdit ?
                            <div className={styles.infoContainer_statuses}>
                                <div
                                    className={`${styles.box_status} ${current?.scriptStatus === APPROVED_TEXT_STATUS ? styles.box_status_approved : ""} `}
                                    onClick={() => {
                                        setCurrent((prev) => ({ ...prev, scriptStatus: APPROVED_TEXT_STATUS }))
                                    }}
                                >
                                    <img src={current?.scriptStatus === APPROVED_TEXT_STATUS ? StatusApprovedBlack : StatusApproved} alt="status" />
                                    {width > 768 ? 'Approved' : current?.scriptStatus === APPROVED_TEXT_STATUS ? 'Approved' : ''}
                                </div>
                                <div
                                    className={`${styles.box_status} ${current?.scriptStatus === IN_PROGRESS_TEXT_STATUS ? styles.box_status_approved : ""} `}
                                    onClick={() => {
                                        setCurrent((prev) => ({ ...prev, scriptStatus: IN_PROGRESS_TEXT_STATUS }))
                                    }}
                                >
                                    <img src={current?.scriptStatus === IN_PROGRESS_TEXT_STATUS ? StatusProgressBlack : StatusProgress} alt="status" />
                                    {width > 768 ? 'In Progress' : current?.scriptStatus === IN_PROGRESS_TEXT_STATUS ? 'In Progress' : ''}
                                </div>
                                <div
                                    className={`${styles.box_status} ${current?.scriptStatus === UNAVAILABLE_TEXT_STATUS ? styles.box_status_approved : ""} `}
                                    onClick={() => {
                                        setCurrent((prev) => ({ ...prev, scriptStatus: UNAVAILABLE_TEXT_STATUS }))
                                    }}
                                >
                                    <img src={current?.scriptStatus === UNAVAILABLE_TEXT_STATUS ? StatusUnavailableBlack : StatusUnavailable} alt="status" />
                                    {width > 768 ? 'Unavailable' : current?.scriptStatus === UNAVAILABLE_TEXT_STATUS ? 'Unavailable' : ''}
                                </div>
                            </div> : selectedRequest?.scriptSettings.scriptStatus}
                    </div>
                    <div className={styles.infoContainer_text}><p className={`
                ${styles.infoContainer_detailsHeader}
                `}
                    >Script:</p>
                        {isEdit ?
                            <textarea className={styles.infoContainer_textarea}
                                onChange={(e) => setCurrent({ ...current, ownText: e.target.value })}
                                value={current?.ownText} /> :
                            <DivRowCount text={selectedRequest?.scriptSettings.ownText} />
                        }
                    </div>
                    {selectedRequest?.scriptSettings.scriptStatus === APPROVED_TEXT_STATUS && isEdit &&
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


            {selectedRequest?.scriptSettings.scriptWriter === PROFESSIONAL_SCRIPT &&
                <>
                    <div className={styles.infoContainer_text}><p>Subject matter expert :</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={current.name}
                                onChange={(e) => setCurrent({ ...current, name: e.target.value })}
                                type="text" /> : scriptSettings?.name}

                    </div>

                    <div className={styles.infoContainer_text}><p>Phone:</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={current.phone}

                                onChange={(e) => setCurrent({ ...current, phone: Number(e.target.value) })}
                                type="text" /> : scriptSettings?.phone}
                    </div>

                    <div className={styles.infoContainer_text}><p>Email:</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={current.email}
                                onChange={(e) => setCurrent({ ...current, email: e.target.value })}
                                type="text" /> : scriptSettings?.email}
                    </div>
                    <div className={styles.infoContainer_text}><p>Background information for interview(s):</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={current.backgroundInfo}
                                onChange={(e) => setCurrent({ ...current, backgroundInfo: e.target.value })}
                                type="text" /> : <DivRowCount text={scriptSettings?.backgroundInfo ? scriptSettings?.backgroundInfo : ''} />}
                    </div>
                </>
            }


            <div className={styles.infoContainer_text}><p>Teleprompter:</p>
                {isEdit ? <div className={styles.infoContainer_telepromptOptions}>
                    <div
                        className={styles.teleprompter_option}
                        onClick={() => setCurrent({ ...current, teleprompter: true })}
                    >
                        <img
                            src={current.teleprompter === true ? CheckBoxSelected : CheckBox}
                            alt="locationIcon"
                        />
                        Yes
                    </div>
                    <div
                        className={styles.teleprompter_option}
                        onClick={() =>
                            setCurrent({ ...current, teleprompter: false })
                        }
                    >
                        <img
                            src={current.teleprompter === false ? CheckBoxSelected : CheckBox}
                            alt="locationIcon"
                        />
                        No
                    </div>
                </div> : scriptSettings?.teleprompter ? "Yes" : "No"}
            </div>
            <div className={styles.infoContainer_text}><p>Persons:</p>

                {(isEdit && selectedRequest?.scriptSettings?.persons) ?
                    <ScriptPersons persons={current.persons} setPersons={(persons) => setCurrent({ ...current, persons: persons })} />
                    : <div>
                        {selectedRequest?.scriptSettings?.persons?.map((person, index) => {

                            return <div>
                                {person.name}({person.title})
                                {(selectedRequest?.scriptSettings?.persons?.length - 1 === index &&
                                    selectedRequest?.scriptSettings?.persons.length > 1) ? ',' : ''}</div>
                        })}
                    </div>}

            </div>
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