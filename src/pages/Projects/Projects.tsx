import { Filter, LastDays, Search, SwiperFoto1, User2Foto } from "assets/images";
import { optionsList } from "consts/consts";
import { useState } from "react";
import { format } from "date-fns";
import { generateUniqueId } from "utils/generateId";
import styles from "./ProjectsPage.module.scss";

const ProjectPage = () => {

    const [search, setSearch] = useState<string>("");
    const projects = [
        {
            id: generateUniqueId(),
            img: '',
            name: "Crafting Visual Stories: Behind the lens",
            type: "Type 1",
            account: 'Clay Gerhold',
            option: optionsList[0],
            status:'In editing' ,
            accountFoto: User2Foto,
            date: new Date(),

        }
    ]
    return <div className={styles.projectsPage}>
        <div className={styles.projectsPage_header}>
            <div>Projects</div>
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
        <div className={styles.projectsPage_projects}>
            {
                projects.map((project) => {
                    return <div key={project.id} className={styles.projectsPage_project}>
                        <img className={styles.projectsPage_project_img} src={SwiperFoto1} alt="" />
                        <div className={styles.projectsPage_project_text} >{project.name}</div>

                        <div className={styles.projectsPage_project_info}>
                            <div className={styles.projectsPage_project_account}><img src={project.accountFoto} alt="" /> {project.account}</div>
                            <div className={styles.projectsPage_project_option}>
                                <div className={styles.projectsPage_project_option_credit}>
                                    {project.option?.credits}{" "}
                                    {project.option?.credits > 1 ? "Credits" : "Credit"}
                                </div>

                                {project.option.value}</div>
                            <div className={styles.projectsPage_project_date}>{format(project.date, "dd/MM/yyyy")}</div>
                            <div className={styles.projectsPage_project_status}>{project.status}</div>
                            <div className={styles.projectsPage_project_setting}></div>
                        </div>
                    </div>
                })
            }
        </div>
    </div>;
};

export default ProjectPage;