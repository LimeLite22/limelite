
import { ArrowBlue3, CheckBox, CheckBoxSelected, CloseRed, EditIcon, StatusApproved, StatusProgress, StatusUnavailable, Success2 } from "assets/images";
import { APPROVED_TEXT_STATUS, IN_PROGRESS_TEXT_STATUS, OWN_SCRIPT, UNAVAILABLE_TEXT_STATUS } from "consts/consts";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ScriptPersons from "./ScriptPersons";
import { selectRequestInfo, updateDraftField } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
const ScriptInfoOwnScript = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const dispatch = useDispatch();
    const defaultState = {
        status: selectedRequest?.scriptSettings.scriptStatus,
        text: selectedRequest?.scriptSettings.ownText,
        teleprompter: selectedRequest?.scriptSettings.teleprompter,
        persons: selectedRequest?.scriptSettings.persons,
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
            || current.teleprompter !== selectedRequest?.scriptSettings.teleprompter
            || current.persons !== selectedRequest?.scriptSettings.persons
        ) {
            if (current.text?.length !== 0) {
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
        dispatch(
            updateDraftField({
                path: "scriptSettings.scriptStatus",
                value: current.status,
            })
        )
        dispatch(
            updateDraftField({
                path: "scriptSettings.teleprompter",
                value: current.teleprompter,
            })
        )
        dispatch(
            updateDraftField({
                path: "scriptSettings.persons",
                value: current.persons,
            })
        )
        dispatch(
            updateDraftField({
                path: "scriptSettings.scriptStatus",
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
    // if (selectedRequest?.scriptSettings.scriptWriter !== OWN_SCRIPT) return null
    return (
        <div className={styles.infoContainer}>
            <div className={styles.infoContainer_header}>Scripted Delivery
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
                    </div> : selectedRequest?.scriptSettings.scriptStatus}
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
                            {selectedRequest?.scriptSettings.ownText}
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
                </div> : selectedRequest?.scriptSettings.teleprompter ? "Yes" : "No"}
            </div>
            <div className={styles.infoContainer_text}><p>Persons:</p>

                {isEdit ? <ScriptPersons persons={current.persons} setPersons={(persons) => setCurrent({ ...current, persons: persons })} /> : <div>{selectedRequest?.scriptSettings.persons.map((person) => `${person.name}( ${person.title})`).join(", ")}</div>}
            </div>

        </div >
    )
}

export default ScriptInfoOwnScript;