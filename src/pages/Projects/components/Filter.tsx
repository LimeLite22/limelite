import { ArrowGray, Filter, GapCheck, GapUnCheck } from "assets/images";
import { projectTypes } from "consts/consts";
import { useState } from "react";
import styles from "../ProjectsPage.module.scss";

const ProjectFilter = () => {
    const [isOpened, setIsOpened] = useState(false);
    const [filterMenu, setFilterMenu] = useState<'start' | 'video type' | 'request type' | 'requested by' | 'status'>('start');
    const [selectedVideoTypes, setSelectedVideoTypes] = useState<string[]>([]);
    return (
        <div className={styles.projectsPage_filter} onClick={() => setIsOpened(true)} tabIndex={0} onBlur={() => setIsOpened(false)} ><img src={Filter} alt="filter" /> Filter
            {isOpened &&
                <div className={`${styles.projectsPage_filter_container} ${filterMenu === 'video type' ? styles.projectsPage_filter_container_video : ''}`}>
                    {filterMenu === 'start' && <> <div className={styles.projectsPage_filter_container_header}>Add filters <span>Clear All</span></div>
                        <div className={styles.projectsPage_filter_container_divider}></div>
                        <div className={styles.projectsPage_filter_container_items}>
                            <div className={styles.projectsPage_filter_container_item} onClick={() => setFilterMenu('video type')}>Video Type
                                <img className={styles.projectsPage_filter_container_item_arrow} src={ArrowGray} alt="filter" />
                            </div>
                            <div className={styles.projectsPage_filter_container_item}>Request Type
                                <img className={styles.projectsPage_filter_container_item_arrow} src={ArrowGray} alt="filter" />
                            </div>
                            <div className={styles.projectsPage_filter_container_item}>Requested by
                                <img className={styles.projectsPage_filter_container_item_arrow} src={ArrowGray} alt="filter" />
                            </div>
                            <div className={styles.projectsPage_filter_container_item}>Status
                                <img className={styles.projectsPage_filter_container_item_arrow} src={ArrowGray} alt="filter" />
                            </div>
                        </div>
                    </>
                    }
                    {filterMenu === 'video type' && <>
                        <div className={styles.projectsPage_filter_container_video_header}>
                            <div className={styles.projectsPage_filter_container_video_header_container}>
                                <img src={ArrowGray} onClick={() => setFilterMenu('start')} alt="filter" />
                                Video type
                            </div>
                            <span>{selectedVideoTypes.length}/{projectTypes.length}</span></div>
                        <div className={styles.projectsPage_filter_container_divider}></div>
                        <div className={`${styles.projectsPage_filter_container_items} ${styles.projectsPage_filter_container_videoItems}`}>
                            <div
                                className={`
                        ${styles.projectsPage_filter_container_item} 
                        ${styles.projectsPage_filter_container_videoItem}`}
                                onClick={() => {
                                    if (selectedVideoTypes.length === projectTypes.length) {
                                        setSelectedVideoTypes([])
                                    } else {
                                        let types = []
                                        for (let i = 0; i < projectTypes.length; i++) {
                                            types.push(projectTypes[i].header)
                                        }
                                        setSelectedVideoTypes(types)
                                    }
                                }
                                }>
                                <img src={selectedVideoTypes.length === projectTypes.length ? GapCheck : GapUnCheck} alt={'GapUnCheck'} />
                                All options
                            </div>
                            {projectTypes.map((item) => {
                                return <div
                                    className={`
                            ${styles.projectsPage_filter_container_item} 
                            ${styles.projectsPage_filter_container_videoItem}`}
                                    key={item.id}
                                    onClick={
                                        () => {
                                            if (selectedVideoTypes.includes(item.header)) {
                                                setSelectedVideoTypes(selectedVideoTypes.filter((id) => id !== item.header));
                                            } else {
                                                setSelectedVideoTypes([...selectedVideoTypes, item.header]);
                                            }
                                        }
                                    }
                                >
                                    <img src={selectedVideoTypes.includes(item.header) ? GapCheck : GapUnCheck} alt={'GapUnCheck'} />
                                    {item.header}
                                </div>
                            })}
                        </div>
                    </>
                    }
                </div>}
        </div>
    );
};

export default ProjectFilter;