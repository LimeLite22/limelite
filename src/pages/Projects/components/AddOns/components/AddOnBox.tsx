import { CheckBox, CheckBoxSelected, Expand, Note } from "assets/images";
import { NO_ADD_ONS } from "consts/consts";
import { IAddOnsValue } from "interfaces/interfaces";
import DefaultSlider from "pages/NewRequest/components/DefaultSlider";
import { useState } from "react";
import styles from "../../../ProjectsPage.module.scss";

interface IProps {
  item: IAddOnsValue
}

const AddOnBox = ({ item }: IProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const isSelected = item.isSelected


  return (
    <div
      className={`
        ${styles.box}
       ${isExpanded && item.value !== NO_ADD_ONS ? styles.box_expanded : ""}
        `}
      tabIndex={0}
    >
      <div className={styles.box_header}>
        <span className={styles.box_title}>
          {item.header}
          <div className={styles.box_title_addOn}>Add-on</div>
        </span>
        <div className={styles.box_title2}>
          {item.subHeader}
        </div>
      </div>
    </div>
  );
};

export default AddOnBox;
