import { IAddOnsValue } from "interfaces/interfaces";

import styles from "../../../ProjectsPage.module.scss";

interface IProps {
  item: IAddOnsValue
}

const AddOnBox = ({ item }: IProps) => {


  return (
    <div
      className={`
        ${styles.box}F
       ${styles.box_expanded}
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
