
import { ArrowBlue3, CloseRed, EditIcon, Success2, User1Foto } from "assets/images";
import { ProjectTone, ProjectType } from "pages/NewRequest/ProjectInfo/components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestInfo, updateDraftField } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
const ScriptInfo = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const dispatch = useDispatch();
    const defaultState = {
        name: selectedRequest?.projectName,
        tone: selectedRequest?.projectTone,
        type: selectedRequest?.projectType,
        audience: selectedRequest?.targetAudience,
        details: selectedRequest?.details
    }
    const option = selectedRequest?.option;
    const [isEdit, setIsEdit] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [current, setCurrent] = useState(defaultState);
    const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
    const isDetailTextBig = selectedRequest?.details && selectedRequest?.details?.length > 200;

    const readyToSave = () => {
        let ready = true;
        if (current.name !== selectedRequest?.projectName
            || current.tone !== selectedRequest?.projectTone
            || current.type !== selectedRequest?.projectType
            || current.audience !== selectedRequest?.targetAudience
            || current.details !== selectedRequest?.details
        ) {
            if (current.name?.length !== 0 && current.audience?.length !== 0 && current.details?.length !== 0) {
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
        if(!isReady) return
        dispatch(
            updateDraftField({
                path: "projectName",
                value: current.name,
            }),
        );
        dispatch(
            updateDraftField({
                path: "projectTone",
                value: current.tone,
            }),
        );
        dispatch(
            updateDraftField({
                path: "projectType",
                value: current.type,
            }),
        );
        dispatch(
            updateDraftField({
                path: "targetAudience",
                value: current.audience,
            }),
        );
        dispatch(
            updateDraftField({
                path: "details",
                value: current.details,
            }),
        )
        setCurrent(defaultState);
        setIsEdit(false);
    }
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
                    <input
                        className={styles.nR_submitContainer_infoContainer_input}
                        value={current.name}
                        onChange={(e) => setCurrent({ ...current, name: e.target.value })}
                        type="text" /> : selectedRequest?.projectName}
            </div>
            <div className={styles.nR_submitContainer_infoContainer_text}><p>Name:</p>
                {isEdit ?
                    <input
                        className={styles.nR_submitContainer_infoContainer_input}
                        value={current.name}
                        onChange={(e) => setCurrent({ ...current, name: e.target.value })}
                        type="text" /> : selectedRequest?.projectName}
            </div>
            
        </div >
    )
}

export default ScriptInfo;