import { IRequest } from "interfaces/interfaces";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { truncateString } from "utils/truncateString";
import styles from "../Welcome.module.scss";
import copy from "copy-to-clipboard"
import { DetailsProject, DownloadProject, Settings, SettingsMenu, ShareProject, User1Foto } from "assets/images";
import ProjectOverView from "pages/components/ProjectOverview";

interface IProps {
    project: IRequest,
}

const Project = ({ project: item }: IProps) => {
    const [isOverviewOpen, setIsOverviewOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [showCopied, setShowCopied] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [showCopied2, setShowCopied2] = useState(false);
    const [isCopied2, setIsCopied2] = useState(false);

    const link = "https://f.io/ltTc9gLk";
    const link2 = "https://f.io/J9NcL36S";

    const handleCopy = () => {
        copy(link);
        setShowCopied(true);
        setIsCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
    };
    const handleCopy2 = () => {
        copy(link2);
        setIsCopied2(true);
        setShowCopied2(true);
        setTimeout(() => setShowCopied2(false), 2000);
    };
    const handleOpenDetails = () => {
        console.log('df')
        setIsOverviewOpen(true);
        setIsSettingsOpen(false);
    }
    console.log('isSettingsOpen', isSettingsOpen)
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                console.log("111");
                setIsSettingsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            tabIndex={0}
            onBlur={() => {
                setIsSettingsOpen(false);
            }}
            ref={ref}
            className={
                styles.welcomeContainer__content_main_projects_content_projectItem
            }
            onClick={() => {
                console.log('rf');
                setIsOverviewOpen(true);
            }}

        >
            <div
                className={
                    styles.welcomeContainer__content_main_projects_content_projectItem_header
                }
            >
                {truncateString(item.projectInfoSettings.name, 30)}
                <div
                    className={
                        styles.welcomeContainer__content_main_projects_content_projectItem_header_status
                    }
                >
                    {" "}
                    <div
                        className={
                            styles.welcomeContainer__content_main_projects_content_projectItem_header_status_scheduled
                        }
                    >
                        {" "}
                    </div>
                    {item.overviewInfoSettings.status}
                    <div className={styles.project_info_settings}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            console.log('1111343')
                            setIsSettingsOpen(true)
                        }}>
                        <img src={Settings} alt="" />
                        {isSettingsOpen && <div className={styles.project_info_settingsContainer}
                        >
                            <div className={styles.project_info_settingsContainer_item} onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleOpenDetails();
                            }} ><img src={DetailsProject} alt="" />Project Details</div>
                            <div className={styles.project_info_settingsContainer_item} onClick={handleCopy}><img src={ShareProject} alt="" />Review Link</div>
                            <div className={styles.project_info_settingsContainer_item} onClick={handleCopy2}><img src={DownloadProject} alt="" />Download Link</div>
                            {showCopied && <p className={styles.overview_info_content_item_copy2}>Review Link copied!</p>}
                            {showCopied2 && <p className={styles.overview_info_content_item_copy2}>Download link copied!</p>}
                        </div>}
                    </div>
                </div>
            </div>
            <div
                className={
                    styles.welcomeContainer__content_main_projects_content_projectItem_type
                }
            >
                {item.projectInfoSettings.type.header}
            </div>
            <div
                className={
                    styles.welcomeContainer__content_main_projects_content_projectItem_subText
                }
            >
                {item.projectInfoSettings.option?.value}
                <div
                    className={
                        styles.welcomeContainer__content_main_projects_content_projectItem_dot
                    }
                ></div>
                Shoot: 11/12/2025
            </div>
            <div
                className={
                    styles.welcomeContainer__content_main_projects_content_projectItem_credit
                }
            >
                1 Credit
            </div>
            <img
                className={
                    styles.welcomeContainer__content_main_projects_content_projectItem_userIcon
                }
                src={User1Foto}
                alt={"Account"}
            />
            {isOverviewOpen && <ProjectOverView
                project={item}
                close={() => {
                    console.log('close')
                    setIsOverviewOpen(false)
                }
                }
                isCopied={isCopied}
                isCopied2={isCopied2}
                showCopied={showCopied}
                showCopied2={showCopied2}
                handleCopy={handleCopy}
                handleCopy2={handleCopy2}
            />}
        </div>
    )
}

export default Project;