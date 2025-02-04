
import { CheckBox, CheckBoxSelected, CloseRed, EditIcon, Success2 } from "assets/images";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ScriptPersons from "./ScriptPersons";
import { selectRequestInfo, updateDraftField } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import { PROFESSIONAL_SCRIPT } from "consts/consts";
const ScriptInfoProffScript = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const dispatch = useDispatch();
    const scriptSettings = selectedRequest?.scriptSettings
    const defaultState = {
        expert: scriptSettings?.name,
        phone: scriptSettings?.phone,
        email: scriptSettings?.email,
        backgroundInfo: scriptSettings?.backgroundInfo,
        teleprompter: scriptSettings?.teleprompter,
        persons: scriptSettings?.persons
    }
    const [isEdit, setIsEdit] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [current, setCurrent] = useState(defaultState);

    const readyToSave = () => {
        let ready = true;
        if (current.expert !== scriptSettings?.name
            || current.phone !== scriptSettings?.phone
            || current.email !== scriptSettings?.email
            || current.teleprompter !== scriptSettings?.teleprompter
            || current.backgroundInfo !== scriptSettings?.backgroundInfo
            || current.persons !== scriptSettings?.persons
        ) {
            if (current.expert?.length !== 0 && current.email?.length !== 0) {
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
                path: "scriptSettings.name",
                value: current.expert,
            }),
        );
        dispatch(
            updateDraftField({
                path: "scriptSettings.phone",
                value: current.phone,
            })
        )
        dispatch(
            updateDraftField({
                path: "scriptSettings.email",
                value: current.email,
            })
        )
        dispatch(
            updateDraftField({
                path: "scriptSettings.backgroundInfo",
                value: current.backgroundInfo,
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
        setCurrent(defaultState);
        setIsEdit(false);
    }
    useEffect(() => {
        readyToSave();
    }, [current])
    useEffect(() => {
        setCurrent(defaultState);
    }, [selectedRequest])
    // if (selectedRequest?.scriptSettings.scriptWriter !== PROFESSIONAL_SCRIPT) return null
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


            <div className={styles.infoContainer_text}><p>Subject matter expert :</p>
                {isEdit ?
                    <input
                        className={styles.infoContainer_input}
                        value={current.expert}
                        onChange={(e) => setCurrent({ ...current, expert: e.target.value })}
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
                        type="text" /> : scriptSettings?.backgroundInfo}
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


        </div >
    )
}

export default ScriptInfoProffScript;