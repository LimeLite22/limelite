import { DetailsProject, DownloadProject, Settings, ShareProject, SwiperFoto1 } from "assets/images";
import copy from "copy-to-clipboard";
import { format } from "date-fns";
import useWindowWidth from "hooks/useWindowWidth";
import { IRequest } from "interfaces/interfaces";
import { useState } from "react";
import { statusColor } from "utils/statusColors";
import { truncateString } from "utils/truncateString";

import styles from "../ProjectsPage.module.scss";
import ProjectOverView from "./ProjectOverview";

interface IProps {
    project: IRequest;
    index: number;
    searchQuery: string;
}


const Project = ({ project, index, searchQuery }: IProps) => {
    const windowWidth = useWindowWidth();
    const [isOverviewOpen, setIsOverviewOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [showCopied, setShowCopied] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [showCopied2, setShowCopied2] = useState(false);
    const [isCopied2, setIsCopied2] = useState(false);

    const link = "https://f.io/ltTc9gLk";
    const link2 = "https://f.io/J9NcL36S";

    const handleCopy = () => {
        copy(link);
        setShowCopied(true);
        setIsCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
    };
    const handleCopy2 = () => {
        copy(link2);
        setIsCopied2(true);
        setShowCopied2(true);
        setTimeout(() => setShowCopied2(false), 2000);
    };
    const highlightText = (text: string, query: string, maxLength: number) => {
        const truncatedText = truncateString(text, (windowWidth > 990 && windowWidth < 1250) ? maxLength : 40);
        if (!query) return truncatedText;

        const highlightStyle = `
        color: var(--green-dark2);
        border-radius: 4px;
      `;

        const regex = new RegExp(`(${query})`, "gi");
        return truncatedText.replace(
            regex,
            `<span style="${highlightStyle}">$1</span>`
        );
    };
    const handleMouseEnter = (index: number) => {
        const divider = document.getElementById(`${index - 1}divider`);
        divider?.style.setProperty('background-color', 'transparent');
    }
    const handleMouseLeave = (index: number) => {
        const divider = document.getElementById(`${index - 1}divider`);
        divider?.style.setProperty('background-color', 'var(--gray-light7)');
    }
    const handleOpenDetails = () => {
        setIsOverviewOpen(true);
        setIsSettingsOpen(false);
    }

    return (
        <>
            <div key={project.id} className={styles.project}
                onMouseEnter={() => {
                    handleMouseEnter(index)
                }}
                onMouseLeave={() => {
                    handleMouseLeave(index)
                }}
                onClick={() => {
                    setIsOverviewOpen(true);
                }}
            >
                <div className={styles.project_start}>
                    <img className={styles.project_img} src={SwiperFoto1} alt="" />
                    <div className={styles.project_start_item} >
                        <div className={styles.project_start_item_header}
                            dangerouslySetInnerHTML={{
                                __html: highlightText(project.projectInfoSettings.name, searchQuery, 20),
                            }}
                        ></div>
                        <div className={styles.project_start_item_option}>
                            <img src={project.projectInfoSettings.type.img} alt='' />  {truncateString(project.projectInfoSettings.type.header, (windowWidth > 990 && windowWidth < 1250) ? 8 : 40)}
                            {windowWidth > 990 &&
                                <>/ <img src={project.projectInfoSettings.type.img} alt='' />
                                    <div dangerouslySetInnerHTML={{
                                        __html: highlightText(project.projectInfoSettings.option?.value || '', searchQuery, 15),
                                    }}></div>
                                </>}

                            <div className={`${styles.project_info_item} ${styles.mobOnly}`} >
                                <div className={`${styles.project_credit}`} >
                                    {project.projectInfoSettings.option?.credits !== 'TBD' ? project.projectInfoSettings.option?.credits : ''}{" "}
                                    {project.projectInfoSettings.option?.credits === 'TBD' ? 'TBD' : project?.projectInfoSettings?.option?.credits! > 1 ? "Credits" : "Credit"}
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className={`${styles.project_info_settings} ${styles.mobOnly} `}
                        tabIndex={0}
                        onBlur={() => setIsSettingsOpen(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setIsSettingsOpen(true)
                        }}>
                        <img src={Settings} alt="" />
                        {isSettingsOpen && <div className={styles.project_info_settingsContainer}

                        >
                            <div className={styles.project_info_settingsContainer_item} onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleOpenDetails();
                            }} ><img src={DetailsProject} alt="" />Project Details</div>
                            <div className={styles.project_info_settingsContainer_item} onClick={handleCopy}><img src={ShareProject} alt="" />Review Link</div>
                            <div className={styles.project_info_settingsContainer_item} onClick={handleCopy2}><img src={DownloadProject} alt="" />Download Link</div>
                            {showCopied && <p className={styles.overview_info_content_item_copy2}>Review Link copied!</p>}
                            {showCopied2 && <p className={styles.overview_info_content_item_copy2}>Download link copied!</p>}
                        </div>}
                    </div>
                </div>
                <div className={styles.project_info}>
                    <div className={styles.project_info_request}>
                        <img src={project.overviewInfoSettings.requester.foto} alt="" /> <div dangerouslySetInnerHTML={{
                            __html: highlightText(
                                String(`${project.overviewInfoSettings.requester.name} ${project.overviewInfoSettings.requester.lastName}`), searchQuery, 12),
                        }}
                        ></div>
                    </div>
                    <div className={`${styles.project_info_item}`} style={{ justifyContent: 'center' }}>
                        <div className={`${styles.project_credit}`} >
                            {project.projectInfoSettings.option?.credits !== 'TBD' ? project.projectInfoSettings.option?.credits : ''}{" "}
                            {project.projectInfoSettings.option?.credits === 'TBD' ? 'TBD' : project?.projectInfoSettings?.option?.credits! > 1 ? "Credits" : "Credit"}
                        </div>
                    </div>
                    <div className={`${styles.project_info_item}  ${styles.project_info_date}`}>{format(project.overviewInfoSettings.requestDate, "dd/MM/yyyy")}</div>
                    <div className={`${styles.project_info_item} ${styles.project_info_statusContainer} `}>
                        <div className={styles.project_info_status} style={{ backgroundColor: statusColor(project.overviewInfoSettings.status) }} ></div>
                        <div dangerouslySetInnerHTML={{
                            __html: highlightText(project.overviewInfoSettings.status, searchQuery, 15),
                        }}
                        ></div></div>
                    <div className={styles.project_info_settings}
                        tabIndex={0}
                        onBlur={() => setIsSettingsOpen(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setIsSettingsOpen(true)
                        }}>
                        <img src={Settings} alt="" />
                        {isSettingsOpen && <div className={styles.project_info_settingsContainer}

                        >
                            <div className={styles.project_info_settingsContainer_item} onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleOpenDetails();
                            }} ><img src={DetailsProject} alt="" />Project Details</div>
                            <div className={styles.project_info_settingsContainer_item} onClick={handleCopy}><img src={ShareProject} alt="" />Review Link</div>
                            <div className={styles.project_info_settingsContainer_item} onClick={handleCopy2}><img src={DownloadProject} alt="" />Download Link</div>
                            {showCopied && <p className={styles.overview_info_content_item_copy2}>Review Link copied!</p>}
                            {showCopied2 && <p className={styles.overview_info_content_item_copy2}>Download link copied!</p>}
                        </div>}
                    </div>
                </div>
            </div>
            <div id={`${index}divider`} className={styles.projectsPage_projects_divider}></div>
            {isOverviewOpen && <ProjectOverView
                project={project}
                close={() => setIsOverviewOpen(false)}
                isCopied={isCopied}
                isCopied2={isCopied2}
                showCopied={showCopied}
                showCopied2={showCopied2}
                handleCopy={handleCopy}
                handleCopy2={handleCopy2}
            />}
        </>
    )
}

export default Project;