
import { CloseRed, EditIcon, StatusApproved, StatusApprovedBlack, StatusProgress, StatusProgressBlack, StatusUnavailable, StatusUnavailableBlack, Success2 } from "assets/images";
import { APPROVED_TEXT_STATUS, IN_PROGRESS_TEXT_STATUS, QUESTIONS_AUTHOR_CLIENT, QUESTIONS_AUTHOR_PROFESSIONAL, QUESTIONS_ON_LOCATION, QUESTIONS_VIRTUALLY, UNAVAILABLE_TEXT_STATUS, } from "consts/consts";
import useWindowWidth from "hooks/useWindowWidth";
import { IInterviewSettings } from "interfaces/interfaces";
import DivRowCount from "pages/NewRequest/components/TextArea";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wordsCalculator } from "utils/wordCalculator";

import ScriptPersons from "./ScriptPersons";
import { selectRequestInfo, updateInterviewInfoSettings } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
const Interview = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const interviewSettings = { ...selectedRequest!.interviewSettings };
    const proffSettings = { ...interviewSettings?.questionsAuthorProfSettings };
    const ownSettings = { ...interviewSettings?.questionsAuthorOwnSettings };
    const width = useWindowWidth();

    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [isReady, setIsReady] = useState(false);

    const [current, setCurrent] = useState(interviewSettings);
    const curProffSettings = current?.questionsAuthorProfSettings;
    const curOwnSettings = current?.questionsAuthorOwnSettings;
    const { minutes, seconds, words } = wordsCalculator(current?.questionsAuthorOwnSettings.text || '');


    const readyToSave = () => {
        let ready = true;
        if (
            curOwnSettings.text !== ownSettings?.text
            || curOwnSettings.scriptStatus !== ownSettings?.scriptStatus
            || current.persons !== interviewSettings?.persons ||
            curProffSettings.subject !== proffSettings.subject ||
            curProffSettings.phone !== proffSettings.phone ||
            curProffSettings.email !== proffSettings.email ||
            curProffSettings.backgroundInfo !== proffSettings.backgroundInfo
        ) {

            if (interviewSettings.questionsAuthor === QUESTIONS_AUTHOR_CLIENT) {
                if (curOwnSettings.text.length !== 0) {
                    ready = true
                } else {
                    ready = false
                }
            }
            if (interviewSettings.questionsAuthor === QUESTIONS_AUTHOR_PROFESSIONAL) {
                if (curProffSettings?.subject.length !== 0
                    && curProffSettings?.email.length !== 0
                    && String(curProffSettings?.phone).length !== 0
                    && curProffSettings?.backgroundInfo.length !== 0
                ) {
                    ready = true
                } else {
                    ready = false
                }
            }





            current.persons?.forEach((item) => {
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
        setCurrent(interviewSettings);
    }
    const handleSave = () => {
        if (!isReady) return
        dispatch(updateInterviewInfoSettings({
            interviewInfoSettings: current as IInterviewSettings,
            isEdit: false
        }))
        setCurrent(interviewSettings);
        setIsEdit(false);
    }
    useEffect(() => {
        readyToSave();
    }, [current])
    useEffect(() => {
        setCurrent(interviewSettings);
    }, [selectedRequest])
    return (
        <div className={styles.infoContainer}>
            <div className={styles.infoContainer_header}>About Your Interview(s)
                {!isEdit ?
                    <div className={styles.infoContainer_header_edit} onClick={handleOnEdit}>
                        <img src={EditIcon} alt='' />
                        Edit</div> : <div className={styles.infoContainer_header_editMode}>edit mode</div>}
            </div>
            {interviewSettings?.questionsAuthor === QUESTIONS_AUTHOR_CLIENT &&
                <>
                    <div className={styles.infoContainer_text}><p>Script Status:</p>
                        {isEdit ?
                            <div className={styles.infoContainer_statuses}>
                                <div
                                    className={`
                                    ${styles.box_status} 
                                    ${curOwnSettings.scriptStatus === APPROVED_TEXT_STATUS ? styles.box_status_approved : ""} `}
                                    onClick={() => {
                                        setCurrent({ ...current, questionsAuthorOwnSettings: { ...curOwnSettings, scriptStatus: APPROVED_TEXT_STATUS } })
                                    }}
                                >
                                    <img
                                        src={curOwnSettings.scriptStatus === APPROVED_TEXT_STATUS ? StatusApprovedBlack : StatusApproved}
                                        alt="status"
                                    />
                                    {width > 768 ? 'Approved' : curOwnSettings.scriptStatus === APPROVED_TEXT_STATUS ? 'Approved' : ''}
                                </div>
                                <div
                                    className={`
                                    ${styles.box_status} 
                                    ${curOwnSettings.scriptStatus === IN_PROGRESS_TEXT_STATUS ? styles.box_status_approved : ""} `}
                                    onClick={() => {
                                        setCurrent({ ...current, questionsAuthorOwnSettings: { ...curOwnSettings, scriptStatus: IN_PROGRESS_TEXT_STATUS } })
                                    }}
                                >
                                    <img
                                        src={curOwnSettings.scriptStatus === IN_PROGRESS_TEXT_STATUS ? StatusProgressBlack : StatusProgress}
                                        alt="status"
                                    />
                                    {width > 768 ? 'In Progress' : curOwnSettings.scriptStatus === IN_PROGRESS_TEXT_STATUS ? 'In Progress' : ''}
                                </div>
                                <div
                                    className={`
                                    ${styles.box_status} 
                                    ${curOwnSettings.scriptStatus === UNAVAILABLE_TEXT_STATUS ? styles.box_status_approved : ""} `}
                                    onClick={() => {
                                        setCurrent({ ...current, questionsAuthorOwnSettings: { ...curOwnSettings, scriptStatus: UNAVAILABLE_TEXT_STATUS } })
                                    }}
                                >
                                    <img src={curOwnSettings.scriptStatus === UNAVAILABLE_TEXT_STATUS ? StatusUnavailableBlack : StatusUnavailable} alt="status" />
                                    {width > 768 ? 'Unavailable' : curOwnSettings.scriptStatus === UNAVAILABLE_TEXT_STATUS ? 'Unavailable' : ''}
                                </div>
                            </div> : ownSettings.scriptStatus}
                    </div>
                    <div className={styles.infoContainer_text}><p className={`
                `}
                    >Script:</p>
                        {isEdit ?
                            <textarea className={styles.infoContainer_textarea}
                                onChange={(e) => {
                                    return curOwnSettings && setCurrent({ ...current || {}, questionsAuthorOwnSettings: { ...current?.questionsAuthorOwnSettings || {}, text: e.target.value } })
                                }
                                }
                                value={curOwnSettings?.text} /> :
                            <DivRowCount text={ownSettings.text} />
                        }
                    </div>
                    {curOwnSettings.scriptStatus === APPROVED_TEXT_STATUS && isEdit &&
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
            {interviewSettings?.questionsAuthor === QUESTIONS_AUTHOR_PROFESSIONAL &&
                <>
                    <div className={styles.infoContainer_text}><p>Subject matter expert:</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={curProffSettings?.subject}
                                onChange={(e) => {
                                    return curProffSettings
                                        && setCurrent({
                                            ...current,
                                            questionsAuthorProfSettings:
                                                { ...current?.questionsAuthorProfSettings || {}, subject: e.target.value }
                                        })
                                }
                                }
                                type="text" /> : proffSettings.subject}

                    </div>

                    <div className={styles.infoContainer_text}><p>Phone:</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={curProffSettings.phone}

                                onChange={(e) => {
                                    return current.questionsAuthorProfSettings
                                        && setCurrent({
                                            ...current,
                                            questionsAuthorProfSettings:
                                                { ...current?.questionsAuthorProfSettings || {}, phone: Number(e.target.value) }
                                        })
                                }}
                                type="text" /> : proffSettings.phone}
                    </div>

                    <div className={styles.infoContainer_text}><p>Email:</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={curProffSettings.email}
                                onChange={(e) => {
                                    return curProffSettings
                                        && setCurrent({
                                            ...current,
                                            questionsAuthorProfSettings:
                                                { ...current?.questionsAuthorProfSettings || {}, email: e.target.value }
                                        })
                                }}
                                type="text" /> : proffSettings.email}
                    </div>

                    <div className={styles.infoContainer_text}><p>Background information for interview(s):</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={curProffSettings.backgroundInfo}
                                onChange={(e) => {
                                    return curProffSettings
                                        && setCurrent({
                                            ...current,
                                            questionsAuthorProfSettings:
                                                { ...current?.questionsAuthorProfSettings || {}, backgroundInfo: e.target.value }
                                        })
                                }}
                                type="text" /> : <DivRowCount text={proffSettings.backgroundInfo} />}
                    </div>
                </>
            }
            <div className={styles.infoContainer_text}><p>Persons:</p>

                {isEdit ? <ScriptPersons persons={current.persons} setPersons={(persons) => setCurrent({ ...current, persons: persons })} /> : <div>{selectedRequest?.interviewSettings.persons.map((person) => `${person.name}( ${person.title})`).join(", ")}</div>}
            </div>
            {interviewSettings?.questionSettings?.type === QUESTIONS_ON_LOCATION &&
                <>
                    <div className={styles.infoContainer_text}><p>Name(Location):</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={current.questionSettings?.locationSettings.name}
                                onChange={(e) => {
                                    return current.questionSettings &&
                                        setCurrent({
                                            ...current,
                                            questionSettings: {
                                                ...current?.questionSettings || {},
                                                locationSettings: {
                                                    ...current?.questionSettings?.locationSettings || {},
                                                    name: e.target.value
                                                }
                                            }
                                        })
                                }}
                                type="text" /> : interviewSettings?.questionSettings?.locationSettings?.name}

                    </div>

                    <div className={styles.infoContainer_text}><p>Phone(Location):</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={current.questionSettings?.locationSettings.phone}

                                onChange={(e) => {
                                    return current.questionSettings &&
                                        setCurrent({
                                            ...current,
                                            questionSettings: {
                                                ...current?.questionSettings || {},
                                                locationSettings: {
                                                    ...current?.questionSettings?.locationSettings || {},
                                                    phone: Number(e.target.value)
                                                }
                                            }
                                        })
                                }}
                                type="text" /> : interviewSettings?.questionSettings?.locationSettings?.phone}
                    </div>

                    <div className={styles.infoContainer_text}><p>Email(Location):</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={current.questionSettings?.locationSettings.email}
                                onChange={(e) => {
                                    return current.questionSettings &&
                                        setCurrent({
                                            ...current,
                                            questionSettings: {
                                                ...current?.questionSettings || {},
                                                locationSettings: {
                                                    ...current?.questionSettings?.locationSettings || {},
                                                    email: e.target.value
                                                }
                                            }
                                        })
                                }}
                                type="text" /> : interviewSettings?.questionSettings?.locationSettings?.email}
                    </div>
                </>
            }
            {interviewSettings?.questionSettings?.type === QUESTIONS_VIRTUALLY &&
                <>
                    <div className={styles.infoContainer_text}><p>Name(Virtual):</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={current.questionSettings?.virtualSettings.name}
                                onChange={(e) => {
                                    return current.questionSettings &&
                                        setCurrent({
                                            ...current,
                                            questionSettings: {
                                                ...current?.questionSettings || {},
                                                virtualSettings: {
                                                    ...current?.questionSettings?.virtualSettings || {},
                                                    name: e.target.value
                                                }
                                            }
                                        })
                                }
                                }
                                type="text" /> : interviewSettings?.questionSettings?.virtualSettings?.name}

                    </div>

                    <div className={styles.infoContainer_text}><p>Phone(Virtual):</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={current.questionSettings?.virtualSettings.phone}
                                onChange={(e) => {
                                    return current.questionSettings &&
                                        setCurrent({
                                            ...current,
                                            questionSettings: {
                                                ...current?.questionSettings || {},
                                                virtualSettings: {
                                                    ...current?.questionSettings?.virtualSettings || {},
                                                    phone: Number(e.target.value)
                                                }
                                            }
                                        })
                                }}
                                type="text" /> : interviewSettings?.questionSettings?.virtualSettings?.phone}
                    </div>

                    <div className={styles.infoContainer_text}><p>Email(Virtual):</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={current.questionSettings?.virtualSettings.email}
                                onChange={(e) => {
                                    return current.questionSettings &&
                                        setCurrent({
                                            ...current,
                                            questionSettings: {
                                                ...current?.questionSettings || {},
                                                virtualSettings: {
                                                    ...current?.questionSettings?.virtualSettings || {},
                                                    email: e.target.value
                                                }
                                            }
                                        })
                                }
                                }
                                type="text" /> : interviewSettings?.questionSettings?.virtualSettings?.email}
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

export default Interview;