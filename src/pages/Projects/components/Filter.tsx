import { ArrowGray, CloseRed, Filter, GapCheck, GapUnCheck } from "assets/images";
import { CANCELED_REQUEST_STATUS, COMPLETE_REQUEST_STATUS, FILTER_REQUEST_TYPE, FILTER_REQUESTED_BY, FILTER_START, FILTER_STATUS, FILTER_VIDEO_TYPE, IN_EDITING_REQUEST_STATUS, ON_HOLD_REQUEST_STATUS, optionsList, projectTypes, REQUESTED_REQUEST_STATUS, SCHEDULED_REQUEST_STATUS } from "consts/consts";
import useWindowWidth from "hooks/useWindowWidth";
import { useEffect, useState } from "react";
import { Sheet } from "react-modal-sheet";
import { TFilterMenu } from "types/types";
import { statusColor } from "utils/statusColors";
import { truncateString } from "utils/truncateString";

import { TestUsers } from "../Projects";
import styles from "../ProjectsPage.module.scss";
const statusList = [COMPLETE_REQUEST_STATUS, IN_EDITING_REQUEST_STATUS, REQUESTED_REQUEST_STATUS, SCHEDULED_REQUEST_STATUS, ON_HOLD_REQUEST_STATUS, CANCELED_REQUEST_STATUS,];
interface IProps {
    videoTypes: string[];
    requestTypes: string[];
    users: string[];
    statuses: string[];
    setVideoTypes: React.Dispatch<React.SetStateAction<string[]>>;
    setRequestTypes: React.Dispatch<React.SetStateAction<string[]>>;
    setUsers: React.Dispatch<React.SetStateAction<string[]>>;
    setStatuses: React.Dispatch<React.SetStateAction<string[]>>;

}
//  треба буде зробити динамічну висоту для контейнера списку юзерів в моб версії
const ProjectFilter = ({ videoTypes, requestTypes, users, statuses, setVideoTypes, setRequestTypes, setUsers, setStatuses }: IProps) => {

    const [isOpened, setIsOpened] = useState(false);
    const [filterMenu, setFilterMenu] = useState<TFilterMenu>(FILTER_START);
    const [filterCount, setFilterCount] = useState(0);
    const width = useWindowWidth();

    const handleClearAll = () => {
        setVideoTypes([]);
        setRequestTypes([]);
        setUsers([]);
        setStatuses([]);
    }
    const handleBack = () => {
        setFilterMenu(FILTER_START);
    }
    const toggleSelectAllVideos = () => {
        if (videoTypes.length === projectTypes.length) {
            setVideoTypes([])
        } else {
            let types = []
            for (let i = 0; i < projectTypes.length; i++) {
                types.push(projectTypes[i].header)
            }
            setVideoTypes(types)
        }
    }
    const toggleSelectVideo = (header: string) => {
        if (videoTypes.includes(header)) {
            setVideoTypes(videoTypes.filter((type) => type !== header));
        } else {
            setVideoTypes([...videoTypes, header]);
        }
    }
    const toggleSelectAllRequestTypes = () => {
        if (requestTypes.length === optionsList.length) {
            (setRequestTypes([]))
        } else {
            let types = []
            for (let i = 0; i < optionsList.length; i++) {
                types.push(optionsList[i].value)
            }
            setRequestTypes(types)
        }
    }
    const toggleSelectRequestType = (value: string) => {
        if (requestTypes.includes(value)) {
            (setRequestTypes(requestTypes.filter((id) => id !== value)));
        } else {
            setRequestTypes([...requestTypes, value]);
        }
    }
    const toggleSelectAllRequestByTypes = () => {
        if (users.length === TestUsers.length) {
            (setUsers([]))
        } else {
            let types = []
            for (let i = 0; i < TestUsers.length; i++) {
                types.push(TestUsers[i].name)
            }
            setUsers(types)
        }
    }
    const toggleSelectRequestByType = (name: string) => {
        if (users.includes(name)) {
            (setUsers(users.filter((id) => id !== name)));
        } else {
            setUsers([...users, name]);
        }
    }
    const toggleSelectAllStatuses = () => {
        if (statuses.length === statusList.length) {
            (setStatuses([]))
        } else {
            let types = []
            for (let i = 0; i < statusList.length; i++) {
                types.push(statusList[i])
            }
            setStatuses(types)
        }
    }
    const toggleSelectStatus = (status: string) => {

    }
    const isRRV = filterMenu === FILTER_REQUESTED_BY || filterMenu === FILTER_VIDEO_TYPE || filterMenu === FILTER_REQUEST_TYPE

    useEffect(() => {
        let count = 0;
        videoTypes.length > 0 && count++;
        requestTypes.length > 0 && count++;
        users.length > 0 && count++;
        statuses.length > 0 && count++;
        setFilterCount(count)
    }, [videoTypes, requestTypes, users, statuses])


    const content = <>
        {filterMenu === FILTER_START && <>
            <div className={styles.filter_container_header}>Add filters <span onClick={handleClearAll}>Clear All</span></div>
            <div className={styles.filter_container_divider}></div>
            <div className={styles.filter_container_items}>
                <div
                    className={styles.filter_container_item}
                    onClick={() => setFilterMenu(FILTER_VIDEO_TYPE)}>
                    Video Type
                    {videoTypes.length > 0
                        &&
                        <span>
                            {truncateString(videoTypes[0])} {videoTypes.length > 1 ? `,+${videoTypes.length - 1}` : ''}
                        </span>}
                    <img className={styles.filter_container_item_arrow} src={ArrowGray} alt="filter" />
                </div>
                <div
                    className={styles.filter_container_item}
                    onClick={() => setFilterMenu(FILTER_REQUEST_TYPE)}>
                    Request Type
                    {requestTypes.length > 0
                        &&
                        <span>
                            {truncateString(requestTypes[0])} {requestTypes.length > 1 ? `,+${requestTypes.length - 1}` : ''}
                        </span>}
                    <img className={styles.filter_container_item_arrow} src={ArrowGray} alt="filter" />
                </div>
                <div
                    className={styles.filter_container_item}
                    onClick={() => setFilterMenu(FILTER_REQUESTED_BY)}>
                    Requested by
                    <img className={styles.filter_container_item_arrow} src={ArrowGray} alt="filter" />
                    {users.length > 0
                        && <span>
                            {truncateString(users[0])} {users.length > 1 ? `,+${users.length - 1}` : ''}
                        </span>}
                </div>
                <div
                    className={styles.filter_container_item}
                    onClick={() => setFilterMenu(FILTER_STATUS)}>
                    Status
                    <img className={styles.filter_container_item_arrow} src={ArrowGray} alt="filter" />
                    {statuses.length > 0
                        &&
                        <span>
                            {truncateString(statuses[0])} {statuses.length > 1 ? `,+${statuses.length - 1}` : ''}
                        </span>}
                </div>
            </div>
        </>
        }
        {filterMenu === FILTER_VIDEO_TYPE && <>
            <div className={styles.filter_container_video_header}>
                <div className={styles.filter_container_video_header_container}>
                    <img src={ArrowGray} onClick={handleBack} alt="filter" />
                    Video type
                </div>
                <span>{videoTypes.length}/{projectTypes.length}</span></div>
            <div className={styles.filter_container_divider}></div>
            <div className={`${styles.filter_container_items} ${styles.filter_container_videoItems}`}>
                <div
                    className={`
                        ${styles.filter_container_item} 
                        ${styles.filter_container_videoItem}`}
                    onClick={toggleSelectAllVideos}>
                    <img src={videoTypes.length === projectTypes.length ? GapCheck : GapUnCheck} alt={'GapUnCheck'} />
                    All options
                </div>
                {projectTypes.map((item) => {
                    return <div
                        className={`
                            ${styles.filter_container_item} 
                            ${styles.filter_container_videoItem}`}
                        key={item.id}
                        onClick={() => { toggleSelectVideo(item.header) }
                        }
                    >
                        <img src={videoTypes.includes(item.header) ? GapCheck : GapUnCheck} alt={'GapUnCheck'} />
                        {item.header}
                    </div>
                })}
            </div>
        </>
        }
        {filterMenu === FILTER_REQUEST_TYPE && <>
            <div className={styles.filter_container_video_header}>
                <div className={styles.filter_container_video_header_container}>
                    <img src={ArrowGray} onClick={handleBack} alt="filter" />
                    Request Type
                </div>
                <span>{optionsList.length}/{requestTypes.length}</span></div>
            <div className={styles.filter_container_divider}></div>
            <div className={`${styles.filter_container_items} ${styles.filter_container_videoItems}`}>
                <div
                    className={`
                        ${styles.filter_container_item} 
                        ${styles.filter_container_videoItem}`}
                    onClick={toggleSelectAllRequestTypes}>
                    <img src={requestTypes.length === optionsList.length ? GapCheck : GapUnCheck} alt={'GapUnCheck'} />
                    All options
                </div>
                {optionsList.map((item) => {
                    return <div
                        className={`
                            ${styles.filter_container_item} 
                            ${styles.filter_container_videoItem}`}
                        key={item.id}
                        onClick={() => { toggleSelectRequestType(item.value) }
                        }
                    >
                        <img src={requestTypes.includes(item.value) ? GapCheck : GapUnCheck} alt={'GapUnCheck'} />
                        {item.value}
                    </div>
                })}
            </div>
        </>
        }
        {filterMenu === FILTER_REQUESTED_BY && <>
            <div className={styles.filter_container_video_header}>
                <div className={styles.filter_container_video_header_container}>
                    <img src={ArrowGray} onClick={handleBack} alt="filter" />
                    Request Type
                </div>
                <span>{users.length}/{TestUsers.length}</span></div>
            <div className={styles.filter_container_divider}></div>
            <div className={`${styles.filter_container_items} ${styles.filter_container_videoItems}`}>
                <div
                    className={`
                        ${styles.filter_container_item} 
                        ${styles.filter_container_videoItem}`}
                    onClick={toggleSelectAllRequestByTypes}>
                    <img src={users.length === TestUsers.length ? GapCheck : GapUnCheck} alt={'GapUnCheck'} />
                    All options
                </div>
                {TestUsers.map((item) => {
                    return <div
                        className={`
                            ${styles.filter_container_item} 
                            ${styles.filter_container_videoItem}`}
                        key={item.id}
                        onClick={() => { toggleSelectRequestByType(item.name) }
                        }
                    >
                        <img src={users.includes(item.name) ? GapCheck : GapUnCheck} alt={'GapUnCheck'} />
                        <img className={styles.filter_container_item_img} src={item.img} alt="user" />
                        {item.name}
                    </div>
                })}
            </div>
        </>
        }
        {filterMenu === FILTER_STATUS && <>
            <div className={styles.filter_container_video_header}>
                <div className={styles.filter_container_video_header_container}>
                    <img src={ArrowGray} onClick={handleBack} alt="filter" />
                    Status Type
                </div>
                <span>{statuses.length}/{statusList.length}</span></div>
            <div className={styles.filter_container_divider}></div>
            <div className={`${styles.filter_container_items} ${styles.filter_container_statusItems}`}>
                <div
                    className={`
                        ${styles.filter_container_item} 
                        ${styles.filter_container_videoItem}`}
                    onClick={toggleSelectAllStatuses}
                >
                    <img src={statuses.length === statusList.length ? GapCheck : GapUnCheck} alt={'GapUnCheck'} />
                    All options
                </div>
                {statusList.map((item) => {
                    return <div
                        className={`
                            ${styles.filter_container_item} 
                            ${styles.filter_container_videoItem}`}
                        key={item}
                        onClick={() => { toggleSelectStatus(item) }
                        }
                    >
                        <img src={statuses.includes(item) ? GapCheck : GapUnCheck} alt={'GapUnCheck'} />
                        <div className={styles.filter_status} style={{ backgroundColor: statusColor(item) }} ></div>
                        {item}
                    </div>
                })}
            </div>
        </>
        }
    </>


    return (
        <div className={styles.filter} onClick={() => setIsOpened(true)} tabIndex={0} onBlur={() => {
            width > 990 && setIsOpened(false)
            width > 990 && setFilterMenu(FILTER_START)
        }
        } ><img src={Filter} alt="filter" /> Filter  {filterCount > 0 &&
            <>
                <div className={styles.filter_dot}></div>
                <span className={styles.filter_count}>{filterCount} </span>
                <img src={CloseRed} alt="filter" onClick={(e) => {
                    e.stopPropagation();
                    setIsOpened(false);
                    handleClearAll();
                }} />
            </>
            }
            {width > 990 && isOpened &&
                <div className={`
                ${styles.filter_container} 
                ${isRRV ? styles.filter_container_video : ''}
                ${filterMenu === FILTER_STATUS ? styles.filter_container_status : ''}`}
                >
                    {content}
                </div>}
            {width < 990 && isOpened && (
                <Sheet
                    isOpen={isOpened}
                    onClose={() => { setIsOpened(false) }}
                    className={styles.dateRange_sheetMain}
                    detent="full-height"
                >
                    <div
                        className={`${styles.dateRange_closeArea}  
                        ${isRRV ? styles.dateRange_medium_closeArea : ''}
                        ${(filterMenu === FILTER_STATUS) ? styles.dateRange_high_closeArea : ''}`}
                        onClick={(e) => {
                            console.log('close');
                            e.stopPropagation();
                            setIsOpened(false)
                        }}
                    ></div>
                    <Sheet.Container className={`${styles.dateRange_sheet}  
                        ${isRRV ? styles.dateRange_medium_container : ''}
                        ${filterMenu === FILTER_STATUS ? styles.dateRange_high_container : ''}`}>
                        <Sheet.Content >
                            <div className={styles.dateRange_line}></div>
                            <div className={styles.dateRange_container}>
                                {content}
                            </div>
                        </Sheet.Content>
                    </Sheet.Container>
                </Sheet>
            )}
        </div>
    );
};

export default ProjectFilter;