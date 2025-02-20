import styles from "../ProjectsPage.module.scss";
import useWindowWidth from "hooks/useWindowWidth";
import ReactDOM from "react-dom";
import { CloseCalendar, Copy, ProjectOverviewImg } from "assets/images";
import { useState } from "react";
import ProjectSettings from "./ProjectSettings";
import LogisticSettings from "./LogisticSettings";
import ScriptSettings from "./ScriptSettings";
import { IRequest } from "interfaces/interfaces";
import { optionsList } from "consts/consts";
import InterviewSettings from "./InterviewSettings";
interface IProps {
    close: () => void
}


const ProjectOverView = ({ close }: IProps) => {
    const width = useWindowWidth();
    const [selectedStep, setSelectedStep] = useState(0);

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
                            <div className={styles.overview_header}>
                                <div>Project #: 2025-MM-101</div>
                                <div className={styles.overview_header_divider}></div>
                                <div>Why They Chose Us: Honest feedback from our clients</div>
                            </div>
                            <div className={styles.overview_info}>
                                <img className={styles.overview_info_image} src={ProjectOverviewImg} alt={"ProjectOverviewImg"} />

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
                                    <div className={styles.overview_info_content_item} style={{ marginTop: "12px" }}>
                                        <div className={styles.overview_info_content_item_header}>Review link:</div>
                                        <p>
                                            https://project_0123456...
                                            <div className={styles.overview_info_content_item_copy} ><img src={Copy} alt={"Copy"} /></div>
                                        </p>
                                    </div>
                                    <div className={styles.overview_info_content_item}>
                                        <div className={styles.overview_info_content_item_header}>Download link:</div>
                                        <p>
                                            https://project_0123456...
                                            <div className={styles.overview_info_content_item_copy}><img src={Copy} alt={"Copy"} /></div>
                                        </p>
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
                                >Scripted Delivery</div>
                                <div className={`${styles.overview_stepsList_item} ${selectedStep === 4 ? styles.overview_stepsList_item_selected : ''}`}
                                    onClick={() => setSelectedStep(4)}
                                >Candid Interview</div>
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
                                <div>
                                    <div>
                                        <div>
                                            <div>
                                                <div>Request Date:</div>
                                                <div>line</div>
                                            </div>
                                            <div>28 Dec 2024, 16:40</div>
                                        </div>
                                        <div>
                                            <div>
                                                <div>Shoot Date:</div>
                                                <div>line</div>
                                            </div>
                                            <div>30 Dec 2024, 15:30</div>
                                        </div>
                                        <div>
                                            <div>
                                                <div>Editing Complete</div>
                                                <div>line</div>
                                            </div>
                                            <div>6 Jan 2025, 16:40</div>
                                        </div>
                                        <div>
                                            <div>
                                                <div>Approved Date:</div>
                                                <div>line</div>
                                            </div>
                                            <div>10 Jan 2025, 11:15</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>Project Notes</div>
                                        <div></div>
                                    </div>

                                </div>}
                            {selectedStep === 1 && <ProjectSettings />}
                            {selectedStep === 2 && <LogisticSettings />}
                            {selectedStep === 3 && <ScriptSettings />}
                            {selectedStep === 4 && <InterviewSettings />}

                        </div>
                    </div>,
                    document.body,
                )
            }
        </>
    )
}

export default ProjectOverView;