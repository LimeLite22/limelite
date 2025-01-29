
import { CloseRed, EditIcon, Success2, User1Foto } from "assets/images";
import { ProjectTone, ProjectType } from "pages/NewRequest/ProjectInfo/components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestInfo, updateDraftField } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
const ProjectInfo = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const option = selectedRequest?.option;
    const [isEdit, setIsEdit] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const dispatch = useDispatch();
    const defaultState = {
        name: selectedRequest?.projectName,
        tone: selectedRequest?.projectTone,
        type: selectedRequest?.projectType,
        audience: selectedRequest?.targetAudience,
        details: selectedRequest?.details
    }
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
    const [current, setCurrent] = useState(defaultState);
    const handleOnEdit = () => {
        setIsEdit(true);
    }
    const handleDecline = () => {
        setIsEdit(false);
        setCurrent(defaultState);
    }
    const handleSave = () => {
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
        setIsEdit(false);
    }
    useEffect(() => {
        readyToSave();
    }
        , [current])

    return (
        <div className={styles.nR_submitContainer_infoContainer}>
            <div className={styles.nR_submitContainer_infoContainer_header}>Project information
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
            <div className={styles.nR_submitContainer_infoContainer_text}>
                <p>Requested type:</p> <span>{option?.value}  {option?.credits && (
                    <div
                        className={
                            `${styles.footer_container_typeContainer_text_title1_tag}
                `
                        }
                    >
                        {option?.credits}{" "}
                        {option?.credits > 1 ? "Credits" : "Credit"}{" "}
                    </div>
                )}</span></div>
            <div className={styles.nR_submitContainer_infoContainer_text}><p>Requested by:</p>
                <div className={styles.nR_submitContainer_infoContainer_text_user}><img src={User1Foto} alt='' /> Clay Gerhold </div>
            </div>
            <div className={styles.nR_submitContainer_infoContainer_text}><p>Name:</p>
                {isEdit ?
                    <input
                        className={styles.nR_submitContainer_infoContainer_input}
                        value={current.name}
                        onChange={(e) => setCurrent({ ...current, name: e.target.value })}
                        type="text" /> : selectedRequest?.projectName}
            </div>

            <div className={styles.nR_submitContainer_infoContainer_text}><p>Audience:</p>
                {isEdit ?
                    <input
                        className={styles.nR_submitContainer_infoContainer_input}
                        value={current.audience}
                        onChange={(e) => setCurrent({ ...current, audience: e.target.value })}
                        type="text" /> : selectedRequest?.targetAudience}</div>
            <div className={styles.nR_submitContainer_infoContainer_text}><p>Type:</p>
                {isEdit ?
                    <ProjectType
                        isError={false}
                        setIsError={() => { }}
                        onChange={(type) => { setCurrent({ ...current, type: type }) }}
                        isSubmitMode={true} /> : selectedRequest?.projectType.header}</div>
            <div className={styles.nR_submitContainer_infoContainer_text}><p>Tone:</p>
                {isEdit ?
                    <ProjectTone
                        isError={false}
                        setIsError={() => { }}
                        onChange={(tone) => {
                            setCurrent({ ...current, tone: tone })
                        }}
                        isSubmitMode /> : selectedRequest?.projectTone}</div>
            <div className={styles.nR_submitContainer_infoContainer_text}><p>Approach:</p> {selectedRequest?.approachList.map((approach) => approach).join(", ") || "Voiceover, Scripted Delivery"}</div>
            <div className={styles.nR_submitContainer_infoContainer_text}><p style={{ height: isEdit ? "200px" : "auto" }}>Details</p>
                {isEdit ?
                    <textarea className={styles.nR_submitContainer_infoContainer_textarea}
                        onChange={(e) => setCurrent({ ...current, details: e.target.value })}
                        value={current.details} /> :
                    <div>
                        {selectedRequest?.details}
                    </div>
                }

            </div>
        </div>
    )
}

export default ProjectInfo;