import { LastDays, Search, Settings, SwiperFoto1, User1Foto, User2Foto, User3Foto, User4Foto } from "assets/images";
import { CANCELED_REQUEST_STATUS, COMPLETE_REQUEST_STATUS, IN_EDITING_REQUEST_STATUS, ON_HOLD_REQUEST_STATUS, optionsList, projectTypes, REQUESTED_REQUEST_STATUS, SCHEDULED_REQUEST_STATUS } from "consts/consts";
import { useState } from "react";
import { format } from "date-fns";
import { generateUniqueId } from "utils/generateId";
import styles from "./ProjectsPage.module.scss";
import { statusColor } from "utils/statusColors";
import ProjectFilter from "./components/Filter";
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
        date: new Date(),

    },
    {
        id: generateUniqueId(),
        user: TestUsers[1],
        name: "Crafting Visual Stories: Behind the lens",
        type: projectTypes[1],
        option: optionsList[1],
        status: IN_EDITING_REQUEST_STATUS,
        date: new Date(),

    },
    {
        id: generateUniqueId(),
        user: TestUsers[2],
        name: "Crafting Visual Stories: Behind the lens",
        type: projectTypes[0],
        option: optionsList[2],
        status: SCHEDULED_REQUEST_STATUS,
        date: new Date(),

    },
    {
        id: generateUniqueId(),
        user: TestUsers[3],
        name: "Crafting Visual Stories: Behind the lens",
        type: projectTypes[2],
        option: optionsList[3],
        status: REQUESTED_REQUEST_STATUS,
        date: new Date(),

    },
    {
        id: generateUniqueId(),
        user: TestUsers[0],
        name: "Crafting Visual Stories: Behind the lens",
        type: projectTypes[3],
        option: optionsList[0],
        status: ON_HOLD_REQUEST_STATUS,
        date: new Date(),

    },
    {
        id: generateUniqueId(),
        user: TestUsers[0],
        name: "Crafting Visual Stories: Behind the lens",
        type: projectTypes[4],
        option: optionsList[1],
        status: CANCELED_REQUEST_STATUS,
        date: new Date(),

    },
    {
        id: generateUniqueId(),
        user: TestUsers[1],
        name: "Crafting Visual Stories: Behind the lens",
        type: projectTypes[5],
        option: optionsList[0],
        status: CANCELED_REQUEST_STATUS,
        date: new Date(),

    }
    ,
    {
        id: generateUniqueId(),
        user: TestUsers[2],
        name: "Crafting Visual Stories: Behind the lens",
        type: projectTypes[6],
        option: optionsList[2],
        status: CANCELED_REQUEST_STATUS,
        date: new Date(),

    }
    ,
    {
        id: generateUniqueId(),
        user: TestUsers[3],
        name: "Crafting Visual Stories: Behind the lens",
        type: projectTypes[7],
        option: optionsList[3],
        status: CANCELED_REQUEST_STATUS,
        date: new Date(),

    }

]

const ProjectsPage = () => {

    const [search, setSearch] = useState<string>("");

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedVideoTypes, setSelectedVideoTypes] = useState<string[]>([]);
    const [selectedRequestTypes, setSelectedRequestTypes] = useState<string[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    // const highlightText = (text: string, query: string) => {
    //     if (!query) return text;

    //     const regex = new RegExp(`(${query})`, "gi");
    //     return text.replace(regex, `<span style="background-color: yellow; class="${styles.highlight}">$1</span>`);
    // };


    return <div className={styles.projectsPage}>
        <div className={styles.projectsPage_header}>
            <div className={styles.projectsPage_header_text} >Projects
                <p>
                    <div className={styles.projectsPage_header_text_divider}></div>
                    {projects.length} requests</p></div>
            <div className={styles.projectsPage_content}>
                <ProjectFilter
                    selectedVideoTypes={selectedVideoTypes}
                    setSelectedVideoTypes={setSelectedVideoTypes}
                    selectedRequestTypes={selectedRequestTypes}
                    setSelectedRequestTypes={setSelectedRequestTypes}
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                    selectedStatuses={selectedStatuses}
                    setSelectedStatuses={setSelectedStatuses}
                />
                <div className={styles.projectsPage_lastDays}><img src={LastDays} alt="filter" /> Last 30 days</div>
                <div className={styles.projectsPage_searchContainer}>
                    <input type="text" value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} className={styles.projectsPage_search} placeholder="Search by name, type, etc..." />
                    <div style={{ opacity: search.length > 0 ? 1 : '' }} className={styles.projectsPage_searchIcon}>
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
                    Requested By
                </div>
                <div className={`${styles.projectsPage_projectHeader_info_item}`}>
                    Credit Usage
                </div>
                <div className={styles.projectsPage_projectHeader_info_item}>Requested date</div>
                <div className={styles.projectsPage_projectHeader_info_item}>
                    Status</div>
                <div className={styles.projectsPage_projectHeader_info_settings}>
                </div>
            </div>
        </div>
        <div className={styles.projectsPage_projects}>
            {

                projects.filter(
                    (project) => {
                        let matchesVideoType = true;
                        let matchesRequestType = true;
                        let matchesUser = true;
                        let matchesStatus = true;
                        if (selectedVideoTypes.length > 0) {
                            matchesVideoType = selectedVideoTypes.includes(project.type.header);
                        }

                        if (selectedRequestTypes.length > 0) {
                            matchesRequestType = selectedRequestTypes.includes(project.option.value);
                        }

                        if (selectedUsers.length > 0) {
                            matchesUser = selectedUsers.includes(project.user.name);
                        }

                        if (selectedStatuses.length > 0) {
                            matchesStatus = selectedStatuses.includes(project.status);
                        }
                        return matchesVideoType && matchesRequestType && matchesUser && matchesStatus;

                    }
                ).map((project, index) => {
                    const matchesQuery = [project.name, project.user.name, project.type.header, project.status]
                        .some(field => field.toLowerCase().includes(searchQuery.toLowerCase()));
                    return <>

                        <div key={project.id} className={styles.projectsPage_project} onMouseEnter={() => {
                            const divider = document.getElementById(`${index - 1}divider`);
                            divider?.style.setProperty('background-color', 'transparent');
                        }}
                            onMouseLeave={() => {
                                const divider = document.getElementById(`${index - 1}divider`);
                                divider?.style.setProperty('background-color', 'var(--gray-light7)');
                            }}
                        >
                            <div className={styles.projectsPage_project_start}>
                                <img className={styles.projectsPage_project_img} src={SwiperFoto1} alt="" />
                                <div className={styles.projectsPage_project_start_item} >
                                    <div className={styles.projectsPage_project_start_item_header}
                                    // dangerouslySetInnerHTML={{
                                    //     __html: highlightText(project.name, searchQuery),
                                    // }}
                                    >{project.name}</div>
                                    <div className={styles.projectsPage_project_start_item_option}>
                                        <img src={project.type.img} alt='' />     {project.type.header}    /  <img src={project.option.img} alt='' /> {project.option.value}</div>
                                </div>
                            </div>
                            <div className={styles.projectsPage_project_info}>
                                <div className={styles.projectsPage_project_info_request}>
                                    <img src={project.user.img} alt="" /> {project.user.name}
                                </div>
                                <div className={`${styles.projectsPage_project_info_item}`}>
                                    <div className={`${styles.projectsPage_project_credit}`}>
                                        {project.option?.credits}{" "}
                                        {project.option?.credits > 1 ? "Credits" : "Credit"}
                                    </div>
                                </div>
                                <div className={styles.projectsPage_project_info_item}>{format(project.date, "dd/MM/yyyy")}</div>
                                <div className={styles.projectsPage_project_info_item}>
                                    <div className={styles.projectsPage_project_info_status} style={{ backgroundColor: statusColor(project.status) }} ></div>
                                    {project.status}</div>
                                <div className={styles.projectsPage_project_info_settings}>
                                    <img src={Settings} alt="" />
                                </div>
                            </div>
                        </div>
                        <div id={`${index}divider`} className={styles.projectsPage_projects_divider}></div>
                    </>
                })
            }
        </div>
    </div>;
};

export default ProjectsPage;