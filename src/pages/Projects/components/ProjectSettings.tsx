
import { User1Foto } from "assets/images";
import DivRowCount from "pages/NewRequest/components/TextArea";

import { testRequest } from "../../../redux/requests/consts";
import styles from "../ProjectsPage.module.scss";
const ProjectSettings = () => {
    const pIS = testRequest.projectInfoSettings;

    return (
        <div className={styles.infoContainer}>
            <div className={styles.infoContainer_header}>Project information
            </div>
            <div className={styles.infoContainer_text} ><p>Project #:</p>2025-MM-101 </div>
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
                {pIS?.name}
            </div>

            <div className={styles.infoContainer_text}><p>Audience:</p>
                {pIS?.targetAudience}</div>
            <div className={styles.infoContainer_text}><p>Type:</p>
                {pIS?.type.header}</div>
            <div className={styles.infoContainer_text}><p>Tone:</p>
                {pIS?.projectTone}</div>
            <div className={styles.infoContainer_text}><p>Approach:</p> {pIS?.approachList.map((approach) => approach).join(", ") || "Voiceover, Scripted Delivery"}</div>
            <div className={styles.infoContainer_text}>
                <p className={`
                ${styles.infoContainer_detailsHeader}
                `}>Details:</p>
                {
                    <DivRowCount text={pIS?.details ? pIS?.details : ''} />
                }

            </div>
        </div >
    )
}

export default ProjectSettings;