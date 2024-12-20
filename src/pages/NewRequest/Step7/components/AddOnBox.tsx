import { useDispatch, useSelector } from "react-redux";

import DefaultSlider from "pages/NewRequest/components/DefaultSlider";

import { CheckBox, CheckBoxSelected, Expand, Note } from "assets/images";

import { NO_ADD_ONS } from "consts/consts";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import { IAddOnsItem } from "interfaces/interfaces";
import { useState } from "react";

interface IProps {
  item: IAddOnsItem
}

const AddOnBox = ({ item }: IProps) => {
  const selectedRequest = useSelector(selectRequestInfo);

  const [isExpanded, setIsExpanded] = useState(false);

  const selection = selectedRequest?.addOns?.find((addOn) => addOn.value === item.value);

  const dispatch = useDispatch();
  const handleUpdateField = (path: string, value: IAddOnsItem[]) => {
    dispatch(
      updateDraftField({
        path,
        value,
      }),
    );
  };

  const handleSelect = () => {
    if (selectedRequest?.addOns) {
      if (item.value === NO_ADD_ONS) {
        handleUpdateField('addOns', [item]);
        return
      }
      let updatedAddOns = [...selectedRequest?.addOns.filter((addOn) => addOn.value !== NO_ADD_ONS)];
      if (updatedAddOns.find((addOn) => addOn.value === item.value)) {
        updatedAddOns = updatedAddOns.filter((addOn) => addOn.value !== item.value);
      } else {
        updatedAddOns = [...updatedAddOns, item];
      }
      handleUpdateField('addOns', updatedAddOns);
      setIsExpanded(true);
    }

  };
  const handleExpand = (e: React.MouseEvent) => {

    if (selectedRequest?.addOns) {
      if (item.value === NO_ADD_ONS) {
        handleUpdateField('addOns', [item]);
        return
      }
      let updatedAddOns = [...selectedRequest?.addOns.filter((addOn) => addOn.value !== NO_ADD_ONS)];
      if (updatedAddOns.find((addOn) => addOn.value === item.value)) {
        updatedAddOns = updatedAddOns.filter((addOn) => addOn.value !== item.value);
      } else {
        updatedAddOns = [...updatedAddOns, item];
      }
      handleUpdateField('addOns', updatedAddOns);
      setIsExpanded(!isExpanded);
      e.stopPropagation();
      e.preventDefault();

    }

  };

  return (
    <div
      className={`
        ${styles.box}
        ${selection ? styles.box_selected : ""} 
        ${isExpanded && item.value !== NO_ADD_ONS ? styles.box_expanded : ""}`}
      onClick={handleSelect}
    >
      <div className={styles.box_header}>
        <img
          className={styles.box_circle}
          src={selection ? CheckBoxSelected : CheckBox}
          alt="CheckBox"
        />
        <span className={styles.box_title}>
          {item.text}
          <div className={styles.box_title_addOn}>Add-on</div>
        </span>
        <div className={styles.box_title2}>
          {item.title}
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
                Your thumbnail is your video's first impression, and you want to
                make a good one. A custom thumbnail can include graphic elements,
                text, and/or branding that entices viewers to click. Price
                includes design and delivery of custom thumbnail.
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
