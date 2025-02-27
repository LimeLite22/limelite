
import { CloseRed, EditIcon, Success2, User1Foto } from "assets/images";
import DivRowCount from "pages/NewRequest/components/TextArea";
import { ProjectTone, ProjectType } from "pages/NewRequest/ProjectInfo/components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/rootReducer";

import { selectRequestInfo, updateProjectInfoSettings } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
const ProjectInfo = () => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [isReady, setIsReady] = useState(false);
    // projectInfoSettings = pIS
    // editProjectInfoSettings = ePIS
    const pIS = useSelector(selectRequestInfo)?.projectInfoSettings;
    const ePIS = useSelector((state: IRootState) => state.request.editDraft)?.projectInfoSettings;

    const readyToSave = () => {
        let ready = true;
        if (pIS?.name !== ePIS?.name
            || pIS?.projectTone !== ePIS?.projectTone
            || pIS?.type !== ePIS?.type
            || pIS?.targetAudience !== ePIS?.targetAudience
            || pIS?.details !== ePIS?.details
        ) {
            ready = pIS?.name.length !== 0 && pIS?.targetAudience.length !== 0 && pIS?.details?.length !== 0
            if (pIS?.name.length !== 0 && pIS?.targetAudience.length !== 0 && pIS?.details?.length !== 0) {
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
    }
    const handleSave = () => {
        if (!isReady) return
        dispatch(
            updateProjectInfoSettings({ projectInfoSettings: ePIS, isEdit: false }),
        )
        setIsEdit(false);
    }
    useEffect(() => {
        readyToSave();
    }, [ePIS])

    return (
        <div className={styles.infoContainer}>
            <div className={styles.infoContainer_header}>Project information
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
            <div className={styles.infoContainer_text}>
                <p>Requested type:</p> <span>{pIS?.option?.value}  {pIS?.option?.credits && (
                    <div
                        className={
                            `${styles.footer_container_typeContainer_text_title1_tag}
                `
                        }
                    >
                        {pIS?.option?.credits !== 'TBD' ? pIS?.option?.credits : ''}{" "}
                        {pIS?.option?.credits === 'TBD' ? 'TBD' : pIS?.option?.credits > 1 ? "Credits" : "Credit"}
                    </div>
                )}</span></div>
            <div className={styles.infoContainer_text}><p>Requested by:</p>
                <div className={styles.infoContainer_text_user}><img src={User1Foto} alt='' /> Clay Gerhold </div>
            </div>
            <div className={styles.infoContainer_text}><p>Name:</p>
                {isEdit ?
                    <input
                        className={styles.infoContainer_input}
                        value={ePIS?.name}
                        onChange={(e) => {
                            dispatch(
                                updateProjectInfoSettings({ projectInfoSettings: { ...ePIS, name: e.target.value }, isEdit: true })
                            )
                        }}
                        type="text" /> : pIS?.name}
            </div>

            <div className={styles.infoContainer_text}><p>Audience:</p>
                {isEdit ?
                    <input
                        className={styles.infoContainer_input}
                        value={ePIS?.targetAudience}
                        onChange={(e) => {
                            dispatch(
                                updateProjectInfoSettings({ projectInfoSettings: { ...ePIS, targetAudience: e.target.value }, isEdit: true })
                            )
                        }}
                        type="text" /> : pIS?.targetAudience}</div>
            <div className={styles.infoContainer_text}><p>Type:</p>
                {isEdit ?
                    <ProjectType
                        isError={false}
                        setIsError={() => { }}
                        onChange={(type) => {
                            dispatch(
                                updateProjectInfoSettings({ projectInfoSettings: { ...ePIS, type: type }, isEdit: true })
                            )
                        }
                        }
                        isSubmitMode={true} /> : pIS?.type.header}</div>
            <div className={styles.infoContainer_text}><p>Tone:</p>
                {isEdit ?
                    <ProjectTone
                        isError={false}
                        setIsError={() => { }}
                        onChange={(tone) => {
                            dispatch(
                                updateProjectInfoSettings({ projectInfoSettings: { ...ePIS, projectTone: tone }, isEdit: true })
                            )
                        }}
                        isSubmitMode /> : pIS?.projectTone}</div>
            <div className={styles.infoContainer_text}><p>Approach:</p> {pIS?.approachList.map((approach) => approach).join(", ") || "Voiceover, Scripted Delivery"}</div>
            <div className={styles.infoContainer_text}>
                <p className={`
                ${styles.infoContainer_detailsHeader}
                `}>Details:</p>
                {isEdit ?
                    <textarea className={styles.infoContainer_textarea}
                        onChange={(e) => {
                            dispatch(
                                updateProjectInfoSettings({ projectInfoSettings: { ...ePIS, details: e.target.value }, isEdit: true })
                            )
                        }
                        }
                        value={ePIS?.details} /> :
                    <DivRowCount text={pIS?.details ? pIS?.details : ''} />
                }

            </div>
        </div >
    )
}

export default ProjectInfo;