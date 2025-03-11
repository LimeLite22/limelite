import { Copy, Delete, SettingsMenu } from "assets/images";
import { DEFAULT } from "consts/consts";
import { format } from "date-fns";
import { IRequest } from "interfaces/interfaces";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { deleteDraft } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";

interface IProps {
  draft: IRequest;
}
const DraftItem = ({ draft }: IProps) => {
  const dispatch = useDispatch();
  const [isSettingsMenuOpened, setIsSettingsMenuOpened] = useState(false);

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
          {draft.projectInfoSettings.name.length > 30
            ? draft.projectInfoSettings.name.substring(0, 30) + "..."
            : draft.projectInfoSettings.name}
        </div>
        <div className={styles.nR_content_projects_content_projectItem_type}>
          {draft.projectInfoSettings.type.header !== '' ? draft.projectInfoSettings.type.header : "Project type"}
        </div>
        <div className={styles.nR_content_projects_content_projectItem_subText}>
          {draft.projectInfoSettings.option?.value || ""}{" "}
          <div
            className={styles.nR_content_projects_content_projectItem_dot}
          ></div>{" "}
          <div>
            Shoot:{" "}
            {draft.logisticSettings.preferredDate.date !== DEFAULT ? (
              <>{format(draft.logisticSettings.preferredDate.date as Date, "MM/dd/yyyy")}</>
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
          <div>{draft.overviewInfoSettings.completnessPercent}% </div>
        </div>
        <div
          className={styles.nR_content_projects_content_projectItem_progressBar}
        >
          <div
            style={{ width: `${draft.overviewInfoSettings.completnessPercent}%` }}
            className={
              styles.nR_content_projects_content_projectItem_progressBar_bar
            }
          ></div>
        </div>
        <div></div>
        <img
          className={styles.nR_content_projects_content_projectItem_userIcon}
          src={draft.overviewInfoSettings.requester.foto}
          alt={"Account"}
        />
      </div>
    </>
  );
};

export default DraftItem;
