
import { CloseRed, EditIcon, Success, Success2, User1Foto } from "assets/images";
import { ProjectTone, ProjectType } from "pages/NewRequest/ProjectInfo/components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectRequestInfo } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
const ProjectInfo = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const option = selectedRequest?.option;
    const [isEdit, setIsEdit] = useState(false);
    const handleOnEdit = () => {
        setIsEdit(true);
    }

    return (
        <div className={styles.nR_submitContainer_infoContainer}>
            <div className={styles.nR_submitContainer_infoContainer_header}>Project information
                {!isEdit &&
                    <div className={styles.nR_submitContainer_infoContainer_header_edit} onClick={handleOnEdit}>
                        <img src={EditIcon} alt='' />
                        Edit</div>}
                {isEdit &&
                    <div className={styles.nR_submitContainer_infoContainer_header_buttons}>
                        <div  className={styles.nR_submitContainer_infoContainer_header_decline} onClick={() => setIsEdit(false)}><img src={CloseRed}  alt='' />Decline</div>
                        <div className={styles.nR_submitContainer_infoContainer_header_save}><img src={Success2} alt='' /> Save changes</div>
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
                <div className={styles.nR_submitContainer_infoContainer_text_user}><img src={User1Foto} alt='' /> Clay Gerhold </div> </div>
            <div className={styles.nR_submitContainer_infoContainer_text}><p>Name:</p>
                {isEdit ?
                    <input className={styles.nR_submitContainer_infoContainer_input} value={selectedRequest?.projectName} type="text" /> : selectedRequest?.projectName}</div>
            <div className={styles.nR_submitContainer_infoContainer_text}><p>Audience:</p>
                {isEdit ?
                    <input className={styles.nR_submitContainer_infoContainer_input} value={selectedRequest?.targetAudience} type="text" /> : selectedRequest?.targetAudience}</div>
            <div className={styles.nR_submitContainer_infoContainer_text}><p>Type:</p> {isEdit ? <ProjectType isError={false} setIsError={() => { }} isSubmitMode /> : selectedRequest?.projectType.header}</div>
            <div className={styles.nR_submitContainer_infoContainer_text}><p>Tone:</p> {isEdit ? <ProjectTone isError={false} setIsError={() => { }} isSubmitMode /> : selectedRequest?.projectTone}</div>
            <div className={styles.nR_submitContainer_infoContainer_text}><p>Approach:</p> {selectedRequest?.approachList.map((approach) => approach).join(", ") || "Voiceover, Scripted Delivery"}</div>
            <div className={styles.nR_submitContainer_infoContainer_text}><p style={{ height: isEdit ? "200px" : "auto" }}>Details</p>
                {isEdit ?
                    <textarea className={styles.nR_submitContainer_infoContainer_textarea}
                        value={
                            `Opening Scene:
                             Visuals: Close-up shots of employees at work, a bustling office environment, and people collaborating.
                             Narrator:"Welcome to Foundations of Excellence—a program dedicated to building the skills, values, and knowledge that drive our organization forward."`
                        } /> :
                    <div>Opening Scene:Visuals: Close-up shots of employees at work, a bustling office
                        environment, and people collaborating.Narrator:"Welcome to Foundations of Excellence—a
                        program dedicated to building the skills, values, and knowledge that drive our organization
                        forward.
                    </div>
                }

            </div>
        </div>
    )
}

export default ProjectInfo;