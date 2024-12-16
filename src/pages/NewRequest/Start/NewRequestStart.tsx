import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { IRequest } from "interfaces/interfaces";

import { GrayArrow } from "assets/images";

import { generateUniqueId } from "utils/generateId";

import { optionsList } from "consts/consts";

import { createDraft } from "../../../redux/requests/reducer";
import styles from "./NewRequestStart.module.scss";
import Drafts from "./components/Drafts";
import TipsPopUp from "./components/TipsPopUp";

const NewRequestStart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCardClick = (option: IRequest["option"]) => {
    dispatch(createDraft(option));
    navigate("/newRequest/step1");
  };

  return (
    <div className={styles.nR_container}>
      <div className={styles.nR_header}>
        <div className={styles.nR_header_text}>New Request</div>
        <div className={styles.nR_header_subText}>
          Please provide important information below regarding your Video Shoot
        </div>
      </div>
      <div className={styles.nR_content}>
        {/* <div className={styles.nR_content_section1}>
          <div className={styles.nR_content_section1_plan}>
            <div className={styles.nR_content_section1_plan_header}>
              Your plan progress{" "}
              <div className={styles.nR_content_section1_plan_header_progress}>
                20
                <div className={styles.nR_content_section1_plan_header_divider}>
                  /
                </div>
                <div className={styles.nR_content_section1_plan_header_number}>
                  48
                </div>
              </div>
            </div>
            <div className={styles.nR_content_section1_plan_text}>
              <img src={Valid} alt="Valid" /> You have used 2 Credits this
              month;
            </div>
            <div className={styles.nR_content_section1_plan_text}>
              <img src={Valid} alt="Valid" />
              You have 20 Credits remaining in your plan.
            </div>
          </div>
          <div className={styles.nR_content_section1_tips}>
            <div className={styles.nR_content_section1_tips_header}>
              Helpful tips for enhancing your experience ⚡️
            </div>
            <div className={styles.nR_content_section1_tips_text}>
              Annual Subscription unlocks the ability to use double the number
              of Videos in any given month up to their maximum credit limit.{" "}
            </div>
            <div className={styles.nR_content_section1_tips_assist}>
              <div className={styles.nR_content_section1_tips_assist_img}>
                <img src={ChatSupport} alt="" />
              </div>
              <div className={styles.nR_content_section1_tips_assist_info}>
                <div
                  className={styles.nR_content_section1_tips_assist_info_header}
                >
                  Need assistance scheduling a project?
                </div>
                <div
                  className={styles.nR_content_section1_tips_assist_info_text}
                >
                  Chat with a specialist
                  <img src={DirectionArrow} alt={"DirectionArrow"} />
                </div>
              </div>
            </div>
          </div>
        </div> */}
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
