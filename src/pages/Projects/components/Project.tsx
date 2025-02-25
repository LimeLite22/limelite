import { DetailsProject, DownloadProject, Settings, ShareProject, SwiperFoto1 } from "assets/images";
import { format } from "date-fns";
import useWindowWidth from "hooks/useWindowWidth";
import { useState } from "react";
import { statusColor } from "utils/statusColors";
import { truncateString } from "utils/truncateString";
import styles from "../ProjectsPage.module.scss";
import ProjectOverView from "./ProjectOverview";

interface IProps {
    project: any;
    index: number;
    searchQuery: string;
}


const Project = ({ project, index, searchQuery }: IProps) => {
    const windowWidth = useWindowWidth();
    const [isOverviewOpen, setIsOverviewOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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
                                __html: highlightText(project.name, searchQuery, 20),
                            }}
                        ></div>
                        <div className={styles.project_start_item_option}>
                            <img src={project.type.img} alt='' />  {truncateString(project.type.header, (windowWidth > 990 && windowWidth < 1250) ? 8 : 40)}
                            {windowWidth > 990 &&
                                <>/ <img src={project.option.img} alt='' />
                                    <div dangerouslySetInnerHTML={{
                                        __html: highlightText(project.option.value, searchQuery, 15),
                                    }}></div>
                                </>}

                            <div className={`${styles.project_info_item} ${styles.mobOnly}`} >
                                <div className={`${styles.project_credit}`} >
                                    {project.option?.credits}  Credit(s)
                                </div>
                            </div></div>
                    </div>
                </div>
                <div className={styles.project_info}>
                    <div className={styles.project_info_request}>
                        <img src={project.user.img} alt="" /> <div dangerouslySetInnerHTML={{
                            __html: highlightText(project.user.name, searchQuery, 12),
                        }}
                        ></div>
                    </div>
                    <div className={`${styles.project_info_item}`} style={{ justifyContent: 'center' }}>
                        <div className={`${styles.project_credit}`} >
                            {project.option?.credits}  Credit(s)
                        </div>
                    </div>
                    <div className={`${styles.project_info_item}  ${styles.project_info_date}`}>{format(project.date, "dd/MM/yyyy")}</div>
                    <div className={`${styles.project_info_item} ${styles.project_info_statusContainer} `}>
                        <div className={styles.project_info_status} style={{ backgroundColor: statusColor(project.status) }} ></div>
                        <div dangerouslySetInnerHTML={{
                            __html: highlightText(project.status, searchQuery, 15),
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
                            }} ><img src={DetailsProject} alt="" /> View Project Details</div>
                            <div className={styles.project_info_settingsContainer_item}><img src={ShareProject} alt="" />Provide Feedback</div>
                            <div className={styles.project_info_settingsContainer_item}><img src={DownloadProject} alt="" />Download Video</div>
                        </div>}
                    </div>
                </div>
                <img className={styles.mobOnly} src={Settings} alt="" />
            </div>
            <div id={`${index}divider`} className={styles.projectsPage_projects_divider}></div>
            {isOverviewOpen && <ProjectOverView close={() => setIsOverviewOpen(false)} />}
        </>
    )
}

export default Project;