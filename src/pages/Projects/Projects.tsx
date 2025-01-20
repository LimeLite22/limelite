import { Filter, LastDays, Search, Settings, SwiperFoto1, User2Foto } from "assets/images";
import { CANCELED_REQUEST_STATUS, COMPLETE_REQUEST_STATUS, IN_EDITING_REQUEST_STATUS, ON_HOLD_REQUEST_STATUS, optionsList, projectTypes, REQUESTED_REQUEST_STATUS, SCHEDULED_REQUEST_STATUS } from "consts/consts";
import { useState } from "react";
import { format } from "date-fns";
import { generateUniqueId } from "utils/generateId";
import styles from "./ProjectsPage.module.scss";

const ProjectsPage = () => {

    const [search, setSearch] = useState<string>("");
    const projects = [
        {
            id: generateUniqueId(),
            img: '',
            name: "Crafting Visual Stories: Behind the lens",
            type: projectTypes[0],
            account: 'Clay Gerhold',
            option: optionsList[0],
            status: COMPLETE_REQUEST_STATUS,
            accountFoto: User2Foto,
            date: new Date(),

        },
        {
            id: generateUniqueId(),
            img: '',
            name: "Crafting Visual Stories: Behind the lens",
            type:  projectTypes[1],
            account: 'Clay Gerhold',
            option: optionsList[0],
            status: IN_EDITING_REQUEST_STATUS,
            accountFoto: User2Foto,
            date: new Date(),

        },
        {
            id: generateUniqueId(),
            img: '',
            name: "Crafting Visual Stories: Behind the lens",
            type: projectTypes[0],
            account: 'Clay Gerhold',
            option: optionsList[0],
            status: SCHEDULED_REQUEST_STATUS,
            accountFoto: User2Foto,
            date: new Date(),

        },
        {
            id: generateUniqueId(),
            img: '',
            name: "Crafting Visual Stories: Behind the lens",
            type:  projectTypes[2],
            account: 'Clay Gerhold',
            option: optionsList[0],
            status: REQUESTED_REQUEST_STATUS,
            accountFoto: User2Foto,
            date: new Date(),

        },
        {
            id: generateUniqueId(),
            img: '',
            name: "Crafting Visual Stories: Behind the lens",
            type: projectTypes[3],
            account: 'Clay Gerhold',
            option: optionsList[0],
            status: ON_HOLD_REQUEST_STATUS,
            accountFoto: User2Foto,
            date: new Date(),

        },
        {
            id: generateUniqueId(),
            img: '',
            name: "Crafting Visual Stories: Behind the lens",
            type:  projectTypes[4],
            account: 'Clay Gerhold',
            option: optionsList[0],
            status: CANCELED_REQUEST_STATUS,
            accountFoto: User2Foto,
            date: new Date(),

        },
        {
            id: generateUniqueId(),
            img: '',
            name: "Crafting Visual Stories: Behind the lens",
            type:  projectTypes[5],
            account: 'Clay Gerhold',
            option: optionsList[0],
            status: CANCELED_REQUEST_STATUS,
            accountFoto: User2Foto,
            date: new Date(),

        }
        ,
        {
            id: generateUniqueId(),
            img: '',
            name: "Crafting Visual Stories: Behind the lens",
            type: projectTypes[6],
            account: 'Clay Gerhold',
            option: optionsList[0],
            status: CANCELED_REQUEST_STATUS,
            accountFoto: User2Foto,
            date: new Date(),

        }
        ,
        {
            id: generateUniqueId(),
            img: '',
            name: "Crafting Visual Stories: Behind the lens",
            type:  projectTypes[7],
            account: 'Clay Gerhold',
            option: optionsList[0],
            status: CANCELED_REQUEST_STATUS,
            accountFoto: User2Foto,
            date: new Date(),

        }

    ]

    const statusColor = (status: string) => {
        if (status === COMPLETE_REQUEST_STATUS) return `var(--green-dark2)`;
        if (status === IN_EDITING_REQUEST_STATUS) return `var(--pink-dark2)`;
        if (status === SCHEDULED_REQUEST_STATUS) return `var(--yellow-light)`;
        if (status === REQUESTED_REQUEST_STATUS) return `var(--blue)`;
        if (status === ON_HOLD_REQUEST_STATUS) return `var(--orange-light2)`;
        if (status === CANCELED_REQUEST_STATUS) return `var(--red)`;
    }

    return <div className={styles.projectsPage}>
        <div className={styles.projectsPage_header}>
            <div className={styles.projectsPage_header_text} >Projects 
            <p> 
                <div className={styles.projectsPage_header_text_divider}></div>
                {projects.length} requests</p></div>
            <div className={styles.projectsPage_content}>
                <div className={styles.projectsPage_filter}><img src={Filter} alt="filter" /> Filter</div>
                <div className={styles.projectsPage_lastDays}><img src={LastDays} alt="filter" /> Last 30 days</div>
                <div className={styles.projectsPage_searchContainer}>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className={styles.projectsPage_search} placeholder="Search by name, type, etc..." />
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
                projects.map((project,index) => {
                    return <>
           
                     <div key={project.id} className={styles.projectsPage_project} onMouseEnter={()=>{
                        const divider = document.getElementById(`${index - 1}divider`);
                        divider?.style.setProperty('background-color', 'transparent');
                     }}
                     onMouseLeave={()=>{
                        const divider = document.getElementById(`${index - 1}divider`);
                        divider?.style.setProperty('background-color', 'var(--gray-light7)');
                     }}
                     >
                        <div className={styles.projectsPage_project_start}>
                            <img className={styles.projectsPage_project_img} src={SwiperFoto1} alt="" />
                            <div className={styles.projectsPage_project_start_item} >
                                <div className={styles.projectsPage_project_start_item_header}>{project.name}</div>
                                <div className={styles.projectsPage_project_start_item_option}>
                                <img src={project.type.img} alt='' />     {project.type.header}    /  <img src={project.option.img} alt='' /> {project.option.value}</div>
                            </div>
                        </div>
                        <div className={styles.projectsPage_project_info}>
                            <div className={styles.projectsPage_project_info_request}>
                                <img src={project.accountFoto} alt="" /> {project.account}
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