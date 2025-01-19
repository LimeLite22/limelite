import { useDispatch} from "react-redux";

import DefaultSlider from "pages/NewRequest/components/DefaultSlider";

import { CheckBox, CheckBoxSelected, Expand, Note } from "assets/images";

import { NO_ADD_ONS } from "consts/consts";

import {
  updateAddOnSelectionStatus,
} from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import { AddOnsValue} from "interfaces/interfaces";
import { useState } from "react";

interface IProps {
  item: AddOnsValue
}

const AddOnBox = ({ item }: IProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isSelected = item.isSelected

  const dispatch = useDispatch();

  const handleSelect = () => {
    dispatch(updateAddOnSelectionStatus({ id: item.id }))
    setIsExpanded(true);
  };
  const handleExpand = (e: React.MouseEvent) => {
    setIsExpanded(!isExpanded);
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div
      className={`
        ${styles.box}
        ${isSelected ? styles.box_selected : ""} 
       ${isExpanded && item.value !== NO_ADD_ONS ? styles.box_expanded : ""}
        `}
      onClick={handleSelect}
      tabIndex={0}
      onBlur={() => setIsExpanded(false)}
    >
      <div className={styles.box_header}>
        <img
          className={styles.box_circle}
          src={isSelected ? CheckBoxSelected : CheckBox}
          alt="CheckBox"
        />
        <span className={styles.box_title}>
          {item.header}
          <div className={styles.box_title_addOn}>Add-on</div>
        </span>
        <div className={styles.box_title2}>
          {item.subHeader}
        </div>
      </div>
      {item.value !== NO_ADD_ONS &&
        <div className={styles.box_container}>
          <div className={styles.box_content}>
            <DefaultSlider />
            <div className={styles.box_content_info}>
              <div className={styles.box_content_info_header}>
                Standart Add-on:
                <span className={styles.box_content_info_header_addOn}>+${item.price}</span>
              </div>
              <div className={styles.box_content_info_text}>
                {item.description}
              </div>
            </div>
          </div>
          <div className={styles.box_subText}>
            <img src={Note} alt="locationIcon" /> Note: You will have an
            opportunity to enter a discount code for any for a Standard Add-ons
            during check-out
          </div>
        </div>}
      {item.value !== NO_ADD_ONS && <img
        onClick={(e) => handleExpand(e)}
        src={Expand}
        alt="Expand"
        className={styles.box_expand}
      />
      }
    </div>
  );
};

export default AddOnBox;
