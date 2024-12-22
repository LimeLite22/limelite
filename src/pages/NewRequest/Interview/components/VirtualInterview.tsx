import { useDispatch, useSelector } from "react-redux";

import { IHomeRentalProps } from "interfaces/interfaces";
import DefaultSlider from "pages/NewRequest/components/DefaultSlider";

import { CheckBox, CheckBoxSelected, Expand, Note } from "assets/images";

import useWindowWidth from "hooks/useWindowWidth";

import { VIRTUAL_INTERVIEW } from "consts/consts";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";

const VirtualInterview = ({ isExpanded, setIsExpanded }: IHomeRentalProps) => {
  const dispatch = useDispatch();
  const selectedRequest = useSelector(selectRequestInfo);
  const type = selectedRequest?.interviewSettings.questionSettings.type;
  const windowWidth = useWindowWidth();

  const handleUpdateField = (path: string, value: string) => {
    dispatch(
      updateDraftField({
        path,
        value,
      }),
    );
  };
  return (
    <div
      className={`
       ${styles.box}
       ${type === VIRTUAL_INTERVIEW ? styles.box_selected : ""} 
       ${isExpanded ? styles.box_expanded : ""}`}
      onClick={() => {
        handleUpdateField(
          "interviewSettings.questionSettings.type",
          VIRTUAL_INTERVIEW,
        );
        !isExpanded && setIsExpanded(true);
      }}
      tabIndex={0}
      onBlur={() => {
        if (windowWidth < 768) {
          setIsExpanded(false);
        }
      }}
    >
      <div
        className={`
        ${styles.box_header2} 
        ${type === VIRTUAL_INTERVIEW ? styles.box_header_selected : ""} `}
      >
        <img
          className={styles.box_circle}
          src={type === VIRTUAL_INTERVIEW ? CheckBoxSelected : CheckBox}
          alt="CheckBox"
        />
        <div className={styles.box_title}>
          A proffessional interview
          <div className={styles.box_title_addOn}>Add-on</div>
        </div>
        <div className={styles.box_title2}>
          We'd like a LimeLite professional to conduct the virtual interview.
        </div>
      </div>
      <div className={styles.box_container}>
        {" "}
        <div className={styles.box_content}>
          <DefaultSlider />
          <div className={styles.box_content_info}>
            <div className={styles.box_content_info_header}>
              Premium Add-on:
              <span className={styles.box_content_info_header_addOn}>
                +$695
              </span>
            </div>
            <div className={styles.box_content_info_text}>
              If you want a unique, unintrusive location for your LimeLite
              shoot, a one-day Home Rental is the way to go. We'll manage
              everything from scouting, booking, and deposits to contracts,
              insurance and cleanup. Price includes a one-day home rental.
            </div>
          </div>
        </div>
        <div className={styles.box_subText}>
          <img src={Note} alt="locationIcon" /> Note: You will have an
          opportunity to enter a discount code for any for a Standard Add-ons
          during check-out
        </div>
      </div>

      <img
        style={{ top: "19px" }}
        onClick={() => setIsExpanded(!isExpanded)}
        src={Expand}
        alt="Expand"
        className={styles.box_expand}
      />
    </div>
  );
};

export default VirtualInterview;
