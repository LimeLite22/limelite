import { Search, Settings, SwiperFoto1, User1Foto, User2Foto, User3Foto, User4Foto } from "assets/images";
import { CANCELED_REQUEST_STATUS, COMPLETE_REQUEST_STATUS, DEFAULT, IN_EDITING_REQUEST_STATUS, ON_HOLD_REQUEST_STATUS, optionsList, projectTypes, REQUESTED_REQUEST_STATUS, SCHEDULED_REQUEST_STATUS } from "consts/consts";
import { format } from "date-fns";
import useWindowWidth from "hooks/useWindowWidth";
import { useState } from "react";
import { TRange } from "types/types";
import { isDateInRange } from "utils/dateRange";
import { generateUniqueId } from "utils/generateId";
import { statusColor } from "utils/statusColors";
import { truncateString } from "utils/truncateString";

import DateFilter from "./components/DateFilter";
import ProjectFilter from "./components/Filter";
import styles from "./ProjectsPage.module.scss";
export const TestUsers = [
    {
        id: generateUniqueId(),
        name: "Clay Gerhold",
        img: User1Foto
    }, {
        id: generateUniqueId(),
        name: "Jainy Murazik-Larkin",
        img: User2Foto
    },
    {
        id: generateUniqueId(),
        name: "Lava Stiedemann",
        img: User3Foto
    },
    {
        id: generateUniqueId(),
        name: "Shabnam Leffler",
        img: User4Foto
    },

]
const projects = [
    {
        id: generateUniqueId(),
        user: TestUsers[0],
        name: "Crafting Visual Stories: Behind the lens",
        type: projectTypes[0],
        option: optionsList[0],
        status: COMPLETE_REQUEST_STATUS,
        date: new Date(2025, 0, 25),

    },
    {
        id: generateUniqueId(),
        user: TestUsers[1],
        name: "Forwarding Behind the lens",
        type: projectTypes[1],
        option: optionsList[1],
        status: IN_EDITING_REQUEST_STATUS,
        date: new Date(2024, 6, 15),

    },
    {
        id: generateUniqueId(),
        user: TestUsers[2],
        name: "Growing Visual Stories: Behind the lens",
        type: projectTypes[0],
        option: optionsList[2],
        status: SCHEDULED_REQUEST_STATUS,
        date: new Date(2025, 0, 12),

    },
    {
        id: generateUniqueId(),
        user: TestUsers[3],
        name: "Healing Real Stories: Behind the lens",
        type: projectTypes[2],
        option: optionsList[3],
        status: REQUESTED_REQUEST_STATUS,
        date: new Date(2025, 0, 15),

    },
    {
        id: generateUniqueId(),
        user: TestUsers[0],
        name: "HQ: Behind the lens",
        type: projectTypes[3],
        option: optionsList[0],
        status: ON_HOLD_REQUEST_STATUS,
        date: new Date(2024, 9, 0),

    },
    {
        id: generateUniqueId(),
        user: TestUsers[0],
        name: "XYZ: Behind the lens",
        type: projectTypes[4],
        option: optionsList[1],
        status: CANCELED_REQUEST_STATUS,
        date: new Date(2024, 4, 22),

    },
    {
        id: generateUniqueId(),
        user: TestUsers[1],
        name: "Crafting Visual Stories: Behind the lens",
        type: projectTypes[5],
        option: optionsList[0],
        status: CANCELED_REQUEST_STATUS,
        date: new Date(2024, 4, 22),

    }
    ,
    {
        id: generateUniqueId(),
        user: TestUsers[2],
        name: "Crafting Visual Stories: Behind the lens",
        type: projectTypes[6],
        option: optionsList[2],
        status: CANCELED_REQUEST_STATUS,
        date: new Date(2024, 4, 22),

    }
    ,
    {
        id: generateUniqueId(),
        user: TestUsers[3],
        name: "Crafting Visual Stories: Behind the lens",
        type: projectTypes[7],
        option: optionsList[3],
        status: CANCELED_REQUEST_STATUS,
        date: new Date(2024, 4, 22),

    }

]

const ProjectsPage = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [videoTypes, setVideoTypes] = useState<string[]>([]);
    const [requestTypes, setRequestTypes] = useState<string[]>([]);
    const [users, setUsers] = useState<string[]>([]);
    const [statuses, setStatuses] = useState<string[]>([]);
    const [dateRange, setDateRange] = useState<TRange>(DEFAULT);

    const windowWidth = useWindowWidth();

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

    const filteredProjects = projects.filter((project) => {
        const {
            type: { header: projectType },
            option: { value: projectOption },
            user: { name: userName },
            status: projectStatus,
            name: name,
            date: projectDate,
        } = project;

        const matchesVideoType = videoTypes.length === 0 || videoTypes.includes(projectType);
        const matchesRequestType = requestTypes.length === 0 || requestTypes.includes(projectOption);
        const matchesUser = users.length === 0 || users.includes(userName);
        const matchesStatus = statuses.length === 0 || statuses.includes(projectStatus);
        const matchesSearch = searchQuery.length === 0 ||
            [name, userName, projectType, projectStatus].some((field) =>
                field.toLowerCase().includes(searchQuery.toLowerCase())
            );
        const matchesDate = dateRange === DEFAULT || isDateInRange(projectDate, dateRange);

        return matchesVideoType && matchesRequestType && matchesUser && matchesStatus && matchesSearch && matchesDate;
    });


    return <div className={styles.projectsPage}>
        <div className={styles.projectsPage_header}>
            <div className={styles.projectsPage_header_text} >Projects
                <p>
                    <div className={styles.projectsPage_header_text_divider}></div>
                    {projects.length} requests</p></div>
            <div className={styles.projectsPage_content}>
                <div className={styles.projectsPage_buttons}>
                    <ProjectFilter
                        videoTypes={videoTypes}
                        setVideoTypes={setVideoTypes}
                        requestTypes={requestTypes}
                        setRequestTypes={setRequestTypes}
                        users={users}
                        setUsers={setUsers}
                        statuses={statuses}
                        setStatuses={setStatuses}
                    />
                    <DateFilter dateRange={dateRange} setDateRange={setDateRange} />
                </div>

                <div className={styles.projectsPage_searchContainer}>
                    <input type="text" value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} className={styles.projectsPage_search} placeholder="Search by name, type, etc..." />
                    <div style={{ opacity: searchQuery.length > 0 ? 1 : '' }} className={styles.projectsPage_searchIcon}>
                        <img src={Search} alt="close" />
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.projectsPage_projectHeader}>
            <div className={styles.projectsPage_projectHeader_start}>
                <div className={styles.projectsPage_projectHeader_preview} >Preview</div>
                <div className={styles.projectsPage_projectHeader_start_item} >
                    Project Name
                </div>
            </div>
            <div className={styles.projectsPage_projectHeader_info}>
                <div className={styles.projectsPage_projectHeader_info_request}>
                    {windowWidth > 1100 ? 'Requested By' : " Req. By"}
                </div>
                <div className={`${styles.projectsPage_projectHeader_info_item}`} style={{ justifyContent: 'center' }}>
                    Credit Usage
                </div>
                <div className={`${styles.projectsPage_projectHeader_info_item} ${styles.projectsPage_projectHeader_info_date}`}>Requested date</div>
                <div className={styles.projectsPage_projectHeader_info_item}>
                    Status</div>
                <div className={styles.projectsPage_projectHeader_info_settings}>
                </div>
            </div>
        </div>
        <div className={styles.projectsPage_projects}>
            {filteredProjects
                .map((project, index) => {
                    return <>
                        <div key={project.id} className={styles.project}
                            onMouseEnter={() => {
                                handleMouseEnter(index)
                            }}
                            onMouseLeave={() => {
                                handleMouseLeave(index)
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
                                <div className={styles.project_info_settings}>
                                    <img src={Settings} alt="" />
                                </div>
                            </div>
                            <img className={styles.mobOnly} src={Settings} />
                        </div>
                        <div id={`${index}divider`} className={styles.projectsPage_projects_divider}></div>
                    </>
                })
            }
        </div>
    </div>;
};

export default ProjectsPage;