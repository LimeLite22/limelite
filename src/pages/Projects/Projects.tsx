import { Search, User1Foto, User2Foto, User3Foto, User4Foto } from "assets/images";
import { CANCELED_REQUEST_STATUS, COMPLETE_REQUEST_STATUS, DEFAULT, IN_EDITING_REQUEST_STATUS, ON_HOLD_REQUEST_STATUS, optionsList, projectTypes, REQUESTED_REQUEST_STATUS, SCHEDULED_REQUEST_STATUS } from "consts/consts";
import useWindowWidth from "hooks/useWindowWidth";
import { useState } from "react";
import { TRange } from "types/types";
import { isDateInRange } from "utils/dateRange";
import { generateUniqueId } from "utils/generateId";

import DateFilter from "./components/DateFilter";
import ProjectFilter from "./components/Filter";
import Project from "./components/Project";
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


    const filteredProjects = projects.filter((project) => {
        const {
            type: { header: projectType },
            option: { value: projectOption },
            user: { name: userName },
            status: projectStatus,
            name,
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
                        <Project key={index} project={project} index={index} searchQuery={searchQuery} />
                    </>
                })
            }
        </div>
    </div>;
};

export default ProjectsPage;