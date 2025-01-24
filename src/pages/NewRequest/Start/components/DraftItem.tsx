import { Copy, Delete, SettingsMenu, User1Foto } from "assets/images";
import { DEFAULT } from "consts/consts";
import { format } from "date-fns";
import { IRequest } from "interfaces/interfaces";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { deleteDraft } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";

interface IProps {
  draft: IRequest;
  index: number;
}
const DraftItem = ({ draft, index }: IProps) => {
  const dispatch = useDispatch();
  const [isSettingsMenuOpened, setIsSettingsMenuOpened] = useState(false);
  // const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   setIsSettingsMenuOpened(true);
  // };

  return (
    <>
      <div
        className={styles.nR_content_projects_content_projectItem}
        tabIndex={0}
        onBlur={() => {
          setIsSettingsMenuOpened(false);
        }}
      >
        {isSettingsMenuOpened && (
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className={
              styles.nR_content_projects_content_projectItem_settingsMenu
            }
          >
            <div
              className={
                styles.nR_content_projects_content_projectItem_settingsMenu_item
              }
            >
              <img src={Copy} alt={"Copy"} />
              Copy link
            </div>
            <div
              className={
                styles.nR_content_projects_content_projectItem_settingsMenu_item
              }
              onClick={() => {
                dispatch(deleteDraft(draft.id));
              }}
            >
              <img src={Delete} alt={"Delete"} />
              Delete draft
            </div>
          </div>
        )}
        <img
          className={
            styles.nR_content_projects_content_projectItem_settingsIcon
          }
          src={SettingsMenu}
          alt=""
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsSettingsMenuOpened(!isSettingsMenuOpened);
          }}
        />
        <div className={styles.nR_content_projects_content_projectItem_header}>
          {draft.projectName.length > 30 
                  ? draft.projectName.substring(0, 30) + "..."
                  : draft.projectName}
        </div>
        <div className={styles.nR_content_projects_content_projectItem_type}>
          { draft.projectType.header !== '' ? draft.projectType.header : "Project type"}
        </div>
        <div className={styles.nR_content_projects_content_projectItem_subText}>
          {draft.option?.value || ""}{" "}
          <div
            className={styles.nR_content_projects_content_projectItem_dot}
          ></div>{" "}
          <div>
            Shoot:{" "}
            {draft.preferredDate.date !== DEFAULT ? (
              <>{format(draft.preferredDate.date as Date, "MM/dd/yyyy")}</>
            ) : (
              "00/00/0000"
            )}{" "}
          </div>
        </div>
        <div
          className={
            styles.nR_content_projects_content_projectItem_progressText
          }
        >
          3 days ago{" "}
          <div
            className={styles.nR_content_projects_content_projectItem_dot}
          ></div>{" "}
          <div>10% </div>
        </div>
        <div
          className={styles.nR_content_projects_content_projectItem_progressBar}
        >
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
          className={styles.nR_content_projects_content_projectItem_userIcon}
          src={User1Foto}
          alt={"Account"}
        />
      </div>
    </>
  );
};

export default DraftItem;
