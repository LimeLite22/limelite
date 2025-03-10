import { Search, User1Foto, User2Foto, User3Foto, User4Foto } from "assets/images";
import { DEFAULT } from "consts/consts";
import useWindowWidth from "hooks/useWindowWidth";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectDrafts } from "../../redux/requests/reducer";
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
const ProjectsPage = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [videoTypes, setVideoTypes] = useState<string[]>([]);
    const [requestTypes, setRequestTypes] = useState<string[]>([]);
    const [users, setUsers] = useState<string[]>([]);
    const [statuses, setStatuses] = useState<string[]>([]);
    const [dateRange, setDateRange] = useState<TRange>(DEFAULT);
    const projects = useSelector(selectDrafts);

    const windowWidth = useWindowWidth();
    console.log('videoTypes', videoTypes)


    const filteredProjects = projects.filter((project) => {

        const matchesVideoType = videoTypes.length === 0 || videoTypes.includes(project.projectInfoSettings.type.header);
        const matchesRequestType = requestTypes.length === 0 || requestTypes.includes(project.projectInfoSettings.option?.value!);
        const matchesUser = users.length === 0 || users.includes(project.overviewInfoSettings.requester.name);
        const matchesStatus = statuses.length === 0 || statuses.includes(project.overviewInfoSettings.status);
        const matchesSearch = searchQuery.length === 0 ||
            [project.overviewInfoSettings.requester.name,
            project.overviewInfoSettings.requester.lastName,
            project.projectInfoSettings.type.header,
            project.overviewInfoSettings.status].some((field) =>
                field.toLowerCase().includes(searchQuery.toLowerCase())
            );
        const matchesDate = dateRange === DEFAULT || isDateInRange(project.overviewInfoSettings.requestDate, dateRange);

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