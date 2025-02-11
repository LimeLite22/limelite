
import { ArrowBlue3, CloseRed, EditIcon, StatusApproved, StatusProgress, StatusUnavailable, Success2 } from "assets/images";
import { APPROVED_TEXT_STATUS, IN_PROGRESS_TEXT_STATUS, QUESTIONS_ON_LOCATION, UNAVAILABLE_TEXT_STATUS, VIRTUAL_INTERVIEW } from "consts/consts";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ScriptPersons from "./ScriptPersons";
import { selectRequestInfo, updateInterviewInfoSettings } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import { IInterviewSettings } from "interfaces/interfaces";
const InterviewProffScript = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const interviewSettings = { ...selectedRequest?.interviewSettings }
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [isReady, setIsReady] = useState(false);

    const [current, setCurrent] = useState(interviewSettings);
    const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
    const isDetailTextBig = interviewSettings?.questionsAuthorOwnSettings?.text
        && interviewSettings?.questionsAuthorOwnSettings?.text.length > 200;

    const readyToSave = () => {
        let ready = true;
        if (
            current?.questionsAuthorOwnSettings?.text !== interviewSettings?.questionsAuthorOwnSettings?.text
            || current?.questionsAuthorOwnSettings?.scriptStatus !== interviewSettings?.questionsAuthorOwnSettings?.scriptStatus
            || current.persons !== selectedRequest?.interviewSettings?.persons ||
            current?.questionsAuthorProfSettings?.subject !== interviewSettings?.questionsAuthorProfSettings?.subject ||
            current?.questionsAuthorProfSettings?.phone !== interviewSettings?.questionsAuthorProfSettings?.phone ||
            current?.questionsAuthorProfSettings?.email !== interviewSettings?.questionsAuthorProfSettings?.email ||
            current?.questionsAuthorProfSettings?.backgroundInfo !== interviewSettings?.questionsAuthorProfSettings?.backgroundInfo
        ) {
            if (current?.questionsAuthorOwnSettings?.text.length !== 0 &&
                current?.questionsAuthorProfSettings?.subject.length !== 0 &&
                current?.questionsAuthorProfSettings?.email.length !== 0
            ) {
                ready = true
            } else {
                ready = false
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
    // if (selectedRequest?.interviewSettings.scriptWriter !== PROFESSIONAL_SCRIPT) return null
    return (
        <div className={styles.infoContainer}>
            <div className={styles.infoContainer_header}>About Your Interview(s)
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

            <div className={styles.infoContainer_text}><p>Script Status:</p>
                {isEdit ?
                    <div className={styles.infoContainer_statuses}>
                        <div
                            className={`${styles.box_status} ${current.questionsAuthorOwnSettings?.scriptStatus === APPROVED_TEXT_STATUS ? styles.box_status_approved : ""} `}
                            onClick={() => {
                                setCurrent((prev) => ({ ...prev, status: APPROVED_TEXT_STATUS }))
                            }}
                        >
                            <img src={StatusApproved} alt="status" />
                            {APPROVED_TEXT_STATUS}
                        </div>
                        <div
                            className={`${styles.box_status} ${current.questionsAuthorOwnSettings?.scriptStatus === IN_PROGRESS_TEXT_STATUS ? styles.box_status_approved : ""} `}
                            onClick={() => {
                                setCurrent((prev) => ({ ...prev, status: IN_PROGRESS_TEXT_STATUS }))
                            }}
                        >
                            <img src={StatusProgress} alt="status" />
                            {IN_PROGRESS_TEXT_STATUS}
                        </div>
                        <div
                            className={`${styles.box_status} ${current.questionsAuthorOwnSettings?.scriptStatus === UNAVAILABLE_TEXT_STATUS ? styles.box_status_approved : ""} `}
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
                        onChange={(e) => {
                            return current.questionsAuthorOwnSettings && setCurrent({ ...current || {}, questionsAuthorOwnSettings: { ...current?.questionsAuthorOwnSettings || {}, text: e.target.value } })
                        }
                        }
                        value={current?.questionsAuthorOwnSettings?.text} /> :
                    <div>
                        <div className={`
                   ${styles.infoContainer_details} 
                   ${isDetailsExpanded ? styles.infoContainer_details_expanded : ''}`}
                        >
                            {interviewSettings?.questionsAuthorOwnSettings?.text}
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
            <div className={styles.infoContainer_text}><p>Subject matter expert :</p>
                {isEdit ?
                    <input
                        className={styles.infoContainer_input}
                        value={current?.questionsAuthorProfSettings?.subject}
                        onChange={(e) => {
                            return current.questionsAuthorProfSettings && setCurrent({ ...current, questionsAuthorProfSettings: { ...current?.questionsAuthorProfSettings || {}, subject: e.target.value } })
                        }
                        }
                        type="text" /> : interviewSettings?.questionsAuthorProfSettings?.subject}

            </div>

            <div className={styles.infoContainer_text}><p>Phone:</p>
                {isEdit ?
                    <input
                        className={styles.infoContainer_input}
                        value={current.questionsAuthorProfSettings?.phone}

                        onChange={(e) => {
                            return current.questionsAuthorProfSettings && setCurrent({ ...current, questionsAuthorProfSettings: { ...current?.questionsAuthorProfSettings || {}, phone: Number(e.target.value) } })
                        }}
                        type="text" /> : interviewSettings?.questionsAuthorProfSettings?.phone}
            </div>

            <div className={styles.infoContainer_text}><p>Email:</p>
                {isEdit ?
                    <input
                        className={styles.infoContainer_input}
                        value={current.questionsAuthorProfSettings?.email}
                        onChange={(e) => {
                            return current.questionsAuthorProfSettings && setCurrent({ ...current, questionsAuthorProfSettings: { ...current?.questionsAuthorProfSettings || {}, email: e.target.value } })
                        }}
                        type="text" /> : interviewSettings?.questionsAuthorProfSettings?.email}
            </div>

            <div className={styles.infoContainer_text}><p>Background information for interview(s):</p>
                {isEdit ?
                    <input
                        className={styles.infoContainer_input}
                        value={current.questionsAuthorProfSettings?.backgroundInfo}
                        onChange={(e) => {
                            return current.questionsAuthorProfSettings && setCurrent({ ...current, questionsAuthorProfSettings: { ...current?.questionsAuthorProfSettings || {}, backgroundInfo: e.target.value } })
                        }}
                        type="text" /> : interviewSettings?.questionsAuthorProfSettings?.backgroundInfo}
            </div>
            <div className={styles.infoContainer_text}><p>Persons:</p>

                {isEdit ? <ScriptPersons persons={current.persons} setPersons={(persons) => setCurrent({ ...current, persons: persons })} /> : <div>{selectedRequest?.interviewSettings.persons.map((person) => `${person.name}( ${person.title})`).join(", ")}</div>}
            </div>
            {interviewSettings?.questionSettings?.type === VIRTUAL_INTERVIEW &&
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
            {interviewSettings?.questionSettings?.type === QUESTIONS_ON_LOCATION &&
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


        </div >
    )
}

export default InterviewProffScript;