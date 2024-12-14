import { IRequest } from "interfaces/interfaces";


import styles from "../NewRequestStart.module.scss";
import { Copy, Delete, SettingsMenu, User1Foto } from "assets/images";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteDraft } from "../../../../redux/requests/reducer";
import { format } from "date-fns";
import { DEFAULT } from "consts/consts";

interface IProps {
    draft: IRequest;
    index: number
}
const DraftItem = ({ draft, index }: IProps) => {
    const dispatch = useDispatch();
    const [isSettingsMenuOpened, setIsSettingsMenuOpened] = useState(false);
    const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsSettingsMenuOpened(true);
    };

    return <>
        {/* <div
            className={styles.nR_content_projects_content_projectItem}
            onContextMenu={handleRightClick}
            tabIndex={0}
            onBlur={() => {
                setIsSettingsMenuOpened(false);
            }}
        >
            {isSettingsMenuOpened && <div
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                className={styles.nR_content_projects_content_projectItem_settingsMenu}
            >
                <div className={styles.nR_content_projects_content_projectItem_settingsMenu_item}>
                    <img src={Copy} alt={"Copy"} />
                    Copy link</div>
                <div className={styles.nR_content_projects_content_projectItem_settingsMenu_item} onClick={
                    () => {
                        dispatch(deleteDraft(draft.id))
                    }
                }>
                    <img src={Delete} alt={"Delete"} />
                    Delete draft</div>
            </div>}
            <div
                className={
                    styles.nR_content_projects_content_projectItem_header
                }
            >
                {draft.projectName || "No Fear Testimonial"}
                <div
                    className={
                        styles.nR_content_projects_content_projectItem_header_status
                    }
                >
                    {" "}
                    <div
                        className={
                            styles.nR_content_projects_content_projectItem_header_status_scheduled
                        }
                    >
                        {" "}
                    </div>
                    DRAFT
                </div>
                <img onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsSettingsMenuOpened(!isSettingsMenuOpened)
                }} src={Settings} alt={"Settings"} />
            </div>
            <div className={
                styles.nR_content_projects_content_projectItem_text
            }>Requested by {index === 0 ? "Clay G." : index === 1 ? 'Leah Z.' : "Clay G."}  </div>
            <div
                className={
                    styles.nR_content_projects_content_projectItem_text
                }
            >
                {draft.option?.value || "no option"}
                <div className={styles.nR_content_projects_content_projectItem_text_dot}></div>
                {draft.projectType || "no type"}
            </div>
            <div
                className={
                    styles.nR_content_projects_content_projectItem_progressInfo
                }
            >
                <div>3 days ago</div>
                <div>{index === 0 ? "40%" : '10%'}</div>
            </div>
            <div
                className={
                    styles.nR_content_projects_content_projectItem_progress
                }
            >
                <div
                    style={{ width: index === 0 ? "40%" : '10%' }}
                    className={
                        styles.nR_content_projects_content_projectItem_progress_bar
                    }
                ></div>
            </div>
        </div> */}
        <div
            className={
                styles.nR_content_projects_content_projectItem
            }
            tabIndex={0}
            onBlur={() => {
                setIsSettingsMenuOpened(false);
            }}
        >
            {isSettingsMenuOpened && <div
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                className={styles.nR_content_projects_content_projectItem_settingsMenu}
            >
                <div className={styles.nR_content_projects_content_projectItem_settingsMenu_item}>
                    <img src={Copy} alt={"Copy"} />
                    Copy link</div>
                <div className={styles.nR_content_projects_content_projectItem_settingsMenu_item} onClick={
                    () => {
                        dispatch(deleteDraft(draft.id))
                    }
                }>
                    <img src={Delete} alt={"Delete"} />
                    Delete draft</div>
            </div>}
            <img className={styles.nR_content_projects_content_projectItem_settingsIcon} src={SettingsMenu} alt="" onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsSettingsMenuOpened(!isSettingsMenuOpened)
                    }} />
            <div
                className={
                    styles.nR_content_projects_content_projectItem_header
                }
            >
                {draft.projectName}
            </div>
            <div
                className={
                    styles.nR_content_projects_content_projectItem_type
                }
            >
                {draft.projectType || "Project type"}
            </div>
            <div
                className={
                    styles.nR_content_projects_content_projectItem_subText
                }
            >
                {draft.option?.value || ""} <div className={
                    styles.nR_content_projects_content_projectItem_dot
                } ></div>     <div>Shoot: {draft.preferredDate.date !== DEFAULT ? <>{format(draft.preferredDate.date as Date, "MM/dd/yyyy")}</> : "00/00/0000"} </div>
            </div>
            <div
                className={
                    styles.nR_content_projects_content_projectItem_progressText
                }
            >
                3 days ago <div className={
                    styles.nR_content_projects_content_projectItem_dot
                } ></div>     <div>10% </div>
  
                </div>
                <div className={
                    styles.nR_content_projects_content_projectItem_progressBar
                } >
                    <div
                        style={{ width: "10%" }}
                        className={
                            styles.nR_content_projects_content_projectItem_progressBar_bar
                        }
                    ></div>
            </div>
            {/* <div
                className={
                    styles.nR_content_projects_content_projectItem_credit
                }
            >
                {draft.option?.credits} { draft.option?.credits === 1 ? "credit" : "credits"}
             </div>  */}
            <div></div>
            <img
                className={
                    styles.nR_content_projects_content_projectItem_userIcon
                }
                src={User1Foto}
                alt={"Account"}
            />
        </div>
    </>

        ;
};

export default DraftItem;