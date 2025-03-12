import { CloseCalendar, QuestionIcon, ThumbnailPurple } from "assets/images";
import { CANDID_APPROACH, EDIT_ONLY, OTHER, SCRIPTED_APPROACH, SHOOT_EDIT, VOICEOVER_APPROACH } from "consts/consts";
import { formatDate } from "date-fns";
import useWindowWidth from "hooks/useWindowWidth";
import { IRequest } from "interfaces/interfaces";
import { useState } from "react";
import ReactDOM from "react-dom";
import { Sheet } from "react-modal-sheet";

import styles from "./ProjectOverview.module.scss";
import AddOnsSettings from "./AddOns/AddOns";
import InterviewSettings from "./InterviewSettings";
import LogisticSettings from "./LogisticSettings";
import ProjectSettings from "./ProjectSettings";
import ScriptSettings from "./ScriptSettings";
import VideoEditSettings from "./VideoEditSettings";
import VoiceoverSettings from "./VoiceoverSettings";
interface IProps {
    project: IRequest,
    close: () => void,
    isCopied: boolean,
    isCopied2: boolean,
    showCopied: boolean,
    showCopied2: boolean,
    handleCopy: () => void,
    handleCopy2: () => void,
}


const ProjectOverView = ({ project, close, handleCopy, handleCopy2, isCopied, isCopied2, showCopied, showCopied2 }: IProps) => {
    const width = useWindowWidth();
    const [selectedStep, setSelectedStep] = useState(0);
    const content = <>
        <div className={styles.overview_header} onClick={
            (e) => {
                e.stopPropagation();
            }
        }>
            Why They Chose Us: Honest feedback from our clients
        </div>
        <div className={styles.overview_info}>
            <div className={styles.overview_info_image}>
                <img src={ThumbnailPurple} alt="ProjectOverviewImg" />
                <div className={styles.overview_info_image_header} >Project Thumbnail</div>
                <div className={styles.overview_info_image_title}>(Coming soon)</div>
            </div>


            <div className={styles.overview_info_content}>
                <div className={styles.overview_info_content_item} >
                    <div className={styles.overview_info_content_item_header} >Request type:
                    </div>
                    {project.projectInfoSettings.type.header}
                </div>
                <div className={styles.overview_info_content_item}>
                    <div className={styles.overview_info_content_item_header}>Credit usage:</div>
                    1 Credit
                </div>
                <div className={styles.overview_info_content_item}>
                    <div className={styles.overview_info_content_item_header}>Status:</div>
                    {project.overviewInfoSettings.status}
                </div>
                <div className={styles.overview_info_content_item}>
                    <div className={styles.overview_info_content_item_header}>Requested by:</div>
                    {project.overviewInfoSettings.requester.name} {project.overviewInfoSettings.requester.lastName}
                </div>
                <div className={styles.overview_info_content_item}>
                    <div className={styles.overview_info_content_item_header}>Review link:</div>
                    <p onClick={handleCopy} style={{ cursor: "pointer", color: !isCopied ? 'var(--blue)' : 'var(--purple)' }}>
                        {project.overviewInfoSettings.reviewLink}
                    </p>
                    {showCopied && <p className={styles.overview_info_content_item_copy}>Copied!</p>}
                </div>
                <div className={styles.overview_info_content_item}>
                    <div className={styles.overview_info_content_item_header}>Download link:</div>
                    <p onClick={handleCopy2} style={{ cursor: "pointer", color: !isCopied2 ? 'var(--blue)' : 'var(--purple)' }}>
                        {project.overviewInfoSettings.downloadLink}
                    </p>
                    {showCopied2 && <p className={styles.overview_info_content_item_copy}>Copied!</p>}
                </div>

            </div>
        </div>
        <div className={styles.overview_stepsList}>
            <div className={`${styles.overview_stepsList_item} ${selectedStep === 0 ? styles.overview_stepsList_item_selected : ''}`}
                onClick={() => setSelectedStep(0)}
            >Details</div>
            <div className={`${styles.overview_stepsList_item} ${selectedStep === 1 ? styles.overview_stepsList_item_selected : ''}`}
                onClick={() => setSelectedStep(1)}
            >Project </div>
            {(project.projectInfoSettings.option?.value === SHOOT_EDIT || project.projectInfoSettings.option?.value === OTHER) &&
                <div className={`${styles.overview_stepsList_item} ${selectedStep === 2 ? styles.overview_stepsList_item_selected : ''}`}
                    onClick={() => setSelectedStep(2)}
                >Logistics</div>}
            {(project.projectInfoSettings.approachList.includes(CANDID_APPROACH)
                || project.projectInfoSettings.approachList.includes(VOICEOVER_APPROACH)
                || project.projectInfoSettings.approachList.includes(SCRIPTED_APPROACH)
            )
                && project.projectInfoSettings.option?.value !== EDIT_ONLY &&
                <div className={`${styles.overview_stepsList_item} ${selectedStep === 3 ? styles.overview_stepsList_item_selected : ''}`}
                    onClick={() => setSelectedStep(3)}
                >Narration
                </div>
            }
            {project.projectInfoSettings.option?.value !== EDIT_ONLY &&
                <div className={`${styles.overview_stepsList_item} ${selectedStep === 4 ? styles.overview_stepsList_item_selected : ''}`}
                    onClick={() => setSelectedStep(4)}
                >Video Edit</div>}
            <div className={`${styles.overview_stepsList_item} ${selectedStep === 5 ? styles.overview_stepsList_item_selected : ''}`}
                onClick={() => setSelectedStep(5)}
            >Other Add-ons</div>
        </div>
        {selectedStep === 0 &&
            <div className={styles.infoContainer}>
                <div className={styles.overview_general_timeline}>
                    <div className={styles.infoContainer_header}>Project details:
                    </div>
                    <div className={styles.overview_general_text} ><p>Job #:</p>
                        200006</div>
                    <div className={styles.overview_general_text} ><p>Request Date:</p>
                        {formatDate(project.overviewInfoSettings.requestDate, "dd MMM yyyy, hh:mm aa").replace(/AM|PM/, (match) => match.toLowerCase())}</div>

                    <div className={`${styles.overview_general_text}`}><p>Shoot Date:</p>
                        {formatDate(project.overviewInfoSettings.requestDate, "dd MMM yyyy, hh:mm aa").replace(/AM|PM/, (match) => match.toLowerCase())}
                    </div>
                    <div className={`${styles.overview_general_text}`}><p>Start time:</p>
                        {formatDate(project.overviewInfoSettings.requestDate, "HH:mm aa").replace(/AM|PM/, (match) => match.toLowerCase())}</div>
                    <div className={styles.overview_general_text}><p>End time:</p>{formatDate(project.overviewInfoSettings.requestDate, "HH:mm aa").replace(/AM|PM/, (match) => match.toLowerCase())}</div>
                    <div className={styles.overview_general_text}><p>Editing Complete</p>{formatDate(project.overviewInfoSettings.requestDate, "HH:mm aa").replace(/AM|PM/, (match) => match.toLowerCase())}
                    </div>
                    <div className={styles.overview_general_text}><p>Approved Date:</p>{formatDate(project.overviewInfoSettings.requestDate, "dd MMM yyyy, HH:mm aa").replace(/AM|PM/, (match) => match.toLowerCase())}
                    </div>
                    <div className={styles.overview_general_text}><p>Video creator:</p>Abby Spears
                    </div>
                    <div className={styles.overview_general_text}><p>Video editor:</p>Joey Chandler
                    </div>
                </div>
                <div>
                    <div className={styles.infoContainer_header}>Project Notes
                        <img src={QuestionIcon} alt="" />
                    </div>
                    <div className={styles.infoContainer_notes} >{
                        project.projectInfoSettings.details
                    }</div>
                </div>

            </div>}
        {selectedStep === 1 && <ProjectSettings settings={project.projectInfoSettings} />}
        {selectedStep === 2 && <LogisticSettings settings={project.logisticSettings} />}
        {selectedStep === 3 && <>
            <div className={styles.infoContainer}>
                {project.projectInfoSettings.approachList.includes(SCRIPTED_APPROACH) && <ScriptSettings />}
                {project.projectInfoSettings.approachList.includes(CANDID_APPROACH) && <InterviewSettings />}
                {project.projectInfoSettings.approachList.includes(VOICEOVER_APPROACH) && <VoiceoverSettings />}
            </div>
        </>
        }
        {selectedStep === 4 && <VideoEditSettings />}
        {selectedStep === 5 && <AddOnsSettings />}
    </>

    return (
        <>
            {width > 768 &&
                ReactDOM.createPortal(
                    <div className={styles.overview} onClick={
                        (e) => {
                            e.stopPropagation();
                        }}>
                        <div className={styles.overview_container}>
                            <div className={styles.overview_container_closeButton}>
                                <img

                                    onClick={close}
                                    src={CloseCalendar}
                                    alt="Close"
                                />

                            </div>
                            {content}

                        </div>
                    </div>,
                    document.body,
                )
            }
            {width < 768 && (
                <Sheet
                    isOpen={true}
                    onClose={close}
                    dragVelocityThreshold={500}
                    detent="full-height"
                    style={{
                        backdropFilter: "blur(3px)",
                        WebkitBackdropFilter: "blur(3px)",
                        background: "#11100E99",
                    }}
                    className={styles.learnMore_sheetMain}
                >
                    <div
                        className={styles.learnMore_closeArea}
                        onClick={close}
                    ></div>
                    <Sheet.Container className={styles.learnMore_sheet}>
                        <Sheet.Content className={styles.learnMore_sheetContainer}>
                            <div className={styles.learnMore_container_lineBox}>
                                <div className={styles.learnMore_container_line}></div>
                            </div>

                            <Sheet.Scroller draggableAt="both">
                                {content}
                            </Sheet.Scroller>

                        </Sheet.Content>
                    </Sheet.Container>
                </Sheet>
            )}
        </>
    )
}

export default ProjectOverView;