import { ArrowGray, Filter, GapCheck, GapUnCheck } from "assets/images";
import { CANCELED_REQUEST_STATUS, COMPLETE_REQUEST_STATUS, FILTER_REQUEST_TYPE, FILTER_REQUESTED_BY, FILTER_START, FILTER_STATUS, FILTER_VIDEO_TYPE, IN_EDITING_REQUEST_STATUS, ON_HOLD_REQUEST_STATUS, optionsList, projectTypes, REQUESTED_REQUEST_STATUS, SCHEDULED_REQUEST_STATUS } from "consts/consts";
import { useState } from "react";
import { TFilterMenu } from "types/types";
import { statusColor } from "utils/statusColors";
import { truncateString } from "utils/truncateString";

import { TestUsers } from "../Projects";
import styles from "../ProjectsPage.module.scss";
const statusList = [COMPLETE_REQUEST_STATUS, IN_EDITING_REQUEST_STATUS, REQUESTED_REQUEST_STATUS, SCHEDULED_REQUEST_STATUS, ON_HOLD_REQUEST_STATUS, CANCELED_REQUEST_STATUS,];
interface IProps {
    selectedVideoTypes: string[];
    selectedRequestTypes: string[];
    selectedUsers: string[];
    selectedStatuses: string[];
    setSelectedVideoTypes: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedRequestTypes: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedStatuses: React.Dispatch<React.SetStateAction<string[]>>;

}
const ProjectFilter = ({ selectedVideoTypes, selectedRequestTypes, selectedUsers, selectedStatuses, setSelectedVideoTypes, setSelectedRequestTypes, setSelectedUsers, setSelectedStatuses }: IProps) => {

    const [isOpened, setIsOpened] = useState(false);
    const [filterMenu, setFilterMenu] = useState<TFilterMenu>(FILTER_START);

    const handleClearAll = () => {
        setSelectedVideoTypes([]);
        setSelectedRequestTypes([]);
        setSelectedUsers([]);
        setSelectedStatuses([]);
    }

    const handleBack = () => {
        setFilterMenu(FILTER_START);
    }


    return (
        <div className={styles.projectsPage_filter} onClick={() => setIsOpened(true)} tabIndex={0} onBlur={() => {
            setIsOpened(false)
            setFilterMenu(FILTER_START)
        }

        } ><img src={Filter} alt="filter" /> Filter
            {isOpened &&
                <div className={`
                ${styles.projectsPage_filter_container} 
                ${(filterMenu === FILTER_REQUEST_TYPE ||
                        filterMenu === FILTER_VIDEO_TYPE ||
                        filterMenu === FILTER_REQUESTED_BY)
                        ? styles.projectsPage_filter_container_video : ''}
                    ${filterMenu === FILTER_STATUS
                        ? styles.projectsPage_filter_container_status : ''}
                    

                    `}>
                    {filterMenu === FILTER_START && <> <div className={styles.projectsPage_filter_container_header}>Add filters <span onClick={handleClearAll}>Clear All</span></div>
                        <div className={styles.projectsPage_filter_container_divider}></div>
                        <div className={styles.projectsPage_filter_container_items}>
                            <div className={styles.projectsPage_filter_container_item} onClick={() => setFilterMenu(FILTER_VIDEO_TYPE)}>Video Type
                                {selectedVideoTypes.length > 0 && <span>{truncateString(selectedVideoTypes[0])} {selectedVideoTypes.length > 1 ? `,+${selectedVideoTypes.length - 1}` : ''}</span>}
                                <img className={styles.projectsPage_filter_container_item_arrow} src={ArrowGray} alt="filter" />
                            </div>
                            <div className={styles.projectsPage_filter_container_item} onClick={() => setFilterMenu(FILTER_REQUEST_TYPE)}>Request Type
                                {selectedRequestTypes.length > 0 && <span>{truncateString(selectedRequestTypes[0])} {selectedRequestTypes.length > 1 ? `,+${selectedRequestTypes.length - 1}` : ''}</span>}
                                <img className={styles.projectsPage_filter_container_item_arrow} src={ArrowGray} alt="filter" />
                            </div>
                            <div className={styles.projectsPage_filter_container_item} onClick={() => setFilterMenu(FILTER_REQUESTED_BY)}>Requested by
                                <img className={styles.projectsPage_filter_container_item_arrow} src={ArrowGray} alt="filter" />
                                {selectedUsers.length > 0 && <span>{truncateString(selectedUsers[0])} {selectedUsers.length > 1 ? `,+${selectedUsers.length - 1}` : ''}</span>}
                            </div>
                            <div className={styles.projectsPage_filter_container_item} onClick={() => setFilterMenu(FILTER_STATUS)}>Status
                                <img className={styles.projectsPage_filter_container_item_arrow} src={ArrowGray} alt="filter" />
                                {selectedStatuses.length > 0 && <span>{truncateString(selectedStatuses[0])} {selectedStatuses.length > 1 ? `,+${selectedStatuses.length - 1}` : ''}</span>}
                            </div>
                        </div>
                    </>
                    }
                    {filterMenu === FILTER_VIDEO_TYPE && <>
                        <div className={styles.projectsPage_filter_container_video_header}>
                            <div className={styles.projectsPage_filter_container_video_header_container}>
                                <img src={ArrowGray} onClick={handleBack} alt="filter" />
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
                    {filterMenu === FILTER_REQUEST_TYPE && <>
                        <div className={styles.projectsPage_filter_container_video_header}>
                            <div className={styles.projectsPage_filter_container_video_header_container}>
                                <img src={ArrowGray} onClick={handleBack} alt="filter" />
                                Request Type
                            </div>
                            <span>{optionsList.length}/{selectedRequestTypes.length}</span></div>
                        <div className={styles.projectsPage_filter_container_divider}></div>
                        <div className={`${styles.projectsPage_filter_container_items} ${styles.projectsPage_filter_container_videoItems}`}>
                            <div
                                className={`
                        ${styles.projectsPage_filter_container_item} 
                        ${styles.projectsPage_filter_container_videoItem}`}
                                onClick={() => {
                                    if (selectedRequestTypes.length === optionsList.length) {
                                        (setSelectedRequestTypes([]))
                                    } else {
                                        let types = []
                                        for (let i = 0; i < optionsList.length; i++) {
                                            types.push(optionsList[i].value)
                                        }
                                        setSelectedRequestTypes(types)
                                    }
                                }
                                }>
                                <img src={selectedRequestTypes.length === optionsList.length ? GapCheck : GapUnCheck} alt={'GapUnCheck'} />
                                All options
                            </div>
                            {optionsList.map((item) => {
                                return <div
                                    className={`
                            ${styles.projectsPage_filter_container_item} 
                            ${styles.projectsPage_filter_container_videoItem}`}
                                    key={item.id}
                                    onClick={
                                        () => {
                                            if (selectedRequestTypes.includes(item.value)) {
                                                (setSelectedRequestTypes(selectedRequestTypes.filter((id) => id !== item.value)));
                                            } else {
                                                setSelectedRequestTypes([...selectedRequestTypes, item.value]);
                                            }
                                        }
                                    }
                                >
                                    <img src={selectedRequestTypes.includes(item.value) ? GapCheck : GapUnCheck} alt={'GapUnCheck'} />
                                    {item.value}
                                </div>
                            })}
                        </div>
                    </>
                    }
                    {filterMenu === FILTER_REQUESTED_BY && <>
                        <div className={styles.projectsPage_filter_container_video_header}>
                            <div className={styles.projectsPage_filter_container_video_header_container}>
                                <img src={ArrowGray} onClick={handleBack} alt="filter" />
                                Request Type
                            </div>
                            <span>{selectedUsers.length}/{TestUsers.length}</span></div>
                        <div className={styles.projectsPage_filter_container_divider}></div>
                        <div className={`${styles.projectsPage_filter_container_items} ${styles.projectsPage_filter_container_videoItems}`}>
                            <div
                                className={`
                        ${styles.projectsPage_filter_container_item} 
                        ${styles.projectsPage_filter_container_videoItem}`}
                                onClick={() => {
                                    if (selectedUsers.length === TestUsers.length) {
                                        (setSelectedUsers([]))
                                    } else {
                                        let types = []
                                        for (let i = 0; i < TestUsers.length; i++) {
                                            types.push(TestUsers[i].name)
                                        }
                                        setSelectedUsers(types)
                                    }
                                }
                                }>
                                <img src={selectedUsers.length === TestUsers.length ? GapCheck : GapUnCheck} alt={'GapUnCheck'} />
                                All options
                            </div>
                            {TestUsers.map((item) => {
                                return <div
                                    className={`
                            ${styles.projectsPage_filter_container_item} 
                            ${styles.projectsPage_filter_container_videoItem}`}
                                    key={item.id}
                                    onClick={
                                        () => {
                                            if (selectedUsers.includes(item.name)) {
                                                (setSelectedUsers(selectedUsers.filter((id) => id !== item.name)));
                                            } else {
                                                setSelectedUsers([...selectedUsers, item.name]);
                                            }
                                        }
                                    }
                                >
                                    <img src={selectedUsers.includes(item.name) ? GapCheck : GapUnCheck} alt={'GapUnCheck'} />
                                    <img className={styles.projectsPage_filter_container_item_img} src={item.img} alt="user" />
                                    {item.name}
                                </div>
                            })}
                        </div>
                    </>
                    }
                    {filterMenu === FILTER_STATUS && <>
                        <div className={styles.projectsPage_filter_container_video_header}>
                            <div className={styles.projectsPage_filter_container_video_header_container}>
                                <img src={ArrowGray} onClick={handleBack} alt="filter" />
                                Status Type
                            </div>
                            <span>{selectedStatuses.length}/{statusList.length}</span></div>
                        <div className={styles.projectsPage_filter_container_divider}></div>
                        <div className={`${styles.projectsPage_filter_container_items} ${styles.projectsPage_filter_container_statusItems}`}>
                            <div
                                className={`
                        ${styles.projectsPage_filter_container_item} 
                        ${styles.projectsPage_filter_container_videoItem}`}
                                onClick={() => {
                                    if (selectedStatuses.length === statusList.length) {
                                        (setSelectedStatuses([]))
                                    } else {
                                        let types = []
                                        for (let i = 0; i < statusList.length; i++) {
                                            types.push(statusList[i])
                                        }
                                        setSelectedStatuses(types)
                                    }
                                }
                                }>
                                <img src={selectedStatuses.length === statusList.length ? GapCheck : GapUnCheck} alt={'GapUnCheck'} />
                                All options
                            </div>
                            {statusList.map((item) => {
                                return <div
                                    className={`
                            ${styles.projectsPage_filter_container_item} 
                            ${styles.projectsPage_filter_container_videoItem}`}
                                    key={item}
                                    onClick={
                                        () => {
                                            if (selectedStatuses.includes(item)) {
                                                (setSelectedStatuses(selectedStatuses.filter((id) => id !== item)));
                                            } else {
                                                setSelectedStatuses([...selectedStatuses, item]);
                                            }
                                        }
                                    }
                                >
                                    <img src={selectedStatuses.includes(item) ? GapCheck : GapUnCheck} alt={'GapUnCheck'} />
                                    <div className={styles.projectsPage_filter_status} style={{ backgroundColor: statusColor(item) }} ></div>
                                    {item}
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