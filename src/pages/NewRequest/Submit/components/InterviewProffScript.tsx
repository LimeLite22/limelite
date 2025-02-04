
import { CloseRed, EditIcon, Success2 } from "assets/images";
import { QUESTIONS_ON_LOCATION, VIRTUAL_INTERVIEW } from "consts/consts";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ScriptPersons from "./ScriptPersons";
import { selectRequestInfo, updateDraftField } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
const InterviewProffScript = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const dispatch = useDispatch();
    const inteview = selectedRequest?.interviewSettings.questionsAuthorProfSettings;
    const location = selectedRequest?.interviewSettings.questionSettings.locationSettings;
    const virtual = selectedRequest?.interviewSettings.questionSettings.virtualSettings;
    const type = selectedRequest?.interviewSettings.questionSettings.type;
    const defaultState = {
        expert: inteview?.subject,
        phone: inteview?.phone,
        email: inteview?.email,
        backgroundInfo: inteview?.backgroundInfo,
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

    const readyToSave = () => {
        let ready = true;
        if (current.expert !== inteview?.subject
            || current.phone !== inteview?.phone
            || current.email !== inteview?.email
            || current.backgroundInfo !== inteview?.backgroundInfo
            || current.persons !== selectedRequest?.interviewSettings.persons
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
                path: "interviewSettings.questionsAuthorProfSettings.subject",
                value: current.expert,
            }),
        );
        dispatch(
            updateDraftField({
                path: "interviewSettings.questionsAuthorProfSettings.phone",
                value: current.phone,
            })
        )
        dispatch(
            updateDraftField({
                path: "interviewSettings.questionsAuthorProfSettings.email",
                value: current.email,
            })
        )
        dispatch(
            updateDraftField({
                path: "interviewSettings.questionsAuthorProfSettings.backgroundInfo",
                value: current.backgroundInfo,
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
    // if (selectedRequest?.interviewSettings.scriptWriter !== PROFESSIONAL_SCRIPT) return null
    return (
        <div className={styles.infoContainer}>
            <div className={styles.infoContainer_header}>About Your Interview(s) ----- 1
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


            <div className={styles.infoContainer_text}><p>Subject matter expert :</p>
                {isEdit ?
                    <input
                        className={styles.infoContainer_input}
                        value={current.expert}
                        onChange={(e) => setCurrent({ ...current, expert: e.target.value })}
                        type="text" /> : inteview?.subject}

            </div>

            <div className={styles.infoContainer_text}><p>Phone:</p>
                {isEdit ?
                    <input
                        className={styles.infoContainer_input}
                        value={current.phone}

                        onChange={(e) => setCurrent({ ...current, phone: Number(e.target.value) })}
                        type="text" /> : inteview?.phone}
            </div>

            <div className={styles.infoContainer_text}><p>Email:</p>
                {isEdit ?
                    <input
                        className={styles.infoContainer_input}
                        value={current.email}
                        onChange={(e) => setCurrent({ ...current, email: e.target.value })}
                        type="text" /> : inteview?.email}
            </div>

            <div className={styles.infoContainer_text}><p>Background information for interview(s):</p>
                {isEdit ?
                    <input
                        className={styles.infoContainer_input}
                        value={current.backgroundInfo}
                        onChange={(e) => setCurrent({ ...current, backgroundInfo: e.target.value })}
                        type="text" /> : inteview?.backgroundInfo}
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

export default InterviewProffScript;