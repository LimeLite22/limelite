
import { ArrowBlue3, CheckBox, CheckBoxSelected, CloseRed, EditIcon, StatusApproved, StatusProgress, StatusUnavailable, Success2 } from "assets/images";
import { APPROVED_TEXT_STATUS, IN_PROGRESS_TEXT_STATUS, UNAVAILABLE_TEXT_STATUS } from "consts/consts";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TTextStatus } from "types/types";
import { selectRequestInfo, updateDraftField } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import ScriptPersons from "./ScriptPersons";
const ScriptInfoProffScript = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const dispatch = useDispatch();
    const defaultState = {
        name: selectedRequest?.scriptSettings.name,
        phone: selectedRequest?.scriptSettings.phone,
        email: selectedRequest?.scriptSettings.email,
        teleprompter: selectedRequest?.scriptSettings.teleprompter,
        persons: selectedRequest?.scriptSettings.persons,
        backgroundInfo: selectedRequest?.scriptSettings.backgroundInfo

    }
    const [isEdit, setIsEdit] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [current, setCurrent] = useState(defaultState);

    const readyToSave = () => {
        let ready = true;
        if (current.name !== selectedRequest?.scriptSettings.name
            || current.phone !== selectedRequest?.scriptSettings.phone
            || current.email !== selectedRequest?.scriptSettings.email
            || current.teleprompter !== selectedRequest?.scriptSettings.teleprompter
            || current.persons !== selectedRequest?.scriptSettings.persons
        ) {
            if (current.name?.length !== 0  && current.email?.length !== 0) {
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
        setCurrent(defaultState);
        setIsEdit(false);
    }
    useEffect(() => {
        readyToSave();
    }, [current])
    useEffect(() => {
        setCurrent(defaultState);
    }, [selectedRequest])

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

        
            <div className={styles.nR_submitContainer_infoContainer_text}><p>Subject matter expert :</p>
                {isEdit ? <div className={styles.nR_submitContainer_infoContainer_telepromptOptions}>
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
                
            <div className={styles.nR_submitContainer_infoContainer_text}><p>Phone:</p>
                {isEdit ? <div className={styles.nR_submitContainer_infoContainer_telepromptOptions}>
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
                
            <div className={styles.nR_submitContainer_infoContainer_text}><p>Email:</p>
                {isEdit ? <div className={styles.nR_submitContainer_infoContainer_telepromptOptions}>
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
                
            <div className={styles.nR_submitContainer_infoContainer_text}><p>Background information for interview(s):</p>
                {isEdit ? <div className={styles.nR_submitContainer_infoContainer_telepromptOptions}>
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
            <div className={styles.nR_submitContainer_infoContainer_text}><p>Teleprompter:</p>
                {isEdit ? <div className={styles.nR_submitContainer_infoContainer_telepromptOptions}>
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
            <div className={styles.nR_submitContainer_infoContainer_text}><p>Persons:</p>

                {isEdit ? <ScriptPersons persons={current.persons} setPersons={(persons) => setCurrent({ ...current, persons: persons })} /> : <div>{selectedRequest?.scriptSettings.persons.map((person) => `${person.name}( ${person.title})`).join(", ")}</div>}
            </div>


        </div >
    )
}

export default ScriptInfoProffScript;