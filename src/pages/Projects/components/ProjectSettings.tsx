
import { User1Foto } from "assets/images";
import { IProjectInfoSettings } from "interfaces/interfaces";
import DivRowCount from "pages/NewRequest/components/TextArea";
import styles from "../ProjectsPage.module.scss";
interface IProps {
    settings: IProjectInfoSettings
}
const ProjectSettings = ({ settings }: IProps) => {
    return (
        <div className={styles.infoContainer}>
            <div className={styles.infoContainer_header}>Project information
            </div>
            <div className={styles.infoContainer_text} ><p>Project #:</p>2025-MM-101 </div>
            <div className={styles.infoContainer_text}>
                <p>Requested type:</p> <span>{settings?.option?.value}  {settings?.option?.credits && (
                    <div
                        className={
                            `${styles.footer_container_typeContainer_text_title1_tag}
                `
                        }
                    >
                        <div className={styles.project_credit}>
                            {settings?.option?.credits !== 'TBD' ? settings?.option?.credits : ''}{" "}
                            {settings?.option?.credits === 'TBD' ? 'TBD' : settings?.option?.credits > 1 ? "Credits" : "Credit"}
                        </div>
                    </div>
                )}</span></div>
            <div className={styles.infoContainer_text}><p>Requested by:</p>
                <div className={styles.infoContainer_text_user}><img src={User1Foto} alt='' /> Clay Gerhold </div>
            </div>
            <div className={styles.infoContainer_text}><p>Name:</p>
                {settings?.name}
            </div>

            <div className={styles.infoContainer_text}><p>Audience:</p>
                {settings?.targetAudience}</div>
            <div className={styles.infoContainer_text}><p>Type:</p>
                {settings?.type.header}</div>
            <div className={styles.infoContainer_text}><p>Tone:</p>
                {settings?.projectTone}</div>
            <div className={styles.infoContainer_text}><p>Approach:</p> {settings?.approachList.map((approach) => approach).join(", ") || "Voiceover, Scripted Delivery"}</div>
            <div className={styles.infoContainer_text}>
                <p className={`
                ${styles.infoContainer_detailsHeader}
                `}>Details:</p>
                {
                    <DivRowCount text={settings?.details ? settings?.details : ''} />
                }

            </div>
        </div >
    )
}

export default ProjectSettings;