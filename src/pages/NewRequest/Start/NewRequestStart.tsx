import { GrayArrow } from "assets/images";
import { optionsList } from "consts/consts";
import { IRequest } from "interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { generateUniqueId } from "utils/generateId";

import { createDraft } from "../../../redux/requests/reducer";
import styles from "../NewRequest.module.scss";
import Drafts from "./components/Drafts";
import TipsPopUp from "./components/TipsPopUp";

const NewRequestStart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCardClick = (option: IRequest["option"]) => {
    dispatch(createDraft(option));
    navigate("/new-request/project");
  };

  return (
    <div className={styles.nR_startContainer}>
      <div className={styles.nR_startHeader}>
        <div className={styles.nR_startHeader_text}>New Request</div>
        <div className={styles.nR_startHeader_subText}>
          Please provide important information below regarding your Video Shoot
        </div>
      </div>
      <div className={styles.nR_content}>
        <div className={styles.nR_content_cardHeader}>
          Choose an option to get started:
        </div>
        <TipsPopUp />
        <div className={styles.nR_content_cards}>
          {" "}
          {optionsList.map((option) => {
            return (
              <div
                key={generateUniqueId()}
                className={styles.nR_content_card}
                onClick={() => handleCardClick(option)}
              >
                <img
                  className={styles.nR_content_card_arrow}
                  src={GrayArrow}
                  alt={"ShootOnlyIcon"}
                />
                <div className={styles.nR_content_card_header}>
                  <img src={option?.img} alt={"ShootOnlyIcon"} />
                  {option?.value}
                </div>
                <div className={styles.nR_content_card_divider}></div>
                <div className={styles.nR_content_card_text}>{option.text}</div>
                <div className={styles.nR_content_card_title}>
                  {option.credits} credit{option.credits > 1 ? "s" : ""}
                </div>
              </div>
            );
          })}
        </div>
        <Drafts />
      </div>
    </div>
  );
};

export default NewRequestStart;
