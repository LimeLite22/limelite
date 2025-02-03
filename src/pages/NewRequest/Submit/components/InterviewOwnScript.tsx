
import { ArrowBlue3, CloseRed, EditIcon, StatusApproved, StatusProgress, StatusUnavailable, Success2 } from "assets/images";
import { APPROVED_TEXT_STATUS, IN_PROGRESS_TEXT_STATUS, QUESTIONS_ON_LOCATION, UNAVAILABLE_TEXT_STATUS, VIRTUAL_INTERVIEW } from "consts/consts";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ScriptPersons from "./ScriptPersons";
import { selectRequestInfo, updateDraftField } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
const InterviewOwnScript = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const dispatch = useDispatch();
    const text = selectedRequest?.interviewSettings.questionsAuthorOwnSettings.text;
    const location = selectedRequest?.interviewSettings.questionSettings.locationSettings;
    const virtual = selectedRequest?.interviewSettings.questionSettings.virtualSettings;
    const type = selectedRequest?.interviewSettings.questionSettings.type;
    const defaultState = {
        status: selectedRequest?.interviewSettings.questionsAuthorOwnSettings.scriptStatus,
        text: text,
        persons: selectedRequest?.interviewSettings.persons,
        locationName: location?.name,
        locationPhone: location?.phone,
        locationEmail: location?.email,
        virtualName: virtual?.name,
        virtualPhone: virtual?.phone,
        virtualEmail: virtual?.email
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
            || current.status !== selectedRequest?.interviewSettings.questionsAuthorOwnSettings.scriptStatus
            || current.persons !== selectedRequest?.interviewSettings.persons
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
                path: "interviewSettings.questionsAuthorOwnSettings.text",
                value: current.text,
            }),
        );
        dispatch(
            updateDraftField({
                path: "interviewSettings.questionsAuthorOwnSettings.scriptStatus",
                value: current.status,
            })
        )
        dispatch(
            updateDraftField({
                path: "interviewSettings.persons",
                value: current.persons,
            })
        )
        type === QUESTIONS_ON_LOCATION && dispatch(
            updateDraftField({
                path: "interviewSettings.questionSettings.locationSettings.name",
                value: current.locationName,
            })
        )
        type === QUESTIONS_ON_LOCATION && dispatch(
            updateDraftField({
                path: "interviewSettings.questionSettings.locationSettings.phone",
                value: current.locationPhone,
            })
        )
        type === QUESTIONS_ON_LOCATION && dispatch(
            updateDraftField({
                path: "interviewSettings.questionSettings.locationSettings.email",
                value: current.locationEmail,
            })
        )

        type === VIRTUAL_INTERVIEW && dispatch(
            updateDraftField({
                path: "interviewSettings.questionSettings.virtualSettings.name",
                value: current.virtualName,
            })
        );
        type === VIRTUAL_INTERVIEW && dispatch(
            updateDraftField({
                path: "interviewSettings.questionSettings.virtualSettings.phone",
                value: current.virtualPhone,
            })
        )
        type === VIRTUAL_INTERVIEW && dispatch(
            updateDraftField({
                path: "interviewSettings.questionSettings.virtualSettings.email",
                value: current.virtualEmail,
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
            <div className={styles.infoContainer_header}>About Your Interview(s) -----
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
            <div className={styles.infoContainer_text}><p>Persons:</p>

                {isEdit ? <ScriptPersons persons={current.persons} setPersons={(persons) => setCurrent({ ...current, persons: persons })} /> : <div>{selectedRequest?.interviewSettings.persons.map((person) => `${person.name}( ${person.title})`).join(", ")}</div>}
            </div>
            {type === VIRTUAL_INTERVIEW &&
                <>
                    <div className={styles.infoContainer_text}><p>Name(Location):</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={current.locationName}
                                onChange={(e) => setCurrent({ ...current, locationName: e.target.value })}
                                type="text" /> : location?.name}

                    </div>

                    <div className={styles.infoContainer_text}><p>Phone(Location):</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={current.locationPhone}

                                onChange={(e) => setCurrent({ ...current, locationPhone: Number(e.target.value) })}
                                type="text" /> : location?.phone}
                    </div>

                    <div className={styles.infoContainer_text}><p>Email(Location):</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={current.locationEmail}
                                onChange={(e) => setCurrent({ ...current, locationEmail: e.target.value })}
                                type="text" /> : location?.email}
                    </div>
                </>
            }
            {type === QUESTIONS_ON_LOCATION &&
                <>
                    <div className={styles.infoContainer_text}><p>Name(Virtual):</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={current.virtualName}
                                onChange={(e) => setCurrent({ ...current, virtualName: e.target.value })}
                                type="text" /> : virtual?.name}

                    </div>

                    <div className={styles.infoContainer_text}><p>Phone(Virtual):</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={current.virtualPhone}
                                onChange={(e) => setCurrent({ ...current, virtualPhone: Number(e.target.value) })}
                                type="text" /> : virtual?.phone}
                    </div>

                    <div className={styles.infoContainer_text}><p>Email(Virtual):</p>
                        {isEdit ?
                            <input
                                className={styles.infoContainer_input}
                                value={current.virtualEmail}
                                onChange={(e) => setCurrent({ ...current, virtualEmail: e.target.value })}
                                type="text" /> : virtual?.email}
                    </div>
                </>
            }

        </div >
    )
}

export default InterviewOwnScript;