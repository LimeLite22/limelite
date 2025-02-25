import styles from "../ProjectsPage.module.scss";
import useWindowWidth from "hooks/useWindowWidth";
import ReactDOM from "react-dom";
import { CloseCalendar, QuestionIcon, ThumbnailPurple } from "assets/images";
import { useState } from "react";
import ProjectSettings from "./ProjectSettings";
import LogisticSettings from "./LogisticSettings";
import ScriptSettings from "./ScriptSettings";
import InterviewSettings from "./InterviewSettings";
import VoiceoverSettings from "./VoiceoverSettings";
import VideoEditSettings from "./VideoEditSettings";
import AddOnsSettings from "./AddOns/AddOns";
import copy from "copy-to-clipboard";
import { Sheet } from "react-modal-sheet";
interface IProps {
    close: () => void,
    isCopied: boolean,
    isCopied2: boolean,
    showCopied: boolean,
    showCopied2: boolean,
    handleCopy: () => void,
    handleCopy2: () => void,
}


const ProjectOverView = ({ close, handleCopy, handleCopy2, isCopied, isCopied2, showCopied, showCopied2 }: IProps) => {
    const width = useWindowWidth();
    const [selectedStep, setSelectedStep] = useState(0);
    const content = <>
        <div className={styles.overview_header}>
            Why They Chose Us: Honest feedback from our clients
        </div>
        <div className={styles.overview_info}>
            <div className={styles.overview_info_image}>
                <img src={ThumbnailPurple} alt={"ProjectOverviewImg"} />
                <div className={styles.overview_info_image_header} >Project Thumbnail</div>
                <div className={styles.overview_info_image_title}>(Coming soon)</div>
            </div>


            <div className={styles.overview_info_content}>
                <div className={styles.overview_info_content_item} >
                    <div className={styles.overview_info_content_item_header} >Request type:
                    </div>
                    Shoot + Edit
                </div>
                <div className={styles.overview_info_content_item}>
                    <div className={styles.overview_info_content_item_header}>Credit usage:</div>
                    1 credit
                </div>
                <div className={styles.overview_info_content_item}>
                    <div className={styles.overview_info_content_item_header}>Status:</div>
                    Complete
                </div>
                <div className={styles.overview_info_content_item}>
                    <div className={styles.overview_info_content_item_header}>Requested by:</div>
                    Clay Gerhold
                </div>
                <div className={styles.overview_info_content_item}>
                    <div className={styles.overview_info_content_item_header}>Review link:</div>
                    <p onClick={handleCopy} style={{ cursor: "pointer", color: !isCopied ? 'var(--blue)' : 'var(--purple)' }}>
                        https://f.io/ltTc9gLk
                    </p>
                    {showCopied && <p className={styles.overview_info_content_item_copy}>Copied!</p>}
                </div>
                <div className={styles.overview_info_content_item}>
                    <div className={styles.overview_info_content_item_header}>Download link:</div>
                    <p onClick={handleCopy2} style={{ cursor: "pointer", color: !isCopied2 ? 'var(--blue)' : 'var(--purple)' }}>
                        https://f.io/J9NcL36S
                    </p>
                    {showCopied2 && <p className={styles.overview_info_content_item_copy}>Copied!</p>}
                </div>

            </div>
        </div>
        <div className={styles.overview_stepsList}>
            <div className={`${styles.overview_stepsList_item} ${selectedStep === 0 ? styles.overview_stepsList_item_selected : ''}`}
                onClick={() => setSelectedStep(0)}
            >Overview</div>
            <div className={`${styles.overview_stepsList_item} ${selectedStep === 1 ? styles.overview_stepsList_item_selected : ''}`}
                onClick={() => setSelectedStep(1)}
            >Project </div>
            <div className={`${styles.overview_stepsList_item} ${selectedStep === 2 ? styles.overview_stepsList_item_selected : ''}`}
                onClick={() => setSelectedStep(2)}
            >Logistics</div>
            <div className={`${styles.overview_stepsList_item} ${selectedStep === 3 ? styles.overview_stepsList_item_selected : ''}`}
                onClick={() => setSelectedStep(3)}
            >Script</div>
            <div className={`${styles.overview_stepsList_item} ${selectedStep === 4 ? styles.overview_stepsList_item_selected : ''}`}
                onClick={() => setSelectedStep(4)}
            >Interview</div>
            <div className={`${styles.overview_stepsList_item} ${selectedStep === 5 ? styles.overview_stepsList_item_selected : ''}`}
                onClick={() => setSelectedStep(5)}
            >Voiceover</div>
            <div className={`${styles.overview_stepsList_item} ${selectedStep === 6 ? styles.overview_stepsList_item_selected : ''}`}
                onClick={() => setSelectedStep(6)}
            >Video Edit</div>
            <div className={`${styles.overview_stepsList_item} ${selectedStep === 7 ? styles.overview_stepsList_item_selected : ''}`}
                onClick={() => setSelectedStep(7)}
            >Other Add-ons</div>
        </div>
        {selectedStep === 0 &&
            <div className={styles.overview_general} >
                <div className={styles.overview_general_timeline}>
                    <div className={styles.infoContainer_header}>Project timeline
                    </div>
                    <div className={styles.overview_general_text} ><p>Request Date:</p>28 Dec 2024, 16:40 </div>

                    <div className={`${styles.overview_general_text} ${styles.overview_general_text_smallMargin}`}><p>Shoot Date:</p>30 Dec 2024, 15:30
                    </div>
                    <div className={`${styles.overview_general_text} ${styles.overview_general_text_smallMargin}`}><p>Start time:</p>15:30</div>
                    <div className={styles.overview_general_text}><p>End time:</p>18:30</div>
                    <div className={styles.overview_general_text}><p>Editing Complete</p>6 Jan 2025, 16:40
                    </div>
                    <div className={styles.overview_general_text}><p>Approved Date:</p>10 Jan 2025, 11:15
                    </div>
                </div>
                <div>
                    <div className={styles.infoContainer_header}>Project Notes
                        <img src={QuestionIcon} />
                    </div>
                    <div className={styles.infoContainer_notes} >Cursus tortor eu interdum cras. Nunc non ornare
                        dui consectetur pretium. Risus eu sed diam et sed odio in. Arcu diam varius egestas eu odio
                        dictum.</div>
                </div>

            </div>}
        {selectedStep === 1 && <ProjectSettings />}
        {selectedStep === 2 && <LogisticSettings />}
        {selectedStep === 3 && <ScriptSettings />}
        {selectedStep === 4 && <InterviewSettings />}
        {selectedStep === 5 && <VoiceoverSettings />}
        {selectedStep === 6 && <VideoEditSettings />}
        {selectedStep === 7 && <AddOnsSettings />}
    </>

    return (
        <>
            {width > 768 &&
                ReactDOM.createPortal(
                    <div className={styles.overview}>
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